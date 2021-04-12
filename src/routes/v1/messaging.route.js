const express = require('express');
const auth = require('../../middlewares/auth');
const { routeMessage, messageAuth } = require('../../middlewares/message');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const { messagingController } = require('../../controllers');

const router = express.Router();




// get all conversations of a user
router.get('/', auth(), messagingController.getConversations);

// create a conversation and send a message
router.post('/message', auth(), routeMessage, messagingController.postMessage);

// send a message to a specific conversation
router.post('/:id/message', auth(), messageAuth, messagingController.postMessage);

//get All messages of a specific conversation
router.get('/:id', auth(), messageAuth, messagingController.getMessages);




module.exports = router;
