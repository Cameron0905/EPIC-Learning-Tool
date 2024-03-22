const session = require('express-session');



exports.retrieveAssessments = () => {
    return new Promise((resolve, reject) => {
        var database = require('../dbConfig')
        database.then(
            (con) => {
                if (con) {
                    // Workaround due to modules column allowing null values in database
                    let modulesList = session.Modules.map(module => module.moduleID)
                    let missingModulesCount = 6 - modulesList.length
                    if (modulesList.length < 6) {
                        for (let i=0; i< missingModulesCount; i++)
                        modulesList.push(0)
                    }
                    //gets all the assessments that the pupil would do
                    resolve(con.query(`
                        SELECT *
                        FROM Assessments a, Modules m
                        WHERE (a.moduleID = ? OR a.moduleID = ? OR a.moduleID = ? OR a.moduleID = ? OR a.moduleID = ? OR a.moduleID = ?) AND a.moduleID = m.moduleID
                        `
                    , modulesList
                    )
                    )
                }
                else {
                    reject("rejected")
                }
        }).catch(error => console.log(error))
    })
}

exports.addAssessments = async (AssessmentName, DueDate, AssessmentDesc, AssessmentContent) => {
    return new Promise(async (resolve, reject) => {
            //inserts a new assessment using an object formed from the inputs
        
            const assessment = { AssessmentName: AssessmentName, DueDate: DueDate, moduleID: session.Lecturers[0].moduleID, AssessmentDesc, AssessmentContent}
            var database = require('../dbConfig');
            database.then((con) => con.query('INSERT INTO Assessments SET ?', assessment))
                .catch((error) => console.error(error))
            resolve()    
    
      
})
}
exports.addAssessmentsMarks = async (PupilID, AssessmentID, Percentage) => {
    return new Promise(async (resolve, reject) => {
            //inserts a new assessment mark using an object formed from the inputs

            const assessment = { PupilID: PupilID, AssessmentID: AssessmentID, Percentage: Percentage}
            var database = require('../dbConfig');
            database.then((con) => con.query('INSERT INTO AssessmentMarks SET ?', assessment))
                .catch((error) => console.error(error))
            resolve()     
})
}
exports.checkMarks = async (moduleID) => {
    return new Promise(async (resolve, reject) => {
        var database = require('../dbConfig');
        database.then(con => 
            {
                //gets all pupils who are in that module and have got an assessment mark and averages their score to give them their module average score and retuns them into a list
            con.query("SELECT AssesmentsID FROM Assessments WHERE ModuleID = '" + moduleID+ "'").then(([rows]) => {
                con.query("SELECT DISTINCT Pupils.pupilID,FirstName,Email,AssessmentID,Percentage  FROM Pupils, Courses, AssessmentMarks,Assessments WHERE Pupils.CourseCode = Courses.CourseCode AND AssessmentMarks.AssessmentID IN (SELECT AssesmentsID FROM Assessments WHERE moduleID=?) AND AssessmentMarks.pupilID=Pupils.pupilID  AND(Courses.Module1 = '" + moduleID+ "' OR Courses.Module2 = '" + moduleID+ "' OR Courses.Module3 = '" + moduleID+ "' OR Courses.Module4 = '" + moduleID+ "'OR Courses.Module5 = '" + moduleID+ "' OR Courses.Module6 = '" + moduleID+ "') ORDER BY AssessmentID ASC" , moduleID).then(([results]) => {
                        for (let index = 0; index < results.length; index++) {
                            var total=0
                            var count=1
                            for (let x = index+1; x < results.length; x++) {
                                
                                if(results[x].pupilID==results[index].pupilID){
                    
                                total=total+results[x].Percentage+results[index].Percentage
                                count=count+1
                                results.splice(x,1)
                                }
                                if(total!=0){
                                    results[index].Percentage=(total/count)

                                }
                            }
                            
                        }
                        
                        resolve(session.StudentResults=results)
                })
 

            })
        })
})
}

exports.retrieveAssessment = async (assessmentID) => {
    return new Promise(async (resolve, reject) => {
            var database = require('../dbConfig');
            //gets the content of an assessment
            database.then((con) => resolve(con.query('SELECT * FROM Assessments, Modules  WHERE Assessments.AssesmentsID = ? AND Assessments.moduleID = Modules.moduleID', assessmentID)))
                .catch((error) => console.error(error))
})
}

exports.retrieveAssessmentMarks = async (pupilID) => {
     //returns the marks of a pupil in an assessment

    var database = await require('../dbConfig')
    return database.query(`
        SELECT *
        FROM AssessmentMarks am, Assessments a 
        WHERE am.pupilID = ? AND am.AssessmentID = a.AssesmentsID 
`, pupilID)
}

exports.submitAssessment = async (pupilID, AssesmentsID, Submission) => {
    //submits an assessment and adds it to the submission table
    const assessment = { pupilID, AssesmentsID, Submission }
    var database = await require('../dbConfig');
    return await database.query('INSERT INTO AssessmentSubmissions SET ?', assessment)
}

