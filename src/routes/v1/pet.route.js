const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const petController = require('../../controllers/pet.controller');

const router = express.Router();


router.post('/', auth("managePets"), petController.createPet);
router.get('/', petController.getPets);
router.get('/:id', petController.getPetById)
router.patch('/:id', auth("managePets"), petController.updatePet)
router.delete('/:id', auth("managePets"), petController.deletePet)

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
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *   get:
 *     summary: Get all pets
 *     description: Get All Pets.
 *     tags: [Pet]
 *     parameters:
 *       - in: query
 *         name: breed
 *         schema:
 *           type: string
 *         description: Pet Breed
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
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
 *                     $ref: '#/components/schemas/Pet'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /pets/{id}:
 *   get:
 *     summary: Get a pet
 *     description: get a specific pet by its id.
 *     tags: [Pet]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pet id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Pet'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a pet
 *     description: Only Staff members can update a pet for their locations.
 *     tags: [Pet]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pet id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               breed:
 *                 type: string
 *               color:
 *                 type: string
 *               weight:
 *                  type: Float
 *               age:
 *                  type: Integer
 *               size:
 *                  type: string
 *             example:
 *               breed: german shepherd dog
 *               name: "Tom"
 *               color: "white"
 *     responses:
 *       "200":
 *         description: OK
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
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a Pet
 *     description: Only Staff members can delete a pet for their locations.
 *     tags: [Pet]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pet id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
