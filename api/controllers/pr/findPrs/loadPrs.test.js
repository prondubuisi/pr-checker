'use strict';

const loadPrs = require('./loadPrs');
const { sanitizeUsername } = require('./loadPrs');

describe('sanitizeUsername', () => {
  test('leaves a valid username unchanged', () => {
    expect(sanitizeUsername('octocat')).toBe('octocat');
  });

  test('strips characters that are not letters, numbers, or hyphens', () => {
    expect(sanitizeUsername('foo" OR bar')).toBe('fooORbar');
  });

  test('throws a 400 error when nothing valid remains', () => {
    expect(() => sanitizeUsername('!!!')).toThrow('Invalid username.');

    try {
      sanitizeUsername('!!!');
      throw new Error('expected sanitizeUsername to throw');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Invalid username.');
      expect(error.status).toBe(400);
    }
  });
});

describe('loadPrs', () => {
  test('searches each immersion year with a sanitized author', async () => {
    const github = {
      paginate: jest.fn().mockResolvedValue([]),
      rest: { search: { issuesAndPullRequests: jest.fn() } }
    };
    const consoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

    try {
      await loadPrs(github, 'foo" OR bar');

      const currentYear = new Date().getFullYear();
      const expectedYears = [];
      for (let year = 2020; year <= currentYear; year++) {
        expectedYears.push(year);
      }

      expect(github.paginate).toHaveBeenCalledTimes(expectedYears.length);

      github.paginate.mock.calls.forEach((call, index) => {
        const year = expectedYears[index];
        const [endpoint, options] = call;

        expect(endpoint).toBe(github.rest.search.issuesAndPullRequests);
        expect(options.q).toContain('author:"fooORbar"');
        expect(options.q).not.toContain('OR bar');
        expect(options.q).toContain(`${year}-07-15`);
        expect(options.per_page).toBe(100);
      });
    } finally {
      consoleLog.mockRestore();
    }
  });
});
