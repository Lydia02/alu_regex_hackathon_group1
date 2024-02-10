// Assuming movieTitles.json contains an array of movie title strings
fetch('data/movieTitles.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(movieTitles => {
    console.log("Movie Titles:");
    // Optimized regex pattern for matching movie titles
    const moviePattern = /(.+?)\s\((\d{4})\)/g;
    
    movieTitles.forEach(movieTitle => {
      const movieMatch = moviePattern.exec(movieTitle);
      if (movieMatch) {
        console.log(`Title: "${movieMatch[1]}", Year: ${movieMatch[2]}`);
        // Reset the lastIndex to ensure the regex works for subsequent matches
        moviePattern.lastIndex = 0;
      }
    });
  })
  .catch(error => {
    console.error('Failed to fetch movie titles:', error);
  });
