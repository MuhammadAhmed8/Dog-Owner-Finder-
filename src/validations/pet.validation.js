const Joi = require('joi');

exports.createPet = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        breed: Joi.string().required(),
        color: Joi.string().required(),
        size: Joi.valid('small', 'medium', 'large', 'giant'),
        gender: Joi.valid('male', 'female'),
        location: Joi.string().required(),
        age: Joi.number(),
        weight: Joi.number(),
    })
}