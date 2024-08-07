let isRunning = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'start') {
        isRunning = true;
        chrome.tabs.create({ url: 'https://www.example.com/login' });
        sendResponse({isRunning: isRunning}); 
    } else if (message.action === 'stop') {
        isRunning = false;
        sendResponse({isRunning: isRunning}); 
    } else if (message.action === 'checkStatus') {
        sendResponse({isRunning: isRunning}); 
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (isRunning && tab.url === 'https://www.example.com/login') {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js']
        });
    }
});
