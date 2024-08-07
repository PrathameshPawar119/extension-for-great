fetch(chrome.runtime.getURL('keywords.json'))
  .then(response => response.json())
  .then(data => {
    chrome.storage.local.set({ adultKeywords: data.adultKeywords });
  })
  .catch(error => console.error('Error loading keywords:', error));

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "showAlternativeContent") {
    chrome.tabs.create({ url: chrome.runtime.getURL("block.html") });
  }
});
