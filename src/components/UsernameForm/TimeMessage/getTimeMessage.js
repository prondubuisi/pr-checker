const getTimeMessage = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();

  const todayDate = new Date(year, month, date);
  const endDate = new Date(year, 7, 15);

  if (todayDate > endDate) {
    if (month === 7) {
      return 'Open Source immersion is over, but open source never ends';
    }

    return 'Open Source immersion is over';
  }

  const daysLeft = Math.round((endDate - todayDate) / (1000 * 60 * 60 * 24));

  if (daysLeft === 0) {
    return "It's the very last day! Get your last PRs in!";
  }

  if (daysLeft === 1) {
    return 'One more day, keep it going!';
  }

  if (daysLeft < 10) {
    return `There are only ${daysLeft} days left! You can do it!`;
  }

  return `There are ${daysLeft} days remaining!`;
};

export default getTimeMessage;
