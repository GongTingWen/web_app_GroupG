
var user = document.getElementById("user");
var content = [];
menu1();
function menu1 () {
	$("title").html("Meraki：我的繪本");
	var books = [[["book328553", "再勇敢一點", "圖/文：黃鈞荻", "book328553.png", "bookmark-on.png"], 
				  ["book328653", "不要說話", "圖/文：龔郁婷", "book328653.jpg", "bookmark-off.png"],
				  ["book328353", "我的阿富汗筆友", "圖/文：龔郁雯", "book328353.jpg", "bookmark-off.png"],
				  ["book328253", "向左走、向右走", "圖/文：陳薇安", "book328253.jpg", "bookmark-off.png"],
				  ["book318653", "不要碰我的小花", "圖/文：Abey", "book318653.jpg", "bookmark-off.png"]], 
				 [["book328553", "再勇敢一點", "圖/文：黃鈞荻", "book328553.png", "bookmark-on.png"], 
				  ["book328653", "不要說話", "圖/文：龔郁婷", "book328653.jpg", "bookmark-off.png"],
				  ["book328353", "我的阿富汗筆友", "圖/文：龔郁雯", "book328353.jpg", "bookmark-off.png"],
				  ["book328253", "向左走、向右走", "圖/文：陳薇安", "book328253.jpg", "bookmark-off.png"],
				  ["book318653", "不要碰我的小花", "圖/文：Abey", "book318653.jpg", "bookmark-off.png"]]];//mybookFunc();
	content = books;
	fetch('/homepage', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then(response => response.json())
	.then(data => {
		var userName = data.username; // Retrieve the username from the response
		// console.log(userName); // Log or use the username as needed
		// var userName = "史迪奇";//getName();
		var photo = "book328553.png";//getPhoto();
		var profile = document.getElementById("profile").getElementsByTagName("div")[0];
		var profileName = document.getElementById("profileName");
		profile.style.backgroundImage = "url('"+ photo + "')";
		profileName.innerHTML = userName;
		var section_name = ["繼續完成", "已加書籤"];
		var main = document.getElementById("main");
		main.innerHTML = "";
		for (var i=0; i<2; i++) {
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
	})
	.catch(error => console.error('Error:', error));
	main.innerHTML += "<div class='section'><div class='section-last'>© Meraki</div></div>";
	user.innerHTML = "<div id='profile'><div></div></div><div id='profileName'></div><button id='signoutBtn'>登出<span></span><span></span><span></span><span></span></button>";
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
	var markIDR = parseInt($(this).parent().attr("id").substr(0, 1));
	var markIDL = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
	if (content[markIDR][markIDL][4] == "bookmark-on.png") {
		$(this).css("background-image", "url('bookmark-off.png')");
		content[markIDR][markIDL][4] = "bookmark-off.png";
		changeMark(content[markIDR][markIDL][0], content[markIDR][markIDL][4]);
		for (var i=0; i<2; i++) {
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
		changeMark(content[markIDR][markIDL][0], content[markIDR][markIDL][4]);
		for (var i=0; i<2; i++) {
			for (var j=0; j<content[i].length; j++) {
				if (content[i][j][0] == content[markIDR][markIDL][0]) {
					$("#" + i.toString() + j.toString() + " .bookmark").css("background-image", "url('bookmark-on.png')");
					content[i][j][4] = "bookmark-on.png";
				}
			}
		}
	}
});

$("#signoutBtn").click(function() {
    window.location.href = "../login/login.html";
});


$("#theme").mouseenter(function (){
	var alltheme = ["童話故事", "科普知識", "色彩原理", "古典文學", "烹飪教室"]; //allthemeFunc();
	var themehtml = "";
	for (var i=0; i<alltheme.length; i++) {
		themehtml += "<div class='themeOpt'>" + alltheme[i] + "</div>";
	}
	$("#themeList").html(themehtml);
	$(".themeOpt").click(function () {
		$("title").html("Meraki：Dare To Dream, Unleash Your Creativity");
		var optionText = $(this).text();
		var optionType = $(this).attr("class");
		var searchBook = [["book328553", "再勇敢一點", "圖/文：黃鈞荻", "book328553.png", "bookmark-on.png"], 
						  ["book328653", "不要說話", "圖/文：龔郁婷", "book328653.jpg", "bookmark-off.png"],
						  ["book328353", "我的阿富汗筆友", "圖/文：龔郁雯", "book328353.jpg", "bookmark-off.png"],
						  ["book328354", "我的阿富汗筆友", "圖/文：龔郁雯", "book328353.jpg", "bookmark-off.png"]];//categoryBookFunc(optionText, optionType);
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
			var preview_pic = ["book328553_p1_frame.jpeg", "book328553_p2_frame.jpg", "book328553_p3_frame.png", "book328553_p4_frame.jpg"];//getPreviewFunc(searchBook[markIDN][0]);
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
			//editBookFunc(searchBook[markIDN][0]);
			window.location.href = "../edit/edit.html";
		});
		$(".sbookmark").click(function (){
			var markIDN = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
			if (searchBook[markIDN][4] == "bookmark-on.png") {
				$(this).css("background-image", "url('bookmark-off.png')");
				searchBook[markIDN][4] = "bookmark-off.png";
				changeMark(searchBook[markIDN][0], searchBook[markIDN][4]);
			} else {
				$(this).css("background-image", "url('bookmark-on.png')");
				searchBook[markIDN][4] = "bookmark-on.png";
				changeMark(searchBook[markIDN][0], searchBook[markIDN][4]);
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
	var allauthor = ["陳薇安", "黃鈞荻", "龔郁婷", "龔郁雯"]; //allauthorFunc();
	var authorhtml = "";
	for (var i=0; i<allauthor.length; i++) {
		authorhtml += "<div class='authorOpt'>" + allauthor[i] + "</div>";
	}
	$("#authorList").html(authorhtml);
	$(".authorOpt").click(function () {
		$("title").html("Meraki：Dare To Dream, Unleash Your Creativity");
		var optionText = $(this).text();
		var optionType = $(this).attr("class");
		var searchBook = [["book328553", "再勇敢一點", "圖/文：黃鈞荻", "book328553.png", "bookmark-on.png"], 
						  ["book328653", "不要說話", "圖/文：龔郁婷", "book328653.jpg", "bookmark-off.png"],
						  ["book328353", "我的阿富汗筆友", "圖/文：龔郁雯", "book328353.jpg", "bookmark-off.png"],
						  ["book328354", "我的阿富汗筆友", "圖/文：龔郁雯", "book328353.jpg", "bookmark-off.png"]];//categoryBookFunc(optionText, optionType);
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
			var preview_pic = ["book328553_p1_frame.jpeg", "book328553_p2_frame.jpg", "book328553_p3_frame.png", "book328553_p4_frame.jpg"];//getPreviewFunc(searchBook[markIDN][0]);
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
			//editBookFunc(searchBook[markIDN][0]);
			window.location.href = "../edit/edit.html";
		});
		$(".sbookmark").click(function (){
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
	var preview_pic = ["book328553_p1_frame.jpeg", "book328553_p2_frame.jpg", "book328553_p3_frame.png", "book328553_p4_frame.jpg"];//getPreviewFunc(content[markIDR][markIDL][0]);
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
		//editBookFunc(content[markIDR][markIDL][0]);
		window.location.href = "../edit/edit.html";
	});
});

$(".edit").click(function () {
	var markIDR = parseInt($(this).parent().attr("id").substr(0, 1));
	var markIDL = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
	//editBookFunc(content[markIDR][markIDL][0]);
	window.location.href = "../edit/edit.html";
});

$("#reward").click(function () {
	var rewardBook = [["book328553", "再勇敢一點", "圖/文：黃鈞荻", "book328553.png", "bookmark-on.png"], 
					  ["book328653", "不要說話", "圖/文：龔郁婷", "book328653.jpg", "bookmark-off.png"],
					  ["book328353", "我的阿富汗筆友", "圖/文：龔郁雯", "book328353.jpg", "bookmark-off.png"],
					  ["book328354", "我的阿富汗筆友", "圖/文：龔郁雯", "book328353.jpg", "bookmark-off.png"],
					  ["book328253", "向左走、向右走", "圖/文：陳薇安", "book328253.jpg", "bookmark-off.png"],
					  ["book318653", "不要碰我的小花", "圖/文：Abey", "book318653.jpg", "bookmark-off.png"],
					  ["book328353", "我的阿富汗筆友", "圖/文：龔郁雯", "book328353.jpg", "bookmark-off.png"],
					  ["book328354", "我的阿富汗筆友", "圖/文：龔郁雯", "book328353.jpg", "bookmark-off.png"],
					  ["book328253", "向左走、向右走", "圖/文：陳薇安", "book328253.jpg", "bookmark-off.png"],
					  ["book318653", "不要碰我的小花", "圖/文：Abey", "book318653.jpg", "bookmark-off.png"],
					  ["book328353", "我的阿富汗筆友", "圖/文：龔郁雯", "book328353.jpg", "bookmark-off.png"],
					  ["book328354", "我的阿富汗筆友", "圖/文：龔郁雯", "book328353.jpg", "bookmark-off.png"],
					  ["book328253", "向左走、向右走", "圖/文：陳薇安", "book328253.jpg", "bookmark-off.png"],
					  ["book318653", "不要碰我的小花", "圖/文：Abey", "book318653.jpg", "bookmark-off.png"]];//getRewardFunc();
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
	$(".rpreview").click(function () {
		var page = 0;
		var markIDN = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
		var preview_pic = ["book328553_p1_frame.jpeg", "book328553_p2_frame.jpg", "book328553_p3_frame.png", "book328553_p4_frame.jpg"];//getPreviewFunc(rewardBook[markIDN][0]);
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
			//editBookFunc(rewardBook[markIDN][0]);
			window.location.href = "../edit/edit.html";
		});
	});
	$(".redit").click(function () {
		var markIDN = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
		//editBookFunc(rewardBook[markIDN][0]);
		window.location.href = "../edit/edit.html";
	});
	$(".rbookmark").click(function (){
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
function searchBookFunc(key_word) {
    // Array of books
    var books = [
		["book328553", "再勇敢一點", "圖/文：黃鈞荻", "book328553.png", "bookmark-on.png"], 
		["book328653", "不要說話", "圖/文：龔郁婷", "book328653.jpg", "bookmark-off.png"],
		["book328353", "我的阿富汗筆友", "圖/文：龔郁雯", "book328353.jpg", "bookmark-off.png"],
		["book328253", "向左走、向右走", "圖/文：陳薇安", "book328253.jpg", "bookmark-off.png"],
		["book318653", "不要碰我的小花", "圖/文：Abey", "book318653.jpg", "bookmark-off.png"],
	]
    
    // Filter books based on keyword
    var searchResults = books.filter(function(book) {
        return book.some(function(item) {
            return item.includes(key_word);
        });
    });
    
    return searchResults;
}
$("#search input").keypress(function (event) {
	if (event.key === "Enter") {
		var key_word = $("#search input").val().trim();
		if (key_word != "") {
			var searchBook = searchBookFunc(key_word);
			//[["book328553", "再勇敢一點", "圖/文：黃鈞荻", "book328553.png", "bookmark-on.png"], 
							 //["book328653", "不要說話", "圖/文：龔郁婷", "book328653.jpg", "bookmark-off.png"],
							 //["book328353", "我的阿富汗筆友", "圖/文：龔郁雯", "book328353.jpg", "bookmark-off.png"],
							 //["book328354", "我的阿富汗筆友", "圖/文：龔郁雯", "book328353.jpg", "bookmark-off.png"]];//searchBookInMineFunc(key_word);
			var main = document.getElementById("main");
			main.innerHTML = "";
			if (searchBook.length != 0) {
				main.innerHTML +=   "<div class='section'>" +
										"<div class='section-name'>我的繪本中根據 " + key_word + " 的搜尋結果</div>" +
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
										"<div class='section-name'>我的繪本中沒有根據 " + key_word + " 的搜尋結果</div>" + 
									"</div>" +
									"<div class='section'><button id='backBtn'>回首頁<span></span><span></span><span></span><span></span></button></div>" +
									"<div class='section'><div class='section-last'>© Meraki</div></div>";
			}
			$(".foot").css("display", "flex");
			$(".foot").css("flex-direction", "column");
			$(".footin").css("width", "100%");
			$(".footin").css("padding-top", "19.968%");
			$(".footin").css("height", "0");
			$(".spreview").click(function () {
				var page = 0;
				var markIDN = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
				var preview_pic = ["book328553_p1_frame.jpeg", "book328553_p2_frame.jpg", "book328553_p3_frame.png", "book328553_p4_frame.jpg"];//getPreviewFunc(searchBook[markIDN][0]);
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
					//editBookFunc(searchBook[markIDN][0]);
					window.location.href = "../edit/edit.html";
				});
			});
			$(".sedit").click(function () {
				var markIDN = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
				//editBookFunc(searchBook[markIDN][0]);
				window.location.href = "../edit/edit.html";
			});
			$(".sbookmark").click(function (){
				var markIDN = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
				if (searchBook[markIDN][4] == "bookmark-on.png") {
					$(this).css("background-image", "url('bookmark-off.png')");
					searchBook[markIDN][4] = "bookmark-off.png";
					changeMark(searchBook[markIDN][0], searchBook[markIDN][4]);
				} else {
					$(this).css("background-image", "url('bookmark-on.png')");
					searchBook[markIDN][4] = "bookmark-on.png";
					changeMark(searchBook[markIDN][0], searchBook[markIDN][4]);
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
