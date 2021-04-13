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
const { userOneAccessToken, managePetAccessToken } = require('../fixtures/token.fixture');
const { pet1, pet2, insertPets } = require('../fixtures/pet.fixture');

setupTestDB();

/*
  *********************************
  adopt api tests with Jest and Supertest.
  **********************************
*/

describe('Adopt routes', () => {
    describe('POST /v1/adopt/request', () => {
        let mockUser;
        beforeEach(() => {
            mockRequest = {
                petId: pet1._id
            };
        });

        test('Should return 201 status code if successful', async() => {
            await insertPets([pet1, pet2]);
            const res = await request(app).post('/v1/adopt/request').set('Authorization', 'Bearer ' + managePetAccessToken).send(mockRequest);

            expect(res.status).toBe(201);


        });



    });

})


describe('Adopt routes', () => {
    describe('GET /v1/adopt/request', () => {

        test('Should return 201 status code if successful', async() => {
            const res = await request(app).get('/v1/adopt/request').set('Authorization', 'Bearer ' + managePetAccessToken).send(mockRequest);

            expect(res.status).toBe(201);


        });



    });

})