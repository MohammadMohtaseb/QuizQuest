document.addEventListener('DOMContentLoaded', () => {
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

    // Event listeners for quiz type links
    document.getElementById('html_link').addEventListener('click', () => {
        sessionStorage.setItem('quizType', 'html');
        window.location.href = 'quiz.html';
    });

    document.getElementById('css_link').addEventListener('click', () => {
        sessionStorage.setItem('quizType', 'css');
        window.location.href = 'quiz.html';
    });

    document.getElementById('javascript_link').addEventListener('click', () => {
        sessionStorage.setItem('quizType', 'javascript');
        window.location.href = 'quiz.html';
    });

    // Check for dark mode preference and apply it
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark_mode');
    }
});
