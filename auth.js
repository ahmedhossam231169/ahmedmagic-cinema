// Authentication Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize authentication system
    initializeAuth();
});

function initializeAuth() {
    // Form toggle functionality
    setupFormToggle();
    
    // Form validation
    setupFormValidation();
    
    // Password visibility toggle
    setupPasswordToggle();
    
    // Password strength checker
    setupPasswordStrength();
    
    // Form submission handlers
    setupFormSubmission();
    
    // Social login handlers
    setupSocialLogin();
}

// Form Toggle Functionality
function setupFormToggle() {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const forms = document.querySelectorAll('.auth-form');
    
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetForm = btn.getAttribute('data-form');
            
            // Update active button
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show target form
            forms.forEach(form => {
                form.classList.remove('active');
                if (form.id === targetForm + 'Form') {
                    form.classList.add('active');
                }
            });
        });
    });
}

// Form Validation
function setupFormValidation() {
    const forms = document.querySelectorAll('.auth-form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error styling
    clearFieldError(field);
    
    // Required field validation
    if (!value) {
        isValid = false;
        errorMessage = `${getFieldLabel(fieldName)} is required`;
    }
    
    // Email validation
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Password validation
    if (fieldName === 'password' && value) {
        if (value.length < 8) {
            isValid = false;
            errorMessage = 'Password must be at least 8 characters long';
        }
    }
    
    // Confirm password validation
    if (fieldName === 'confirmPassword' && value) {
        const passwordField = document.getElementById('signupPassword');
        if (passwordField && value !== passwordField.value) {
            isValid = false;
            errorMessage = 'Passwords do not match';
        }
    }
    
    // Name validation
    if ((fieldName === 'firstName' || fieldName === 'lastName') && value) {
        if (value.length < 2) {
            isValid = false;
            errorMessage = `${getFieldLabel(fieldName)} must be at least 2 characters long`;
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function getFieldLabel(fieldName) {
    const labels = {
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        firstName: 'First Name',
        lastName: 'Last Name'
    };
    return labels[fieldName] || fieldName;
}

function showFieldError(field, message) {
    const wrapper = field.closest('.form-group');
    const existingError = wrapper.querySelector('.field-error');
    
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.25rem';
    
    wrapper.appendChild(errorDiv);
    field.style.borderColor = '#ef4444';
}

function clearFieldError(field) {
    const wrapper = field.closest('.form-group');
    const existingError = wrapper.querySelector('.field-error');
    
    if (existingError) {
        existingError.remove();
    }
    
    field.style.borderColor = '';
}

// Password Visibility Toggle
function setupPasswordToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const passwordField = document.getElementById(targetId);
            const icon = btn.querySelector('i');
            
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                icon.className = 'bx bx-hide';
            } else {
                passwordField.type = 'password';
                icon.className = 'bx bx-show';
            }
        });
    });
}

// Password Strength Checker
function setupPasswordStrength() {
    const passwordField = document.getElementById('signupPassword');
    if (!passwordField) return;
    
    const strengthBar = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    
    passwordField.addEventListener('input', () => {
        const password = passwordField.value;
        const strength = calculatePasswordStrength(password);
        
        updatePasswordStrength(strength, strengthBar, strengthText);
    });
}

function calculatePasswordStrength(password) {
    let score = 0;
    let feedback = [];
    
    // Length check
    if (password.length >= 8) score += 1;
    else feedback.push('At least 8 characters');
    
    // Lowercase check
    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Lowercase letters');
    
    // Uppercase check
    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Uppercase letters');
    
    // Number check
    if (/\d/.test(password)) score += 1;
    else feedback.push('Numbers');
    
    // Special character check
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
    else feedback.push('Special characters');
    
    return { score, feedback };
}

function updatePasswordStrength(strength, bar, text) {
    const percentage = (strength.score / 5) * 100;
    bar.style.width = percentage + '%';
    
    if (strength.score <= 2) {
        bar.style.background = '#ef4444';
        text.textContent = 'Weak password';
        text.style.color = '#ef4444';
    } else if (strength.score <= 3) {
        bar.style.background = '#f59e0b';
        text.textContent = 'Medium strength';
        text.style.color = '#f59e0b';
    } else {
        bar.style.background = '#10b981';
        text.textContent = 'Strong password';
        text.style.color = '#10b981';
    }
}

// Form Submission
function setupFormSubmission() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
}

async function handleLogin(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const rememberMe = formData.get('rememberMe');
    
    // Validate form
    const emailField = document.getElementById('loginEmail');
    const passwordField = document.getElementById('loginPassword');
    
    if (!validateField(emailField) || !validateField(passwordField)) {
        showToast('Please fix the errors above', 'error');
        return false;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('.auth-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Signing In...';
    submitBtn.disabled = true;
    
    try {
        // Simulate API call
        await simulateAPICall(2000);
        
        // Store user session
        const userData = {
            email,
            name: email.split('@')[0],
            loginTime: new Date().toISOString(),
            rememberMe: !!rememberMe
        };
        
        if (rememberMe) {
            localStorage.setItem('magicCinemaUser', JSON.stringify(userData));
        } else {
            sessionStorage.setItem('magicCinemaUser', JSON.stringify(userData));
        }
        
        showToast('Welcome back! Redirecting...', 'success');
        
        // Redirect to home page
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 1500);
        
    } catch (error) {
        showToast('Login failed. Please check your credentials.', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

async function handleSignup(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const formData = new FormData(e.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const agreeTerms = formData.get('agreeTerms');
    
    // Validate all fields
    const fields = [
        document.getElementById('firstName'),
        document.getElementById('lastName'),
        document.getElementById('signupEmail'),
        document.getElementById('signupPassword'),
        document.getElementById('confirmPassword')
    ];
    
    let isValid = true;
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Check terms agreement
    if (!agreeTerms) {
        showToast('Please agree to the terms and conditions', 'error');
        isValid = false;
    }
    
    if (!isValid) {
        showToast('Please fix the errors above', 'error');
        return false;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('.auth-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Creating Account...';
    submitBtn.disabled = true;
    
    try {
        // Simulate API call
        await simulateAPICall(2500);
        
        // Store user data
        const userData = {
            firstName,
            lastName,
            email,
            name: `${firstName} ${lastName}`,
            signupTime: new Date().toISOString()
        };
        
        localStorage.setItem('magicCinemaUser', JSON.stringify(userData));
        
        showToast('Account created successfully! Welcome to Magic Cinema!', 'success');
        
        // Redirect to home page
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 2000);
        
    } catch (error) {
        showToast('Signup failed. Please try again.', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Social Login Handlers
function setupSocialLogin() {
    const socialBtns = document.querySelectorAll('.social-btn');
    
    socialBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const platform = btn.classList.contains('google') ? 'Google' : 'Facebook';
            handleSocialLogin(platform);
        });
    });
}

function handleSocialLogin(platform) {
    showToast(`Redirecting to ${platform}...`, 'success');
    
    // Simulate social login
    setTimeout(() => {
        const userData = {
            name: `User from ${platform}`,
            email: `user@${platform.toLowerCase()}.com`,
            loginTime: new Date().toISOString(),
            socialLogin: platform
        };
        
        localStorage.setItem('magicCinemaUser', JSON.stringify(userData));
        showToast(`Successfully signed in with ${platform}!`, 'success');
        
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 1500);
    }, 1000);
}

// Utility Functions
function simulateAPICall(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate 90% success rate
            if (Math.random() > 0.1) {
                resolve();
            } else {
                reject(new Error('API Error'));
            }
        }, delay);
    });
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastIcon = toast.querySelector('.toast-icon');
    const toastMessage = toast.querySelector('.toast-message');
    const closeBtn = toast.querySelector('.toast-close');
    
    // Update toast content
    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    
    if (type === 'success') {
        toastIcon.className = 'toast-icon bx bx-check-circle';
    } else {
        toastIcon.className = 'toast-icon bx bx-x-circle';
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Auto hide after 4 seconds
    setTimeout(() => {
        hideToast();
    }, 4000);
    
    // Close button handler
    closeBtn.onclick = hideToast;
    
    function hideToast() {
        toast.classList.remove('show');
    }
}

// Check if user is already logged in
function checkExistingSession() {
    const userData = localStorage.getItem('magicCinemaUser') || sessionStorage.getItem('magicCinemaUser');
    
    if (userData) {
        try {
            const user = JSON.parse(userData);
            const loginTime = new Date(user.loginTime || user.signupTime);
            const now = new Date();
            const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
            
            // If logged in within last 24 hours, redirect to home
            if (hoursDiff < 24) {
                showToast(`Welcome back, ${user.name}!`, 'success');
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1500);
                return true;
            } else {
                // Session expired, clear it
                localStorage.removeItem('magicCinemaUser');
                sessionStorage.removeItem('magicCinemaUser');
            }
        } catch (error) {
            // Invalid session data, clear it
            localStorage.removeItem('magicCinemaUser');
            sessionStorage.removeItem('magicCinemaUser');
            console.log('Invalid session data');
        }
    }
    return false;
}

// Initialize session check
checkExistingSession();

// Forgot Password Handler
document.addEventListener('DOMContentLoaded', function() {
    const forgotPasswordLink = document.querySelector('.forgot-password');
    
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            handleForgotPassword();
        });
    }
});

function handleForgotPassword() {
    const email = prompt('Please enter your email address to reset your password:');
    
    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailRegex.test(email)) {
            showToast('Password reset link sent to your email!', 'success');
        } else {
            showToast('Please enter a valid email address', 'error');
        }
    }
}
