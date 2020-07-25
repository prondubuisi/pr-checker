 const getTimeMessage = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const monthDiff = 7 - (currentMonth);
  const currentYear = today.getFullYear();
  let daysLeft = 45 - today.getDate();

  if(monthDiff == 0 && today.getDate() > 15 ) {
    return "Open Source immersion is over, but open source never ends";
  }
   
  if(monthDiff == 0) {
    daysLeft = 15 - today.getDate();
  }

  if(monthDiff < 0) {
    return "Open Source immersion is over";
  }

  if (currentYear > 2020) {
    return "Hopefully there is an open source immersion this year";
  }

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
