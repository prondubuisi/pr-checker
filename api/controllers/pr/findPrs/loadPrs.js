'use strict';

const getNextPage = require('./getNextPage');

const buildQuery = (username, searchYear) =>
  `-label:invalid+created:${searchYear}-07-15T00:00:00-12:00..${searchYear}-08-15T23:59:59-12:00+type:pr+is:public+author:${username}`;

const loadPrs = (github, username) =>
  new Promise((resolve, reject) => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const searchYear =  currentYear;

    github.search.issues(
      {
        q: buildQuery(username, searchYear),
        // 30 is the default but this makes it clearer/allows it to be tweaked
        per_page: 100
      },
      (err, res) => {
        if (err) {
          return reject();
        }

        const pullRequestData = res.data.items;
        if (github.hasNextPage(res)) {
          getNextPage(res, github, pullRequestData).then(pullRequestData =>
            resolve(pullRequestData)
          );
          return;
        }

        if (process.env.NODE_ENV !== 'production') {
          console.log(`Found ${pullRequestData.length} pull requests.`);
        }
        resolve(pullRequestData);
      }
    );
  });

module.exports = loadPrs;
