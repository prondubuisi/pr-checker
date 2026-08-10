'use strict';

const logger = require('morgan');

const setupRequestLogging = app => {
  if (process.env.NODE_ENV !== 'production') {
    app.use(logger('dev'));
  }

  return app;
};

const setupErrorHandler = app => {
  if (process.env.NODE_ENV === 'production') {
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.sendStatus(err.status || 500);
    });
  }

  return app;
};

module.exports = {
  setupRequestLogging,
  setupErrorHandler
};
