const express = require('express');
const app = express();
const morgan = require('morgan');
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser');

//mounting public folder
app.use(express.static('public'));

//seting view engine for ejs
app.set('view engine', 'ejs');

//built-in middleware for json
app.use(express.json());

//built-in middleware to handle urelencoded form data
app.use(express.urlencoded({ extended: true }));

//Http logger
app.use(morgan('tiny'));

//built-in middleware for cookies
app.use(cookieParser());

//routes
app.use('/auth', require('./routes/authRouter'));
app.use('/password', require('./routes/passwordRouter'))

//protected routes
app.use(verifyJWT); 
app.use('/mood', require('./routes/moodRouter'));
app.use('/', require('./routes/router'));


module.exports = app;



