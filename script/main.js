const log=document.getElementById("logout");
log.addEventListener("click",logout);

function logout(){
    sessionStorage.clear();
    window.location.href= "home.html";
}

const userfName = document.getElementById("user_name");

if (sessionStorage.getItem('currentUser')) {
    const currentUserData = JSON.parse(sessionStorage.getItem('currentUser'));
    const name = currentUserData.fullname;
    userfName.textContent = name;
} else {
    userfName.textContent = "Guest";
}