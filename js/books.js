document.addEventListener('DOMContentLoaded', () => {
    const chapterItems = document.querySelectorAll('.chapter-item');
    const pdfViewerContainer = document.querySelector('.pdf-viewer-container');
    const pdfIframe = document.getElementById('pdfViewerIframe');
    const pdfDownloadLink = document.getElementById('pdfDownloadLink');
    const chapterTextBlock = document.getElementById('chapterTextBlock'); 
    const backToCourseButton = document.querySelector('.back-to-course-button');
    const urlSearchParams = new URLSearchParams(window.location.search);
    const course = urlSearchParams.get('course');

    backToCourseButton.addEventListener('click', () => {
        window.location.href = `coursedetail.html?course=${course}`;
    });

    const loadPdf = (pdfSrc) => {
        if (pdfSrc) {
            pdfIframe.src = pdfSrc;
            pdfDownloadLink.href = pdfSrc;
            pdfViewerContainer.classList.add('active-pdf-viewer');
        } else {
            pdfIframe.src = '';
            pdfDownloadLink.href = '#';
            pdfViewerContainer.classList.remove('active-pdf-viewer');
        }
    };

    const loadChapterContent = async (contentSrc) => {
        if (contentSrc) {
            try {
                const response = await fetch(contentSrc);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const htmlContent = await response.text();
                chapterTextBlock.innerHTML = htmlContent; 
            } catch (error) {
                console.error('Error loading chapter content:', error);
                chapterTextBlock.innerHTML = '<p>Failed to load chapter content. Please try again later.</p>';
            }
        } else {
            chapterTextBlock.innerHTML = '<p>No detailed content available for this chapter.</p>';
        }
    };

    chapterItems.forEach(item => {
        item.addEventListener('click', () => {
            chapterItems.forEach(c => c.classList.remove('active'));
            item.classList.add('active');

            const pdfSrc = item.dataset.pdfSrc;
            const contentSrc = item.dataset.contentSrc; 
            
            loadPdf(pdfSrc);
            loadChapterContent(contentSrc); 
        });
    });

    const initialActiveChapter = document.querySelector('.chapter-item.active');
    if (initialActiveChapter) {
        const initialPdfSrc = initialActiveChapter.dataset.pdfSrc;
        const initialContentSrc = initialActiveChapter.dataset.contentSrc; 
        loadPdf(initialPdfSrc);
        loadChapterContent(initialContentSrc); 
    } else {
        pdfViewerContainer.classList.remove('active-pdf-viewer');
        chapterTextBlock.innerHTML = '<p>Please select a chapter to view its content and corresponding PDF.</p>'; 
    }
});