// const { Apology } = require('../models');

// exports.createApology = async (req, res) => {
//   const { title } = req.body;
//   const apology = await Apology.create({ title, userId: req.user.id });
//   res.send({ message: 'Apology created', apology });
// };

// exports.deleteApology = async (req, res) => {
//   const { id } = req.params;
//   const apology = await Apology.findOne({ where: { id, userId: req.user.id } });
//   if (!apology) return res.status(404).send({ message: 'Apology not found' });

//   await apology.destroy();
//   res.send({ message: 'Apology deleted' });
// };

// controllers/apologyController.js

const { Apology } = require('../models');

// Create Apology
exports.createApology = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, details, additionalInfo } = req.body;
    const apology = await Apology.create({ title, details, additionalInfo, userId });
    res.status(201).json({
      Status: 201,
      Message: 'Apology created successfully',
      Data: apology,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      Status: 500,
      Message: 'Error creating apology',
    });
  }
};

// Get All Apologies
exports.getAllApologies = async (req, res) => {
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
};

// Get Single Apology
exports.getApologyById = async (req, res) => {
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
};

// Delete Apology
exports.deleteApology = async (req, res) => {
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
};
