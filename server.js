//requirements
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

//instances
const app = express();

//connect dbs

const { url } = require('./config/database.js');
mongoose.connect(url, {
    useNewUrlParser: true
}).then(db => console.log('system connect to db'));

require('./config/passport')(passport);


//setting
app.set('port', process.env.PORT || 2000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded());
app.use(session({
    secret: 'loginweb2018',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//routes---------------------------------
require('./routes/loginRouter')(app, passport);

//static files
app.use(express.static(path.join(__dirname,'public')));

//server run 
app.listen(app.get('port'), function(){
    console.log('server run in port '+ app.get('port'));
});

//packages