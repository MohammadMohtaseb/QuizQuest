document.addEventListener('DOMContentLoaded', () => {
    const quizTypes = document.querySelectorAll('.quiz-type');
    let questions = [];
    let currentQuestionIndex = 0;

    quizTypes.forEach(type => {
        type.addEventListener('click', () => {
            const quizType = type.getAttribute('data-quiz-type');
            fetchQuizQuestions(quizType);
        });
    });

    function fetchQuizQuestions(quizType) {
        fetch('quizBank.json')
            .then(response => response.json())
            .then(data => {
                questions = data[quizType];
                currentQuestionIndex = 0;
                loadQuestion(currentQuestionIndex);
            })
            .catch(error => console.error('Error fetching quiz data:', error));
    }

    function loadQuestion(index) {
        if (index < questions.length) {
            const question = questions[index];
            document.getElementById('question-text').textContent = question.question;
            const optionsContainer = document.getElementById('answer-options');
            optionsContainer.innerHTML = '';

            question.options.forEach(option => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'list-group-item list-group-item-action';
                button.textContent = option;
                button.addEventListener('click', () => checkAnswer(option, question.correctAnswer));
                optionsContainer.appendChild(button);
            });

            document.getElementById('quizModalLabel').textContent = `Question ${index + 1}`;
        } else {
            // Quiz completed, show results
            document.getElementById('question-text').textContent = 'Quiz Completed!';
            document.getElementById('answer-options').innerHTML = '<p>Thank you for participating in the quiz.</p>';
            document.getElementById('next-question-btn').style.display = 'none';
        }
    }

    function checkAnswer(selected, correct) {
        // Implement your logic for checking the answer and providing feedback
        if (selected === correct) {
            alert('Correct!');
        } else {
            alert('Incorrect!');
        }
        // Move to the next question
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }

    document.getElementById('next-question-btn').addEventListener('click', () => {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    });

    // Load the first question when the modal opens
    const quizModal = document.getElementById('quizModal');
    quizModal.addEventListener('show.bs.modal', () => {
        if (questions.length > 0) {
            currentQuestionIndex = 0;
            loadQuestion(currentQuestionIndex);
            document.getElementById('next-question-btn').style.display = 'inline-block';
        }
    });
});
