// Wait for login form elements to be fully loaded
setTimeout(() => {
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const loginButton = document.querySelector('button[type="submit"]'); 

    if (emailInput && passwordInput && loginButton) {
        emailInput.value = 'aws@gmail.com';
        passwordInput.value = '123ASD';
        loginButton.click();

        // Redirect to datalist
        setTimeout(() => {
            window.location.href = 'https://www.getwhoisdb.com/dashboard/datalist';
        }, 1500); 
    } else {
        console.error("Login form elements not found!");
    }
}, 2000); 