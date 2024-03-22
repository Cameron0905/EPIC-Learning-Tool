const session = require('express-session');
var staff = require('../models/Staff');


//Basic redirects to different views

exports.createStaffRedirect= async(req, res) => {
    res.render('create-staff')
}
//Basic redirects to different views

exports.deleteStaffRedirect= async(req, res) => {
    res.render('delete-staff')
}





//adds a new staff member using the create staff function in the models file
exports.createStaff = async (req, res) => {
    const {FirstName, LastName, Email, Role, Pswd} =  req.body
    await staff.createStaff(FirstName, LastName, Email, Role, Pswd)
    if(session.valid==1){
        res.render('create-staff')
    }
    else{
        res.render('create-staff', {message:"Invalid Details"})
    }
}
//deletes a staff member using the delete staff function in the models file

exports.deleteStaff = (req, res) => {
    const {ID} = req.body
    staff.deleteStaff(ID)
    res.render('delete-staff')

}
//gets all staff using the retrieve staff function in the models file
exports.getStaff = (req, res) => {
    staff.getStaff().then(staffMembers => {
        res.render('get-staff', {staffMembers: staffMembers[0]})
    }
    )
}