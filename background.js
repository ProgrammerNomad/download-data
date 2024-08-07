let isRunning = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'start') {
        isRunning = true;
        chrome.tabs.create({ url: 'https://www.getwhoisdb.com/login' });
        sendResponse({isRunning: isRunning});
    } else if (message.action === 'stop') {
        isRunning = false;
        sendResponse({isRunning: isRunning});
    } else if (message.action === 'checkStatus') {
        sendResponse({isRunning: isRunning});
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (isRunning) {
        if (tab.url === 'https://www.getwhoisdb.com/login') {
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ['content.js']
            });
        } else if (
            tab.url === 'https://www.getwhoisdb.com/dashboard/datalist' &&
            changeInfo.status === 'complete'
        ) {
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ['table.js']
            });
        }
    }
});
