const express = require('express');


const router = express.Router();

const assignmentController = require('../controllers/assignmentController');
const importController = require('../controllers/importController');
const courseController = require('../controllers/courseController');

router.get('/', (req, res) => {
  res.json({ message: 'MyCanvas API is running' });
});

// Assignment routes
router.get('/assignments', assignmentController.getAssignments);
router.get('/assignments/:id', assignmentController.getAssignmentById);
router.post('/assignments', assignmentController.createAssignment);
router.put('/assignments/:id', assignmentController.updateAssignment);
router.delete('/assignments/:id', assignmentController.deleteAssignment);

// Import routes
router.get('/imports', importController.getImports);
router.post('/imports', importController.createImport);
router.delete('/imports/:id', importController.deleteImport);

// Course routes
router.get('/courses', courseController.getCourses);
router.post('/courses', courseController.createCourse);
router.delete('/courses/:id', courseController.deleteCourse);

module.exports = router;