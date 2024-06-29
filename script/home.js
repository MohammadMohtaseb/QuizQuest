document.addEventListener('DOMContentLoaded', () => {
    const themeButton = document.querySelector('.theme_btn');

    function toggleTheme() {
        document.body.classList.toggle('dark_mode');

        if (document.body.classList.contains('dark_mode')) {
            themeButton.textContent = 'Light Theme';
        } else {
            themeButton.textContent = 'Dark Theme';
        }

        if (document.body.classList.contains('dark_mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.removeItem('theme');
        }
    }

    themeButton.addEventListener('click', toggleTheme);

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark_mode');
        themeButton.textContent = 'Light Theme';
    }
});
