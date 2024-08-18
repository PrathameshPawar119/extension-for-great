chrome.storage.local.get(['adultKeywords', 'customImage', 'customSong', 'redirectUrl'], (result) => {
  const adultKeywords = result.adultKeywords || ["adult", "nsfw", "explicit", "porn", "sex"]; // Fallback keywords

  const socialMediaSites = ["facebook.com", "twitter.com", "instagram.com", "x.com", "xnxx.com", "xhamster.com", "xvideos.com"]; // List of social media domains

  let hasTriggered = false;

  // Function to check if the current website is a social media site
  function isSocialMediaSite(url) {
      return socialMediaSites.some(site => url.includes(site));
  }

  // Function to check the content for adult keywords
  function checkContent() {
      // if (hasTriggered) return;

      const bodyText = document.body.innerText.toLowerCase();
      if (adultKeywords.some(keyword => bodyText.includes(keyword))) {
          hasTriggered = true;
          handleBlocking();
      }
  }

  // Function to handle the blocking and redirection based on user preferences
  function handleBlocking() {
      // Check if the user has set a custom redirect URL
      if (result.redirectUrl) {
          window.location.href = result.redirectUrl;
      } else {
          // Otherwise, send a message to show alternative content (image and song)
          chrome.runtime.sendMessage({ action: "showAlternativeContent" });
      }
  }

  // If the current site is a social media site, observe changes in the page content
  if (isSocialMediaSite(window.location.hostname)) {
      const observer = new MutationObserver(checkContent);
      observer.observe(document.body, { childList: true, subtree: true });

      // Also check content once the page has loaded or changed
      window.onload = checkContent;
      window.onchange = checkContent;
  }
});
