document.addEventListener('DOMContentLoaded', () => {
    const viewDetailButtons = document.querySelectorAll('.view-details-btn');

    viewDetailButtons.forEach(button => {
        button.addEventListener('click', () => {
            const courseCard = button.closest('.course-card');
            const courseName = courseCard ? courseCard.getAttribute('data-course-name') : null;

            if (courseName) {
                const encodedCourseName = encodeURIComponent(courseName);
                window.location.href = `../html/coursedetail.html?course=${encodedCourseName}`;
            } else {
                console.error("Course name not found for this button.");
                alert("Could not retrieve course details. Please try again.");
            }
        });
    });

    const loginButton = document.getElementById('loginButton');
    const userProfile = document.getElementById('userProfile');
    const profileDropdown = document.getElementById('profileDropdown');

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
        if (loginButton) loginButton.style.display = 'none';
        if (userProfile) userProfile.style.display = 'flex';
    } else {
        if (loginButton) loginButton.style.display = 'block';
        if (userProfile) userProfile.style.display = 'none';
    }

    if (userProfile) {
        userProfile.addEventListener('click', () => {
            if (profileDropdown) {
                profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
            }
        });
    }

    window.addEventListener('click', (event) => {
        if (userProfile && !userProfile.contains(event.target) && profileDropdown) {
            profileDropdown.style.display = 'none';
        }
    });

    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            window.location.href = '../html/login.html';
        });
    }

    const burger = document.querySelector('.burger');
    const navMenu = document.querySelector('.nav-menu');

    if (burger) {
        burger.addEventListener('click', () => {
            navMenu.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }
});