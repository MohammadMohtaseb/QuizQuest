const log=document.getElementById("logout");
log.addEventListener("click",logout);

function logout(){
    sessionStorage.clear();
    window.location.href= "login.html";
}