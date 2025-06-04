document.addEventListener('DOMContentLoaded', () => {
    const chapterItems = document.querySelectorAll('.chapter-item');
    const pdfViewerContainer = document.querySelector('.pdf-viewer-container');

    chapterItems.forEach(item => {
        item.addEventListener('click', () => {
            chapterItems.forEach(c => c.classList.remove('active'));
            item.classList.add('active');
            const chapterText = item.querySelector('.chapter-text');
            if (chapterText && chapterText.textContent.includes('Chapter 1')) {
                pdfViewerContainer.style.display = 'block'; 
            } else {
                pdfViewerContainer.style.display = 'none'; 
            }
        });
    });

    const initialActiveChapter = document.querySelector('.chapter-item.active');
    if (initialActiveChapter && initialActiveChapter.querySelector('.chapter-text').textContent.includes('Chapter 1')) {
        pdfViewerContainer.style.display = 'block';
    } else {
        pdfViewerContainer.style.display = 'none';
    }
});