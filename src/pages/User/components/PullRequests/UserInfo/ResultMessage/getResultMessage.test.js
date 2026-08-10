import getResultMessage from './getResultMessage';

describe('getResultMessage', () => {
  const cases = [
    [0, "It's not too late to start!"],
    [1, 'Off to a great start, keep going!'],
    [2, "Nice! Now, don't stop!"],
    [3, 'So close!'],
    [4, 'Way to go!'],
    [5, "Now you're just showing off!"],
    [10, "Now you're just showing off!"]
  ];

  test.each(cases)(
    'returns the expected message for %s pull requests',
    (pullRequestCount, expectedMessage) => {
      expect(getResultMessage(pullRequestCount)).toBe(expectedMessage);
      expect(getResultMessage(pullRequestCount)).not.toBe(
        'Pull request results'
      );
    }
  );
});
