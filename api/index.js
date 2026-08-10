'use strict';

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const setupGithubApi = require('./setupHelpers/setupGithubApi');
const {
  setupRequestLogging,
  setupErrorHandler
} = require('./setupHelpers/setupErrorHandling');
const PrController = require('./controllers/pr');

const start = () => {
  dotenv.config();

  const app = express();
  const githubApi = setupGithubApi();
  const port = process.env.PORT || 5000;

  app.set('port', port);
  app.set('github', githubApi);

  setupRequestLogging(app);

  app.use(express.static(path.join(__dirname, '../build')));
  app.use(express.json());

  const corsOptions = {
    origin: process.env.REACT_APP_HOSTNAME
  };

  app.use(cors(corsOptions));

  app.get('/prs', PrController.index);

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });

  setupErrorHandler(app);

  app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
  });
};

module.exports = start;
