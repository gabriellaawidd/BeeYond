document.addEventListener('DOMContentLoaded', () => {
    const youtubeVideo = document.getElementById('youtube-video');
    const videoTitle = document.querySelector('.video-title');
    const videoDescription = document.querySelector('.video-description');
    const sidebarLinks = document.querySelectorAll('.sidebar-list a');
    const sidebarHeaders = document.querySelectorAll('.sidebar-header');

    function updateVideo(videoId, title, description) {
        youtubeVideo.src = `https://www.youtube.com/embed/${videoId}`; 
        videoTitle.textContent = title;
        videoDescription.textContent = description;
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
});