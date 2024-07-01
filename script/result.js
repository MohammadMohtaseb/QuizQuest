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

    // Result fetching functionality
    const resultsContainer = document.getElementById('results-container');
    const userAnswers = JSON.parse(sessionStorage.getItem('userAnswers'));
    const quizScore = sessionStorage.getItem('quizScore');

    if (!userAnswers) {
        resultsContainer.innerHTML = '<p>No results found. Please take the quiz first.</p>';
        return;
    }

    userAnswers.forEach((answer, index) => {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result');

        const stepDiv = document.createElement('div');
        stepDiv.classList.add('step');
        stepDiv.textContent = index + 1;

        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.classList.add('createdColor');
        questionDiv.textContent = answer.question;

        const userAnswerDiv = document.createElement('div');
        userAnswerDiv.classList.add('user-answer');
        userAnswerDiv.textContent = `Your answer: ${answer.userAnswer}`;
        if (answer.userAnswer === answer.correctAnswer) {
            userAnswerDiv.classList.add('correct');
        } else {
            userAnswerDiv.classList.add('incorrect');
        }

        const correctAnswerDiv = document.createElement('div');
        correctAnswerDiv.classList.add('correct-answer');
        correctAnswerDiv.classList.add('createdColor');
        correctAnswerDiv.textContent = `Correct answer: ${answer.correctAnswer}`;

        resultDiv.appendChild(stepDiv);
        resultDiv.appendChild(questionDiv);
        resultDiv.appendChild(userAnswerDiv);
        resultDiv.appendChild(correctAnswerDiv);

        resultsContainer.appendChild(resultDiv);
    });

    document.getElementById('retry-quiz').addEventListener('click', () => {
        sessionStorage.removeItem('userAnswers');
        sessionStorage.removeItem('quizScore');
        window.location.href = 'quiz.html';
    });

    document.getElementById('choose-topic').addEventListener('click', () => {
        sessionStorage.removeItem('userAnswers');
        sessionStorage.removeItem('quizScore');
        window.location.href = 'main.html';
    });

    // Dark theme function
    function applyDarkTheme() {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark_mode');
        }
    }

    applyDarkTheme();

    // Retry quiz hover function
    const retryBtnHover = document.querySelector(".retry");
    retryBtnHover.addEventListener('mouseover', () => {
        retryBtnHover.classList.remove("retry");
        retryBtnHover.classList.add("retryBtnHoverEffect");
        retryBtnHover.textContent = "Are you sure?";
    })

    retryBtnHover.addEventListener('mouseout', () => {
        retryBtnHover.classList.remove("retryBtnHoverEffect");
        retryBtnHover.classList.add("retry");
        retryBtnHover.textContent = "Retry Quiz?";
    })

    // Retry quiz hover function
    const chooseTopic = document.querySelector(".chooseTopic");
    chooseTopic.addEventListener('mouseover', () => {
        chooseTopic.classList.remove("chooseTopic");
        chooseTopic.classList.add("chooseTopicHover");
        chooseTopic.textContent = "You Still can't get 10/10?";
    })

    chooseTopic.addEventListener('mouseout', () => {
        chooseTopic.classList.remove("chooseTopicHover");
        chooseTopic.classList.add("chooseTopic");
        chooseTopic.textContent = "Choose another topic?";
    })

});
