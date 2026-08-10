import getTimeMessage from './getTimeMessage';

describe('getTimeMessage', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  const setLocalDate = (year, monthIndex, day) => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(year, monthIndex, day));
  };

  test('returns an only-N-days message on 2026-08-10', () => {
    setLocalDate(2026, 7, 10);

    expect(getTimeMessage()).toBe(
      'There are only 5 days left! You can do it!'
    );
    expect(getTimeMessage()).not.toBe(
      'Hopefully there is an open source immersion this year'
    );
  });

  test('returns a one-more-day message on 2026-08-14', () => {
    setLocalDate(2026, 7, 14);

    expect(getTimeMessage()).toBe('One more day, keep it going!');
    expect(getTimeMessage()).not.toBe(
      'Hopefully there is an open source immersion this year'
    );
  });

  test('returns a last-day message on 2026-08-15', () => {
    setLocalDate(2026, 7, 15);

    expect(getTimeMessage()).toBe(
      "It's the very last day! Get your last PRs in!"
    );
    expect(getTimeMessage()).not.toBe(
      'Hopefully there is an open source immersion this year'
    );
  });

  test('returns the just-ended message on 2026-08-16', () => {
    setLocalDate(2026, 7, 16);

    expect(getTimeMessage()).toBe(
      'Open Source immersion is over, but open source never ends'
    );
    expect(getTimeMessage()).not.toBe(
      'Hopefully there is an open source immersion this year'
    );
  });

  test('returns the over message on 2026-09-01', () => {
    setLocalDate(2026, 8, 1);

    expect(getTimeMessage()).toBe('Open Source immersion is over');
    expect(getTimeMessage()).not.toBe(
      'Hopefully there is an open source immersion this year'
    );
  });

  test('returns the remaining-days template on 2026-07-01', () => {
    setLocalDate(2026, 6, 1);

    const days = 45;
    expect(getTimeMessage()).toBe(`There are ${days} days remaining!`);
    expect(getTimeMessage()).not.toBe(
      `There are only ${days} days left! You can do it!`
    );
    expect(getTimeMessage()).not.toBe(
      'Hopefully there is an open source immersion this year'
    );
  });
});
