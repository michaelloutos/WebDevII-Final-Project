const mongoose = require('mongoose');

const importSchema = new mongoose.Schema({
  tokenUsed: {
    type: String,
    required: true
  },

  importedCount: {
    type: Number,
    default: 0
  },

  importedAt: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

module.exports = mongoose.model('Import', importSchema);