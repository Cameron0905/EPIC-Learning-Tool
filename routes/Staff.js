const express = require('express');
const router = express.Router();
const session = require('express-session');


var StaffFunctionsController =  require('../controllers/StaffFunctionsController');
var Assessment_controller =  require('../controllers/AssessmentController');

// Use the login.handlebars template

router.get('/', (req, res) => {
    console.log(session.LoggedIn)
    if(session.AccessRole=='Staff'){
        res.render("staff_Modules");
    }
    else{
        console.log(`No Entry`)
        res.redirect('/')
    }
    
});

//router.get('/:moduleID/lessons/:lessonID', lesson_controller.retrieveLesson)
router.get('/Lecturer/:moduleID', StaffFunctionsController.moduleFinder)
router.get('/Lecturer/:moduleID/addAssessment', Assessment_controller.addAssessmentRedirect)
router.get('/Lecturer/:moduleID/addAssessmentMarks', Assessment_controller.addAssessmentMarksRedirect)
router.get('/Lecturer/:moduleID/checkMarks', Assessment_controller.checkMarksRedirect)



// CRUD routes

router.post("/Lecturer/:moduleID/addAssessment/add",Assessment_controller.addAssessment)
router.post("/Lecturer/:moduleID/addAssessmentMarks/add",Assessment_controller.addAssessmentMarks)


module.exports = router;