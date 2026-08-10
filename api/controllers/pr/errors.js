'use strict';

const statusCodes = {
  notUser: 400
};

const errorDescriptions = {
  notUser: 'Username must belong to a user account.'
};

const GENERIC_ERROR_DESCRIPTION =
  "Couldn't find any data or we hit an error, err try again later?";

const statusErrorDescriptions = {
  404: 'User not found.',
  403: 'GitHub rate limit exceeded. Please try again later.',
  401: 'Invalid or missing GitHub token.'
};

const isHttpErrorStatus = status =>
  typeof status === 'number' && status >= 400 && status <= 599;

const getStatusCode = error => {
  if (typeof error === 'string' && statusCodes[error]) {
    return statusCodes[error];
  }

  if (error && isHttpErrorStatus(error.status)) {
    return error.status;
  }

  return 400;
};

const getErrorDescription = error => {
  if (typeof error === 'string' && errorDescriptions[error]) {
    return errorDescriptions[error];
  }

  if (error && typeof error.status === 'number' && statusErrorDescriptions[error.status]) {
    return statusErrorDescriptions[error.status];
  }

  return GENERIC_ERROR_DESCRIPTION;
};

module.exports.getStatusCode = getStatusCode;
module.exports.getErrorDescription = getErrorDescription;
