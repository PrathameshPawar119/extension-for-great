document.addEventListener('DOMContentLoaded', () => {

    // donno why, but this is required to get path from runtime
    const images = [
        chrome.runtime.getURL("images/jayhanuman.jpg"),
        chrome.runtime.getURL("images/hanumanji.jpg"),
        chrome.runtime.getURL("images/krishna.jpg")
    ];
    const songs = [
        chrome.runtime.getURL("songs/song.mp3"),
        chrome.runtime.getURL("songs/pavsat.mp3"),
        chrome.runtime.getURL("songs/raghuvandana.mp3")
    ];

    // Function to get a random item from an array
    function getRandomItem(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }

    // Set random image and song
    document.getElementById('imageDisplay').src = getRandomItem(images);
    document.getElementById('audioSource').src = getRandomItem(songs);

    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.volume = 0.5;  
    audioPlayer.load();

});


window.addEventListener('beforeunload', (event) => {
    const prompt = window.prompt("Bhai sab normal he na, else refresh kar ye page ekbar.");
    if (prompt) {
        // This line won't close the window due to browser security restrictions
        // window.close(); 
    } else {
        window.location.reload();
    }
    // Some browsers require this line to show the default confirmation dialog
    event.preventDefault();
    event.returnValue = '';
});
