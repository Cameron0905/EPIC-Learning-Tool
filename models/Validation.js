const session = require('express-session');



exports.validEmail = async (Email) => {
    return new Promise((resolve, reject) => {
        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        console.log(emailRegexp.test(Email))
        if(emailRegexp.test(Email) && session.valid==1){
            resolve(session.valid=1)
        }
        else{
            resolve(session.valid=0)

        }
    })
    }

    exports.validPass = async (Pswd) => {
        return new Promise((resolve, reject) => {
            var passwRegexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
            console.log(passwRegexp.test(Pswd))
            if(passwRegexp.test(Pswd)){
                resolve(session.valid=1)
            }
            else{
                resolve(session.valid=0)

            }
        })
        }    