document.addEventListener('DOMContentLoaded', () => {
    const viewDetailButtons = document.querySelectorAll('.view-details-btn');

    viewDetailButtons.forEach(button => {
        button.addEventListener('click', () => {
            const courseCard = button.closest('.course-card');
            const courseName = courseCard ? courseCard.getAttribute('data-course-name') : null;

            if (courseName) {
                const encodedCourseName = encodeURIComponent(courseName);
                window.location.href = `../html/coursedetail.html?course=${encodedCourseName}`;
            } else {
                console.error("Course name not found for this button.");
                alert("Could not retrieve course details. Please try again.");
            }
        });
    });
});