
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
var newpassword = document.getElementById("newpassword");

var user = "";
var vCode = "";

function sendcode () {
	var ifSend = 2;//ifSendFunc(emailText.value.trim());
	var emailTextColor = "";
	var warningText = "";
	if (ifSend == 0){
		emailTextColor = "#AE0000";
		warningText = "*請輸入電子郵件";
	} else if (ifSend == 1) {
		emailTextColor = "#AE0000";
		warningText = "*此電子郵件尚未註冊";
	} else if (ifSend == 2) {
		user = emailText;
		emailTextColor = "#DDDDDD";
		vCode = "";
		var name = "史迪奇";//getName(emailText);
		for (var i=0; i<4; i++) {
			var x = Math.floor((Math.random() * 10) + 1) - 1;
			vCode += x.toString();
		}
		var params = {email: emailText.value.trim(),
					  to_name: name,
					  message: vCode};
		emailjs.send("service_kr0io29","template_mmwrlao",params)
		.then((res) => {
			code.style.display = "flex";
			sendcodeBtn.innerHTML = "<span>再次傳送驗證碼</span>";
		})
		.catch((err) => {console.log(err);});
	}
	emailText.style.borderColor = emailTextColor;
	emailText.addEventListener("focus", ()=>{emailText.style.borderColor = "#ffb482";});
	emailText.addEventListener("focusout", ()=>{emailText.style.borderColor = emailTextColor;});
	warning.innerHTML = warningText;
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
			newpassword.style.display = "flex";
			updateBtn.style.display = "inline-block";
		} else {
			codeTextColor = "#AE0000";
			warningText = "*驗證碼錯誤";
		}
	}
	codeText.style.borderColor = codeTextColor;
	codeText.addEventListener("focus", ()=>{codeText.style.borderColor = "#ffb482";});
	codeText.addEventListener("focusout", ()=>{codeText.style.borderColor = codeTextColor;});
	warning.innerHTML = warningText;
}

function update () {
	var ifUpdate = 3;//ifUpdateFunc(user, newpassword.getElementsByTagName("input")[0].value.trim());
	var newpasswordColor = "";
	var warningText = "";
	if (ifUpdate == 0) {
		pwordColor = "#AE0000";
		warningText = "*請設定密碼";
	} else if (ifUpdate == 1) {
		pwordColor = "#AE0000";
		warningText = "*密碼須介於 6-12 字元";
	} else if (ifUpdate == 2) {
		pwordColor = "#AE0000";
		warningText = "*密碼僅能包含英文及數字";
	} else if (ifUpdate == 3) {
		emailText.value = "";
		codeText.value = "";
		newpassword.getElementsByTagName("input")[0].value = "";
		window.location.href = "../homepage/homepage.html";
	}
	newpassword.getElementsByTagName("input")[0].style.borderColor = newpasswordColor;
	newpassword.getElementsByTagName("input")[0].addEventListener("focus", ()=>{newpassword.getElementsByTagName("input")[0].style.borderColor = "#ffb482";});
	newpassword.getElementsByTagName("input")[0].addEventListener("focusout", ()=>{newpassword.getElementsByTagName("input")[0].style.borderColor = pwordColor;});
	warning.innerHTML = warningText;
}