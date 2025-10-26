console.log("ConsentChain content script (v2) loaded.");

// List of keywords to look for in consent buttons.
// We use lowercase to make the check case-insensitive.
const consentKeywords = [
  'accept all',
  'agree',
  'allow all',
  'i agree',
  'i consent',
  'got it',
  'okay',
  'ok'
];

document.body.addEventListener('click', (event) => {
  let targetElement = event.target;

  // Check if the clicked element or its parent (up to 3 levels) is a button or link
  // and contains one of our keywords. This helps catch clicks on icons inside buttons.
  for (let i = 0; i < 3 && targetElement; i++) {
    const isClickable = targetElement.tagName === 'BUTTON' || targetElement.tagName === 'A';
    const elementText = targetElement.innerText?.toLowerCase().trim();

    if (isClickable && elementText) {
      // Check if any keyword is present in the button's text
      const foundKeyword = consentKeywords.find(keyword => elementText.includes(keyword));

      if (foundKeyword) {
        console.log(`Consent-like click detected! Text: "${targetElement.innerText}"`);

        // Send a message to the background script
        chrome.runtime.sendMessage({
          action: "consentGranted",
          website: window.location.hostname,
          buttonText: targetElement.innerText,
          timestamp: new Date().toISOString()
        });

        // We found what we're looking for, so we can stop checking parents.
        return;
      }
    }
    targetElement = targetElement.parentElement;
  }
}, true);