document.addEventListener('DOMContentLoaded', () => {
    const sidebarHeaders = document.querySelectorAll('.sidebar-header');

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
        }
    }
});