var loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", login);

function login() {
	var email = document.getElementById("account").getElementsByTagName("input")[0];
	var pword = document.getElementById("password").getElementsByTagName("input")[0];
	var warning = document.getElementById("warning");
    const username = email.value.trim(); // Use email input as username
    const password = pword.value.trim();

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password }) // Send email as username
    })
    .then(response => response.json())
    .then(data => {
        let emailColor = "";
        let pwordColor = "";
        let warningText = "";

        if (data.success) {
            email.value = "";
            pword.value = "";
            window.localStorage.setItem("userdata", username);
            window.location.href = "../homepage/homepage.html";
        } else {
            if (data.error === "User doesn't exist") {
                emailColor = "#AE0000";
                pwordColor = "#DDDDDD";
                warningText += "*此帳號尚未註冊"; // "This email is not registered"
            } else if (data.error === "Password doesn't match") {
                emailColor = "#DDDDDD";
                pwordColor = "#AE0000";
                warningText += "*密碼錯誤"; // "Incorrect password"
            } else if (data.error === "Missing credentials") {
                if (!username) {
                    emailColor = "#AE0000";
                    warningText += "*請輸入帳號"; // "Please enter email"
                }else if (!password) {
                    pwordColor = "#AE0000";
                    warningText += "*請輸入密碼"; // "Please enter password"
                }
            }
        }

        email.style.borderColor = emailColor;
        email.addEventListener("focus", () => { email.style.borderColor = "#ffb482"; });
        email.addEventListener("focusout", () => { email.style.borderColor = emailColor; });
        pword.style.borderColor = pwordColor;
        pword.addEventListener("focus", () => { pword.style.borderColor = "#ffb482"; });
        pword.addEventListener("focusout", () => { pword.style.borderColor = pwordColor; });
        warning.innerHTML = warningText;
    })
    .catch(error => {
		alert('Error:' + error);
        console.error('Error:', error);
    });
}