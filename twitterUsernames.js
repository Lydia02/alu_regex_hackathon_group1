// Assuming twitterUsername.json contains an array of strings with Twitter usernames
fetch('data/twitterUsername.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(usernamesData => {
    console.log("Valid Twitter Usernames:");
    // Regex pattern for matching Twitter usernames
    const usernamePattern = /@\w+/g;

    // Initialize an array to collect matches
    const usernameMatches = [];

    usernamesData.forEach(username => {
      // Assuming each username in the array is a string like "@user1"
      const match = username.match(usernamePattern);
      if (match) {
        usernameMatches.push(...match);
      }
    });

    // Log matches or indicate none were found
    if (usernameMatches.length > 0) {
      console.log(usernameMatches);
    } else {
      console.log('No valid Twitter usernames found.');
    }
  })
  .catch(error => {
    console.error('Failed to fetch Twitter usernames data:', error);
  });
