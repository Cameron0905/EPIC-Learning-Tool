const express = require('express');
const router = express.Router();

var assessments =  require('../controllers/AssessmentController');

router.get('/', assessments.retrieveAssessmentMarks)

module.exports = router