const session = require('express-session');

var module = require('../models/Module');
var lessons = require('../models/Lessons');

//gets all the module names based on the pupils ID
exports.retrieveModuleNames = async(req, res) => {
    let modules = await module.retrieveModulesListbyID(session.pupilID) 
    res.render('modules', {modules: modules[0]})
}

