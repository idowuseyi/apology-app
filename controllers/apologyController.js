const Apology = require('../models/Apology');

exports.createApology = async (req, res) => {
  try {
    const { title, details, additionalInfo } = req.body;
    const apology = await Apology.create({ title, details, additionalInfo, userId: req.user.userId });
    res.status(201).json({ Status: 201, Message: 'Apology created successfully', Data: apology });
  } catch (error) {
    res.status(500).json({ Status: 500, Message: 'Error creating apology', Error: error.message });
  }
};

exports.getApologies = async (req, res) => {
  try {
    const apologies = await Apology.find({ userId: req.user.userId });
    res.status(200).json({ Status: 200, Message: 'Apologies retrieved successfully', Data: apologies });
  } catch (error) {
    res.status(500).json({ Status: 500, Message: 'Error retrieving apologies', Error: error.message });
  }
};

exports.getApology = async (req, res) => {
  try {
    const apology = await Apology.findById(req.params.id);
    if (!apology || apology.userId.toString() !== req.user.userId) {
      return res.status(404).json({ Status: 404, Message: 'Apology not found' });
    }
    res.status(200).json({ Status: 200, Message: 'Apology retrieved successfully', Data: apology });
  } catch (error) {
    res.status(500).json({ Status: 500, Message: 'Error retrieving apology', Error: error.message });
  }
};

exports.deleteApology = async (req, res) => {
  try {
    const apology = await Apology.findById(req.params.id);
    if (!apology || apology.userId.toString() !== req.user.userId) {
      return res.status(404).json({ Status: 404, Message: 'Apology not found' });
    }
    await apology.remove();
    res.status(200).json({ Status: 200, Message: 'Apology deleted successfully' });
  } catch (error) {
    res.status(500).json({ Status: 500, Message: 'Error deleting apology', Error: error.message });
  }
};
