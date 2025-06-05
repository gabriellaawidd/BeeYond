document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = 'coursedetail.html';
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
        });
    });

    const goToExerciseButtons = document.querySelectorAll('.goto-exercise-button');
    goToExerciseButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const chapterCard = event.target.closest('.chapter-card');
            const chapterNumber = chapterCard.querySelector('.chapter-number').innerText;
            const chapterTitle = chapterCard.querySelector('.chapter-title').innerText;
            window.location.href = 'exercise.html';
            alertMessage(`Loading exercises for ${chapterTitle}...`, 'success');
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
