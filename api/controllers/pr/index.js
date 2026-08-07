'use strict';

const logCallsRemaining = require('./logCallsRemaining');
const findPrs = require('./findPrs');
const { getStatusCode, getErrorDescription } = require('./errors');

/**
 * GET /prs
 */
exports.index = async (req, res) => {
  const github = req.app.get('github');
  const username = req.query.username;

  if (!username) {
    return res.status(400).json({
      error_description: 'No username provided!'
    });
  }

  try {
    const [prs, user] = await Promise.all([
      findPrs(github, username),
      github.rest.users.getByUsername({ username }).then(logCallsRemaining)
    ]);

    if (user.data.type !== 'User') {
      return res.status(400).json({
        error_description: getErrorDescription('notUser')
      });
    }

    res.json({
      prs,
      username,
      userImage: user.data.avatar_url
    });
  } catch (err) {
    console.log('Error: ' + err);

    const statusCode = getStatusCode(err);
    const errorDescription = getErrorDescription(err);

    res.status(statusCode).json({
      error_description: errorDescription
    });
  }
};
