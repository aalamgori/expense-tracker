let loginForm = document.getElementById("loginForm");
let emailInput  = document.getElementById("email");
let passwordInput  = document.getElementById("password");
let errorMessage  = document.getElementById("errorMessage");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let email = emailInput.value.trim();
    let password = passwordInput.value.trim();

    if(email === "") {
        errorMessage.textContent = "Please enter email";
        return;
    }
    if(password === "") {
       errorMessage.textContent = "please enter password";
       return; 
    }
    if(email === "admin@gmail.com" && password === "12345") {
        window.location.href = "index.html";
    }
    else {
        errorMessage.textContent="Invalid email or password";
    }
})