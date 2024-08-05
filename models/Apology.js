const mongoose = require('mongoose');

const ApologySchema = new mongoose.Schema({
  title: { type: String, required: true },
  details: { type: String, required: true },
  additionalInfo: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Apology', ApologySchema);
