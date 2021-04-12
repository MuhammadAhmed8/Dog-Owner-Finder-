const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const adoptionController = require('../../controllers/adoption.controller');

const router = express.Router();

router.post('/request', auth(), adoptionController.createAdoptionRequest);
router.get('/request', auth('managePets'), adoptionController.getAllAdoptionRequests);
router.post('/request/status', auth('managePets'), adoptionController.changeRequestStatus)
module.exports = router;
