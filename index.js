const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
var session = require('express-session');
var bodyParser = require('body-parser');
// var database = require('../dbConfig');

// Middlewares
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars')
app.use(express.urlencoded({extended: true}))

// database.query("SELECT * FROM PUPILS")

// Expose /public folder for use in views
app.use(express.static(path.join(__dirname, '/public')));



// Client routes
app.get('/', (req, res) => {
    if(session.AccessRole=='Admin'){
        res.redirect('/admin')
    }
    else if(session.AccessRole=='Student'){
        res.redirect('/Modules')
    }
    else if (session.AccessRole=='Staff'){
        res.redirect('/staff')
	} else {
		res.render('index')
	}
})

app.use('/admin', require('./routes/Admin'));
app.use('/login', require('./routes/Login'));
app.use('/modules', require('./routes/Modules'));
app.use('/staff', require('./routes/staff'));
app.use('/assessments', require('./routes/Assessments'));
app.use('/reports', require('./routes/reports'))


 
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());




const PORT= process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT} `)); 