document.addEventListener('DOMContentLoaded', () => {
    const themeButton = document.querySelector('.theme_btn');
    const imgElement = document.querySelector('.right img');
    const login = document.querySelector('#login_btn');
    const signup = document.querySelector('#sign_up');
    const logout = document.querySelector('#logout');



    if (sessionStorage.getItem('currentUser')) {
        login.style.display = "none";
        signup.style.display = "none";
        logout.style.display = "block";
    } else {
        login.style.display = "block";
        signup.style.display = "block";
    }


    const log = document.getElementById("logout");
    log.addEventListener("click", logoutt);

    function logoutt() {
        sessionStorage.clear();
    }

    function toggleTheme() {
        document.body.classList.toggle('dark_mode');

        if (document.body.classList.contains('dark_mode')) {
            themeButton.textContent = 'Light Theme';
            imgElement.src = imgElement.getAttribute('data-dark-src');
        } else {
            themeButton.textContent = 'Dark Theme';
            imgElement.src = imgElement.src.replace('QuizPicDark.jpg', 'QuizPicLight.png');
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
        imgElement.src = imgElement.getAttribute('data-dark-src');
    }
});

// tryQuiz button function 
const tryQuiz = document.getElementById("try_quiz");
tryQuiz.addEventListener('click', checkIfSession);

function checkIfSession() {
    if (sessionStorage.getItem('currentUser')) {
        window.location.href = "main.html";
    } else {
        window.location.href = "login.html";
    }
}

function searchVideos() {
    const apiKey = 'AIzaSyA39UQG9KZjyfUEsyPHW_RjL7LeDiU_VY8';
    const video = document.getElementById("vid");
    const query = "zaid";  // Replace with your desired search query

    console.log('Fetching videos for query:', query);

    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Received data:', data);
            if (data.items && data.items.length > 0) {
                const videoId = data.items[0].id.videoId;
                video.src = `https://www.youtube.com/embed/${videoId}`;
            } else {
                console.error('No videos found.');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Call searchVideos when the page loads
window.onload = searchVideos;