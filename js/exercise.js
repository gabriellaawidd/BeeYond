const urlParams = new URLSearchParams(window.location.search);
const course = urlParams.get('course');
document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = `coursedetail.html?course=${course}`;
            alertMessage('You are being redirected to the course details page!', 'info');
        });
    }

    const goToCourseButtons = document.querySelectorAll('.goto-course-button');
    goToCourseButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const chapterCard = event.target.closest('.chapter-card');
            const chapterNumber = chapterCard.querySelector('.chapter-number').innerText;
            const chapterTitle = chapterCard.querySelector('.chapter-title').innerText;
            console.log(`Navigating to course for ${chapterNumber}: ${chapterTitle}`);
            alertMessage(`Redirecting you to the ${chapterTitle} material...`, 'success');
            window.location.href = `coursedetail.html?course=${course}`;
        });
    });

    const goToExerciseButtons = document.querySelectorAll('.goto-exercise-button');
    goToExerciseButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const chapterCard = event.target.closest('.chapter-card');
            const chapterNumber = chapterCard.querySelector('.chapter-number').innerText;
            const chapterTitle = chapterCard.querySelector('.chapter-title').innerText;
            alertMessage(`Loading exercises for ${chapterTitle}...`, 'success');
            if (course) {
                window.location.href = `question.html?course=${course}&chapter=${chapterNumber}`;
            }
        });
    });

    function alertMessage(message, type = 'default') {
        const messageBox = document.createElement('div');
        messageBox.classList.add('message-box', `message-box-${type}`);
        messageBox.innerText = message;
        document.body.appendChild(messageBox);
        
        messageBox.classList.add('show');

        setTimeout(() => {
            messageBox.remove();
        }, 3000);
    }
});
