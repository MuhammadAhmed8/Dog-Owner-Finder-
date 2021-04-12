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
 *   /conversations:
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
 */
/**
 * @swagger
 *   /conversations/{id}:
 *   get:
 *     summary: Get all messages of a conversation
 *     tags: [Conversation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: skip
 *       - in: query
 *         name: limit
 *         default: 10
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Message'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 */


/**
* @swagger
    /conversations/{id}/message:
*   post:
*     summary: Post a message to the conversation
*     tags: [Conversation]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             message: string
*             required:
*               - message
*             properties:
*               message:
*                 type: string
*     responses:
*       "200":
*         description: OK
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 results:
*                   type: array
*                   items:
*                     $ref: '#/components/schemas/Message'
*       "401":
*         $ref: '#/components/responses/Unauthorized'
*       "403":
*         $ref: '#/components/responses/Forbidden'
*/
