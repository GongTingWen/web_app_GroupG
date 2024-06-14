var sendcodeBtn = document.getElementById("sendcodeBtn");
sendcodeBtn.addEventListener("click", sendcode);

var verifyBtn = document.getElementById("verifyBtn");
verifyBtn.addEventListener("click", verify);

var updateBtn = document.getElementById("updateBtn");
updateBtn.addEventListener("click", update);

var emailText = document.getElementById("email").getElementsByTagName("input")[0];
var warning = document.getElementById("warning");
var code = document.getElementById("code");
var codeText = document.getElementById("code").getElementsByTagName("input")[0];
var newPasswordContainer = document.getElementById("newpassword");
var newPasswordInput = newPasswordContainer.getElementsByTagName("input")[0];

var user = "";
var vCode = "";

function sendcode () {
    var email = emailText.value.trim();

    fetch('/forgetpassword', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        var emailTextColor = "";
        var warningText = "";

        if (data.success) {
            user = emailText;
            emailTextColor = "#DDDDDD";
            vCode = "";
            var name = data.username;
            for (var i=0; i<4; i++) {
                var x = Math.floor((Math.random() * 10) + 1) - 1;
                vCode += x.toString();
            }
            var params = {
                email: emailText.value.trim(),
                to_name: name,
                message: vCode
            };
            emailjs.send("service_kr0io29","template_mmwrlao",params)
            .then((res) => {
                code.style.display = "flex";
                sendcodeBtn.innerHTML = "<span>再次傳送驗證碼</span>";
            })
            .catch((err) => {console.log(err);});
        } else {
            if (data.error === "Missing credentials"){
                emailTextColor = "#AE0000";
                warningText = "*請輸入電子郵件";
            } else if (data.error === "User doesn't exist") {
                emailTextColor = "#AE0000";
                warningText = "*此電子郵件尚未註冊";
            } 
        }
        emailText.style.borderColor = emailTextColor;
        emailText.addEventListener("focus", () => { emailText.style.borderColor = "#ffb482"; });
        emailText.addEventListener("focusout", () => { emailText.style.borderColor = emailTextColor; });
        warning.innerHTML = warningText;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function verify() {
    var codeTextColor = "";
    var warningText = "";
    if (codeText.value.trim() == "") {
        codeTextColor = "#AE0000";
        warningText = "*請輸入驗證碼";
    } else {
        if (codeText.value.trim() == vCode) {
            codeTextColor = "#DDDDDD";
            newPasswordContainer.style.display = "flex";
            updateBtn.style.display = "inline-block";
        } else {
            codeTextColor = "#AE0000";
            warningText = "*驗證碼錯誤";
        }
    }
    codeText.style.borderColor = codeTextColor;
    codeText.addEventListener("focus", () => { codeText.style.borderColor = "#ffb482"; });
    codeText.addEventListener("focusout", () => { codeText.style.borderColor = codeTextColor; });
    warning.innerHTML = warningText;
}

function update() {
	var email = emailText.value.trim();
    var newPassword = newPasswordInput.value.trim(); // Get the input value

    fetch('/updatepassword', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: newPassword }) // Send the input value
    })
    .then(response => response.json())
    .then(data => {
        var newPasswordColor = "";
        var warningText = "";

        if (data.success) {
            // Clear input fields and redirect
            emailText.value = "";
            codeText.value = "";
            newPasswordInput.value = "";
            window.localStorage.setItem("userdata", user);
            window.location.href = "../login/login.html";
        } else {
            if (data.error === "Missing credentials") {
                newPasswordColor = "#AE0000";
                warningText = "*請設定密碼";
            } else if (data.error === "Password already used") {
                newPasswordColor = "#AE0000";
                warningText = "*密碼已被使用";
            } else if (data.error === "Password length error") {
				newPasswordColor = "#AE0000";
                warningText = "*密碼須介於 6-12 字元";
			} else if (data.error === "Password form error") {
				newPasswordColor = "#AE0000";
                warningText = "*密碼僅能包含英文或數字";
			}
        }
        
        newPasswordInput.style.borderColor = newPasswordColor;
        newPasswordInput.addEventListener("focus", () => { newPasswordInput.style.borderColor = "#ffb482"; });
        newPasswordInput.addEventListener("focusout", () => { newPasswordInput.style.borderColor = newPasswordColor; });
        warning.innerHTML = warningText;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
