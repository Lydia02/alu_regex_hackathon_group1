// Assuming weirdlyFormattedDates.json contains an array of date strings
fetch('data/weirdlyFormattedDates.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(datesData => {
    console.log("Valid Weirdly Formatted Dates:");
    // Regex pattern for matching weirdly formatted dates
    const datePattern = /\b\d{2}-[A-Za-z]{3}-\d{4}\b/g;

    // Initialize an array to collect matches
    const dateMatches = [];

    datesData.forEach(date => {
      const match = date.match(datePattern);
      if (match) {
        dateMatches.push(...match);
      }
    });

    // Log matches or indicate none were found
    if (dateMatches.length > 0) {
      console.log(dateMatches);
    } else {
      console.log('No valid dates found.');
    }
  })
  .catch(error => {
    console.error('Failed to fetch date data:', error);
  });
