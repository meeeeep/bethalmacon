// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const favicon = require('serve-favicon');
const logger = require('morgan');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const mongoose = require('mongoose');


// Get our API routes
const api = require('./server/route/api');

const app = express();

// Connect to database
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
}
else {
  mongoose.connect('mongodb://localhost/bethalMacon2');
}
mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
  }
);
mongoose.connection.once('open', function() {
  console.log("Mongoose has connected to MongoDB!");
});

// Parsers for POST data
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(flash());


// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Routes
app.use('/api', api);

// Catch all other routes and return the index file
// app.get('*', (req, res) => {
//   res.sendFile(path.join( dirname, 'dist/index.html'));
// })
app.use('/static', express.static(path.join(__dirname, 'public')))

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

console.log('Running in %s mode', app.get('env'));


module.exports = app;
