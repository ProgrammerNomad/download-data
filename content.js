chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'fillCredentials') {
        const emailInput = document.querySelector('input[type="email"]');
        const passwordInput = document.querySelector('input[type="password"]');
        const loginButton = document.querySelector('button[type="submit"]'); 

        if (emailInput && passwordInput && loginButton) {
            emailInput.value = message.email;
            passwordInput.value = message.password;
            loginButton.click();
        } else {
            console.error("Login form elements not found!");
        }
    }
});
