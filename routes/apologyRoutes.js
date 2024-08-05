/**
 * @swagger
 * tags:
 *   name: Apologies
 *   description: Apology management endpoints
 */

/**
 * @swagger
 * /api/apologies:
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
 * /api/apologies:
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
 * /api/apologies/{id}:
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
 * /api/apologies/{id}:
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
const { createApology, getApologies, getApology, deleteApology } = require('../controllers/apologyController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createApology);
router.get('/', authMiddleware, getApologies);
router.get('/:id', authMiddleware, getApology);
router.delete('/:id', authMiddleware, deleteApology);

module.exports = router;
