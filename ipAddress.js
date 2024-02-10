// Assuming ipAddress.json contains an array of IP address strings
fetch('data/ipAddresses.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(ipAddresses => {
    console.log("Valid IP Addresses:");
    // Refined regex pattern for matching valid IP addresses only
    const ipPattern = /\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g;
    
    ipAddresses.forEach(ipAddress => {
      const ipMatch = ipPattern.exec(ipAddress);
      if (ipMatch) {
        console.log(ipMatch[0]);
        // Reset the lastIndex for the next iteration
        ipPattern.lastIndex = 0;
      }
    });
  })
  .catch(error => {
    console.error('Failed to fetch IP addresses:', error);
  });
