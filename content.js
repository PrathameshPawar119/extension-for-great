chrome.storage.local.get(['adultKeywords'], (result) => {
    const adultKeywords = result.adultKeywords || ["adult", "nsfw", "explicit", "porn", "sex"]; // Fallback keywords
  
    let hasTriggered = false;
  
    function checkContent() {
      if (hasTriggered) return;
  
      const bodyText = document.body.innerText.toLowerCase();
      if (adultKeywords.some(keyword => bodyText.includes(keyword))) {
        hasTriggered = true;
        chrome.runtime.sendMessage({ action: "showAlternativeContent" });
      }
    }
  
    const observer = new MutationObserver(checkContent);
    observer.observe(document.body, { childList: true, subtree: true });
  
    window.onload = checkContent;
    window.onchange = checkContent;
  });
  