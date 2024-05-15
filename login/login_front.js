
var loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", login);

var account = document.getElementById("account").getElementsByTagName("input")[0];
var pword = document.getElementById("password").getElementsByTagName("input")[0];
var warning = document.getElementById("warning");

function login () {
	var ifLogin = 4;//ifLoginFunc(account.value.trim(), pword.value.trim());
	var accountColor = "";
	var pwordColor = "";
	var warningText = "";
	if (ifLogin == 0) {
		accountColor = "#AE0000";
		pwordColor = "#DDDDDD";
		warningText = "*請輸入帳號";
	} else if (ifLogin == 1) {
		accountColor = "#DDDDDD";
		pwordColor = "#AE0000";
		warningText = "*請輸入密碼";
	} else if (ifLogin == 2) {
		accountColor = "#AE0000";
		pwordColor = "#DDDDDD";
		warningText = "*此帳號尚未註冊";
	} else if (ifLogin == 3) {
		accountColor = "#DDDDDD";
		pwordColor = "#AE0000";
		warningText = "*密碼錯誤";
	} else if (ifLogin == 4) {
		account.value = "";
		pword.value = "";
		window.location.href = "../homepage/homepage.html";
	}
	account.style.borderColor = accountColor;
	account.addEventListener("focus", ()=>{account.style.borderColor = "#ffb482";});
	account.addEventListener("focusout", ()=>{account.style.borderColor = accountColor;});
	pword.style.borderColor = pwordColor;
	pword.addEventListener("focus", ()=>{pword.style.borderColor = "#ffb482";});
	pword.addEventListener("focusout", ()=>{pword.style.borderColor = pwordColor;});
	warning.innerHTML = warningText;
}