exports.retrieveLessonByLessonID = async (lessonID) => {
    let database = await require('../dbConfig')
    let lesson =  await database.query("SELECT * FROM Lessons WHERE Lessons.lessonID = ?", lessonID)
    return lesson
}

exports.retrieveLessonsListByModuleID = async (moduleID) => {
    // Selects all except the HTML content
    let database = await require('../dbConfig')
    let lessons =  await database.query("SELECT lessonID, moduleID, LessonDate, LessonName FROM Lessons WHERE Lessons.moduleID = ?", moduleID)
    return lessons
}