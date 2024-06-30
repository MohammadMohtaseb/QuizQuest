document.addEventListener('DOMContentLoaded', () => {
    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    const timerElement = document.getElementById('timer');
    let timer;

    const log = document.getElementById("logout");
    log.addEventListener("click", logout);

    function logout() {
        sessionStorage.clear();
        window.location.href = "home.html";
    }

    const userfName = document.getElementById("user_name");

    if (sessionStorage.getItem('currentUser')) {
        const currentUserData = JSON.parse(sessionStorage.getItem('currentUser'));
        const name = currentUserData.fullname;
        userfName.textContent = name;
    } else {
        userfName.textContent = "Guest";
    }

    // Function to start the timer
    function startTimer(duration) {
        let time = duration;
        timerElement.textContent = time;
        timer = setInterval(() => {
            time--;
            timerElement.textContent = time;
            if (time <= 0) {
                clearInterval(timer);
                endQuiz();
            }
        }, 1000);
    }

    // Function to fetch quiz questions
    function fetchQuizQuestions(quizType) {
        fetch('quizBank.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                questions = data[quizType];
                currentQuestionIndex = 0;
                loadQuestion(currentQuestionIndex);
                startTimer(60); // Start timer for 60 seconds
            })
            .catch(error => console.error('Error fetching quiz data:', error));
    }

    // Function to load a question
    function loadQuestion(index) {
        if (index < questions.length) {
            const question = questions[index];
            document.getElementById('question-text').textContent = question.question;
            const optionsContainer = document.getElementById('answer-options');
            optionsContainer.innerHTML = '';

            question.options.forEach(option => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'option';
                button.textContent = option;
                button.addEventListener('click', () => selectOption(option, question.correctAnswer));
                optionsContainer.appendChild(button);
            });

            updateProgressBar(index);
        } else {
            endQuiz();
        }
    }

    // Function to handle option selection
    function selectOption(selected, correct) {
        if (selected === correct) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion(currentQuestionIndex);
        } else {
            endQuiz();
        }
    }

    // Function to update the progress bar
    function updateProgressBar(index) {
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, i) => {
            if (i <= index) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Update step text content for the second half of questions
        if (index >= 5) {
            steps.forEach((step, i) => {
                step.textContent = (i + 6).toString();
            });
        } else {
            steps.forEach((step, i) => {
                step.textContent = (i + 1).toString();
            });
        }
    }

    // Function to end the quiz
    function endQuiz() {
        clearInterval(timer);
        document.querySelector('.question').innerHTML = '<h2>Quiz Completed!</h2>';
        document.querySelector('.options').innerHTML = `<p>Your score: ${score}</p>`;
        
        // Show the result container
        const overlay = document.getElementById('overlay');
        const resultContainer = document.getElementById('result-container');
        const passOrFail = document.getElementById('pass-or-fail');
        const scoreDisplay = resultContainer.querySelector('.Score');
        
        overlay.style.display = 'block';
        resultContainer.style.zIndex = 11; // Bring result container to the front
        resultContainer.style.display = 'flex'; // Make result container visible

        scoreDisplay.textContent = `${score} / ${questions.length}`;
        
        if (score >= Math.ceil(0.7 * questions.length)) { // Assuming 70% of total questions
            resultContainer.style.backgroundColor = 'green';
            passOrFail.textContent = 'Passed';
        } else {
            resultContainer.style.backgroundColor = 'red';
            passOrFail.textContent = 'Failed';
        }

        // Add event listener to "Show results" button
        document.getElementById('show-results-btn').addEventListener('click', () => {
            window.location.href = 'result.html';
        });

        // Add event listener to "Back To Main" button
        document.getElementById('back-to-main-btn').addEventListener('click', () => {
            window.location.href = 'main.html';
        });
    }

    // Get quiz type from session storage and fetch questions
    const quizType = sessionStorage.getItem('quizType');
    if (quizType) {
        fetchQuizQuestions(quizType);
    }

    // Event listener for the "Next" button
    document.getElementById('next-question-btn').addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length - 1) {
            loadQuestion(currentQuestionIndex);
        } else {
            document.getElementById('next-question-btn').textContent = 'Submit';
            loadQuestion(currentQuestionIndex);
        }
    });

    // Session validation and dark theme toggle
    function validateSession() {
        if (!sessionStorage.getItem('currentUser')) {
            window.location.href = "login.html";
        }
    }

    function applyDarkTheme() {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark_mode');
        }
    }

    validateSession();
    applyDarkTheme();
});
