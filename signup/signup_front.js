document.addEventListener("DOMContentLoaded", function() {
    var signupBtn = document.getElementById("signupBtn");
    signupBtn.addEventListener("click", signup);

    var username = document.getElementById("name").getElementsByTagName("input")[0];
    var email = document.getElementById("email").getElementsByTagName("input")[0];
    var pword = document.getElementById("password").getElementsByTagName("input")[0];
    var warning = document.getElementById("warning");

    function signup() {
        const nameValue = username.value.trim();
        const emailValue = email.value.trim();
        const pwordValue = pword.value.trim();

        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: nameValue, email: emailValue, password: pwordValue })
        })
        .then(response => response.json())
        .then(data => {
            let nameColor = "";
            let emailColor = "";
            let pwordColor = "";
            let warningText = "*";

            if (data.success) {
                username.value = "";
                email.value = "";
                pword.value = "";
                window.location.href = "../homepage/homepage.html";
            } else {
                if (data.error === "Email already registered") {
                    emailColor = "#AE0000";
                    warningText += "Email already registered"; // "This email is already registered"
                } else if (data.error === "Username already registered") {
                    emailColor = "#AE0000";
                    warningText += "Username already registered"; // "This email is already registered"
                } else if (data.error === "All fields are required") {
                    warningText += "All fields are required"; 
                } else {
                    warningText += "註冊失敗，請重試"; // "Registration failed, please try again"
                }
            }

            username.style.borderColor = nameColor;
            username.addEventListener("focus", () => { username.style.borderColor = "#ffb482"; });
            username.addEventListener("focusout", () => { username.style.borderColor = nameColor; });
            email.style.borderColor = emailColor;
            email.addEventListener("focus", () => { email.style.borderColor = "#ffb482"; });
            email.addEventListener("focusout", () => { email.style.borderColor = emailColor; });
            pword.style.borderColor = pwordColor;
            pword.addEventListener("focus", () => { pword.style.borderColor = "#ffb482"; });
            pword.addEventListener("focusout", () => { pword.style.borderColor = pwordColor; });
            warning.innerHTML = warningText;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});
