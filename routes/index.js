/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

/**
 * @swagger
 * tags:
 *   name: Apologies
 *   description: Apology management endpoints
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /apologies:
 *   post:
 *     summary: Create a new apology
 *     tags: [Apologies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - details
 *             properties:
 *               title:
 *                 type: string
 *               details:
 *                 type: string
 *               additionalInfo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Apology created successfully
 *       500:
 *         description: Error creating apology
 */

/**
 * @swagger
 * /apologies:
 *   get:
 *     summary: Retrieve all apologies
 *     tags: [Apologies]
 *     responses:
 *       200:
 *         description: List of all apologies
 *       500:
 *         description: Error retrieving apologies
 */

/**
 * @swagger
 * /apologies/{id}:
 *   get:
 *     summary: Retrieve a single apology by ID
 *     tags: [Apologies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Apology ID
 *     responses:
 *       200:
 *         description: Apology retrieved successfully
 *       404:
 *         description: Apology not found
 *       500:
 *         description: Error retrieving apology
 */

/**
 * @swagger
 * /apologies/{id}:
 *   delete:
 *     summary: Delete an apology by ID
 *     tags: [Apologies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Apology ID
 *     responses:
 *       200:
 *         description: Apology deleted successfully
 *       404:
 *         description: Apology not found
 *       500:
 *         description: Error deleting apology
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const apologyController = require('../controllers/apologyController');
// const auth = require('../middleware/auth');
const { authenticateUser } = require('../middleware/auth');

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Apology API',
    swagger: "<baseurl>/api-docs"
   });
});

// User routes
router.post('/register', userController.register);
router.post('/login', userController.login);
// router.post('/apologies', auth, apologyController.createApology);
// router.delete('/apologies/:id', auth, apologyController.deleteApology);


// Create Apology
router.post('/apologies', authenticateUser, apologyController.createApology);

// Get All Apologies
router.get('/apologies', authenticateUser, apologyController.getAllApologies);

// Get Single Apology
router.get('/apologies/:id', authenticateUser, apologyController.getApologyById);

// Delete Apology
router.delete('/apologies/:id', authenticateUser, apologyController.deleteApology);

module.exports = router;
