document.addEventListener('DOMContentLoaded', () => {
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
});
