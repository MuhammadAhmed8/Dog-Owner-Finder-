const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const petController = require('../../controllers/pet.controller');

const router = express.Router();


router.post('/', petController.createPet);


module.exports = router;
