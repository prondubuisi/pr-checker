'use strict';

const { getStatusCode, getErrorDescription } = require('./errors');

describe('pr error helpers', () => {
  const genericFallback =
    "Couldn't find any data or we hit an error, err try again later?";

  test('maps the notUser code to a 400 and account-type message', () => {
    expect(getStatusCode('notUser')).toBe(400);
    expect(getErrorDescription('notUser')).toBe(
      'Username must belong to a user account.'
    );
  });

  test('maps a 404 GitHub error to User not found', () => {
    const error = { status: 404 };

    expect(getStatusCode(error)).toBe(404);
    expect(getErrorDescription(error)).toBe('User not found.');
  });

  test('maps a 403 GitHub error to the rate limit message', () => {
    const error = { status: 403 };

    expect(getStatusCode(error)).toBe(403);
    expect(getErrorDescription(error)).toBe(
      'GitHub rate limit exceeded. Please try again later.'
    );
  });

  test('maps a 401 GitHub error to the token message', () => {
    const error = { status: 401 };

    expect(getStatusCode(error)).toBe(401);
    expect(getErrorDescription(error)).toBe(
      'Invalid or missing GitHub token.'
    );
  });

  test.each([[{}], [{ status: 'nope' }]])(
    'falls back for unrecognized errors: %j',
    error => {
      expect(getStatusCode(error)).toBe(400);
      expect(getErrorDescription(error)).toBe(genericFallback);
    }
  );
});
