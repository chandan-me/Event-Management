const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("phone").value;
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirmPassword").value;
        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(phone)) {
            alert("Phone number must contain exactly 10 digits");
            return;
        }
        if (
            name === "" ||
            email === "" ||
            phone === "" ||
            password === "" ||
            confirmPassword === ""
        ) {
            alert("Please fill all fields");
            return;
        }
        if (password !== confirmPassword) {
            document.querySelector(".container").classList.add("error");
            setTimeout(function() {
                document.querySelector(".container").classList.remove("error");
            }, 400);
            alert("Passwords do not match");
            return;
        }
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let existingUser = users.find((user) => user.email === email);
        if (existingUser) {
            alert("Email already exists");
            return;
        }
        let user = {
            name,
            email,
            phone,
            password
        };
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Signup Successful");
        window.location.href = "login.html";
    });
}
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        let email = document.getElementById("loginEmail").value;
        let password = document.getElementById("loginPassword").value;
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let user = users.find(function(user) {
            return user.email === email && user.password === password;
        });
        if (user) {
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            alert("Login Successful");
            window.location.href = "index.html";
        } else {
            alert("Invalid Email or Password");
        }
    });
} // ====================== // FORGOT PASSWORD // ====================== const forgotForm = document.getElementById("forgotForm"); if(forgotForm){ forgotForm.addEventListener( "submit", function(event){ event.preventDefault(); let email = document.getElementById("forgotEmail").value; let newPassword = document.getElementById("newPassword").value; let users = JSON.parse( localStorage.getItem("users") ) || []; let user = users.find(function(user){ return user.email === email; }); if(!user){ alert("Email Not Found"); return; } user.password = newPassword; localStorage.setItem( "users", JSON.stringify(users) ); alert( "Password Updated Successfully" ); window.location.href = "login.html"; }); } const toggleSignupPassword = document.getElementById("toggleSignupPassword"); if(toggleSignupPassword){ toggleSignupPassword.addEventListener( "click", function(){ let password = document.getElementById("password"); if(password.type === "password"){ password.type = "text"; this.innerText = "Hide Password"; } else{ password.type = "password"; this.innerText = "Show Password"; } }); } const passwordInput = document.getElementById("password"); if(passwordInput){ passwordInput.addEventListener( "keyup", function(){ let password = passwordInput.value; let strength = document.getElementById("strength"); if(password.length < 6){ strength.innerText = "Weak Password"; strength.style.color = "red"; } else if(password.length < 10){ strength.innerText = "Medium Password"; strength.style.color = "orange"; } else{ strength.innerText = "Strong Password"; strength.style.color = "green"; } }); } const confirmPassword = document.getElementById("confirmPassword"); if(confirmPassword){ confirmPassword.addEventListener( "keyup", function(){ let password = document.getElementById("password").value; let confirm = confirmPassword.value; let message = document.getElementById("matchMessage"); if(confirm === ""){ message.innerText = ""; } else if(password === confirm){ message.innerText = "Passwords Match"; message.style.color = "green"; } else{ message.innerText = "Passwords Do Not Match"; message.style.color = "red"; } }); }