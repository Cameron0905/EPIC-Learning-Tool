const session = require('express-session');
var Login = require('../models/Login');
//Checks the log in details and then redirects to the correct place
exports.checksLogin = async (req, res) => {
    // Implement this method using the pupil model
    const {Email, Pswd} =  req.body
    await Login.checkLogin(Email, Pswd)


    if(session.AccessRole=='Admin'){
        res.redirect('/admin')
    }
    else if(session.AccessRole=='Student'){
        res.redirect('/Modules')
    }
    else if (session.AccessRole=='Staff'){
        res.render('staff', {modules: session.Lecturers})
    }else{
        res.render('login', {message: "Incorrect Username and/or Password!"})

    }
}