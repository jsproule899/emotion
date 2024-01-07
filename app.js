const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser');
const { handleRefreshToken } = require('./controllers/refreshTokenController');



//cross origin resource sharing
app.use(cors());

//built-in middleware for json
app.use(express.json());

//seting view engine for ejs
app.set('view engine', 'ejs');

//mounting public folder
app.use(express.static(__dirname + '/public'))

//Http logger
app.use(morgan('tiny'));

//built-in middleware to handle urelencoded form data
app.use(express.urlencoded({ extended: true }));

//built-in middleware for cookies
app.use(cookieParser());




//routes

app.use('/login', require('./routes/loginRouter'));
app.use('/signup', require('./routes/signupRouter'));
app.use('/refresh', require('./routes/refreshRouter'))
app.use('/logout', require('./routes/logoutRouter'))

//protected routes
app.use(verifyJWT); 
// app.use(handleRefreshToken);  
app.use('/', require('./routes/rootRouter'))
app.use('/mood', require('./routes/moodRouter'));


app.get('*', (req, res) => {
    res.status(404);
    res.render('404');
})


app.listen(process.env.PORT, (err) => {
    if (err)
        return console.log(err);
    console.log(`Express Server running at http://localhost:${process.env.PORT}`);
});

