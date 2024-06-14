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
			window.localStorage.setItem("userdata", emailValue);
            window.location.href = "../homepage/homepage.html";
        } else {
            if (data.error === "Missing credentials") {
                if (!nameValue) {
					nameColor = "#AE0000";
					warningText += "請輸入使用者名稱";
				} else if (!emailValue) {
					emailColor = "#AE0000";
					warningText += "請輸入電子郵件";
				} else {
					pwordColor = "#AE0000";
					warningText += "請設定密碼";
				}
            } else if (data.error === "Email already registered") {
                emailColor = "#AE0000";
                warningText += "電子郵件已註冊";
            } else if (data.error === "Password already used") {
				pwordColor = "#AE0000";
                warningText += "密碼已被使用"; 
            } else if (data.error === "Password length error") {
				pwordColor = "#AE0000";
                warningText += "密碼須介於 6-12 字元";
            } else {
				pwordColor = "#AE0000";
                warningText += "密碼僅能包含英文或數字";
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
