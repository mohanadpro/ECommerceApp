var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cors=require('cors');
var logger = require('morgan');
var config = require('./config');
var mongoose =require('mongoose');


const MONGODB_URL=config.MONGODB_URL;

mongoose.connect(MONGODB_URL,{useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex:true},(err)=>
{
  if(err)
  {
    console.log(err.reason);
  }
  else
  {
    console.log('connected to database has been done successfully... ')
  }
})

var productsRouter = require('./routes/products');
var usersRouter = require('./routes/users');

var app = express();

var whitelist = ['http://localhost:5000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// Then pass them to cors:
app.use(cors());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
