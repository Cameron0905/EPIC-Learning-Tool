const express = require('express');
const router = express.Router();

var assessmentController =  require('../controllers/AssessmentController');

router.get('/', assessmentController.retrieveAssessments)
router.get('/:AssessmentsID', assessmentController.retrieveAssessment)
router.post('/:AssessmentsID/submit-assessment', assessmentController.submitAssessment)

module.exports = router;