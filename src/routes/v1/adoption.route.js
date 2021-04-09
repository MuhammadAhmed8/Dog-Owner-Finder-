const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const adoptionController = require('../../controllers/adoption.controller');

const router = express.Router();

router.post('/', auth(), adoptionController.createAdoptionRequest);

module.exports = router;
