document.addEventListener('DOMContentLoaded', () => {
    const quizResults = JSON.parse(sessionStorage.getItem('quizResults'));
    const resultsContainer = document.querySelector('.results');

    if (quizResults) {
        quizResults.forEach((result, index) => {
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('result');

            const stepDiv = document.createElement('div');
            stepDiv.classList.add('step');
            stepDiv.textContent = (index + 1).toString();

            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');
            questionDiv.textContent = result.question;

            const userAnswerDiv = document.createElement('div');
            userAnswerDiv.classList.add('user-answer', result.selected === result.correct ? 'correct' : 'incorrect');
            userAnswerDiv.textContent = result.selected;

            const correctAnswerDiv = document.createElement('div');
            correctAnswerDiv.classList.add('correct-answer');
            correctAnswerDiv.textContent = `Correct Answer: ${result.correct}`;

            resultDiv.appendChild(stepDiv);
            resultDiv.appendChild(questionDiv);
            resultDiv.appendChild(userAnswerDiv);
            resultDiv.appendChild(correctAnswerDiv);

            resultsContainer.appendChild(resultDiv);
        });
    }

    document.querySelector('.retry').addEventListener('click', () => {
        window.location.href = 'main.html';
    });

    document.querySelector('.choose-topic').addEventListener('click', () => {
        window.location.href = 'main.html';
    });
});
