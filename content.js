chrome.runtime.sendMessage({action: 'checkStatus'}, (response) => {
    if (response.isRunning) {
        setTimeout(() => {
            const emailInput = document.querySelector('input[type="email"]');
            const passwordInput = document.querySelector('input[type="password"]');
            const loginButton = document.querySelector('button[type="submit"]'); 

            if (emailInput && passwordInput && loginButton) {
                emailInput.value = 'srapsware@gmail.com';
                passwordInput.value = 'DB66877';
                loginButton.click();
        
                setTimeout(() => {
                    window.location.href = 'https://www.getwhoisdb.com/dashboard/datalist';
                }, 1500); 
            } else {
                console.error("Login form elements not found!");
            }
        }, 2000); 
    }
});
