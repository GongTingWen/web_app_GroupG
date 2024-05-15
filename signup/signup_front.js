
var signupBtn = document.getElementById("signupBtn");
signupBtn.addEventListener("click", signup);

var name = document.getElementById("name").getElementsByTagName("input")[0];
var email = document.getElementById("email").getElementsByTagName("input")[0];
var pword = document.getElementById("password").getElementsByTagName("input")[0];
var warning = document.getElementById("warning");

function signup () {
	var ifName = 2;//ifNameFunc(name.value.trim());
	var ifEmail = 2;//ifEmailFunc(email.value.trim());
	var ifPword = 3;//ifPwordFunc(pword.value.trim());
	var nameColor = "";
	var emailColor = "";
	var pwordColor = "";
	var warningText = "*";
	if (ifName == 2 && ifEmail == 2 && ifPword == 3) {
		//addUser(name.value.trim(), email.value.trim(), pword.value.trim());
		name.value = "";
		email.value = "";
		pword.value = "";
		window.location.href = "../homepage/homepage.html";
	}
	if (ifName == 0) {
		nameColor = "#AE0000";
		warningText += "請輸入使用者名稱；";
	} else if (ifName == 1) {
		nameColor = "#AE0000";
		warningText += "使用者名稱勿超過 50 字元；";
	} else if (ifName == 2) {
		nametColor = "#DDDDDD";
	}
	if (ifEmail == 0) {
		emailColor = "#AE0000";
		warningText += "請輸入電子郵件地址；";
	} else if (ifEmail == 1) {
		emailColor = "#AE0000";
		warningText += "此電子郵件已註冊；";
	} else if (ifEmail == 2) {
		emailtColor = "#DDDDDD";
	}
	if (ifPword == 0) {
		pwordColor = "#AE0000";
		warningText += "請設定密碼；";
	} else if (ifPword == 1) {
		pwordColor = "#AE0000";
		warningText += "密碼須介於 6-12 字元；";
	} else if (ifPword == 2) {
		pwordColor = "#AE0000";
		warningText += "密碼僅能包含英文及數字；";
	} else if (ifPword == 3) {
		pwordColor = "#DDDDDD";
	}
	warningText = warningText.substr(0, warningText.length - 1);
	name.style.borderColor = nameColor;
	name.addEventListener("focus", ()=>{name.style.borderColor = "#ffb482";});
	name.addEventListener("focusout", ()=>{name.style.borderColor = nameColor;});
	email.style.borderColor = emailColor;
	email.addEventListener("focus", ()=>{email.style.borderColor = "#ffb482";});
	email.addEventListener("focusout", ()=>{email.style.borderColor = emailColor;});
	pword.style.borderColor = pwordColor;
	pword.addEventListener("focus", ()=>{pword.style.borderColor = "#ffb482";});
	pword.addEventListener("focusout", ()=>{pword.style.borderColor = pwordColor;});
	warning.innerHTML = warningText;
}