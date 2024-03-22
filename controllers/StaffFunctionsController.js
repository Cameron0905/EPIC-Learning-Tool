var Assessments = require('../models/Assessments');
var Staff = require('../models/Staff');
//Finds all the modules the staff member does
exports.moduleFinder = async (req, res) => {
    
    res.render('staff_Modules', {moduleID: req.params.moduleID, ModuleName:req.params.ModuleName})

}

