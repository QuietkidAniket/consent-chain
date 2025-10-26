
// IMPORTANT: Replace this with your actual API Gateway Invoke URL
const API_BASE_URL = 'https://pwawlbchnb.execute-api.ap-south-1.amazonaws.com/v1';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // We only care about messages with the action "consentGranted"
  if (message.action === "consentGranted") {
    console.log("Consent message received in background:", message);
    
    // Get the auth token from storage
    chrome.storage.local.get(['authToken'], (result) => {
      const token = result.authToken;
      
      if (!token) {
        console.error("User is not logged in. Cannot save consent.");
        return; // Stop if the user isn't logged in
      }

      console.log("User is logged in. Attempting to save consent...");

      // Prepare the data to send to the backend
      const consentData = {
        website: message.website,
        permissions: ["analytics", "tracking", "functional"], // <-- UPDATED LINE
        date: message.timestamp,
      };

      // Make the API call
      fetch(`${API_BASE_URL}/consents`, {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(consentData),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Successfully saved consent to the backend:", data);
      })
      .catch(error => {
        console.error("Error sending consent data to backend:", error);
      });
    });
  }
  // This is important for async listeners
  return true;
});

console.log("Background script (v2) loaded and listening.");