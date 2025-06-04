document.addEventListener('DOMContentLoaded', () => {
    const sidebarHeaders = document.querySelectorAll('.sidebar-header');

    sidebarHeaders.forEach(header => {
        const nextSibling = header.nextElementSibling;
        if (nextSibling && nextSibling.classList.contains('sidebar-list')) {
            header.addEventListener('click', () => {
                header.classList.toggle('active');
                nextSibling.classList.toggle('active');
            });
        }
    });
});