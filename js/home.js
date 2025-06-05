document.addEventListener('DOMContentLoaded', function() {
    initializeProgressBars();
    initializeButtonInteractions();
    initializeCourseCardInteractions();
    initializeNotifications();
});

function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');

    progressBars.forEach((progressBar) => {
        const progressValue = progressBar.getAttribute('data-progress');
        const progressText = progressBar.closest('.progress-card').querySelector('.progress-text');

        progressBar.style.width = progressValue + '%';
        progressText.textContent = progressValue + '%';
    });
}

function updateProgressBar(courseId, newProgress) {
    const courseCard = document.querySelector(`[data-course-id="${courseId}"]`);
    if (courseCard) {
        const progressFill = courseCard.querySelector('.progress-fill');
        const progressText = courseCard.querySelector('.progress-text');

        progressFill.setAttribute('data-progress', newProgress);
        progressFill.style.width = newProgress + '%';
        progressText.textContent = newProgress + '%';

        showNotification(`Progress updated: ${newProgress}%`, 'success');
    }
}

function navigateToCourseDetail(courseName, courseType = 'general', courseId = null) {
    const courseSlug = courseName.toLowerCase().replace(/\s+/g, '-');
    let courseDetailUrl = `course-detail.html?course=${courseSlug}`;

    if (courseId) {
        courseDetailUrl += `&id=${courseId}`;
    }
    if (courseType) {
        courseDetailUrl += `&type=${courseType}`;
    }

    showNotification(`Loading ${courseName} course...`, 'info', 2000);

    setTimeout(() => {
        showCourseDetailModal(courseName, courseType, courseId);
    }, 1000);
}

function showCourseDetailModal(courseName, courseType, courseId) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    let progressInfo = '';
    if (courseId) {
        const progressCard = document.querySelector(`[data-course-id="${courseId}"]`);
        if (progressCard) {
            const progress = progressCard.querySelector('.progress-fill').getAttribute('data-progress');
            progressInfo = `<p class="modal-progress-info"><strong>Current Progress: ${progress}%</strong></p>`;
        }
    }

    modalContent.innerHTML = `
        <h2 class="modal-title">${courseName}</h2>
        <p class="modal-course-type">Course Type: ${courseType}</p>
        ${progressInfo}
        <p class="modal-description">This would navigate to the detailed course page with lessons, materials, and interactive content.</p>
        <div class="modal-buttons">
            <button class="modal-btn continue-btn">Continue Learning</button>
            <button class="modal-btn close-btn">Close</button>
        </div>
    `;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    const continueBtn = modalContent.querySelector('.continue-btn');
    const closeBtn = modalContent.querySelector('.close-btn');

    continueBtn.addEventListener('click', () => {
        closeModal(modalOverlay);
        showNotification(`Starting ${courseName} lesson...`, 'success');

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

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal(modalOverlay);
        }
    });

    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal(modalOverlay);
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

function closeModal(modalOverlay) {
    modalOverlay.classList.remove('fadeIn');
    modalOverlay.classList.add('fadeOut');

    setTimeout(() => {
        if (modalOverlay.parentNode) {
            modalOverlay.parentNode.removeChild(modalOverlay);
        }
    }, 300);
}

function initializeButtonInteractions() {
    const ctaButtons = document.querySelectorAll('.cta-button');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 150);

            if (this.classList.contains('cta-button')) {
                showNotification('Let\'s start your learning journey!', 'success');
                const coursesSection = document.querySelector('.progress-section');
                if (coursesSection) {
                    coursesSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

function initializeCourseCardInteractions() {
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-active');
        });

        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-active');
        });

        card.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 150);

            const courseName = this.querySelector('h3').textContent;

            if (this.classList.contains('progress-card')) {
                const courseId = this.getAttribute('data-course-id');
                navigateToCourseDetail(courseName, 'In Progress', courseId);
            } else if (this.classList.contains('popular-card')) {
                navigateToCourseDetail(courseName, 'Popular Course');
            }
        });
    });
}

function initializeNotifications() {
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

window.BeeVondDashboard = {
    updateProgress: updateProgressBar,
    showNotification: showNotification,
    navigateToCourse: navigateToCourseDetail,

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