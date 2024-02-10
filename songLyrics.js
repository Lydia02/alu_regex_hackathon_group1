// Assuming songLyricsData.json contains an array of lyrics strings
fetch('data/songLyrics.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(lyricsData => {
    console.log("Song Lyrics Matches:");
    // Regex pattern for matching verses in song lyrics
    const lyricsPattern = /\[Verse \d+\] .+/g;

    // Initialize an array to collect matches
    const lyricsMatches = [];

    lyricsData.forEach(lyric => {
      // Assuming each lyric is a long string that may contain multiple verses
      const matches = lyric.match(lyricsPattern);
      if (matches) {
        lyricsMatches.push(...matches);
      }
    });

    // Log matches or indicate none were found
    if (lyricsMatches.length > 0) {
      console.log(lyricsMatches);
    } else {
      console.log('No verses found in the provided lyrics.');
    }
  })
  .catch(error => {
    console.error('Failed to fetch song lyrics data:', error);
  });
