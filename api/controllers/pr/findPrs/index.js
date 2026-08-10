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
      },
      merged: Boolean(event.pull_request && event.pull_request.merged_at)
    };
  });

  return prs;
};

module.exports = findPrs;
