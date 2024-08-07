let isRunning = false;
let checkLoggedInInterval;

// Function to construct URLs based on the domain
function getURL(path, domain) {
  return `https://www.${domain}/${path}`;
}

// Function to handle messages from popup.js and content.js
function handleMessages(message, sender, sendResponse) {
  switch (message.action) {
    case "start":
      isRunning = true;
      const loginUrl = getURL('login', message.domain); 
      chrome.tabs.create({ url: loginUrl }); 
      break;
    case "stop":
      isRunning = false;
      break;
    case "checkStatus":
      break; // No action needed, just send the status
  }
  sendResponse({ isRunning: isRunning }); 
}

// Function to check if a URL should be redirected
function shouldRedirect(url, domain) {
    const loginUrl = getURL('login', domain);
    const datalistUrl = getURL('dashboard/datalist', domain);
    return (
        url.startsWith(`https://www.${domain}`) &&
        url !== datalistUrl &&
        url !== loginUrl
    );
}

// Event listener for messages
chrome.runtime.onMessage.addListener(handleMessages);

// Event listener for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (isRunning) {
        chrome.storage.local.get(['domain', 'email', 'password'], function(result) { 
            const domain = result.domain;
            const loginUrl = getURL('login', domain);
            const datalistUrl = getURL('dashboard/datalist', domain);

            if (tab.url === loginUrl && changeInfo.status === 'complete') {
                // Only inject content.js if the login page is loaded and the process is running
                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ['content.js']
                }, () => {
                    // After content.js is injected, send email & password
                    chrome.tabs.sendMessage(tabId, { 
                        action: 'fillCredentials', 
                        email: result.email, 
                        password: result.password 
                    });
                });
            } else if (shouldRedirect(tab.url, domain)) {
                chrome.tabs.update(tabId, { url: datalistUrl });
            } else if (tab.url === datalistUrl && changeInfo.status === 'complete') {
                // Start checking if logged in (if not already running)
                if (!checkLoggedInInterval) {
                    checkLoggedInInterval = setInterval(() => {
                        checkLoggedInStatus(tabId, domain);
                    }, 5000);
                }

                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ['table.js']
                });
            }
        });
    }
});

function checkLoggedInStatus(tabId, domain) {
    const loggedOutUrlPattern = `https://www.${domain}/login`; // Adjust as needed
    chrome.tabs.get(tabId, (tab) => {
        if (tab.url.startsWith(loggedOutUrlPattern)) {
            clearInterval(checkLoggedInInterval); // Stop the interval check
            checkLoggedInInterval = null; // Reset the interval ID
            chrome.tabs.update(tabId, { url: loggedOutUrlPattern }); 
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ['content.js']
            });
        }
    });
}
