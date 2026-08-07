'use strict';

const _ = require('lodash');
const moment = require('moment');
const loadPrs = require('./loadPrs');

const findPrs = async (github, username) => {
  const pullRequestData = await loadPrs(github, username);

  const prs = pullRequestData.map(event => {
    const repo = event.pull_request.html_url.substring(
      0,
      event.pull_request.html_url.search('/pull/')
    );

    const hacktoberFestLabels = _.some(
      event.labels,
      label => label.name.toLowerCase() === 'open-source-immersion'
    );

    const weekOld = moment().subtract(7, 'days').startOf('day');

    return {
      has_hacktoberfest_label: hacktoberFestLabels,
      number: event.number,
      open: event.state === 'open',
      repo_name: repo.replace('https://github.com/', ''),
      title: event.title,
      url: event.html_url,
      created_at: moment(event.created_at).format('MMMM Do YYYY'),
      is_pending: moment(event.created_at).isAfter(weekOld),
      user: {
        login: event.user.login,
        url: event.user.html_url
      }
    };
  });

  const mergeStatus = await Promise.all(
    prs.map(async pr => {
      const [owner, repo] = pr.repo_name.split('/');

      try {
        await github.rest.pulls.checkIfMerged({
          owner,
          repo,
          pull_number: pr.number
        });
        return true;
      } catch (err) {
        // 404 means the pull request was not merged
        if (err.status === 404) {
          return false;
        }

        throw err;
      }
    })
  );

  return _.zipWith(prs, mergeStatus, (pr, merged) => _.assign(pr, { merged }));
};

module.exports = findPrs;
