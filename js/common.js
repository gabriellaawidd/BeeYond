document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const navMenu = document.querySelector('.nav-menu');
    const loginButton = document.getElementById('loginButton');
    const userProfileDiv = document.getElementById('userProfile');
    const profileImg = userProfileDiv ? userProfileDiv.querySelector('.profile-img') : null;
    const profileDropdown = document.getElementById('profileDropdown');
    const logoutButton = document.getElementById('logoutButton');

    if (burger && navMenu) {
        burger.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-active');
            burger.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('mobile-active')) {
                    navMenu.classList.remove('mobile-active');
                    burger.classList.remove('active');
                }
            });
        });
    }

    const updateAuthButtons = () => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
        const userProfilePic = sessionStorage.getItem('userProfilePic');

        if (isLoggedIn) {
            if (loginButton) loginButton.style.display = 'none';
            if (userProfileDiv) {
                userProfileDiv.style.display = 'flex';
                if (profileImg) {
                    profileImg.src = userProfilePic || 'https://via.placeholder.com/32/758BFD/FFFFFF?text=👤';
                    profileImg.alt = 'User Profile';
                }
            }
        } else {
            if (loginButton) loginButton.style.display = 'block';
            if (userProfileDiv) userProfileDiv.style.display = 'none';
            if (profileDropdown) profileDropdown.classList.remove('active');
        }
    };

    if (loginButton) {
        loginButton.addEventListener('click', () => {
            loginButton.classList.add('clicked');
            setTimeout(() => {
                loginButton.classList.remove('clicked');
                sessionStorage.setItem('redirectAfterLogin', window.location.href);
                window.location.href = '../html/login.html';
            }, 200);
        });
    }

    if (userProfileDiv) {
        userProfileDiv.addEventListener('click', (event) => {
            event.stopPropagation();
            if (profileDropdown) {
                profileDropdown.classList.toggle('active');
            }
        });
    }

    document.addEventListener('click', (event) => {
        if (profileDropdown && profileDropdown.classList.contains('active') &&
            !userProfileDiv.contains(event.target) && !profileDropdown.contains(event.target)) {
            profileDropdown.classList.remove('active');
        }
    });

    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('userName');
            sessionStorage.removeItem('userProfilePic');
            updateAuthButtons();
            alert('You have been logged out.');

            window.location.href = '../html/home.html';
        });
    }

    updateAuthButtons();
});