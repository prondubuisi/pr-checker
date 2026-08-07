'use strict';

const { Octokit } = require('@octokit/rest');

const setupGithubApi = () => {
  const options = {
    userAgent: 'Open Source Immersion Checker',
    request: {
      timeout: 5000
    }
  };

  if (process.env.GITHUB_TOKEN) {
    options.auth = process.env.GITHUB_TOKEN;
  } else {
    console.log('No GITHUB_TOKEN specified, do so to increase rate limit');
  }

  return new Octokit(options);
};

module.exports = setupGithubApi;
