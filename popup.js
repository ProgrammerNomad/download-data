document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const domainInput = document.getElementById('domainInput');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');

    // Load saved data from storage (if any)
    chrome.storage.local.get(['domain', 'email', 'password'], function(result) {
        if (result.domain) {
            domainInput.value = result.domain;
        }
        if (result.email) {
            emailInput.value = result.email;
        }
        if (result.password) {
            passwordInput.value = result.password;
        }
    });

    startButton.addEventListener('click', () => {
        const domain = domainInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value; // No trim for password

        // Save all data to storage
        chrome.storage.local.set({domain: domain, email: email, password: password}); 

        chrome.runtime.sendMessage({action: 'start', domain: domain, email: email, password: password});
    });

    stopButton.addEventListener('click', () => {
        chrome.runtime.sendMessage({action: 'stop'});
    });
});
