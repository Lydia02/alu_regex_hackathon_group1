// Define the jokePattern variable with the regex pattern
const jokePattern = /Why did the .+ \? Because .+/;

fetch('data/jokes.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(jokesData => {
    console.log("Jokes Data:", jokesData); // Debug: See the actual data format

    // Use jokePattern in the filter method to find valid jokes
    const validJokes = jokesData.filter(joke => {
      const match = joke.match(jokePattern);
      console.log("Testing Joke:", joke, "Match:", match); // Debug: Check each match
      return match;
    });

    console.log("Valid Jokes:", validJokes.length > 0 ? validJokes : 'No valid jokes found.');
  })
  .catch(error => console.error('Error:', error));
