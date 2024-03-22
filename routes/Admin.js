const express = require('express');
const session = require('express-session');
const router = express.Router();

var pupils_controller =  require('../controllers/PupilsController');
var staff_controller = require('../controllers/StaffController')



// Use the login.handlebars template
router.get('/', (req, res) => {
    console.log(session.LoggedIn)
    if(session.AccessRole=='Admin'){
    res.render("admin")
    }
    else{
        console.log(`No Entry`)
        res.redirect('/')
    }
    
});

// CRUD routes
router.get('/create-pupil', pupils_controller.createPupilRedirect)
router.post('/create-pupil/create', pupils_controller.createPupil);

router.post('/delete-pupil/delete', pupils_controller.deletePupil);
router.get('/delete-pupil', pupils_controller.deletePupilRedirect)

router.get('/retrieve-pupils', pupils_controller.retrievePupils)

router.post('/create-staff/create', staff_controller.createStaff)
router.get('/create-staff', staff_controller.createStaffRedirect)


router.post('/delete-staff/delete', staff_controller.deleteStaff)
router.get('/delete-staff', staff_controller.deleteStaffRedirect)


router.get('/get-staff', staff_controller.getStaff)



module.exports = router;
