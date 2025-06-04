// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeFeatureCards();
    initializeNotifications();
    initializeMobileMenu();
    initializeScrollEffects();
});

// Navigation Interactions
function initializeNavigation() {
    // Login button interaction
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 150);
            
            showNotification('Redirecting to login page...', 'info');
            
            // Simulate redirect delay
            setTimeout(() => {
                // In real application: window.location.href = 'login.html';
                showNotification('Login page would open here', 'info');
            }, 1000);
        });
    }
    
    // Navigation links interaction
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            const linkText = this.textContent;
            showNotification(`Navigating to ${linkText}...`, 'info');
            
            // Handle specific navigation
            handleNavigation(linkText.toLowerCase());
        });
    });
}

// Handle navigation based on link text
function handleNavigation(page) {
    switch(page) {
        case 'home':
            showNotification('You are already on the home page', 'info');
            break;
        case 'courses':
            setTimeout(() => {
                // In real application: window.location.href = 'dashboard.html';
                showNotification('Courses page would load here', 'success');
            }, 1000);
            break;
        case 'subscription':
            setTimeout(() => {
                showNotification('Subscription page would load here', 'info');
            }, 1000);
            break;
        case 'about us':
            setTimeout(() => {
                showNotification('About Us page would load here', 'info');
            }, 1000);
            break;
        default:
            showNotification('Page not found', 'error');
    }
}

// Feature Cards Interactions
function initializeFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        // Hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Click effects
        card.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 150);
            
            const featureTitle = this.querySelector('.feature-title').textContent;
            showNotification(`Learn more about: ${featureTitle}`, 'success');
            
            // Handle specific feature clicks
            handleFeatureClick(featureTitle);
        });
        
        // Keyboard accessibility
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Make cards focusable
        card.setAttribute('tabindex', '0');
    });
}

// Handle feature card clicks
function handleFeatureClick(featureTitle) {
    const features = {
        'Deeper Understanding of the Material': {
            message: 'Access comprehensive learning materials and detailed explanations',
            action: 'courses'
        },
        'BINUS Community Connectivity': {
            message: 'Connect with fellow BINUS students and share knowledge',
            action: 'community'
        },
        'Improve Skill & Portfolio': {
            message: 'Build your skills with practical projects and certifications',
            action: 'portfolio'
        },
        'Targeted Learning': {
            message: 'Personalized learning paths based on your study program',
            action: 'personalized'
        }
    };
    
    const feature = features[featureTitle];
    if (feature) {
        setTimeout(() => {
            showNotification(feature.message, 'info', 4000);
        }, 500);
    }
}

// Mobile Menu Toggle
function initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-active');
            
            // Change hamburger icon
            if (navMenu.classList.contains('mobile-active')) {
                this.textContent = '✕';
                showNotification('Menu opened', 'info', 1000);
            } else {
                this.textContent = '☰';
                showNotification('Menu closed', 'info', 1000);
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('mobile-active');
                menuToggle.textContent = '☰';
            }
        });
    }
}

// Scroll Effects
function initializeScrollEffects() {
    // Smooth scroll for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Scroll to top functionality
    let scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--button);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        showNotification('Scrolled to top', 'info', 1000);
    });
}

// Notification System
function initializeNotifications() {
    // Create notification container if it doesn't exist
    if (!document.getElementById('notification-container')) {
        const container = document.createElement('div');
        container.id = 'notification-container';
        document.body.appendChild(container);
    }
}

function showNotification(message, type = 'info', duration = 3000) {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    container.appendChild(notification);
    
    // Auto remove notification
    setTimeout(() => {
        notification.classList.add('slide-out');
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
    
    // Click to dismiss
    notification.addEventListener('click', function() {
        this.classList.add('slide-out');
        setTimeout(() => {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        }, 300);
    });
}

// Utility Functions
window.BeeYondLanding = {
    showNotification: showNotification,
    
    // Navigate to specific pages
    navigateToLogin: function() {
        showNotification('Redirecting to login...', 'info');
        setTimeout(() => {
            // window.location.href = 'login.html';
            showNotification('Login page would open here', 'info');
        }, 1000);
    },
    
    navigateToCourses: function() {
        showNotification('Loading courses...', 'info');
        setTimeout(() => {
            // window.location.href = 'dashboard.html';
            showNotification('Dashboard would open here', 'success');
        }, 1000);
    },
    
    // Demo functions
    simulateUserJourney: function() {
        const steps = [
            { message: 'Welcome to BeeYond!', type: 'success', delay: 0 },
            { message: 'Exploring features...', type: 'info', delay: 2000 },
            { message: 'Ready to start learning?', type: 'info', delay: 4000 },
            { message: 'Click on any feature to learn more!', type: 'success', delay: 6000 }
        ];
        
        steps.forEach(step => {
            setTimeout(() => {
                showNotification(step.message, step.type);
            }, step.delay);
        });
    }
};

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K: Focus search (future feature)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        showNotification('Search feature coming soon!', 'info');
    }
    
    // Escape: Close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.menu-toggle');
        if (navMenu && navMenu.classList.contains('mobile-active')) {
            navMenu.classList.remove('mobile-active');
            if (menuToggle) {
                menuToggle.textContent = '☰';
            }
        }
    }
});

// Performance optimization: Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if supported
if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', initializeLazyLoading);
}

// Welcome message on page load
window.addEventListener('load', function() {
    setTimeout(() => {
        showNotification('Welcome to BeeYond Learning Platform!', 'success', 4000);
    }, 1000);
});