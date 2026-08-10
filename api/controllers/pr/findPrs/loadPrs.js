'use strict';

// Original Facebook Developer Circles Open Source Immersion window (2020).
// https://developers.facebook.com/developercircles/open-source-immersion/
const ORIGINAL_IMMERSION_YEAR = 2020;

const buildQuery = (username, searchYear) =>
  `-label:invalid+created:${searchYear}-07-15T00:00:00-12:00..${searchYear}-08-15T23:59:59-12:00+type:pr+is:public+author:${username}`;

const fetchPrsForYear = async (github, username, searchYear) => {
  return github.paginate(github.rest.search.issuesAndPullRequests, {
    q: buildQuery(username, searchYear),
    per_page: 100
  });
};

const loadPrs = async (github, username) => {
  const currentYear = new Date().getFullYear();

  // Search every Jul 15–Aug 15 window from the original immersion year
  // through the current year (inclusive). One query per year keeps each
  // GitHub search string under query-length limits.
  const years = [];
  for (let year = ORIGINAL_IMMERSION_YEAR; year <= currentYear; year++) {
    years.push(year);
  }

  const resultsByYear = await Promise.all(
    years.map(year => fetchPrsForYear(github, username, year))
  );

  // Dedupe by PR id in case a year is listed twice
  const seen = new Set();
  const pullRequestData = [];

  for (const items of resultsByYear) {
    for (const item of items) {
      if (!seen.has(item.id)) {
        seen.add(item.id);
        pullRequestData.push(item);
      }
    }
  }

  // Newest first
  pullRequestData.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  if (process.env.NODE_ENV !== 'production') {
    console.log(
      `Found ${pullRequestData.length} pull requests (years: ${[...years].join(
        ', '
      )}).`
    );
  }

  return pullRequestData;
};

module.exports = loadPrs;
