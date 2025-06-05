document.addEventListener('DOMContentLoaded', () => {
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

    const youtubeVideo = document.getElementById('youtube-video');
    const videoTitleElement = document.querySelector('.video-title');
    const videoDescriptionElement = document.querySelector('.video-description');
    const sidebarLinks = document.querySelectorAll('.sidebar-list a');
    const sidebarHeaders = document.querySelectorAll('.sidebar-header');
    const backToCourseButton = document.querySelector('.back-to-course-button');

    let currentCourseName = '';

    function updateVideo(videoId, title, description) {
        youtubeVideo.src = `https://www.youtube.com/embed/${videoId}`;
        videoTitleElement.textContent = title;
        videoDescriptionElement.textContent = description;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const initialVideoId = urlParams.get('videoId');
    const initialVideoTitle = urlParams.get('title');
    const initialVideoDescription = urlParams.get('description');
    const courseNameParam = urlParams.get('course');

    if (courseNameParam) {
        currentCourseName = decodeURIComponent(courseNameParam);
    }

    if (initialVideoId && initialVideoTitle && initialVideoDescription) {
        updateVideo(initialVideoId, decodeURIComponent(initialVideoTitle), decodeURIComponent(initialVideoDescription));
        sidebarLinks.forEach(link => {
            if (link.dataset.videoId === initialVideoId) {
                link.classList.add('active');
                const parentUl = link.closest('.sidebar-list');
                if (parentUl && !parentUl.classList.contains('active')) {
                    parentUl.classList.add('active');
                    const parentHeader = parentUl.previousElementSibling;
                    if (parentHeader && parentHeader.classList.contains('sidebar-header')) {
                        parentHeader.classList.add('active');
                        parentHeader.querySelector('.arrow').textContent = '▼';
                    }
                }
            }
        });
    } else {
        const firstModuleHeader = document.querySelector('.sidebar-header');
        if (firstModuleHeader) {
            firstModuleHeader.classList.add('active');
            const firstModuleContent = firstModuleHeader.nextElementSibling;
            if (firstModuleContent && firstModuleContent.classList.contains('sidebar-list')) {
                firstModuleContent.classList.add('active');
                firstModuleHeader.querySelector('.arrow').textContent = '▼';

                const firstVideoLink = firstModuleContent.querySelector('a');
                if (firstVideoLink) {
                    firstVideoLink.click();
                }
            }
        }
    }

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const videoId = link.dataset.videoId;
            const title = link.dataset.title;
            const description = link.dataset.description;

            updateVideo(videoId, title, description);

            sidebarLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        });
    });

    sidebarHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const arrow = header.querySelector('.arrow');

            if (content && content.classList.contains('sidebar-list')) {
                header.classList.toggle('active');
                content.classList.toggle('active');

                if (content.classList.contains('active')) {
                    arrow.textContent = '▼';
                } else {
                    arrow.textContent = '❯';
                }
            }
        });
    });

    if (backToCourseButton) {
        backToCourseButton.addEventListener('click', () => {
            if (currentCourseName) {
                window.location.href = `../html/coursedetail.html?course=${encodeURIComponent(currentCourseName)}`;
            } else {
                window.location.href = '../html/course.html';
            }
        });
    }
});