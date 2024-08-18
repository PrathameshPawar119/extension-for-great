document.getElementById('saveSettings').addEventListener('click', () => {
    const imageUpload = document.getElementById('imageUpload').files[0];
    const songUpload = document.getElementById('songUpload').files[0];
    const redirectUrl = document.getElementById('redirectUrl').value;

    const userImages = [];
    const userSongs = [];

    if (imageUpload) {
        const reader = new FileReader();
        reader.onload = () => {
            userImages.push(reader.result);
            chrome.storage.local.set({ userImages });
        };
        reader.readAsDataURL(imageUpload);
    }

    if (songUpload) {
        const reader = new FileReader();
        reader.onload = () => {
            userSongs.push(reader.result);
            chrome.storage.local.set({ userSongs });
        };
        reader.readAsDataURL(songUpload);
    }

    if (redirectUrl) {
        chrome.storage.local.set({ redirectUrl });
    }
});

document.getElementById('resetSettings').addEventListener('click', () => {
    chrome.storage.local.remove(['userImages', 'userSongs', 'redirectUrl']);
});
