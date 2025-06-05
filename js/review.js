document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.getElementById('backToCourseDetail');

    if (backButton) {
        backButton.addEventListener('click', function() {
            if (history.length > 1) {
                history.back(); 
            } else {
                alert('This would navigate to the Course Detail page.');
                window.location.href = 'coursedetail.html';
            }
        });
    }

    const likeButtons = document.querySelectorAll('.like-btn');
    const dislikeButtons = document.querySelectorAll('.dislike-btn');

    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const span = this.querySelector('span');
            let count = parseInt(span.textContent);
            span.textContent = count + 1;
        });
    });

    dislikeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const span = this.querySelector('span');
            let count = parseInt(span.textContent);
            if (count > 0) {
                span.textContent = count - 1;
            }
        });
    });
});