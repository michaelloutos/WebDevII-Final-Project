require('dotenv').config();

const mongoose = require('mongoose');

const Assignment = require('../models/Assignment');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {

    await Assignment.deleteMany();

    await Assignment.insertMany([
      {
        course: 'Web Development II',
        title: 'Final Project Proposal',
        dueDate: new Date('2026-05-10'),
        week: 'Week 1',
        status: 'Incomplete',
        priority: 'High'
      },

      {
        course: 'Cyber Security',
        title: 'Attack Tree Assignment',
        dueDate: new Date('2026-05-08'),
        week: 'Week 1',
        status: 'Complete',
        priority: 'Normal'
      },

      {
        course: 'VR Development',
        title: 'Museum Interaction Demo',
        dueDate: new Date('2026-05-15'),
        week: 'Week 2',
        status: 'Incomplete',
        priority: 'High'
      }
    ]);

    console.log('Seed data inserted');

    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });