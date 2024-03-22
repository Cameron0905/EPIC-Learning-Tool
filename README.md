


## For Marking Purposes
1. Make sure you have Node.js Installed before running project (https://nodejs.org/en/download/)
2. To start the server `npm start` command (uses index.js file, which is our 'main entry point' for NodeJS)
3. This was start the server on your 5000 port to access it you must go to your browser of choice and type in localhost:5000
4. You Should then have the project up

* We have supplied Log in details for each role of the project, these can be found in a footer on the log in page
* However we only have a limited amount of Test data to use, so for the student account please only use the lesson data from Software Engineering Team Project.




## Resources
* Project structure: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
* Templating engine: https://handlebarsjs.com/guide
* Express: https://expressjs.com/en/guide/routing.html
* CRUD with mysql2: https://www.sitepoint.com/using-node-mysql-javascript-client/



## Directory structure and URL routes

![Project structure](https://media.prod.mdn.mozit.cloud/attachments/2016/12/06/14456/6a97461a03a5329243b994347c47f12b/MVC%20Express.png)

### Routes
e.g.
* Login page: <localhost:5000/login> 
* Login API: <localhost:5000/login/createAccount>

### Models directory
For logic relating to connecting to DB and querying it, e.g. `FindUserbyID`. 

Uses dbConfig for querying the database.

#### How to query the database for results

```
exports.createPupil = (FirstName, LastName, Email, CourseCode, Pswd) => {
    const pupil = { FirstName: FirstName, LastName: LastName, Email: Email, CourseCode, CourseCode, Pswd: Pswd }
    var database = require('../dbConfig');
    database.then((con) => {
        con.query('INSERT INTO Pupils SET ?', pupil)
        .then((res) => console.log(res));
    }).catch(console.error())
}
```

### Controller directory
Higher level abstraction for models. Implement here methods such as `CreateAccount`. 

All the redirects must occur within the controllers.

### Views directory (Front end people)
/views/layouts/main.handlebars (parent template for all other templates such as `login.handlebars`, see docs for more detail)


## Session attributes
Used to store information on user sesions. Session attributes are assigned during login depending on user role.

Session initialization for pupil:

```
session.LoggedIn=true;
session.pupilID=rows[0].staffID
session.FirstName=rows[0].FirstName
session.LastName=rows[0].LastName
session.Email=rows[0].Email
session.Role=rows[0].Role
session.Pswd=rows[0].Pswd
```

Session initialization for staff:

```
session.LoggedIn=true;
session.staffID=rows[0].staffID
session.FirstName=rows[0].FirstName
session.LastName=rows[0].LastName
session.Email=rows[0].Email
session.Role=rows[0].Role
session.Pswd=rows[0].Pswd
```