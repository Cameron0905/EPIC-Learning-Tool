
var assessments = require('../models/Assessments');
const session = require('express-session');


//Retrieves all assessments for a student from their Pupil ID
exports.retrieveAssessments= async(req, res) => {
    let [assessmentList] = await assessments.retrieveAssessments()
    res.render('assessments', {assessments: assessmentList})
}

//Basic redirects to different views
exports.addAssessmentRedirect= async(req, res) => {
    res.render('addAssessment', {Lecturers: req.params.moduleID})
}
//Basic redirects to different views

exports.addAssessmentMarksRedirect= async(req, res) => {
    res.render('addAssessmentMarks', {Lecturers: req.params.moduleID})
}
//Gets all marks from pupils in certain module
exports.checkMarksRedirect= async(req, res) => {
    await assessments.checkMarks(req.params.moduleID)

    res.render('getAllClassData', {StudentData: session.StudentResults})
}



//calls the add assessment function in the models file
exports.addAssessment = async (req, res) => {
    // Implement this method using the pupil model
    const {AssessmentName, DueDate, AssessmentDesc, AssessmentContent} =  req.body
    await assessments.addAssessments(AssessmentName, DueDate, AssessmentDesc,AssessmentContent)

}
//calls the add assessment marks function in the models file
exports.addAssessmentMarks = async (req, res) => {
    // Implement this method using the pupil model
    const {PupilID, AssessmentID, Percentage} =  req.body
    await assessments.addAssessmentsMarks(PupilID, AssessmentID, Percentage)
}

// gets the content for the assessment
exports.retrieveAssessment = async (req, res) => {
    const assessment = await assessments.retrieveAssessment(req.params.AssessmentsID)
    res.render('assessment', {assessment: assessment[0][0], req})

}
//calls the submit assessment function in the models file
exports.submitAssessment = async (req, res) => 
{  
    const submission = await assessments.submitAssessment(session.pupilID, req.params.AssessmentsID, req.body.Submission)
    res.redirect('/modules')
}
//calls the retrieve assessment marks function in the models file
exports.retrieveAssessmentMarks = async (req, res) => {
    const assessmentMarks  = await assessments.retrieveAssessmentMarks(session.pupilID)
    // res.send(assessmentMarks[0][0])
    res.render('reports', {assessmentMarks: assessmentMarks[0]})
}