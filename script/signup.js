// Get references to the form elements
var pass = document.getElementById("password");
var pass2 = document.getElementById("confirm-password");
var emailField = document.getElementById("email");
var fullname = document.getElementById("fullname");
var signupButton = document.getElementById("signup");

// Variables to store validation status
let a, b, c, d;

// Add event listeners to input fields for real-time validation
pass.addEventListener("input", short);
pass2.addEventListener("input", confirmpass);
emailField.addEventListener("input", email);
fullname.addEventListener("input", name);

// Function to validate the fullname field
function name() {
    // Regex to ensure fullname is at least two words, each with at least two letters, and no numbers
    const regexN = /^(?!.*\d)(?=.*\b\w{2,}\b.*\b\w{2,}\b)[A-Za-z ]{4,}$/;
    const isValid = regexN.test(fullname.value);
    const errorMessage = "Name should be at least two words, each with at least two letters, and have no numbers";
    
    // Set validation status and update error message
    d = isValid;
    document.getElementById("checkname").innerHTML = isValid || fullname.value.length === 0 ? "" : errorMessage;
}

// Function to validate the password field
function short() {
    // Regex to ensure password is at least 6 characters, with at least one uppercase letter, one lowercase letter, and one number
    const regexP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    a = regexP.test(pass.value);
    document.getElementById("checkpass").innerHTML = a || pass.value.length === 0 ? "" : "Password must be at least 6 characters, one uppercase letter and one number";
    
    // Check if passwords match immediately after validating password format
    confirmpass();
}

// Function to validate if passwords match
function confirmpass() {
    b = pass2.value === pass.value;
    document.getElementById("checkpass2").innerHTML = b ? "" : "Passwords do not match";
}

// Function to validate the email field
function email() {
    // Regex to ensure valid email format
    const regexE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    c = regexE.test(emailField.value);
    document.getElementById("checkemail").innerHTML = c || emailField.value.length === 0 ? "" : "Wrong Email format";
}

// Add event listener to the signup button for form submission
signupButton.addEventListener("click", signup);


// Function to handle form submission
function signup(event) {
    // If all fields are valid, store the data and redirect to signin page
    if (a && b && c && d) {
        const userdata = {
            id: new Date().getTime(),  // Unique ID based on current time
            fullname: fullname.value,  // Full name from the input field
            email: emailField.value,   // Email from the input field
            password: pass.value       // Password from the input field
        };

        // Store the user data in localStorage
        localStorage.setItem(userdata.email, JSON.stringify(userdata));
        
        // Notify the user of successful signup and redirect to signin page
        //  alert 

        Swal.fire({
            title: "Welcome!",
            text: "You have created a account successfuly",
            icon: "success",

            customClass: {
                confirmButton: 'swal-custom-button' // Custom class for the OK button
            }
        }).then(() => {
            // Redirect to login page after acknowledging the alert
            window.location.href = "login.html";
        });
        // window.location.href = "login.html";
    } else {
        // Prevent form submission if validation fails
        // Notify the user to correct errors before signing up
        event.preventDefault();

        //  custom alert functionality
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please correct the errors before signing up.",

            customClass: {
                confirmButton: 'swal-custom-button' // Custom class for the OK button
            }
        });
    }
}

// Check for dark mode preference and apply it
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark_mode');
}
