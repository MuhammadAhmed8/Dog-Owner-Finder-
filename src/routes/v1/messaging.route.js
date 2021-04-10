const express = require('express');
const auth = require('../../middlewares/auth');
const { routeMessage } = require('../../middlewares/message');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const { messagingController } = require('../../controllers');

const router = express.Router();



router.post('/', auth(), routeMessage, messagingController.postMessage);

router.get('/conversations', auth(), messagingController.getConversations);


router.post('/:convId', auth(), messagingController.postMessage);

router.get('/:convId', auth(), messagingController.getMessages);




module.exports = router;
