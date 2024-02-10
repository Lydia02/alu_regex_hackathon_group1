// Assuming jokesData.json contains an array of joke strings
fetch('data/jokes.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(jokesData => {
    console.log("Valid Jokes:");
    // Joke regex pattern for matching the joke format
    const jokePattern = /Why did the .+ \? Because .+/g;

    // Initialize an array to collect matches
    const jokeMatches = [];

    jokesData.forEach(joke => {
      const match = joke.match(jokePattern);
      if (match) {
        jokeMatches.push(...match);
      }
    });

    // Log matches or indicate none were found
    if (jokeMatches.length > 0) {
      console.log(jokeMatches);
    } else {
      console.log('No valid jokes found.');
    }
  })
  .catch(error => {
    console.error('Failed to fetch joke data:', error);
  });
