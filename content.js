chrome.storage.local.get(['adultKeywords'], (result) => {
    const adultKeywords = result.adultKeywords || ["adult", "nsfw", "explicit", "porn", "sex"]; // Fallback keywords
  
    const socialMediaSites = ["facebook.com", "twitter.com", "instagram.com", "youtube.com", "x.com", "xnxx.com", "xhamster.com", "xvideos.com"]; // List of social media domains
  
    let hasTriggered = false;
  
    function isSocialMediaSite(url) {
      return socialMediaSites.some(site => url.includes(site));
    }
  
    function checkContent() {
      if (hasTriggered) return;
  
      const bodyText = document.body.innerText.toLowerCase();
      if (adultKeywords.some(keyword => bodyText.includes(keyword))) {
        hasTriggered = true;
        chrome.runtime.sendMessage({ action: "showAlternativeContent" });
      }
    }
  
    if (isSocialMediaSite(window.location.hostname)) {
      const observer = new MutationObserver(checkContent);
      observer.observe(document.body, { childList: true, subtree: true });
  
      window.onload = checkContent;
      window.onchange = checkContent;
    }
  });
  