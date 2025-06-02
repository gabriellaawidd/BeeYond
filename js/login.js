//Login Page
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rememberCheckbox = document.getElementById('remember');
const googleBtn = document.querySelector('.google-btn');
const forgotPasswordLink = document.querySelector('.forgot-password');
const signupLink = document.querySelector('.signup-link a');

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

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const remember = rememberCheckbox.checked;
    
    clearError(emailInput);
    clearError(passwordInput);
    
    let isValid = true;
    
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
    
    if (isValid) {
        // Simulate login process
        const loginBtn = document.querySelector('.login-btn');
        const originalText = loginBtn.textContent;
        
        loginBtn.textContent = 'Logging in...';
        loginBtn.disabled = true;
        loginBtn.classList.add('loading');
        
        setTimeout(() => {
            showSuccess('Login successful! Welcome to BeeYond.');
            
            if (remember) {
                localStorage.setItem('rememberMe', 'true');
                localStorage.setItem('userEmail', email);
            } else {
                localStorage.removeItem('rememberMe');
                localStorage.removeItem('userEmail');
            }
            
            loginBtn.textContent = originalText;
            loginBtn.disabled = false;
            loginBtn.classList.remove('loading');
            
            setTimeout(() => {
                console.log('Redirecting to dashboard...');
                window.location.href = '../html/home.html';
            }, 1000);
        }, 2000);
    }
});

// Google login
googleBtn.addEventListener('click', function() {
    const originalHTML = this.innerHTML;
    
    this.innerHTML = '<span class="spinner"></span>Connecting to Google...';
    this.disabled = true;
    this.classList.add('loading');
    
    // Simulate Google OAuth
    setTimeout(() => {
        showSuccess('Google authentication would be implemented here');
        
        // Reset button
        this.innerHTML = originalHTML;
        this.disabled = false;
        this.classList.remove('loading');
    }, 1500);
});

forgotPasswordLink.addEventListener('click', function(e) {
    e.preventDefault();
    const email = emailInput.value.trim();
    
    if (email && validateEmail(email)) {
        showSuccess('Password reset link sent to: ' + email);
    } else {
        alert('Please enter a valid email address first');
        emailInput.focus();
    }
});

signupLink.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Redirect to sign up page');
    window.location.href = '/signup';
});

rememberCheckbox.addEventListener('change', function() {
    if (this.checked) {
        localStorage.setItem('rememberMe', 'true');
    } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('userEmail');
    }
});

window.addEventListener('load', function() {
    if (localStorage.getItem('rememberMe') === 'true') {
        rememberCheckbox.checked = true;
        const savedEmail = localStorage.getItem('userEmail');
        if (savedEmail) {
            emailInput.value = savedEmail;
        }
    }
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
        if (focusedElement === emailInput) {
            passwordInput.focus();
        } else if (focusedElement === passwordInput) {
            loginForm.dispatchEvent(new Event('submit'));
        }
    }
});