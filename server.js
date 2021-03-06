'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { expect } = require('chai');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');

const apiRoutes = require('./routes/api.js');
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner');

const app = express();

app.use(helmet());

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({ origin: '*' })); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function startServer() {
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => console.log('Connected to database...'))
    .catch(err =>
      console.log('There was an error connecting to database: ' + err)
    );

  app.route('/:project/').get(function(req, res) {
    res.sendFile(process.cwd() + '/views/issue.html');
  });

  //Index page (static HTML)
  app.route('/').get(function(req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

  //For FCC testing purposes
  fccTestingRoutes(app);

  //Routing for API
  apiRoutes(app);

  //404 Not Found Middleware
  app.use(function(req, res, next) {
    res
      .status(404)
      .type('text')
      .send('Not Found');
  });

  app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port ' + process.env.PORT);
    if (process.env.NODE_ENV === 'test') {
      console.log('Running Tests...');
      setTimeout(function() {
        try {
          runner.run();
        } catch (e) {
          var error = e;
          console.log('Tests are not valid:');
          console.log(error);
        }
      }, 3500);
    }
  });
}

startServer();

module.exports = app; //for testing
