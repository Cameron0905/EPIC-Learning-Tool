const session = require('express-session');
const crypto = require('crypto')



exports.checkLogin = (Email, Pswd) => {
    return new Promise((resolve, reject) => {
    var database = require('../dbConfig');
    //hashes inputted password
    Pswd=Hash(Pswd)
    database.then(con => {
        con.query("SELECT * FROM Pupils WHERE Email = '" + Email + "'AND Pswd= '" + Pswd + "'").then(([rows]) => {
            // if there any results in the pupils databse add their details to the sessions
            if(rows.length>0){
                
                session.LoggedIn=true;
                session.pupilID=rows[0].pupilID
                session.FirstName=rows[0].FirstName
                session.LastName=rows[0].LastName
                session.Email=rows[0].Email
                session.CourseCode=rows[0].CourseCode
                session.Pswd=rows[0].Pswd
                resolve(session.AccessRole='Student')
                con.query(`
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
                    `,  session.pupilID).then(([rows]) => {
                session.Modules=rows

                })


            }
            else {
                    // if there  aren't any results in the pupils database check the staff table and if they are there add their details to the sessions, with their accessrole

                con.query("SELECT * FROM Staff WHERE Email = '" + Email + "'AND Pswd= '" + Pswd + "'").then(([rows]) => {
                    if(rows.length>0){

                        session.LoggedIn=true;
                        session.staffID=rows[0].staffID
                        session.FirstName=rows[0].FirstName
                        session.LastName=rows[0].LastName
                        session.Email=rows[0].Email
                        session.Role=rows[0].Role
                        session.Pswd=rows[0].Pswd
                        
                        if(session.Role=='Admin'){
                            resolve(session.AccessRole='Admin')
                        }else{
                            con.query("SELECT * FROM Lecturers WHERE staffID= '" + session.staffID + "'").then(([rows]) => {
                                con.query("SELECT * FROM Modules WHERE moduleID= '" + rows[0].moduleID + "'").then(([rows]) => {
                                session.Lecturers=rows
                                session.LecturersModule=rows.moduleID
                                resolve(session.AccessRole='Staff')
                                })
                            })
                            
                        }
                    }
                    else {             
                        //if no match then refuse entry               
                        resolve(session.AccessRole='Error')
                }

                })
                
            }
        })
    })
})
}
Hash = (Pswd) => {
    const md5sum = crypto.createHash('md5');
    let str = Pswd;
    
    const res = md5sum.update(str).digest('hex');
    return res
}