const crypto = require('crypto')
var Validation = require('./Validation');
const session = require('express-session');
var database = require('../dbConfig')

exports.createStaff = async (FirstName, LastName, Email, Role, Pswd) => {
    return new Promise(async (resolve, reject) => {
        //checks if the password is valid
        await Validation.validPass(Pswd)
        //Hashes password
        Pswd=Hash(Pswd)
        //checks if the Email is valid
        await Validation.validEmail(Email)
        if(session.valid==1){
            const staff = { FirstName: FirstName, LastName: LastName, Email: Email, Role, Role, Pswd: Pswd }
            database.then((con) => con.query('INSERT INTO Staff SET ?', staff))
                .catch((error) => console.error(error))
            resolve()    
    }
        else{
            resolve()
    }
})
}

Hash = (Pswd) => {
    const md5sum = crypto.createHash('md5');
    let str = Pswd;
    
    const res = md5sum.update(str).digest('hex');
    return res
}

exports.deleteStaff = (ID) => {
    database.then((con) => {
        con.query('DELETE FROM Staff WHERE staffID = ?', ID)
    }).catch((error) => console.error(error))
}

exports.getStaff = () => {
    return new Promise((resolve, reject) => {
        database.then((con) => {
            resolve(con.query('SELECT * FROM Staff'))
        }).catch(error => console.log(error))
    })
} 


exports.lookupStudent = async (Email) => {
    return new Promise((resolve, reject) => {
        var database = require('../dbConfig');
        database.then(con => {
            con.query("SELECT * FROM Pupils WHERE Email = '" + Email + "'").then(([rows]) => {
                if (rows.length>0){
                    resolve(session.Student=rows[0])
            }
                else{
                    resolve(session.Student="Error");
                }
        })
            
        })
    })
}