// Assuming tvEpisodeTitlesData.json contains an array of TV episode title strings
fetch('data/tvEpisodeTitles.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(episodeTitlesData => {
    console.log("Valid TV Episode Titles:");
    // Regex pattern for matching TV episode titles
    const episodePattern = /.+ S\d{2}E\d{2}: .+/g;

    // Initialize an array to collect matches
    const episodeMatches = [];

    episodeTitlesData.forEach(episodeTitle => {
      const match = episodeTitle.match(episodePattern);
      if (match) {
        episodeMatches.push(...match);
      }
    });

    // Log matches or indicate none were found
    if (episodeMatches.length > 0) {
      console.log(episodeMatches);
    } else {
      console.log('No valid TV episode titles found.');
    }
  })
  .catch(error => {
    console.error('Failed to fetch TV episode titles data:', error);
  });
