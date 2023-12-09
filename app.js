const express = require('express');
const morgan = require('morgan');

const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();


const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('req-flash');


//connect db
const dbService = require('./dbservice');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/scripts'))
app.use(express.static(__dirname + '/styles'));
app.use(express.static(__dirname + '/img'))
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_TOKEN_SECRET }));
app.use(flash());


//routes
app.use('/', require('./routes/rootRouter'));
app.use('/', require('./routes/loginRouter'));
app.use('/', require('./routes/signupRouter'));


app.get('*', (req, res) => {
    res.status(404);
    res.render('404');
})


app.listen(process.env.PORT, (err) => {
    if (err)
        return console.log(err);
    console.log(`Express Server running at http://localhost:${process.env.PORT}`);
});

