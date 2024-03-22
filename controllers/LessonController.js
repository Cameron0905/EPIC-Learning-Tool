const session = require('express-session');
var lessons = require('../models/Lessons');

//calls the retrieve lessons list function in the models file

exports.retrieveLessonsList= async(req, res) => {
    let lessonList = await lessons.retrieveLessonsListByModuleID(req.params.moduleID)
    res.render('lessons', {lessons: lessonList[0]})
}
//calls the lesson content function in the models file

exports.retrieveLesson = async (req, res) => {
    let lesson = await lessons.retrieveLessonByLessonID(req.params.lessonID)
    res.render('lesson', lesson[0][0])
}
