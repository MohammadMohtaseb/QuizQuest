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
