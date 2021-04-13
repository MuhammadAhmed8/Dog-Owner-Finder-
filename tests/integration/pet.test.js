const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const httpMocks = require('node-mocks-http');
const moment = require('moment');
const app = require('../../src/app');
const config = require('../../src/config/config');
const auth = require('../../src/middlewares/auth');
const { tokenService, emailService } = require('../../src/services');
const ApiError = require('../../src/utils/ApiError');
const setupTestDB = require('../utils/setupTestDB');
const { Token } = require('../../src/models');
const { roleRights } = require('../../src/config/roles');
const { tokenTypes } = require('../../src/config/tokens');
const { pet1, pet2, insertPets } = require('../fixtures/pet.fixture');
const { managePetAccessToken } = require('../fixtures/token.fixture');

setupTestDB();

/*
  ****************************************

   Pets api tests with Jest and Supertest.

  *****************************************
*/

describe('Pets routes', () => {
    describe('POST /v1/pets', () => {
        let mockPet;
        beforeEach(() => {
            mockPet = {
                name: "test pet",
                breed: "australian",
                color: "brown",
                age: 10,
                size: "medium",
                weight: 40,
                location: "NY",
                gender: "female"
            };
        });

        test('Should return 201 status code if pet is created successfully', async() => {
            const res = await request(app)
                .post('/v1/pets')
                .set('Authorization', 'Bearer ' + managePetAccessToken)
                .send(mockPet)
                .expect(201);


            expect(res.body.pet).toEqual({
                _id: expect.anything(),
                name: mockPet.name,
                breed: mockPet.breed,
                color: mockPet.color,
                size: mockPet.size,
                location: mockPet.location,
                weight: mockPet.weight,
                status: 'available',
                createdAt: expect.anything(),
                updatedAt: expect.anything()
            });


        });


    });


    describe('GET /v1/pets', () => {
        test('should return 200 and apply the default query options', async() => {

            const res = await request(app).get('/v1/pets').send();
            expect(res.status).toBe(httpStatus.OK);

        });

        test('should correctly apply filter on breed field', async() => {
            await insertPets([pet1, pet2]);

            const res = await request(app)
                .get('/v1/pets')
                .query({ breed: pet2.breed })
                .send()
                .expect(httpStatus.OK);

            expect(res.body).toEqual({
                pets: expect.any(Array),
                petCounts: 1
            });
            expect(res.body.pets).toHaveLength(1);
            expect(res.body.pets[0]._id).toBe(pet2._id.toHexString());
        });


        test('should limit returned array if limit param is specified', async() => {
            await insertPets([pet1, pet2]);

            const res = await request(app)
                .get('/v1/pets')
                .query({ limit: 1 })
                .send()
                .expect(httpStatus.OK);

            expect(res.body).toEqual({
                pets: expect.any(Array),
                petCounts: 2,
            });
            expect(res.body.pets).toHaveLength(1);
            expect(res.body.pets[0]._id).toBe(pet1._id.toHexString());
        });

        test('should return the correct page if page and limit params are specified', async() => {
            await insertPets([pet1, pet2]);

            const res = await request(app)
                .get('/v1/pets')
                .query({ page: 2, limit: 1 })
                .send()
                .expect(httpStatus.OK);

            expect(res.body).toEqual({
                pets: expect.any(Array),
                petCounts: 2,
            });
            expect(res.body.pets).toHaveLength(1);
            expect(res.body.pets[1]._id).toBe(pet2._id.toHexString());
        });
    });


    test('should limit returned array if limit param is specified', async() => {
        await insertPets([pet1, pet2]);

        const res = await request(app)
            .get('/v1/pets')
            .query({ limit: 1 })
            .send()
            .expect(httpStatus.OK);


        expect(res.body.pets).toHaveLength(1);

    });

    test('should return the correct page if page and limit params are specified', async() => {
        await insertPets([pet1, pet2]);

        const res = await request(app)
            .get('/v1/pets')
            .query({ page: 2, limit: 1 })
            .send()
            .expect(httpStatus.OK);

        expect(res.body).toEqual({
            pets: expect.any(Array),
            petCounts: 2,
        });

        expect(res.body.pets).toHaveLength(1);
        expect(res.body.pets[0]._id).toBe(pet2._id.toHexString());
    });
});