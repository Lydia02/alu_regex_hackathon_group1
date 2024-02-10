// Assuming isbnData.json contains an array of ISBN strings
fetch('data/isbnNo.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(isbnData => {
    console.log("Valid ISBNs:");
    // ISBN regex pattern for matching valid ISBN numbers
    const isbnPattern = /ISBN \d{3}-\d{1}-\d{3}-\d{5}-\d{1}/g;

    // Initialize an array to collect matches
    const isbnMatches = [];

    isbnData.forEach(isbn => {
      const match = isbn.match(isbnPattern);
      if (match) {
        isbnMatches.push(...match);
      }
    });

    // Log matches or indicate none were found
    if (isbnMatches.length > 0) {
      console.log(isbnMatches);
    } else {
      console.log('No valid ISBNs found.');
    }
  })
  .catch(error => {
    console.error('Failed to fetch ISBN data:', error);
  });
