var express = require('express');
var path = require('path');
const dotenv = require('dotenv');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const configDB = require('./config/db');
var bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http')

var app = express();

//Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
// mongodb instance
configDB.connectDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(bodyParser.json({
    strict: false
}));

app.use(bodyParser.urlencoded({ extended: true }));
// routes definition
// app.use('/users', usersRouter);
app.use('/', require('./routes/public'));
// app.use('/api/updateUser', require('./routes/users'))
app.use('/api/graph', require('./routes/graphs'))

// catch 404 errors and forward to error Handler
app.use(function(req, res, next) {
    console.log(' in app 404 ------------------------')
    var err = new Error('Not found');
    err.status = 404;
    next(err);
})

// error handler
app.use(function(err, req, res, next,) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV === 'development' ? err : {};
    console.log('======error in error handler when next() is called======', err)
    // render the error page
    if (err.type == 'entity.parse.failed') {
        return Promise.reject();
    }
    res.status(err.status || 500);
    // next();
    res.render('error');
});

const PORT= process.env.PORT;

const server= app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

//Handle Unhandled Promise Rejection
server.on('unhandledRejection', (err, promise) => {
    console.error(`Error on unhandledRejection: ${err.message}`.red);
    //close server and exit server
    server.close(()=> server.exit(1));
});

//Handle uncaughtException
server.on('uncaughtException', (err, promise) => {
    console.error(`Error on uncaughtException: ${err.message}`.red);
    //close server and exit server
    server.close(()=> server.exit(1));
});

server.on('clientError', (err, promise) => {
    console.errors(`Error on clientError: ${err.message}`.red);
    //close server and exit server
    server.close(()=> server.exit(1));
})


// module.exports = app;
