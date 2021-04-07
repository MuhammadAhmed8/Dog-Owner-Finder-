const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const petController = require('../../controllers/pet.controller');

const router = express.Router();


router.post('/', petController.createPet);
router.get('/', petController.getPets);


module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Pets
 *   description: Pets management and retrieval
 * /pets:
 *   post:
 *     summary: Create a Pet
 *     description: Only employees can create pets.
 *     tags: [Pet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - breed
 *               - color
 *               - gender
 *               - size
 *               - weight
 *             properties:
 *               name:
 *                 type: string
 *               breed:
 *                 type: string
 *               color:
 *                 type: string
 *               gender:
 *                  type: string
 *                  enum: [male,female]
 *               size:
 *                  type: string
 *                  enum: [small,medium,large,giant]
 *               weight:
 *                  type: number
 *               image:
 *                  type: string
 *               age:
 *                  type: integer
 *               status:
 *                  type: string
 *                  enum: [available, not available]
 *                  default: available
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Pet'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
