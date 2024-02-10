// Fetch hex color codes from a JSON file
fetch('data/hexColorCodes.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Assumes the JSON file contains an array of strings
  })
  .then(colorCodes => {
    // Regex pattern for matching hex color codes
    const colorPattern = /#[0-9A-Fa-f]{6}\b/g;
    let colorMatches = [];

    // Iterate over each color code and test it against the pattern
    colorCodes.forEach(colorCode => {
      const match = colorCode.match(colorPattern);
      if (match) {
        colorMatches = colorMatches.concat(match);
      }
    });

    if (colorMatches.length > 0) {
      console.log("Hex Color Codes:", colorMatches);
    } else {
      console.log("No valid hex color codes found.");
    }
  })
  .catch(error => {
    console.error('Failed to fetch hex color codes:', error);
  });
