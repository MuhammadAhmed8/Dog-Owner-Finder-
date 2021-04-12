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


/**
 * @swagger
 * /conversations:
 *   post:
 *     summary: Create a conversation
 *     description: Only signed in users are allowed.
 *     tags: [Conversation]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - topic
 *             properties:
 *               topic:
 *                 type: object
 *               participants:
 *                 type: []
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Adoption'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   /adopt/request:
 *   get:
 *     summary: Get all adoption requests
 *     description: Only staff members of that location are allowed.
 *     tags: [Adoption]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Adoption'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
