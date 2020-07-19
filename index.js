var express = require('express');
var app = express();
app.listen(process.env.PORT || 1234);

//middleware
app.use(express.static('public')); //say that all file in public is static, dont compile
app.use('/public', express.static('public'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var session = require('express-session');
app.use(session({ secret: '123456' }));
app.use((req, resp, next) => {
    resp.locals.session = req.session;
    next();
});

//template engine
app.set('view engine', 'ejs');

//controller
app.use('/', require('./controllers/parent.js'));
