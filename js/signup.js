//Sign Up 
const signupForm = document.getElementById('signupForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const termsCheckbox = document.getElementById('terms');
const googleBtn = document.querySelector('.google-btn');
const loginLink = document.querySelector('.login-link a');

function validateUsername(username) {
    return username.length >= 3 && username.length <= 20;
}

function validateEmail(email) {
    return email.includes('@') && 
           email.includes('.') && 
           email.indexOf('@') > 0 && 
           email.indexOf('@') < email.lastIndexOf('.') &&
           email.lastIndexOf('.') < email.length - 1;
}

function validatePassword(password) {
    return password.length >= 8;
}

function showError(input, message) {
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
   
    input.classList.add('error');

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    input.parentNode.appendChild(errorDiv);
}

function clearError(input) {
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    input.classList.remove('error');
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-notification';
    successDiv.textContent = message;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.classList.add('slide-out');
        setTimeout(() => {
            if (document.body.contains(successDiv)) {
                document.body.removeChild(successDiv);
            }
        }, 300);
    }, 3000);
}

usernameInput.addEventListener('input', function() {
    if (this.value && !validateUsername(this.value)) {
        showError(this, 'Username must be 3-20 characters long');
    } else {
        clearError(this);
    }
});

emailInput.addEventListener('input', function() {
    if (this.value && !validateEmail(this.value)) {
        showError(this, 'Please enter a valid email address');
    } else {
        clearError(this);
    }
});

passwordInput.addEventListener('input', function() {
    if (this.value && !validatePassword(this.value)) {
        showError(this, 'Password must be at least 8 characters');
    } else {
        clearError(this);
    }
});

signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const termsAccepted = termsCheckbox.checked;

    clearError(usernameInput);
    clearError(emailInput);
    clearError(passwordInput);
    
    let isValid = true;
    
    if (!username) {
        showError(usernameInput, 'Username is required');
        isValid = false;
    } else if (!validateUsername(username)) {
        showError(usernameInput, 'Username must be 3-20 characters long');
        isValid = false;
    }
    
    if (!email) {
        showError(emailInput, 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
 
    if (!password) {
        showError(passwordInput, 'Password is required');
        isValid = false;
    } else if (!validatePassword(password)) {
        showError(passwordInput, 'Password must be at least 8 characters');
        isValid = false;
    }
    
    if (!termsAccepted) {
        showError(termsCheckbox.parentNode, 'You must agree to Terms & Conditions');
        isValid = false;
    }
    
    if (isValid) {
        const signupBtn = document.querySelector('.signup-btn');
        const originalText = signupBtn.textContent;
        
        signupBtn.textContent = 'Creating Account...';
        signupBtn.disabled = true;
        signupBtn.classList.add('loading');
        
        setTimeout(() => {
            showSuccess('Account created successfully! Welcome to BeeYond.');

            signupForm.reset();

            signupBtn.textContent = originalText;
            signupBtn.disabled = false;
            signupBtn.classList.remove('loading');
            
            setTimeout(() => {
                window.location.href = '../html/login.html';
            }, 1000);
        }, 2500);
    }
});

googleBtn.addEventListener('click', function() {
    const originalHTML = this.innerHTML;
    
    this.innerHTML = '<span class="spinner"></span>Connecting to Google...';
    this.disabled = true;
    this.classList.add('loading');
    
    setTimeout(() => {
        showSuccess('Google signup would be implemented here');
        
        this.innerHTML = originalHTML;
        this.disabled = false;
        this.classList.remove('loading');
    }, 1500);

    setTimeout(()=>{
        window.location.href = 'login.html';
    },2000)
});

loginLink.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Redirect to login page');
    window.location.href = '../html/login.html';
});

document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    const buttons = document.querySelectorAll('button');

    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });

    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            if (!this.disabled) {
                this.classList.add('pressed');
            }
        });
        
        button.addEventListener('mouseup', function() {
            this.classList.remove('pressed');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('pressed');
        });
    });
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const focusedElement = document.activeElement;
        if (focusedElement === usernameInput) {
            emailInput.focus();
        } else if (focusedElement === emailInput) {
            passwordInput.focus();
        } else if (focusedElement === passwordInput) {
            signupForm.dispatchEvent(new Event('submit'));
        }
    }
});

let usernameCheckTimeout;
usernameInput.addEventListener('input', function() {
    const username = this.value.trim();
    
    if (username.length >= 3) {
        clearTimeout(usernameCheckTimeout);
        usernameCheckTimeout = setTimeout(() => {
            if (username.toLowerCase() === 'admin' || username.toLowerCase() === 'test') {
                showError(this, 'Username is already taken');
            }
        }, 500);
    }
});
