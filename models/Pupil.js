var Validation = require('./Validation');

const crypto = require('crypto')
const session = require('express-session');



exports.createPupil = async (FirstName, LastName, Email, CourseCode, Pswd) => {
    return new Promise(async (resolve, reject) => {
        //checks if the password is valid
        await Validation.validPass(Pswd)
        //Hashes password
        Pswd=Hash(Pswd)
        //checks if the Email is valid
        await Validation.validEmail(Email)
        if(session.valid==1){
            //adds to the database
            const pupil = { FirstName: FirstName, LastName: LastName, Email: Email, CourseCode, CourseCode, Pswd: Pswd }
            var database = require('../dbConfig');
            database.then((con) => con.query('INSERT INTO Pupils SET ?', pupil))
                .catch((error) => console.error(error))
            resolve()    
    }
        else{
            resolve()
    }
})
}

exports.retrievePupils = () => {
    //just gets all the students in a list
    return new Promise((resolve, reject) => {
        var database = require('../dbConfig')
        database.then(
            (con) => {
                if (con) {
                    resolve(con.query('SELECT * FROM Pupils'))
                }
                else {
                    reject()
                }
        }).catch(error => console.log(error))
    })
} 

Hash = (Pswd) => {
    const md5sum = crypto.createHash('md5');
    let str = Pswd;
    
    const res = md5sum.update(str).digest('hex');
    return res
}



exports.deletePupilbyID = (ID) => {
    // deletes pupil by the ID submitted
    var database = require('../dbConfig')
    database.then((con) => {
        con.query('DELETE FROM Pupils WHERE pupilID = ?', ID)
    }).catch((error) => console.error(error))
}
