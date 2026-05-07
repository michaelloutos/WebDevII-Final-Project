const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  dueDate: {
    type: Date,
    required: true
  },

  dueTime: {
  type: String,
  required: true
},

  week: {
    type: String,
    required: true
  },

  status: {
    type: String,
    default: 'Incomplete'
  },

  priority: {
    type: String,
    default: 'Normal'
  }

}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);