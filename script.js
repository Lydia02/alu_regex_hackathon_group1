// Dynamic script loading with error handling and security considerations
function displayChoice() {
    const choice = document.getElementById('pattern_choice').value;
    const scriptFileName = choice + '.js';

    if (!/^[a-zA-Z0-9]+\.js$/.test(scriptFileName)) {
        console.error('Invalid script name:', scriptFileName);
        return;
    }

    const existingScript = document.querySelector('body script.dynamic-script');
    if (existingScript) {
        existingScript.remove();
    }

    const script = document.createElement('script');
    script.src = scriptFileName;
    script.className = 'dynamic-script';
    script.onerror = () => console.error('Failed to load script:', scriptFileName);
    document.body.appendChild(script);
}

// Validates user input against selected regex pattern
function validateInput() {
    const userInput = document.getElementById('user_input').value;
    const choice = document.getElementById('pattern_choice').value;
    const outputElement = document.getElementById('output');
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
    };

    const pattern = patterns[choice];
    if (!pattern) {
        outputElement.innerText = 'No pattern selected or pattern not defined.';
        return;
    }

    const match = userInput.match(pattern);
    outputElement.innerText = match ? 'Match found: ' + match[0] : 'No match found.';
}

// Fetches and filters data based on the selected regex pattern
async function checkFromList() {
    const choice = document.getElementById('pattern_choice').value;
    const listOutputElement = document.getElementById('list_output');

    const fileMap = {
        movieTitles: 'movieTitles.json',
        twitterUsernames: 'twitterUsernames.json',
        isbnNo: 'isbnNo.json',
        jokes: 'jokes.json',
        weirdlyFormattedDates: 'weirdlyFormattedDates.json',
        tvEpisodeTitles: 'tvEpisodeTitles.json',
        songLyrics: 'songLyrics.json',
        ipAddress: 'ipAddress.json',
        hexColorCodes: 'hexColorCodes.json',

        // Map other choices to their respective JSON files
    };

    try {
        const fileName = fileMap[choice];
        if (!fileName) {
            listOutputElement.innerText = 'No pattern selected or pattern not defined.';
            return;
        }

        const response = await fetch(`data/${fileName}`);
        if (!response.ok) {
            throw new Error('Failed to load data');
        }
        const dataList = await response.json();

        const patterns = {
            movieTitles: /(.+?)\s\((\d{4})\)/,
            twitterUsernames: /@\w+/,
            isbnNo: /ISBN \d{3}-\d{1}-\d{3}-\d{5}-\d{1}/,
            jokes: /Why did the .+ \? Because .+/,
            weirdlyFormattedDates: /\b\d{2}-[A-Za-z]{3}-\d{4}\b/,
            tvEpisodeTitles: /.+ S\d{2}E\d{2}: .+/,
            songLyrics: /\[Verse \d+\] .+/g,
            ipAddress: /\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g,
            hexColorCodes: /#[0-9A-Fa-f]{6}\b/g,

        };

        const pattern = patterns[choice];
        const matches = dataList.filter(item => item.match(pattern));
        listOutputElement.innerHTML = matches.length > 0 ? '<ul>' + matches.map(item => `<li>${item}</li>`).join('') + '</ul>' : 'No matches found.';
    } catch (error) {
        console.error('Error fetching data:', error);
        listOutputElement.innerText = 'Error fetching data.';
    }
}
