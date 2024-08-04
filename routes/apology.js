const express = require('express');
const { Apology } = require('../models');
const router = express.Router();

/**
 * @swagger
 * /apologies:
 *   get:
 *     summary: Retrieve a list of all apologies
 *     tags: [Apology]
 *     responses:
 *       200:
 *         description: A list of apologies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Apology'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /apologies/{id}:
 *   get:
 *     summary: Get a single apology by ID
 *     tags: [Apology]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the apology to retrieve
 *     responses:
 *       200:
 *         description: The apology data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Apology'
 *       404:
 *         description: Apology not found
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /apologies/{id}:
 *   delete:
 *     summary: Delete an apology by ID
 *     tags: [Apology]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the apology to delete
 *     responses:
 *       200:
 *         description: Apology deleted successfully
 *       404:
 *         description: Apology not found
 *       500:
 *         description: Some server error
 */


// Create Apology
router.post('/', async (req, res) => {
  try {
    const { title, details, additionalInfo } = req.body;
    const apology = await Apology.create({ title, details, additionalInfo });
    res.status(201).json({
      Status: 201,
      Message: 'Apology created successfully',
      Data: apology,
    });
  } catch (error) {
    res.status(500).json({
      Status: 500,
      Message: 'Error creating apology',
    });
  }
});

// Get All Apologies
router.get('/', async (req, res) => {
  try {
    const apologies = await Apology.findAll();
    res.status(200).json({
      Status: 200,
      Message: 'Apologies retrieved successfully',
      Data: apologies,
    });
  } catch (error) {
    res.status(500).json({
      Status: 500,
      Message: 'Error retrieving apologies',
    });
  }
});

// Get Single Apology
router.get('/:id', async (req, res) => {
  try {
    const apology = await Apology.findByPk(req.params.id);
    if (!apology) {
      return res.status(404).json({
        Status: 404,
        Message: 'Apology not found',
      });
    }
    res.status(200).json({
      Status: 200,
      Message: 'Apology retrieved successfully',
      Data: apology,
    });
  } catch (error) {
    res.status(500).json({
      Status: 500,
      Message: 'Error retrieving apology',
    });
  }
});

// Delete Apology
router.delete('/:id', async (req, res) => {
  try {
    const apology = await Apology.findByPk(req.params.id);
    if (!apology) {
      return res.status(404).json({
        Status: 404,
        Message: 'Apology not found',
      });
    }
    await apology.destroy();
    res.status(200).json({
      Status: 200,
      Message: 'Apology deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      Status: 500,
      Message: 'Error deleting apology',
    });
  }
});

module.exports = router;
