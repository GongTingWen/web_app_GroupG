
var user = document.getElementById("user");
var content = [];
var isLogin = 0;
var whichPage = 0;
menu1();
function menu1 () {
	whichPage = 0;
	$("#search input").attr("placeholder", "在所有繪本中搜尋"); 
	$("#search").css("display", "flex");
	$("#main").css("margin-top", "25vh"); 
	var [state, books] = [1, [[["000007", "盲人「看」顏色", "圖：龔郁雯/文 ：龔郁婷", "../bookpage/000007.png", "bookmark-off.png"], 
							   ["000027", "如果顏色是個人", "圖/文：陳薇安", "../bookpage/000027.png", "bookmark-off.png"],
							   ["000015", "石頭的輪迴", "圖：龔郁雯/文 ：陳薇安", "../bookpage/000015.png", "bookmark-off.png"],
							   ["000021", "想嘗一口嗎？", "圖/文：龔郁婷", "../bookpage/000021.png", "bookmark-off.png"],
							   ["000008", "What color is your hat?", "圖/文：陳薇安", "../bookpage/000008.png", "bookmark-off.png"]], 
							  [["000024", "白色山藥不見了", "圖：龔郁婷/文：陳薇安", "../bookpage/000024.png", "bookmark-off.png"], 
							   ["000021", "想嘗一口嗎？", "圖/文：龔郁婷", "../bookpage/000021.png", "bookmark-off.png"],
							   ["000022", "百變甜心", "圖：龔郁婷/文：龔郁雯", "../bookpage/000022.png", "bookmark-off.png"],
							   ["000023", "Bon Appétit", "圖/文：陳薇安", "../bookpage/000023.png", "bookmark-off.png"],
							   ["000025", "福爾摩沙食物圖鑑", "圖/文：陳薇安", "../bookpage/000025.png", "bookmark-off.png"]], 
							  [["000015", "石頭的輪迴", "圖：龔郁雯/文 ：陳薇安", "../bookpage/000015.png", "bookmark-off.png"], 
							   ["000026", "米米愛蛋糕", "圖：龔郁雯/文：龔郁婷", "../bookpage/000026.png", "bookmark-off.png"]]]];//contentFunc();
	content = books;
	isLogin = state;
	if (isLogin == 0) {
		user.innerHTML = "<button id='signupBtn'>註冊<span></span><span></span><span></span><span></span></button><button id='loginBtn'>登入<span></span><span></span><span></span><span></span></button>";
	} else if (isLogin == 1) {
		var userName = "史迪奇";//getName();
		var photo = "book328553.png";//getPhoto();
		user.innerHTML = "<div id='profile'><div></div></div><div id='profileName'></div><button id='signoutBtn'>登出<span></span><span></span><span></span><span></span></button>";
		var profile = document.getElementById("profile").getElementsByTagName("div")[0];
		var profileName = document.getElementById("profileName");
		profile.style.backgroundImage = "url('"+ photo + "')";
		profileName.innerHTML = userName;
	}
	var section_name = ["本月精選", "為您推薦", "繼續完成"];
	var main = document.getElementById("main");
	main.innerHTML = "";
	for (var i=0; i<3; i++) {
		if (content[i].length != 0) {
			main.innerHTML +=   "<div class='section'>" +
									"<div class='section-name'>" + section_name[i] + "</div>" +
									"<div class='bookshelf'>" +
									"</div>" +
								"</div>";
			var bookshelf = document.getElementsByClassName("bookshelf")[i];
			for (var j=0; j<content[i].length; j++) {
				bookshelf.innerHTML +=  "<div id='" + i.toString() + content[i][j][0] + "' class='book'>" +
											"<div class='cover'></div>" +
											"<div id='" + i.toString() + j.toString() + "' class='mask'>" +
												"<div class='bookmark'></div>" +
												"<div class='preview'></div>" +
												"<div class='edit'></div>" +
											"</div>" +
											"<div class='book-name'>" + content[i][j][1] + "</div>" +
											"<div class='author-name'>" + content[i][j][2] + "</div>" +
										"</div>";
				var cover = document.getElementById(i.toString() + content[i][j][0]).getElementsByClassName("cover")[0];
				var bookmark = document.getElementById(i.toString() + content[i][j][0]).getElementsByClassName("bookmark")[0];
				cover.style.backgroundImage = "url(" + content[i][j][3] + ")";
				bookmark.style.backgroundImage = "url(" + content[i][j][4] + ")";
			}
		}
	}
	main.innerHTML += "<div class='section'><div class='section-ad'></div></div><div class='section'><div class='section-last'>© Meraki</div></div>";
	var adPic = "../ad/0001.jpg";//adFunc();
	$(".section-ad").css("background-image", "url(" + adPic + ")");
}

$(".bookmark").mouseenter(function (){
	$(this).css("background-image", "url('bookmark-on.png')");
});

$(".bookmark").mouseleave(function (){
	var markIDR = parseInt($(this).parent().attr("id").substr(0, 1));
	var markIDL = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
	if (content[markIDR][markIDL][4] == "bookmark-on.png") {
		$(this).css("background-image", "url('bookmark-on.png')");
	} else {
		$(this).css("background-image", "url('bookmark-off.png')");
	}
});

$(".bookmark").click(function (){
	if (isLogin == 0) {
		window.location.href = "../login/login.html";
	} else {
		var markIDR = parseInt($(this).parent().attr("id").substr(0, 1));
		var markIDL = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
		if (content[markIDR][markIDL][4] == "bookmark-on.png") {
			$(this).css("background-image", "url('bookmark-off.png')");
			content[markIDR][markIDL][4] = "bookmark-off.png";
			//changeMark(content[markIDR][markIDL][0], content[markIDR][markIDL][4]);
			for (var i=0; i<3; i++) {
				for (var j=0; j<content[i].length; j++) {
					if (content[i][j][0] == content[markIDR][markIDL][0]) {
						$("#" + i.toString() + j.toString() + " .bookmark").css("background-image", "url('bookmark-off.png')");
						content[i][j][4] = "bookmark-off.png";
					}
				}
			}
		} else {
			$(this).css("background-image", "url('bookmark-on.png')");
			content[markIDR][markIDL][4] = "bookmark-on.png";
			//changeMark(content[markIDR][markIDL][0], content[markIDR][markIDL][4]);
			for (var i=0; i<3; i++) {
				for (var j=0; j<content[i].length; j++) {
					if (content[i][j][0] == content[markIDR][markIDL][0]) {
						$("#" + i.toString() + j.toString() + " .bookmark").css("background-image", "url('bookmark-on.png')");
						content[i][j][4] = "bookmark-on.png";
					}
				}
			}
		}
	}
});

$("#signupBtn").click(function (){
	window.location.href = "../signup/signup.html";
});

$("#loginBtn").click(function (){
	window.location.href = "../login/login.html";
});

$("#signoutBtn").click(function (){
	//signout();
	window.location.href = "../homepage/homepage.html";
});

$("#theme").mouseenter(function (){
	var alltheme = ["童話故事", "科普知識", "色彩原理", "古典文學", "烹飪教室", "數學邏輯"]; //allthemeFunc();
	var themehtml = "";
	for (var i=0; i<alltheme.length; i++) {
		themehtml += "<div class='themeOpt'>" + alltheme[i] + "</div>";
	}
	$("#themeList").html(themehtml);
	$(".themeOpt").click(function () {
		whichPage = 0;
		$("#search input").attr("placeholder", "在所有繪本中搜尋"); 
		$("#search").css("display", "flex");
		$("#main").css("margin-top", "25vh"); 
		var optionText = $(this).text();
		var optionType = $(this).attr("class");
		var searchBook = [["000014", "我所知道的家園", "圖/文：龔郁婷", "../bookpage/000014.png", "bookmark-on.png"], 
						  ["000015", "石頭的輪迴", "圖：龔郁雯/文 ：陳薇安", "../bookpage/000015.png", "bookmark-off.png"],
						  ["000016", "Happy Ever After", "圖：龔郁婷/文：陳薇安", "../bookpage/000016.png", "bookmark-off.png"],
						  ["000017", "笑一個", "圖/文：龔郁婷", "../bookpage/000017.png", "bookmark-off.png"],
						  ["000018", "藍色小精靈", "圖：龔郁雯/文：龔郁婷", "../bookpage/000018.png", "bookmark-off.png"]];//categoryBookFunc(optionText, optionType);
		var main = document.getElementById("main");
		main.innerHTML = "";
		if (searchBook.length != 0) {
			main.innerHTML +=   "<div class='section'>" +
									"<div class='section-name'>" + optionText + "</div>" +
									"<div class='bookshelf'>" +
									"</div>" +
								"</div>" +
								"<div class='section'><button id='backBtn'>回首頁<span></span><span></span><span></span><span></span></button></div>" +
								"<div class='section'><div class='section-last'>© Meraki</div></div>";
			var bookshelf = document.getElementsByClassName("bookshelf")[0];
			for (var j=0; j<searchBook.length; j++) {
				bookshelf.innerHTML +=  "<div id='" + "s" + searchBook[j][0] + "' class='book'>" +
											"<div class='cover'></div>" +
											"<div id='" + "s" + j.toString() + "' class='mask'>" +
												"<div class='sbookmark'></div>" +
												"<div class='spreview'></div>" +
												"<div class='sedit'></div>" +
											"</div>" +
											"<div class='book-name'>" + searchBook[j][1] + "</div>" +
											"<div class='author-name'>" + searchBook[j][2] + "</div>" +
										"</div>";
				var cover = document.getElementById("s" + searchBook[j][0]).getElementsByClassName("cover")[0];
				var bookmark = document.getElementById("s" + searchBook[j][0]).getElementsByClassName("sbookmark")[0];
				cover.style.backgroundImage = "url(" + searchBook[j][3] + ")";
				bookmark.style.backgroundImage = "url(" + searchBook[j][4] + ")";
			}
		}
		$(".spreview").click(function () {
			var page = 0;
			var markIDN = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
			var preview_pic = ["../bookpage/000015-page0.png", "../bookpage/construction.png", "../bookpage/construction.png", "../bookpage/construction.png"];//getPreviewFunc(searchBook[markIDN][0]);
			$("body").append("<div id='preview-screen-container'><div id='preview-screen'>" + searchBook[markIDN][1] + "<br><span>" + searchBook[markIDN][2] +"</span><div id='preview-pic'><div id='switchPage'><div id='leftPage'>〈</div><div id='rightPage'>〉</div></div></div><button id='editBtn'>編輯</buttton><button id='close'>×</buttton></div></div>");
			$("#preview-pic").css("background-image", "url('" + preview_pic[page] + "')");
			$("#close").click(function () {
				$("#preview-screen-container").remove();
			});
			$("#leftPage").click(function () {
				if (page != 0) {
					page -= 1;
					$("#preview-pic").css("background-image", "url('" + preview_pic[page] + "')");
				}
			});
			$("#rightPage").click(function () {
				if (page != (preview_pic.length - 1)) {
					page += 1;
					$("#preview-pic").css("background-image", "url('" + preview_pic[page] + "')");
				}
			});
			$("#editBtn").click(function () {
				if (isLogin == 1) {
					//editBookFunc(searchBook[markIDN][0]);
					window.location.href = "../edit/edit.html";
				} else {
					window.location.href = "../login/login.html";
				}
			});
		});
		$(".sedit").click(function () {
			var markIDN = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
			if (isLogin == 1) {
				//editBookFunc(searchBook[markIDN][0]);
				window.location.href = "../edit/edit.html";
			} else {
				window.location.href = "../login/login.html";
			}
		});
		$(".sbookmark").click(function (){
			if (isLogin == 0) {
				window.location.href = "../login/login.html";
			} else {
				var markIDN = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
				if (searchBook[markIDN][4] == "bookmark-on.png") {
					$(this).css("background-image", "url('bookmark-off.png')");
					searchBook[markIDN][4] = "bookmark-off.png";
					//changeMark(searchBook[markIDN][0], searchBook[markIDN][4]);
				} else {
					$(this).css("background-image", "url('bookmark-on.png')");
					searchBook[markIDN][4] = "bookmark-on.png";
					//changeMark(searchBook[markIDN][0], searchBook[markIDN][4]);
				}
			}
		});
		$(".sbookmark").mouseenter(function (){
			$(this).css("background-image", "url('bookmark-on.png')");
		});
		$(".sbookmark").mouseleave(function (){
			var markIDN = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
			if (searchBook[markIDN][4] == "bookmark-on.png") {
				$(this).css("background-image", "url('bookmark-on.png')");	
			} else {
				$(this).css("background-image", "url('bookmark-off.png')");
			}
		});
		$("#backBtn").click(function () {
			window.location.href = "../homepage/homepage.html";
		});
	});
});

$("#author").mouseenter(function (){
	var allauthor = ["陳薇安", "龔郁婷", "龔郁雯"]; //allauthorFunc();
	var authorhtml = "";
	for (var i=0; i<allauthor.length; i++) {
		authorhtml += "<div class='authorOpt'>" + allauthor[i] + "</div>";
	}
	$("#authorList").html(authorhtml);
	$(".authorOpt").click(function () {
		whichPage = 0;
		$("#search input").attr("placeholder", "在所有繪本中搜尋");
		$("#search").css("display", "flex");
		$("#main").css("margin-top", "25vh"); 
		var optionText = $(this).text();
		var optionType = $(this).attr("class");
		var searchBook = [["000002", "我已經長大了", "圖/文：龔郁雯", "../bookpage/000002.png", "bookmark-off.png"], 
						  ["000005", "佳人素描", "圖：龔郁婷/文：龔郁雯", "../bookpage/000005.png", "bookmark-off.png"],
						  ["000006", "誰有綠眼睛？", "圖/文：龔郁雯", "../bookpage/000006.png", "bookmark-off.png"],
						  ["000007", "盲人「看」顏色", "圖：龔郁雯/文 ：龔郁婷", "../bookpage/000007.png", "bookmark-off.png"],
						  ["000011", "雨中燈下", "圖：龔郁雯/文 ：龔郁婷", "../bookpage/000011.png", "bookmark-off.png"],
						  ["000012", "愛穿紫色衣服的皇帝", "圖/文：龔郁雯", "../bookpage/000012.png", "bookmark-off.png"],
						  ["000013", "西湖主", "圖：龔郁雯/文 ：龔郁婷", "../bookpage/000013.png", "bookmark-off.png"],
						  ["000015", "石頭的輪迴", "圖：龔郁雯/文 ：陳薇安", "../bookpage/000015.png", "bookmark-off.png"],
						  ["000018", "藍色小精靈", "圖：龔郁雯/文：龔郁婷", "../bookpage/000018.png", "bookmark-off.png"],
						  ["000020", "遨遊色碼宇宙", "圖/文：龔郁雯", "../bookpage/000020.png", "bookmark-off.png"],
						  ["000022", "百變甜心", "圖：龔郁婷/文：龔郁雯", "../bookpage/000022.png", "bookmark-off.png"],
						  ["000026", "米米愛蛋糕", "圖：龔郁雯/文：龔郁婷", "../bookpage/000026.png", "bookmark-off.png"],
						  ["000028", "換季的信息", "圖：龔郁婷/文：龔郁雯", "../bookpage/000028.png", "bookmark-off.png"],
						  ["000030", "寵物國的世界觀", "圖/文：龔郁雯", "../bookpage/000030.png", "bookmark-off.png"]];//categoryBookFunc(optionText, optionType);
		var main = document.getElementById("main");
		main.innerHTML = "";
		if (searchBook.length != 0) {
			main.innerHTML +=   "<div class='section'>" +
									"<div class='section-name'>" + optionText + "</div>" +
									"<div class='bookshelf'>" +
									"</div>" +
								"</div>" +
								"<div class='section'><button id='backBtn'>回首頁<span></span><span></span><span></span><span></span></button></div>" +
								"<div class='section'><div class='section-last'>© Meraki</div></div>";
			var bookshelf = document.getElementsByClassName("bookshelf")[0];
			for (var j=0; j<searchBook.length; j++) {
				bookshelf.innerHTML +=  "<div id='" + "s" + searchBook[j][0] + "' class='book'>" +
											"<div class='cover'></div>" +
											"<div id='" + "s" + j.toString() + "' class='mask'>" +
												"<div class='sbookmark'></div>" +
												"<div class='spreview'></div>" +
												"<div class='sedit'></div>" +
											"</div>" +
											"<div class='book-name'>" + searchBook[j][1] + "</div>" +
											"<div class='author-name'>" + searchBook[j][2] + "</div>" +
										"</div>";
				var cover = document.getElementById("s" + searchBook[j][0]).getElementsByClassName("cover")[0];
				var bookmark = document.getElementById("s" + searchBook[j][0]).getElementsByClassName("sbookmark")[0];
				cover.style.backgroundImage = "url(" + searchBook[j][3] + ")";
				bookmark.style.backgroundImage = "url(" + searchBook[j][4] + ")";
			}
		}
		$(".spreview").click(function () {
			var page = 0;
			var markIDN = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
			var preview_pic = ["../bookpage/000015-page0.png", "../bookpage/construction.png", "../bookpage/construction.png", "../bookpage/construction.png"];//getPreviewFunc(searchBook[markIDN][0]);
			$("body").append("<div id='preview-screen-container'><div id='preview-screen'>" + searchBook[markIDN][1] + "<br><span>" + searchBook[markIDN][2] +"</span><div id='preview-pic'><div id='switchPage'><div id='leftPage'>〈</div><div id='rightPage'>〉</div></div></div><button id='editBtn'>編輯</buttton><button id='close'>×</buttton></div></div>");
			$("#preview-pic").css("background-image", "url('" + preview_pic[page] + "')");
			$("#close").click(function () {
				$("#preview-screen-container").remove();
			});
			$("#leftPage").click(function () {
				if (page != 0) {
					page -= 1;
					$("#preview-pic").css("background-image", "url('" + preview_pic[page] + "')");
				}
			});
			$("#rightPage").click(function () {
				if (page != (preview_pic.length - 1)) {
					page += 1;
					$("#preview-pic").css("background-image", "url('" + preview_pic[page] + "')");
				}
			});
			$("#editBtn").click(function () {
				if (isLogin == 1) {
					//editBookFunc(searchBook[markIDN][0]);
					window.location.href = "../edit/edit.html";
				} else {
					window.location.href = "../login/login.html";
				}
			});
		});
		$(".sedit").click(function () {
			var markIDN = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
			if (isLogin == 1) {
				//editBookFunc(searchBook[markIDN][0]);
				window.location.href = "../edit/edit.html";
			} else {
				window.location.href = "../login/login.html";
			}
		});
		$(".sbookmark").click(function (){
			if (isLogin == 0) {
				window.location.href = "../login/login.html";
			} else {
				var markIDN = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
				if (searchBook[markIDN][4] == "bookmark-on.png") {
					$(this).css("background-image", "url('bookmark-off.png')");
					searchBook[markIDN][4] = "bookmark-off.png";
					//changeMark(searchBook[markIDN][0], searchBook[markIDN][4]);
				} else {
					$(this).css("background-image", "url('bookmark-on.png')");
					searchBook[markIDN][4] = "bookmark-on.png";
					//changeMark(searchBook[markIDN][0], searchBook[markIDN][4]);
				}
			}
		});
		$(".sbookmark").mouseenter(function (){
			$(this).css("background-image", "url('bookmark-on.png')");
		});
		$(".sbookmark").mouseleave(function (){
			var markIDN = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
			if (searchBook[markIDN][4] == "bookmark-on.png") {
				$(this).css("background-image", "url('bookmark-on.png')");	
			} else {
				$(this).css("background-image", "url('bookmark-off.png')");
			}
		});
		$("#backBtn").click(function () {
			window.location.href = "../homepage/homepage.html";
		});
	});
});

$("#home").click(function () {
	window.location.href = "../homepage/homepage.html";
});

$(".preview").click(function () {
	var page = 0;
	var markIDR = parseInt($(this).parent().attr("id").substr(0, 1));
	var markIDL = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
	var preview_pic = ["../bookpage/000015-page0.png", "../bookpage/construction.png", "../bookpage/construction.png", "../bookpage/construction.png"];//getPreviewFunc(content[markIDR][markIDL][0]);
	$("body").append("<div id='preview-screen-container'><div id='preview-screen'>" + content[markIDR][markIDL][1] + "<br><span>" + content[markIDR][markIDL][2] +"</span><div id='preview-pic'><div id='switchPage'><div id='leftPage'>〈</div><div id='rightPage'>〉</div></div></div><button id='editBtn'>編輯</buttton><button id='close'>×</buttton></div></div>");
	$("#preview-pic").css("background-image", "url('" + preview_pic[page] + "')");
	$("#close").click(function () {
		$("#preview-screen-container").remove();
	});
	$("#leftPage").click(function () {
		if (page != 0) {
			page -= 1;
			$("#preview-pic").css("background-image", "url('" + preview_pic[page] + "')");
		}
	});
	$("#rightPage").click(function () {
		if (page != (preview_pic.length - 1)) {
			page += 1;
			$("#preview-pic").css("background-image", "url('" + preview_pic[page] + "')");
		}
	});
	$("#editBtn").click(function () {
		if (isLogin == 1) {
			//editBookFunc(content[markIDR][markIDL][0]);
			window.location.href = "../edit/edit.html";
		} else {
			window.location.href = "../login/login.html";
		}
	});
});

$(".edit").click(function () {
	var markIDR = parseInt($(this).parent().attr("id").substr(0, 1));
	var markIDL = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
	if (isLogin == 1) {
		//editBookFunc(content[markIDR][markIDL][0]);
		window.location.href = "../edit/edit.html";
	} else {
		window.location.href = "../login/login.html";
	}
});

$("#reward").click(function () {
	if (isLogin == 1) {
		var rewardBook = [["000009", "天長地久的約定", "圖/文：龔郁婷", "../bookpage/000009.png", "bookmark-on.png"], 
						  ["000010", "容易受人影響的白絲", "圖/文：龔郁婷", "../bookpage/000010.png", "bookmark-off.png"],
						  ["000029", "你看不見我", "圖/文：龔郁婷", "../bookpage/000029.png", "bookmark-off.png"]];//getRewardFunc();
		$("body").append("<div id='reward-screen-container'><div id='reward-screen'>已解鎖繪本<div id='bookshelf-container'><div class='bookshelf'></div></div><button id='close'>×</buttton></div></div>");
		$("#reward-screen .bookshelf").html("");
		for (var j=0; j<rewardBook.length; j++) {
			$("#reward-screen .bookshelf").append("<div id='" + "r" + rewardBook[j][0] + "' class='book'>" +
										"<div class='cover'></div>" +
										"<div id='" + "r" + j.toString() + "' class='mask'>" +
											"<div class='rbookmark'></div>" +
											"<div class='rpreview'></div>" +
											"<div class='redit'></div>" +
										"</div>" +
										"<div class='book-name'>" + rewardBook[j][1] + "</div>" +
										"<div class='author-name'>" + rewardBook[j][2] + "</div>" +
									"</div>");
			$("#r" + rewardBook[j][0] + " .cover").css("background-image", "url('" + rewardBook[j][3] + "')");
		}
	} else {
		window.location.href = "../login/login.html";
	}
	$(".rpreview").click(function () {
		var page = 0;
		var markIDN = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
		var preview_pic = ["../bookpage/000015-page0.png", "../bookpage/construction.png", "../bookpage/construction.png", "../bookpage/construction.png"];//getPreviewFunc(rewardBook[markIDN][0]);
		$("#reward-screen-container").remove();
		$("body").append("<div id='preview-screen-container'><div id='preview-screen'>" + rewardBook[markIDN][1] + "<br><span>" + rewardBook[markIDN][2] +"</span><div id='preview-pic'><div id='switchPage'><div id='leftPage'>〈</div><div id='rightPage'>〉</div></div></div><button id='editBtn'>編輯</buttton><button id='close'>×</buttton></div></div>");
		$("#preview-pic").css("background-image", "url('" + preview_pic[page] + "')");
		$("#close").click(function () {
			$("#preview-screen-container").remove();
		});
		$("#leftPage").click(function () {
			if (page != 0) {
				page -= 1;
				$("#preview-pic").css("background-image", "url('" + preview_pic[page] + "')");
			}
		});
		$("#rightPage").click(function () {
			if (page != (preview_pic.length - 1)) {
				page += 1;
				$("#preview-pic").css("background-image", "url('" + preview_pic[page] + "')");
			}
		});
		$("#editBtn").click(function () {
			if (isLogin == 1) {
				//editBookFunc(rewardBook[markIDN][0]);
				window.location.href = "../edit/edit.html";
			} else {
				window.location.href = "../login/login.html";
			}
		});
	});
	$(".redit").click(function () {
		var markIDN = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
		if (isLogin == 1) {
			//editBookFunc(rewardBook[markIDN][0]);
			window.location.href = "../edit/edit.html";
		} else {
			window.location.href = "../login/login.html";
		}
	});
	$(".rbookmark").click(function (){
		if (isLogin == 0) {
			window.location.href = "../login/login.html";
		} else {
			var markIDN = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
			if (rewardBook[markIDN][4] == "bookmark-on.png") {
				$(this).css("background-image", "url('bookmark-off.png')");
				rewardBook[markIDN][4] = "bookmark-off.png";
				//changeMark(rewardBook[markIDN][0], rewardBook[markIDN][4]);
			} else {
				$(this).css("background-image", "url('bookmark-on.png')");
				rewardBook[markIDN][4] = "bookmark-on.png";
				//changeMark(rewardBook[markIDN][0], rewardBook[markIDN][4]);
			}
		}
	});
	$(".rbookmark").mouseenter(function (){
		$(this).css("background-image", "url('bookmark-on.png')");
	});

	$(".rbookmark").mouseleave(function (){
		var markIDN = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
		if (rewardBook[markIDN][4] == "bookmark-on.png") {
			$(this).css("background-image", "url('bookmark-on.png')");
		} else {
			$(this).css("background-image", "url('bookmark-off.png')");
		}
	});
	$("#close").click(function () {
		$("#reward-screen-container").remove();
	});
});

$("#search input").keypress(function (event) {
	if (event.key === "Enter") {
		var key_word = $("#search input").val().trim();
		if (key_word != "") {
			if (whichPage == 0) {
				var searchBook = [["000003", "BZ 鎮的雙色湖", "圖/文：龔郁婷", "../bookpage/000003.png", "bookmark-on.png"], 
								 ["000012", "愛穿紫色衣服的皇帝", "圖/文：龔郁雯", "../bookpage/000012.png", "bookmark-on.png"], 
								 ["000014", "我所知道的家園", "圖/文：龔郁婷", "../bookpage/000014.png", "bookmark-on.png"], 
								 ["000015", "石頭的輪迴", "圖：龔郁雯/文 ：陳薇安", "../bookpage/000015.png", "bookmark-on.png"],  
								 ["000028", "換季的信息", "圖：龔郁婷/文：龔郁雯", "../bookpage/000028.png", "bookmark-on.png"], 
								 ["000030", "寵物國的世界觀", "圖/文：龔郁雯", "../bookpage/000030.png", "bookmark-on.png"]];//searchBookFunc(key_word);	
			} else if (whichPage == 1) {
				var searchBook = [["000003", "BZ 鎮的雙色湖", "圖/文：龔郁婷", "../bookpage/000003.png", "bookmark-on.png"], 
								  ["000015", "石頭的輪迴", "圖：龔郁雯/文 ：陳薇安", "../bookpage/000015.png", "bookmark-on.png"],  
								  ["000030", "寵物國的世界觀", "圖/文：龔郁雯", "../bookpage/000030.png", "bookmark-on.png"]];//searchInMyBookFunc(key_word);	
			} else {
				var searchBook = [];
			}
			var main = document.getElementById("main");
			main.innerHTML = "";
			if (searchBook.length != 0) {
				main.innerHTML +=   "<div class='section'>" +
										"<div class='section-name'>根據 " + key_word + " 的搜尋結果</div>" +
										"<div class='bookshelf'>" +
										"</div>" +
									"</div>" +
									"<div class='section'><button id='backBtn'>回首頁<span></span><span></span><span></span><span></span></button></div>" +
									"<div class='section'><div class='section-last'>© Meraki</div></div>";
				var bookshelf = document.getElementsByClassName("bookshelf")[0];
				for (var j=0; j<searchBook.length; j++) {
					bookshelf.innerHTML +=  "<div id='" + "s" + searchBook[j][0] + "' class='book'>" +
												"<div class='cover'></div>" +
												"<div id='" + "s" + j.toString() + "' class='mask'>" +
													"<div class='sbookmark'></div>" +
													"<div class='spreview'></div>" +
													"<div class='sedit'></div>" +
												"</div>" +
												"<div class='book-name'>" + searchBook[j][1] + "</div>" +
												"<div class='author-name'>" + searchBook[j][2] + "</div>" +
											"</div>";
					var cover = document.getElementById("s" + searchBook[j][0]).getElementsByClassName("cover")[0];
					var bookmark = document.getElementById("s" + searchBook[j][0]).getElementsByClassName("sbookmark")[0];
					cover.style.backgroundImage = "url(" + searchBook[j][3] + ")";
					bookmark.style.backgroundImage = "url(" + searchBook[j][4] + ")";
				}
			} else {
				main.innerHTML +=   "<div class='section'>" +
										"<div class='section-name'>沒有根據 " + key_word + " 的搜尋結果</div>" + 
									"</div>" +
									"<div class='section'><button id='backBtn'>回首頁<span></span><span></span><span></span><span></span></button></div>" +
									"<div class='section'><div class='section-last'>© Meraki</div></div>";
			}
			$(".spreview").click(function () {
				var page = 0;
				var markIDN = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
				var preview_pic = ["../bookpage/000015-page0.png", "../bookpage/construction.png", "../bookpage/construction.png", "../bookpage/construction.png"];//getPreviewFunc(searchBook[markIDN][0]);
				$("body").append("<div id='preview-screen-container'><div id='preview-screen'>" + searchBook[markIDN][1] + "<br><span>" + searchBook[markIDN][2] +"</span><div id='preview-pic'><div id='switchPage'><div id='leftPage'>〈</div><div id='rightPage'>〉</div></div></div><button id='editBtn'>編輯</buttton><button id='close'>×</buttton></div></div>");
				$("#preview-pic").css("background-image", "url('" + preview_pic[page] + "')");
				$("#close").click(function () {
					$("#preview-screen-container").remove();
				});
				$("#leftPage").click(function () {
					if (page != 0) {
						page -= 1;
						$("#preview-pic").css("background-image", "url('" + preview_pic[page] + "')");
					}
				});
				$("#rightPage").click(function () {
					if (page != (preview_pic.length - 1)) {
						page += 1;
						$("#preview-pic").css("background-image", "url('" + preview_pic[page] + "')");
					}
				});
				$("#editBtn").click(function () {
					if (isLogin == 1) {
						//editBookFunc(searchBook[markIDN][0]);
						window.location.href = "../edit/edit.html";
					} else {
						window.location.href = "../login/login.html";
					}
				});
			});
			$(".sedit").click(function () {
				var markIDN = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
				if (isLogin == 1) {
					//editBookFunc(searchBook[markIDN][0]);
					window.location.href = "../edit/edit.html";
				} else {
					window.location.href = "../login/login.html";
				}
			});
			$(".sbookmark").click(function (){
				if (isLogin == 0) {
					window.location.href = "../login/login.html";
				} else {
					var markIDN = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
					if (searchBook[markIDN][4] == "bookmark-on.png") {
						$(this).css("background-image", "url('bookmark-off.png')");
						searchBook[markIDN][4] = "bookmark-off.png";
						//changeMark(searchBook[markIDN][0], searchBook[markIDN][4]);
					} else {
						$(this).css("background-image", "url('bookmark-on.png')");
						searchBook[markIDN][4] = "bookmark-on.png";
						//changeMark(searchBook[markIDN][0], searchBook[markIDN][4]);
					}
				}
			});
			$(".sbookmark").mouseenter(function () {
				$(this).css("background-image", "url('bookmark-on.png')");
			});

			$(".sbookmark").mouseleave(function () {
				var markIDN = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
				if (searchBook[markIDN][4] == "bookmark-on.png") {
					$(this).css("background-image", "url('bookmark-on.png')");
				} else {
					$(this).css("background-image", "url('bookmark-off.png')");
				}
			});
			$("#backBtn").click(function () {
				window.location.href = "../homepage/homepage.html";
			});
		}
	}
});

$("#menu2").click(function () {
	if (isLogin == 1) {
		whichPage = 1;
		$("#search input").attr("placeholder", "在我的繪本中搜尋");
		$("#search").css("display", "flex");
		$("#main").css("margin-top", "25vh"); 
		var searchBook = [[["000015", "石頭的輪迴", "圖：龔郁雯/文 ：陳薇安", "../bookpage/000015.png", "bookmark-off.png"], 
						   ["000026", "米米愛蛋糕", "圖：龔郁雯/文：龔郁婷", "../bookpage/000026.png", "bookmark-off.png"]],
						  []];//myBookFunc();
		var section_name = ["繼續完成", "已加書籤"];
		var main = document.getElementById("main");
		main.innerHTML = "";
		for (var i=0; i<2; i++) {
			if (searchBook[i].length != 0) {
				main.innerHTML +=   "<div class='section'>" +
										"<div class='section-name'>" + section_name[i] + "</div>" +
										"<div class='bookshelf'>" +
										"</div>" +
									"</div>";
				var bookshelf = document.getElementsByClassName("bookshelf")[i];
				for (var j=0; j<searchBook[i].length; j++) {
					bookshelf.innerHTML +=  "<div id='" + i.toString() + searchBook[i][j][0] + "' class='book'>" +
												"<div class='cover'></div>" +
											"<div id='" + i.toString() + j.toString() + "' class='mask'>" +
													"<div class='sbookmark'></div>" +
													"<div class='spreview'></div>" +
													"<div class='sedit'></div>" +
												"</div>" +
												"<div class='book-name'>" + searchBook[i][j][1] + "</div>" +
												"<div class='author-name'>" + searchBook[i][j][2] + "</div>" +
											"</div>";
					var cover = document.getElementById(i.toString() + searchBook[i][j][0]).getElementsByClassName("cover")[0];
					var bookmark = document.getElementById(i.toString() + searchBook[i][j][0]).getElementsByClassName("sbookmark")[0];
					cover.style.backgroundImage = "url(" + searchBook[i][j][3] + ")";
					bookmark.style.backgroundImage = "url(" + searchBook[i][j][4] + ")";
				}
			}
		}
		main.innerHTML += "<div class='section'><div class='section-last'>© Meraki</div></div>";
		$(".spreview").click(function () {
			var page = 0;
			var markIDR = parseInt($(this).parent().attr("id").substr(0, 1));
			var markIDL = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
			var preview_pic = ["../bookpage/000015-page0.png", "../bookpage/construction.png", "../bookpage/construction.png", "../bookpage/construction.png"];//getPreviewFunc(searchBook[markIDN][0]);
			$("body").append("<div id='preview-screen-container'><div id='preview-screen'>" + searchBook[markIDR][markIDL][1] + "<br><span>" + searchBook[markIDR][markIDL][2] +"</span><div id='preview-pic'><div id='switchPage'><div id='leftPage'>〈</div><div id='rightPage'>〉</div></div></div><button id='editBtn'>編輯</buttton><button id='close'>×</buttton></div></div>");
			$("#preview-pic").css("background-image", "url('" + preview_pic[page] + "')");
			$("#close").click(function () {
				$("#preview-screen-container").remove();
			});
			$("#leftPage").click(function () {
				if (page != 0) {
					page -= 1;
					$("#preview-pic").css("background-image", "url('" + preview_pic[page] + "')");
				}
			});
			$("#rightPage").click(function () {
				if (page != (preview_pic.length - 1)) {
					page += 1;
					$("#preview-pic").css("background-image", "url('" + preview_pic[page] + "')");
				}
			});
			$("#editBtn").click(function () {
				if (isLogin == 1) {
					//editBookFunc(searchBook[markIDR][markIDL][0]);
					window.location.href = "../edit/edit.html";
				} else {
					window.location.href = "../login/login.html";
				}
			});
		});
		$(".sedit").click(function () {
			var markIDR = parseInt($(this).parent().attr("id").substr(0, 1));
			var markIDL = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
			var preview_pic = ["../bookpage/000015-page0.png"];//getPreviewFunc(searchBook[markIDN][0]);
			if (isLogin == 1) {
				//editBookFunc(searchBook[markIDR][markIDL][0]);
				window.location.href = "../edit/edit.html";
			} else {
				window.location.href = "../login/login.html";
			}
		});
		$(".sbookmark").click(function (){
			if (isLogin == 0) {
				window.location.href = "../login/login.html";
			} else {
				var markIDR = parseInt($(this).parent().attr("id").substr(0, 1));
				var markIDL = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
				if (searchBook[markIDR][markIDL][4] == "bookmark-on.png") {
					$(this).css("background-image", "url('bookmark-off.png')");
					searchBook[markIDR][markIDL][4] = "bookmark-off.png";
					//changeMark(searchBook[markIDR][markIDL][0], searchBook[markIDR][markIDL][4]);
					for (var i=0; i<2; i++) {
						for (var j=0; j<searchBook[i].length; j++) {
							if (searchBook[i][j][0] == searchBook[markIDR][markIDL][0]) {
								$("#" + i.toString() + j.toString() + " .sbookmark").css("background-image", "url('bookmark-off.png')");
								searchBook[i][j][4] = "bookmark-off.png";
							}
						}
					}
				} else {
					$(this).css("background-image", "url('bookmark-on.png')");
					searchBook[markIDR][markIDL][4] = "bookmark-on.png";
					//changeMark(searchBook[markIDR][markIDL][0], searchBook[markIDR][markIDL][4]);
					for (var i=0; i<2; i++) {
						for (var j=0; j<searchBook[i].length; j++) {
							if (searchBook[i][j][0] == searchBook[markIDR][markIDL][0]) {
								$("#" + i.toString() + j.toString() + " .sbookmark").css("background-image", "url('bookmark-on.png')");
								searchBook[i][j][4] = "bookmark-on.png";
							}
						}
					}
				}
			}
		});
		$(".sbookmark").mouseenter(function () {
			$(this).css("background-image", "url('bookmark-on.png')");
		});
		$(".sbookmark").mouseleave(function () {
			var markIDR = parseInt($(this).parent().attr("id").substr(0, 1));
			var markIDL = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
			if (searchBook[markIDR][markIDL][4] == "bookmark-on.png") {
				$(this).css("background-image", "url('bookmark-on.png')");
			} else {
				$(this).css("background-image", "url('bookmark-off.png')");
			}
		});
	} else {
		window.location.href = "../login/login.html";
	}
});

$("#menu3").click(function () {
	if (isLogin == 1) {
		whichPage = 2;
		$("#search").css("display", "none");
		$("#main").css("margin-top", "0vh"); 
		var userName = "史迪奇";//getName();
		var photo = "book328553.png";//getPhoto();
		var totalDay = 10; //getTotalDay();
		var contiDay = 8; //getContiDay();
		var unlock = 2; //getUnlock();
		var main = document.getElementById("main");
		main.innerHTML = "";
		main.innerHTML +=   "<div class='section-info'>" +
								"<div id='left-col'>" + 
									"<div id='user-photo'><div id='photo-mask'><label id='photoBtn'><input type='file' accept='.jpg, .jpeg, .png'></input></label></div></div>" + 
									"<div id='user-name'><input value='" + userName + "'></input><div id='name-fix'>" + userName + "</div><div id='nameBtn'></div></div>" + 
									"<div id='information'><div>總計登入天數： " + totalDay.toString() + " 天</div><div>連續登入天數： " + contiDay.toString() +" 天</div><div>已解鎖繪本數： " + unlock.toString() + " 本</div></div>" + 
								"</div>" +
								"<div id='right-col'></div>" +
							"</div>" + 
							"<div class='section'><div class='section-last'>© Meraki</div></div>";
		$("#user-name input").css("display", "none");
	} else {
		window.location.href = "../login/login.html";
	}
	$("#user-photo").css("background-image", "url(" + photo + ")");
	var rewardList = ["連續登入 7 天：解鎖繪本《天長地久的約定》", "總計登入 10 天：解鎖繪本《容易受人影響的白絲》", "總計登入 20 天：解鎖繪本《你看不見我》"];
	var right_html = "";
	for (var i=0; i<rewardList.length; i++) {
		right_html += "<div class='right-col-info'>" + rewardList[rewardList.length-1-i] + "</div>";
	}
	$("#right-col").html(right_html);
	$("#nameBtn").click(function () {
		var userName = "史迪奇"; //getName();
		$("#user-name input").val(userName);
		$("#user-name input").css("display", "block");
		$("#name-fix").css("display", "none");
		$("#nameBtn").css("display", "none");
		$("#user-name input").keypress(function (event) {
			if (event.key === "Enter") {
				var key_word = $("#user-name input").val();
				if (key_word.trim() != "") {
					//changeName(key_word);
					userName = key_word;
					$("#name-fix").text(userName);
					$("#profileName").text(userName);
					$("#user-name input").css("display", "none");
					$("#name-fix").css("display", "block");
					$("#nameBtn").css("display", "block");
				}
			}
		});
	});
	$("#photoBtn input").change(function (event) { 
		var newPhoto = event.target.files[0];
		if (newPhoto) {
			var fileType = newPhoto.type;
			if (fileType === 'image/jpeg' || fileType === 'image/png') {
				const reader = new FileReader();
				reader.onload = function(e) {
					const base64String = e.target.result;
					//changePhoto(base64String);
					$("#user-photo").css("background-image", "url(" + base64String + ")");
					$("#profile div").css("background-image", "url(" + base64String + ")");
				};
				reader.readAsDataURL(newPhoto);
			} else {
				alert('Please select a file with .jpg, .jpeg, or .png extension.');
			}
		}
	});
});
