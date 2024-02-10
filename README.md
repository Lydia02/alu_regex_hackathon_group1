# alu_regex_hackathon_group1
Alu Task
// Dynamic script loading with error handling and security considerations
function displayChoice() {
    const choice = document.getElementById('pattern_choice').value;
    const scriptFileName =  choice + '.js';

    // Ensure the scriptFileName matches an expected pattern to mitigate security risks
    if (!/^[a-zA-Z0-9]+\.js$/.test(scriptFileName)) {
        console.error('Invalid script name:', scriptFileName);
        return; // Prevent loading if the name is not valid
    }

    // Attempt to remove existing script if any
    const existingScript = document.querySelector('body script.dynamic-script');
    if (existingScript) {
        existingScript.remove();
    }

    // Create a new script element and add a class for identification
    const script = document.createElement('script');
    script.src = scriptFileName;
    script.className = 'dynamic-script'; // Class name for identification
    script.onerror = function() {
        console.error('Failed to load script:', scriptFileName);
        // Handle the error (e.g., display a message to the user)
    };
    document.body.appendChild(script);
}

// Functions for form input validation and checking data against regex patterns
function validateInput() {
    const userInput = document.getElementById('user_input').value;
    const choice = document.getElementById('pattern_choice').value;
    const outputElement = document.getElementById('output');

    // Define regex patterns for different choices
    const patterns = {
        movieTitles: /(.+?)\s\((\d{4})\)/,
        ipAddress: /\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g,
        hexColorCodes: /#[0-9A-Fa-f]{6}\b/g,
        isbnNumbers: /ISBN \d{3}-\d{1}-\d{3}-\d{5}-\d{1}/g,
        weirdlyFormattedDates: /\b\d{2}-[A-Za-z]{3}-\d{4}\b/g,
        jokes: /Why did the .+ \? Because .+/g,
        songLyrics: /\[Verse \d+\] .+/g,
        tvEpisodeTitles: /.+ S\d{2}E\d{2}: .+/g,
        twitterUsernames: /@\w+/g,
        // Add additional patterns as needed
    };

    // Match the user input against the selected pattern
    const pattern = patterns[choice];
    if (!pattern) {
        outputElement.innerText = 'No pattern selected or pattern not defined.';
        return;
    }

    const match = userInput.match(pattern);
    outputElement.innerText = match ? 'Match found: ' + match[0] : 'No match found.';
}
function checkFromList() {
    const choice = document.getElementById('pattern_choice').value;
    const listOutputElement = document.getElementById('list_output');

    // Example data - replace this with actual API call if needed
    const dataList = [
        'Inception (2010)',
        '@user1',
        'ISBN 978-3-16-148410-0',
        'Why did the chicken cross the road? Because it wanted to get to the other side.',
        'Random Movie Title (2021)'
        // Add more sample data as needed
    ];

    // Define regex patterns for different choices
    const patterns = {
        movieTitles: /(.+?)\s\((\d{4})\)/,
        twitterUsernames: /@\w+/,
        isbnNumbers: /ISBN \d{3}-\d{1}-\d{3}-\d{5}-\d{1}/,
        jokes: /Why did the .+ \? Because .+/,
        // Add additional patterns as needed
    };

    const pattern = patterns[choice];
    if (!pattern) {
        listOutputElement.innerText = 'No pattern selected or pattern not defined.';
        return;
    }

    // Filter the dataList for items that match the selected pattern
    const matches = dataList.filter(item => item.match(pattern));
    if (matches.length > 0) {
        // Display matches
        listOutputElement.innerHTML = '<ul>' + matches.map(item => `<li>${item}</li>`).join('') + '</ul>';
    } else {
        listOutputElement.innerText = 'No matches found.';
    }
}
