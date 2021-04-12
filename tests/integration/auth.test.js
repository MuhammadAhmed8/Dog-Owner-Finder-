const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const httpMocks = require('node-mocks-http');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const app = require('../../src/app');
const config = require('../../src/config/config');
const auth = require('../../src/middlewares/auth');
const { tokenService, emailService } = require('../../src/services');
const ApiError = require('../../src/utils/ApiError');
const setupTestDB = require('../utils/setupTestDB');
const { User, Token } = require('../../src/models');
const { roleRights } = require('../../src/config/roles');
const { tokenTypes } = require('../../src/config/tokens');
const { userOne, admin, insertUsers } = require('../fixtures/user.fixture');
const { userOneAccessToken, adminAccessToken } = require('../fixtures/token.fixture');

setupTestDB();

/*
  *********************************
  Auth api tests with Jest and Supertest.
  **********************************
*/

describe('Auth routes', () => {
    describe('POST /v1/auth/register', () => {
        let mockUser;
        beforeEach(() => {
            mockUser = {
                name: faker.name.findName(),
                email: faker.internet.email().toLowerCase(),
                password: 'myTestPass5',
            };
        });

        test('Should return 201 status code if user is registered successfully', async() => {
            const res = await request(app).post('/v1/auth/register').send(mockUser);

            expect(res.status).toBe(201);
            expect(res.body.user).toEqual({
                id: expect.anything(),
                name: mockUser.name,
                email: mockUser.email,
                role: 'user',
                isEmailVerified: false,
                favourites: []

            });
            expect(res.body.user).not.toHaveProperty('password');

            expect(res.body.tokens).toEqual({
                access: { token: expect.anything(), expires: expect.anything() },
                refresh: { token: expect.anything(), expires: expect.anything() },
            });

        });

        test('should return 400 error if the format of email is invalid', async() => {
            mockUser.email = 'wrongemailformat.com';

            const res = await request(app).post('/v1/auth/register').send(mockUser);
            expect(res.status).toBe(httpStatus.BAD_REQUEST)
        });

        test('should return 400 error if password does not contain both letters and numbers', async() => {
            mockUser.password = '4521554577';
            let res = await request(app).post('/v1/auth/register').send(mockUser).expect(httpStatus.BAD_REQUEST);
            expect(res.status).toBe(httpStatus.BAD_REQUEST);

            mockUser.password = 'onlyletters';
            res = await request(app).post('/v1/auth/register').send(mockUser);
            expect(res.status).toBe(httpStatus.BAD_REQUEST);
        });

        test('should return 400 error if the length of password < 8 characters', async() => {
            mockUser.password = 'smallpas';

            const res = await request(app).post('/v1/auth/register').send(mockUser);
            expect(res.status).toBe(httpStatus.BAD_REQUEST);
        });


    });

    describe('POST /v1/auth/login', () => {
        test('should return 200 and login user if email and password match', async() => {
            await insertUsers([userOne]);
            const loginCredentials = {
                email: userOne.email,
                password: userOne.password,
            };

            const res = await request(app).post('/v1/auth/login').send(loginCredentials);
            expect(res.status).toBe(httpStatus.OK);

            expect(res.body.user).toEqual({
                id: expect.anything(),
                name: userOne.name,
                email: userOne.email,
                role: userOne.role,
                isEmailVerified: userOne.isEmailVerified,
                favourites: []
            });

            expect(res.body.tokens).toEqual({
                access: { token: expect.anything(), expires: expect.anything() },
                refresh: { token: expect.anything(), expires: expect.anything() },
            });
        });

        test('should return 401 error if there are no users with that email', async() => {
            const loginCredentials = {
                email: userOne.email,
                password: userOne.password,
            };

            const res = await request(app).post('/v1/auth/login').send(loginCredentials).expect(httpStatus.UNAUTHORIZED);

            expect(res.body).toEqual({ code: httpStatus.UNAUTHORIZED, message: 'Incorrect email or password' });
        });

        test('should return 401 error if password is wrong', async() => {
            await insertUsers([userOne]);
            const loginCredentials = {
                email: userOne.email,
                password: 'guessedPass5',
            };

            const res = await request(app).post('/v1/auth/login').send(loginCredentials).expect(httpStatus.UNAUTHORIZED);

            expect(res.body).toEqual({ code: httpStatus.UNAUTHORIZED, message: 'Incorrect email or password' });
        });
    });

    describe('POST /v1/auth/logout', () => {
        test('should return 204 if refresh token is valid', async() => {
            await insertUsers([userOne]);
            const expires = moment().add(config.jwt.refreshExpirationDays, 'days');
            const refreshToken = tokenService.generateToken(userOne._id, expires, tokenTypes.REFRESH);
            await tokenService.saveToken(refreshToken, userOne._id, expires, tokenTypes.REFRESH);

            await request(app).post('/v1/auth/logout').send({ refreshToken }).expect(httpStatus.NO_CONTENT);

            const dbRefreshTokenDoc = await Token.findOne({ token: refreshToken });
            expect(dbRefreshTokenDoc).toBe(null);
        });

        test('should return 400 error if refresh token is missing from request body', async() => {
            await request(app).post('/v1/auth/logout').send().expect(httpStatus.BAD_REQUEST);
        });

        test('should return 404 error if refresh token is not found in the database', async() => {
            await insertUsers([userOne]);
            const expires = moment().add(config.jwt.refreshExpirationDays, 'days');
            const refreshToken = tokenService.generateToken(userOne._id, expires, tokenTypes.REFRESH);

            await request(app).post('/v1/auth/logout').send({ refreshToken }).expect(httpStatus.NOT_FOUND);
        });

        test('should return 404 error if refresh token is blacklisted', async() => {
            await insertUsers([userOne]);
            const expires = moment().add(config.jwt.refreshExpirationDays, 'days');
            const refreshToken = tokenService.generateToken(userOne._id, expires, tokenTypes.REFRESH);
            await tokenService.saveToken(refreshToken, userOne._id, expires, tokenTypes.REFRESH, true);

            await request(app).post('/v1/auth/logout').send({ refreshToken }).expect(httpStatus.NOT_FOUND);
        });
    });


});
