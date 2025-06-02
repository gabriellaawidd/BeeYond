// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize progress bars
    initializeProgressBars();
    
    // Initialize button interactions
    initializeButtonInteractions();
    
    // Initialize course card interactions
    initializeCourseCardInteractions();
    
    // Initialize notification system
    initializeNotifications();
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-active');
        });
    }
});

// Progress Bar Animation
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach((progressBar) => {
        const progressValue = progressBar.getAttribute('data-progress');
        const progressText = progressBar.closest('.progress-card').querySelector('.progress-text');
        
        // Set the width based on the data-progress attribute
        progressBar.style.width = progressValue + '%';
        progressText.textContent = progressValue + '%';
    });
}

// Update progress bar function (for dynamic updates)
function updateProgressBar(courseId, newProgress) {
    const courseCard = document.querySelector(`[data-course-id="${courseId}"]`);
    if (courseCard) {
        const progressFill = courseCard.querySelector('.progress-fill');
        const progressText = courseCard.querySelector('.progress-text');
        
        // Update data attribute
        progressFill.setAttribute('data-progress', newProgress);
        
        // Animate to new value with CSS transition
        progressFill.style.width = newProgress + '%';
        
        // Update text
        progressText.textContent = newProgress + '%';
        
        // Show notification
        showNotification(`Progress updated: ${newProgress}%`, 'success');
    }
}

// Course Detail Navigation
function navigateToCourseDetail(courseName, courseType = 'general', courseId = null) {
    // Create course detail URL
    const courseSlug = courseName.toLowerCase().replace(/\s+/g, '-');
    let courseDetailUrl = `course-detail.html?course=${courseSlug}`;
    
    // Add additional parameters
    if (courseId) {
        courseDetailUrl += `&id=${courseId}`;
    }
    if (courseType) {
        courseDetailUrl += `&type=${courseType}`;
    }
    
    // Show loading notification
    showNotification(`Loading ${courseName} course...`, 'info', 2000);
    
    // Simulate loading delay then redirect
    setTimeout(() => {
        // In a real application, you would navigate to the actual page
        // window.location.href = courseDetailUrl;
        
        // For demo purposes, we'll show what would happen
        showCourseDetailModal(courseName, courseType, courseId);
    }, 1000);
}

// Show Course Detail Modal (Demo purposes)
function showCourseDetailModal(courseName, courseType, courseId) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.cssText = `
        background-color: white;
        padding: 2rem;
        border-radius: var(--corner-radius-size);
        max-width: 500px;
        width: 90%;
        text-align: center;
        animation: slideInUp 0.3s ease;
    `;
    
    // Get progress info if it's a progress card
    let progressInfo = '';
    if (courseId) {
        const progressCard = document.querySelector(`[data-course-id="${courseId}"]`);
        if (progressCard) {
            const progress = progressCard.querySelector('.progress-fill').getAttribute('data-progress');
            progressInfo = `<p style="color: var(--primary); margin: 1rem 0;"><strong>Current Progress: ${progress}%</strong></p>`;
        }
    }
    
    modalContent.innerHTML = `
        <h2 style="color: var(--primary); margin-bottom: 1rem;">${courseName}</h2>
        <p style="color: #666; margin-bottom: 1rem;">Course Type: ${courseType}</p>
        ${progressInfo}
        <p style="margin-bottom: 2rem;">This would navigate to the detailed course page with lessons, materials, and interactive content.</p>
        <div style="display: flex; gap: 1rem; justify-content: center;">
            <button class="modal-btn continue-btn" style="
                background-color: var(--button);
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: var(--corner-radius-size);
                cursor: pointer;
                font-weight: 600;
            ">Continue Learning</button>
            <button class="modal-btn close-btn" style="
                background-color: var(--primary);
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: var(--corner-radius-size);
                cursor: pointer;
                font-weight: 600;
            ">Close</button>
        </div>
    `;
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Add event listeners
    const continueBtn = modalContent.querySelector('.continue-btn');
    const closeBtn = modalContent.querySelector('.close-btn');
    
    continueBtn.addEventListener('click', () => {
        closeModal(modalOverlay);
        showNotification(`Starting ${courseName} lesson...`, 'success');
        
        // If it's a progress course, simulate progress update
        if (courseId) {
            setTimeout(() => {
                const currentProgress = parseInt(document.querySelector(`[data-course-id="${courseId}"] .progress-fill`).getAttribute('data-progress'));
                const newProgress = Math.min(currentProgress + 5, 100);
                updateProgressBar(courseId, newProgress);
            }, 1000);
        }
    });
    
    closeBtn.addEventListener('click', () => {
        closeModal(modalOverlay);
    });
    
    // Close on overlay click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal(modalOverlay);
        }
    });
    
    // Close on Escape key
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal(modalOverlay);
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

// Close Modal Function
function closeModal(modalOverlay) {
    modalOverlay.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
        if (modalOverlay.parentNode) {
            modalOverlay.parentNode.removeChild(modalOverlay);
        }
    }, 300);
}

// Button Interactions
function initializeButtonInteractions() {
    // Button click animations
    const buttons = document.querySelectorAll('.login-btn, .cta-button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 150);
            
            // Show notification based on button type
            if (this.classList.contains('login-btn')) {
                showNotification('Redirecting to login...', 'info');
                // Simulate redirect
                setTimeout(() => {
                    // window.location.href = 'login.html';
                    showNotification('Login page would open here', 'info');
                }, 1000);
            } else if (this.classList.contains('cta-button')) {
                showNotification('Let\'s start your learning journey!', 'success');
                // Scroll to courses section
                const coursesSection = document.querySelector('.progress-section');
                if (coursesSection) {
                    coursesSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Navigation interactions
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // ...existing code...
            setTimeout(() => {
                window.location.href = this.href; // Actually navigate
            }, 1000);
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            const linkText = this.textContent;
            showNotification(`Navigating to ${linkText}...`, 'info');
            
            // Simulate navigation
            setTimeout(() => {
                showNotification(`${linkText} page would load here`, 'info');
            }, 1000);
        });
    });
}

// Course Card Interactions
function initializeCourseCardInteractions() {
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        // Hover effects
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-active');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-active');
        });
        
        // Click effects
        card.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 150);
            
            const courseName = this.querySelector('h3').textContent;
            
            // Handle different card types
            if (this.classList.contains('progress-card')) {
                // In Progress Course Card
                const courseId = this.getAttribute('data-course-id');
                navigateToCourseDetail(courseName, 'In Progress', courseId);
                
            } else if (this.classList.contains('popular-card')) {
                // Popular Course Card
                navigateToCourseDetail(courseName, 'Popular Course');
            }
        });
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
    
    notification.className = `notification ${type} slide-in`;
    notification.textContent = message;
    
    container.appendChild(notification);
    
    // Auto remove notification
    setTimeout(() => {
        notification.classList.remove('slide-in');
        notification.classList.add('slide-out');
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
}

// Utility Functions for External Use
window.BeeVondDashboard = {
    updateProgress: updateProgressBar,
    showNotification: showNotification,
    navigateToCourse: navigateToCourseDetail,
    
    // Example usage functions
    simulateProgress: function() {
        const courseIds = ['calc1', 'calc2', 'calc3'];
        courseIds.forEach((id, index) => {
            setTimeout(() => {
                const randomProgress = Math.floor(Math.random() * 101);
                updateProgressBar(id, randomProgress);
            }, index * 500);
        });
    },
    
    resetAllProgress: function() {
        const courseIds = ['calc1', 'calc2', 'calc3'];
        courseIds.forEach((id) => {
            updateProgressBar(id, 0);
        });
        showNotification('All progress reset', 'warning');
    },
    
    completeAllProgress: function() {
        const courseIds = ['calc1', 'calc2', 'calc3'];
        courseIds.forEach((id) => {
            updateProgressBar(id, 100);
        });
        showNotification('All courses completed!', 'success');
    }
};

// Add CSS for modal animations
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideInUp {
        from { 
            opacity: 0;
            transform: translateY(20px);
        }
        to { 
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .modal-btn:hover {
        opacity: 0.9;
        transform: translateY(-1px);
    }
    
    .modal-btn:active {
        transform: translateY(0);
    }
`;
document.head.appendChild(modalStyles);