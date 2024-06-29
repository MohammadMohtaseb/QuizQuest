// Function to handle the login process
function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Example validation (you should implement your own validation logic)
    if (email && password) {
        // Retrieve user data from localStorage based on email
        const userDataJSON = localStorage.getItem(email);

        if (userDataJSON) {
            try {
                // Parse the stored JSON string into an object
                const userData = JSON.parse(userDataJSON);

                // Check if the password matches
                if (userData.password === password) {
                    // Successful login
                    // Store user data in sessionStorage
                    sessionStorage.setItem('currentUser', JSON.stringify({ 
                        id: userData.id, 
                        fullname: userData.fullname,
                        email: userData.email
                    }));

                    // Redirect to dashboard page after setting sessionStorage
                    window.location.href = "main.html";
                } else {
                    // Incorrect password
                    alert("Incorrect password. Please try again.");
                }
            } catch (error) {
                console.error('Error parsing user data from localStorage:', error);
                alert("An error occurred. Please try again later.");
            }
        } else {
            // User data not found
            alert("User not found. Please check your email.");
        }
    } else {
        // Missing email or password
        alert("Please enter both email and password.");
    }
}

// Add event listener to the login button
document.getElementById("login").addEventListener("click", login);
