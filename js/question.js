document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const course = urlParams.get('course');
    const quizData = [
        {
            chapter: "Chapter 1",
            question: "What is the derivative of f(x) = x^2?",
            options: ["A. x", "B. 2x", "C. x^3/3", "D. 2"],
            correctAnswer: "B"
        },
        {
            chapter: "Chapter 1",
            question: "What is the integral of 1/x?",
            options: ["A. x", "B. ln|x|", "C. -1/x^2", "D. 1"],
            correctAnswer: "B"
        },
        {
            chapter: "Chapter 1",
            question: "If y = e^x, then dy/dx is?",
            options: ["A. x e^{x-1}", "B. e^x", "C. e^{x+1}", "D. ln x"],
            correctAnswer: "B"
        },
        {
            chapter: "Chapter 1",
            question: "What is the value of ∫_{0}^{1} x,dx?",
            options: ["A. 0", "B. 1/2", "C. 1", "D. 2"],
            correctAnswer: "B"
        },
        {
            chapter: "Chapter 1",
            question: "What is the value of d/dx ln x?",
            options: ["A. x", "B. 1/x", "C. e^x", "D. ln x"],
            correctAnswer: "B"
        }
    ];

    let currentQuestionIndex = 0;
    let userAnswers = new Array(quizData.length).fill(null);
    let correctAnswersCount = 0;

    const chapterTitleElement = document.getElementById('chapterTitle');
    const questionTextElement = document.getElementById('questionText');
    const optionsGrid = document.getElementById('optionsGrid');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const progressBarFill = document.getElementById('progressBarFill');
    const backToCourseDetailButton = document.getElementById('backToCourseDetail');
    function loadQuestion() {
        const questionData = quizData[currentQuestionIndex];
        chapterTitleElement.textContent = questionData.chapter;
        questionTextElement.innerHTML = questionData.question;

        optionsGrid.innerHTML = '';

        questionData.options.forEach((optionText, index) => {
            const optionButton = document.createElement('button');
            optionButton.type = 'button';
            optionButton.classList.add('option-btn');
            optionButton.dataset.option = String.fromCharCode(65 + index);
            optionButton.innerHTML = optionText;

            if (userAnswers[currentQuestionIndex] === optionButton.dataset.option) {
                optionButton.classList.add('selected');
            }

            optionButton.addEventListener('click', () => selectAnswer(optionButton.dataset.option));
            optionsGrid.appendChild(optionButton);
        });

        updateNavigationButtons();
        updateProgressBar();
        if (typeof MathJax !== 'undefined') {
            MathJax.typesetPromise([questionTextElement, optionsGrid]);
        }
    }

    function selectAnswer(selectedOption) {
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.remove('selected');
        });

        const selectedButton = optionsGrid.querySelector(`[data-option="${selectedOption}"]`);
        if (selectedButton) {
            selectedButton.classList.add('selected');
        }
        userAnswers[currentQuestionIndex] = selectedOption;
    }

    function updateNavigationButtons() {
        prevButton.disabled = currentQuestionIndex === 0;

        if (currentQuestionIndex === quizData.length - 1) {
            nextButton.textContent = 'Submit';
            nextButton.classList.add('next-submit-btn');
        } else {
            nextButton.textContent = 'Next';
            nextButton.classList.remove('next-submit-btn');
        }
    }

    function updateProgressBar() {
        const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
        progressBarFill.style.width = `${progress}%`;
    }

    function nextQuestion() {
        if (currentQuestionIndex < quizData.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        } else {
            submitQuiz();
        }
    }

    function prevQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion();
        }
    }

    function submitQuiz() {
        correctAnswersCount = 0;
        let incorrectQuestions = [];

        userAnswers.forEach((answer, index) => {
            const correctAnswer = quizData[index].correctAnswer;
            if (answer === correctAnswer) {
                correctAnswersCount++;
            } else {
                incorrectQuestions.push({
                    question: quizData[index].question,
                    userAnswer: answer,
                    correctAnswer: correctAnswer
                });
            }
        });

        alert(`Quiz completed! You answered ${correctAnswersCount} out of ${quizData.length} questions correctly.`);

        if (incorrectQuestions.length > 0) {
            let feedback = "Incorrect Answers:\n";
            incorrectQuestions.forEach((item, index) => {
                feedback += `${index + 1}. Question: ${item.question}\n   Your Answer: ${item.userAnswer || 'Not answered'}\n   Correct Answer: ${item.correctAnswer}\n`;
            });
            alert(feedback);
        }
        window.location.href = `coursedetail.html?course=${course}`;
    }

    if (backToCourseDetailButton) {
        backToCourseDetailButton.addEventListener('click', function() {
            if (history.length > 1) {
                history.back();
            } else {
                alert('This will take you back to the Course Detail page.');
            }
        });
    }
    if (course) {
        const backToCourseLink = document.querySelector('#backToCourseDetail');
        if (backToCourseLink) {
            backToCourseLink.href = `coursedetail.html?course=${course}`;
        }
    }
    nextButton.addEventListener('click', nextQuestion);
    prevButton.addEventListener('click', prevQuestion);

    window.MathJax = {
        tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']]
        },
        svg: {
            fontCache: 'global'
        }
    };

    loadQuestion();
});
