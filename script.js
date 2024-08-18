document.addEventListener('DOMContentLoaded', () => {
    // Default images and songs
    const defaultImages = [
        chrome.runtime.getURL("images/jayhanuman.jpg"),
        chrome.runtime.getURL("images/hanumanji.jpg"),
        chrome.runtime.getURL("images/krishna.jpg")
    ];
    const defaultSongs = [
        chrome.runtime.getURL("songs/song.mp3"),
        chrome.runtime.getURL("songs/pavsat.mp3"),
        chrome.runtime.getURL("songs/raghuvandana.mp3")
    ];

    // Function to get a random item from an array
    function getRandomItem(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }

    // Fetch user settings from local storage
    chrome.storage.local.get(['userImages', 'userSongs'], (result) => {
        const userImages = result.userImages || defaultImages;
        const userSongs = result.userSongs || defaultSongs;

        // Set random image and song from user settings or defaults
        document.getElementById('imageDisplay').src = getRandomItem(userImages);
        document.getElementById('audioSource').src = getRandomItem(userSongs);

        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.volume = 0.5;  
        audioPlayer.load();
    });

    // Handle detected keyword and element display
    chrome.storage.local.get(['detectedKeyword', 'detectedElement'], (result) => {
        const detectedKeyword = result.detectedKeyword;
        const detectedElement = result.detectedElement;
        
        if (detectedKeyword && detectedElement) {
            // Add detected keyword and element to the HTML
            const keywordDisplay = document.createElement('p');
            keywordDisplay.innerHTML = `Detected Keyword: <strong>${detectedKeyword}</strong>`;
            document.body.insertBefore(keywordDisplay, document.querySelector('audio'));
            
            const elementDisplay = document.createElement('p');
            elementDisplay.innerHTML = `Content around detected keyword: <em>${detectedElement}</em>`;
            document.body.insertBefore(elementDisplay, document.querySelector('audio'));
        }
    });
});

// Removed the beforeunload handler as it isn't effective for this purpose
