const session = require('express-session');
var pupil = require('../models/Pupil');


//Basic redirects to different views

exports.createPupilRedirect= async(req, res) => {
    res.render('create-pupil')
}
//Basic redirects to different views

exports.deletePupilRedirect= async(req, res) => {
    res.render('delete-pupil')
}
//creates a new pupil using the create pupil function in the models file
exports.createPupil = async (req, res) => {
    // Implement this method using the pupil model
    const {FirstName, LastName, Email, CourseCode, Pswd} =  req.body
    await pupil.createPupil(FirstName, LastName, Email, CourseCode, Pswd)
    if(session.valid==1){
        res.render('create-pupil')
    }
    else{
        res.render('create-pupil', {message:"Invalid Details"})
    }
}
//deletes a pupil using the delete pupil function in the models file
exports.deletePupil = (req, res) => {
    // Implement this method using the pupil model
    const { ID } =  req.body
    pupil.deletePupilbyID(ID)
    res.render('delete-pupil')

}
//gets all pupil using the retrieve pupil function in the models file
exports.retrievePupils = (req, res) => {
    pupil.retrievePupils().then(pupils => {
        res.render('retrieve-pupils', {pupils: pupils[0]})
    })
    
}