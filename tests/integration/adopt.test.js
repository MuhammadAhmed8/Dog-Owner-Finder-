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
const { userOneAccessToken, managePetAccessToken, succ } = require('../fixtures/token.fixture');
const { pet1, pet2, insertPets } = require('../fixtures/pet.fixture');

setupTestDB();

/*
  *********************************
  Auth api tests with Jest and Supertest.
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
            const res = await request(app).post('/v1/adopt/request').set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDczMzJhMDhkNzA1ZDE4OTBhNjhkMzAiLCJpYXQiOjE2MTgyNjQwOTYsImV4cCI6MTYxODQ4MDA5NiwidHlwZSI6ImFjY2VzcyJ9.D4CTvAOaCynBcV-nMNoWBq8ze5wXN0v8Yoq1AgvgpMk').send(mockRequest);

            expect(res.status).toBe(succ);


        });



    });

})