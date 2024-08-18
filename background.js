fetch(chrome.runtime.getURL('keywords.json'))
  .then(response => response.json())
  .then(data => {
    chrome.storage.local.set({ adultKeywords: data.adultKeywords });
  })
  .catch(console.error('Error loading keywords:'));

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "showAlternativeContent") {
    const blockUrl = chrome.runtime.getURL("block.html");

    // Check if block.html is already open in any tab
    chrome.tabs.query({}, function(tabs) {
      const blockTab = tabs.find(tab => tab.url === blockUrl);

      if (blockTab) {
        // If block.html is open, focus on the tab
        chrome.tabs.update(blockTab.id, { active: true });
      } else {
        // If block.html is not open, update the current tab to block.html
        chrome.tabs.update(sender.tab.id, { url: blockUrl });
      }
    });
  }
});
