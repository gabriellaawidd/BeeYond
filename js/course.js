// Animate progress circle on page load
document.addEventListener('DOMContentLoaded', function() {
    const progressCircle = document.getElementById('progressCircle');
    const progressText = document.getElementById('progressText');
    const progress = 30; // 30% progress
    
    // Calculate circumference (2 * π * radius)
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    
    // Calculate dash array for progress
    const progressLength = (progress / 100) * circumference;
    const remainingLength = circumference - progressLength;
    
    // Animate the progress circle
    setTimeout(() => {
        progressCircle.style.strokeDasharray = `${progressLength} ${remainingLength}`;
    }, 500);
    
    // Animate the percentage text
    let currentProgress = 0;
    const interval = setInterval(() => {
        if (currentProgress <= progress) {
            progressText.textContent = currentProgress + '%';
            currentProgress++;
        } else {
            clearInterval(interval);
        }
    }, 50);
});

// Add click handlers for interactive elements
document.querySelector('.price-btn').addEventListener('click', function() {
    alert('Redirecting to course enrollment...');
});

// Add hover effects for stage items
document.querySelectorAll('.stage-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});