const express = require('express');
const session = require('express-session');
const router = express.Router();

var Login_controller =  require('../controllers/LoginController');

// Use the login.handlebars template
router.get('/', (req, res) => {
    if (session.LoggedIn) {
        //clears sesion on log out
        delete session.LoggedIn;
        delete session.pupilID
        delete session.FirstName
        delete session.LastName
        delete session.Email
        delete session.CourseCode
        delete session.Pswd
        delete session.AccessRole
        delete session.Modules
        delete session.staffID
        delete session.Role
        delete session.valid
        delete session.assessments
        delete session.Lecturers
        delete session.StudentResults
        delete session.LecturersModule
        delete session.Student

    }
    res.render("login")
    });

// CRUD routes
router.post("/submit-login", Login_controller.checksLogin);

module.exports = router;