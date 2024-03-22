exports.retrieveModulesListbyID = (pupilID) => {
    //retrives the modules a certain student attends
    return new Promise((resolve, reject) => {
        var database = require('../dbConfig')
        database.then(
            (con) => {
                if (con) {
                    resolve(con.query(`
                    SELECT Modules.ModuleName, Modules.moduleID
                    FROM Pupils, Courses, Modules 
                    WHERE Pupils.CourseCode = Courses.CourseCode 
                    AND Pupils.pupilID = ?
                    AND (Courses.Module1 = Modules.moduleID 
                    OR Courses.Module2 = Modules.moduleID 
                    OR Courses.Module3 = Modules.moduleID 
                    OR Courses.Module4 = Modules.moduleID 
                    OR Courses.Module5 = Modules.moduleID 
                    OR Courses.Module6 = Modules.moduleID)
                    `,  pupilID))
                }
                else {
                    reject()
                }
        }).catch(error => console.log(error))
    })
}