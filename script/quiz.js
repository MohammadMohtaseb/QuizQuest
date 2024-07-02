document.addEventListener('DOMContentLoaded', () => {
    // Checking if user is in session, if not 
    if (sessionStorage.getItem('currentUser')) {
        const userfName = document.getElementById("user_name");
        const currentUserData = JSON.parse(sessionStorage.getItem('currentUser'));
        userfName.textContent = currentUserData.fullname;
    } else {
        window.location.href = "login.html";
    }

    // Logout functionality
    const log = document.getElementById("logout");
    log.addEventListener("click", logout);

    function logout() {
        sessionStorage.clear();
        window.location.href = "home.html";
    }

    // Quiz functionality starts
    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedAnswer = null;
    const timerElement = document.getElementById('timer');
    let timer;
    let userAnswers = [];

    // Function to start the timer
    function startTimer(duration) {
        let time = duration;
        timerElement.textContent = formatTime(time);
        timer = setInterval(() => {
            time--;
            timerElement.textContent = formatTime(time);
            if (time <= 0) {
                endQuiz();
            }
        }, 1000);
    }

    // This function is for the timer format , to make it like this => '00:00' instead of this '300'
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
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
                startTimer(180); // Start timer for 3 minutes
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
                button.addEventListener('click', () => selectOption(button, option));
                optionsContainer.appendChild(button);
            });

            updateProgressBar(index);
        } else {
            endQuiz();
        }
    }

    // Function to handle option selection
    function selectOption(button, option) {
        const options = document.querySelectorAll('.option');
        options.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        selectedAnswer = option;
    }

    // Function to update the progress bar
    function updateProgressBar(index) {
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, i) => {  // The "i" is the index of the array elemnent for the "forEach()" function, because "forEach()" is a for loop of an array."
            if (i <= index % 5) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Update step text content when we reach question 6
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
        
        // Store user's answers and score in session storage
        sessionStorage.setItem('userAnswers', JSON.stringify(userAnswers));
        sessionStorage.setItem('quizScore', score);
        
        // Show the result container
        const resultContainer = document.getElementById('result-container');
        const passOrFail = document.getElementById('pass-or-fail');
        const scoreDisplay = resultContainer.querySelector('.Score');
        const showA = document.querySelector(".showA");
        const showB = document.querySelector(".showB");
        document.getElementById("logout").style.display="none";
        document.getElementById("user_name").style.display="none";
        document.getElementById("next-question-btn").style.display="none";
        
        resultContainer.style.zIndex = 2; // Bring result container to the front
        resultContainer.style.display = 'flex'; // Make result container visible

        scoreDisplay.textContent = `${score} / ${questions.length}`;

        // Load the audio files
        const passAudio = new Audio('../media/audio/claps-44774.mp3');
        const failAudio = new Audio('../media/audio/wah-wah-sad-trombone-6347.mp3');

        // Apply blur/opacity effect to the main content
        document.querySelector('main').classList.add('main-blurred');

        
        if (score >= Math.ceil(0.5 * questions.length)) { // Assuming 50% of total questions, Example we are at question 3 => 0.5 * 3 = 1.5, Now the ceil function turns 1.5 to 1
            resultContainer.style.backgroundColor = 'green';
            showA.classList.remove('showA');
            showA.classList.add('showAPass');
            showB.classList.remove('showB');
            showB.classList.add('showBPass');
            passOrFail.textContent = 'Passed';
            passAudio.play(); // Play pass sound

        } else {
            resultContainer.style.backgroundColor = 'red';
            passOrFail.textContent = 'Failed';
            failAudio.play(); // Play fail sound
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
        if (selectedAnswer !== null) {
            const correctAnswer = questions[currentQuestionIndex].correctAnswer;
            if (selectedAnswer === correctAnswer) {
                score++;
            }
            // Store user's answer
            userAnswers.push({
                question: questions[currentQuestionIndex].question,
                userAnswer: selectedAnswer,
                correctAnswer: correctAnswer
            });
            selectedAnswer = null;
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length - 1) {
                loadQuestion(currentQuestionIndex);
            } else {
                document.getElementById('next-question-btn').textContent = 'Submit';
                loadQuestion(currentQuestionIndex);
            }
        } else {
            alert('Please select an answer before proceeding.');
        }
    });


    // Dark theme function
    function applyDarkTheme() {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark_mode');
        }
    }

    applyDarkTheme();
});
