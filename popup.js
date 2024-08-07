document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');

    startButton.addEventListener('click', () => {
        chrome.runtime.sendMessage({action: 'start'});
    });

    stopButton.addEventListener('click', () => {
        chrome.runtime.sendMessage({action: 'stop'});
    });
});
