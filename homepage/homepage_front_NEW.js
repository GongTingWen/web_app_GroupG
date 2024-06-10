
// init
var user = document.getElementById("user");
var content = [];
var rewardBook = [];
var queryBook = [];
var whichPage = 0;
var whichType = "";
var whichKey = "";
var userdata = window.localStorage.getItem("userdata");
// whether login
if (userdata === null) {
	var isLogin = 0;
} else {
	var isLogin = 1;
}
menu(0, "homePage", "");

// change profile photo
const uploadManager = new Bytescale.UploadManager({
	apiKey: "public_kW15c5s5fNhx1V9REiavxdWpKDj1" // This is your API key.
});

async function uploadFile (userId, filetype, base64) {
	const base64Response = await fetch(base64);
	const blob = await base64Response.blob();
	const file = new File([blob], "x." + filetype);
	try {
		const { fileUrl, filePath } = await uploadManager.upload({ 
			data: file,
			path: {
				folderPath: "/profile",
				fileName: "{UTC_YEAR}{UTC_MONTH}{UTC_DAY}{UTC_HOUR}{UTC_MINUTE}{UTC_SECOND}_" + userId + "." + filetype
            }
		});
		return fileUrl;
	} catch (e) {
		console.log(`Error:\n${e.message}`);
	}
}

async function deleteFile(params) {  
  const baseUrl = "https://api.bytescale.com";
  const path = `/v2/accounts/${params.accountId}/files`;
  const entries = obj => Object.entries(obj).filter(([,val]) => (val ?? null) !== null);
  const query = entries(params.querystring ?? {})
                     .flatMap(([k,v]) => Array.isArray(v) ? v.map(v2 => [k,v2]) : [[k,v]])
                     .map(kv => kv.join("=")).join("&");
  const response = await fetch(`${baseUrl}${path}${query.length > 0 ? "?" : ""}${query}`, {
    method: "DELETE",
    headers: Object.fromEntries(entries({
      "Authorization": `Bearer ${params.apiKey}`,
    }))
  });
  if (Math.floor(response.status / 100) !== 2) {
    const result = await response.json();
    throw new Error(`Bytescale API Error: ${JSON.stringify(result)}`);
  }
}

function menu (page, type, keyWord) {
	
	whichPage = page;
	whichType = type;
	whichKey = keyWord;


	// css
	if (whichPage == 0) {
		$("#search input").attr("placeholder", "在所有繪本中搜尋");
		$("#search").css("display", "flex");		
		$("#main").css("margin-top", "25vh"); 
	} else if (whichPage == 1) {
		$("#search input").attr("placeholder", "在我的繪本中搜尋");
		$("#search").css("display", "flex");
		$("#main").css("margin-top", "25vh"); 
	} else {
		$("#main").css("margin-top", "0"); 
		$("#search").css("display", "none");
	}
	
	
	// bookList
	if (whichPage == 0) {
		if (whichType == "homePage") {
			var books = [[["000007", "盲人「看」顏色", "圖：龔郁雯/文 ：龔郁婷", "https://upcdn.io/kW15c5s/raw/bookcover/000001.png", "bookmark-off.png"], 
						  ["000027", "如果顏色是個人", "圖/文：陳薇安", "https://upcdn.io/kW15c5s/raw/bookcover/000027.png", "bookmark-off.png"]],
						 [["000007", "盲人「看」顏色", "圖：龔郁雯/文 ：龔郁婷", "https://upcdn.io/kW15c5s/raw/bookcover/000001.png", "bookmark-off.png"], 
						  ["000027", "如果顏色是個人", "圖/文：陳薇安", "https://upcdn.io/kW15c5s/raw/bookcover/000027.png", "bookmark-off.png"]],
						 [["000007", "盲人「看」顏色", "圖：龔郁雯/文 ：龔郁婷", "https://upcdn.io/kW15c5s/raw/bookcover/000001.png", "bookmark-off.png"], 
						  ["000027", "如果顏色是個人", "圖/文：陳薇安", "https://upcdn.io/kW15c5s/raw/bookcover/000027.png", "bookmark-off.png"]],
						 [["000007", "盲人「看」顏色", "圖：龔郁雯/文 ：龔郁婷", "https://upcdn.io/kW15c5s/raw/bookcover/000001.png", "bookmark-off.png"], 
						  ["000027", "如果顏色是個人", "圖/文：陳薇安", "https://upcdn.io/kW15c5s/raw/bookcover/000027.png", "bookmark-off.png"]]];//contentFunc(userdata); //****
		} else if (whichType == "theme") {
			var books = [[["000007", "盲人「看」顏色", "圖：龔郁雯/文 ：龔郁婷", "https://upcdn.io/kW15c5s/raw/bookcover/000001.png", "bookmark-off.png"], 
						  ["000027", "如果顏色是個人", "圖/文：陳薇安", "https://upcdn.io/kW15c5s/raw/bookcover/000027.png", "bookmark-off.png"]]]; //categoryBookFunc(whichKey, whichType); //****
		} else if (whichType == "author") {
			var books = [[["000007", "盲人「看」顏色", "圖：龔郁雯/文 ：龔郁婷", "https://upcdn.io/kW15c5s/raw/bookcover/000001.png", "bookmark-off.png"], 
						  ["000027", "如果顏色是個人", "圖/文：陳薇安", "https://upcdn.io/kW15c5s/raw/bookcover/000027.png", "bookmark-off.png"]]]; //categoryBookFunc(whichKey, whichType); //****
		} else if (whichType == "search") {
			var books = [[["000007", "盲人「看」顏色", "圖：龔郁雯/文 ：龔郁婷", "https://upcdn.io/kW15c5s/raw/bookcover/000001.png", "bookmark-off.png"], 
						  ["000027", "如果顏色是個人", "圖/文：陳薇安", "https://upcdn.io/kW15c5s/raw/bookcover/000027.png", "bookmark-off.png"]]]; //searchBookFunc(whichKey); //****
		}
	} else if (whichPage == 1) {
		if (whichType == "mybook") {
			var books = [[["000007", "盲人「看」顏色", "圖：龔郁雯/文 ：龔郁婷", "https://upcdn.io/kW15c5s/raw/bookcover/000001.png", "bookmark-off.png"], 
						  ["000027", "如果顏色是個人", "圖/文：陳薇安", "https://upcdn.io/kW15c5s/raw/bookcover/000027.png", "bookmark-off.png"]],
						 [["000007", "盲人「看」顏色", "圖：龔郁雯/文 ：龔郁婷", "https://upcdn.io/kW15c5s/raw/bookcover/000001.png", "bookmark-off.png"], 
						  ["000027", "如果顏色是個人", "圖/文：陳薇安", "https://upcdn.io/kW15c5s/raw/bookcover/000027.png", "bookmark-off.png"]],
						 [["000007", "盲人「看」顏色", "圖：龔郁雯/文 ：龔郁婷", "https://upcdn.io/kW15c5s/raw/bookcover/000001.png", "bookmark-off.png"], 
						  ["000027", "如果顏色是個人", "圖/文：陳薇安", "https://upcdn.io/kW15c5s/raw/bookcover/000027.png", "bookmark-off.png"]]]; //myBookFunc(userdata); //****
		} else if (whichType == "search") {
			var books = [[["000007", "盲人「看」顏色", "圖：龔郁雯/文 ：龔郁婷", "https://upcdn.io/kW15c5s/raw/bookcover/000001.png", "bookmark-off.png"], 
						  ["000027", "如果顏色是個人", "圖/文：陳薇安", "https://upcdn.io/kW15c5s/raw/bookcover/000027.png", "bookmark-off.png"]]]; //searchInMyBookFunc(userdata, whichKey); //****
		}
	} else {
		var books = [];
	}
	content = books;
	
	
	// layout books
	if (whichPage == 0) {
		if (whichType == "homePage") {
			var section_name = ["本月精選", "為您推薦", "最新繪本", "繼續完成"];
		} else if (whichType == "theme") {
			var section_name = [whichKey];
		} else if (whichType == "author") {
			var section_name = [whichKey];
		} else if (whichType == "search") {
			var section_name = ["根據 " + whichKey + " 的搜尋結果"];
		}
	} else if (whichPage == 1) {
		if (whichType == "mybook") {
			var section_name = ["繼續完成", "已加書籤", "已完成"];
		} else if (whichType == "search") {
			var section_name = ["在我的繪本中，根據 " + whichKey + " 的搜尋結果"];
		}
	} else {
		var section_name = [];
	}
	
	var main = document.getElementById("main");
	main.innerHTML = "";
	
	if (whichPage != 2) {
		for (var i=0; i<section_name.length; i++) {
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
	} else {
		if (isLogin == 1) {
			fetch('/homepage', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(response => response.json())
			.then(data => {
				var userName = data.username; 
				//var userName = "史迪奇";//getName(userdata);
				var totalDay = 10; //getTotalDay(userdata);
				var contiDay = 8; //getContiDay(userdata);
				var unlock = 2; //getUnlock(userdata);
				var main = document.getElementById("main");
				main.innerHTML = "";
				main.innerHTML +=   "<div class='section-info'>" +
										"<div id='left-col'>" + 
											"<div id='user-photo'><div id='photo-mask'><label id='photoBtn'><input type='file' accept='.jpg, .jpeg, .png'></input></label></div></div>" + 
											"<div id='user-name'><input value='" + userName + "'></input><div id='name-fix'>" + userName + "</div><div id='nameBtn'></div></div>" + 
											"<div id='information'><div>總計登入天數： " + totalDay.toString() + " 天</div><div>連續登入天數： " + contiDay.toString() +" 天</div><div>已解鎖繪本數： " + unlock.toString() + " 本</div></div>" + 
										"</div>" +
										"<div id='right-col'><div id='right-col-inner'></div></div>" +
									"</div>";
				$("#user-name input").css("display", "none");
				var photo = "./profile.png";//getPhoto(userdata);
				$("#user-photo").css("background-image", "url(" + photo + ")");
				var rewardList = ["連續登入 7 天：解鎖繪本《天長地久的約定》", "總計登入 10 天：解鎖繪本《容易受人影響的白絲》", "總計登入 20 天：解鎖繪本《你看不見我》"]; //rewardListFunc(userdata);
				var right_html = "";
				for (var i=0; i<rewardList.length; i++) {
					right_html += "<div class='right-col-info'>" + rewardList[rewardList.length-1-i] + "</div>";
				}
				$("#right-col-inner").html(right_html);
				
				$("#nameBtn").click(function () {
					fetch('/homepage', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						}
					})
					.then(response => response.json())
					.then(data => {
						var userName = data.username; // Retrieve the username from the response
						$("#user-name input").val(userName);
						$("#user-name input").css("display", "block");
						$("#name-fix").css("display", "none");
						$("#nameBtn").css("display", "none");
						$("#user-name input").keypress(function (event) {
							if (event.key === "Enter") {
								var key_word = $("#user-name input").val();
								if (key_word.trim() != "") {
									//changeName(userdata, key_word);
									userName = key_word;
									$("#name-fix").text(userName);
									$("#profileName").text(userName);
									$("#user-name input").css("display", "none");
									$("#name-fix").css("display", "block");
									$("#nameBtn").css("display", "block");
								}
							}
						});
					})
				});
				
				$("#photoBtn input").change(function (event) { 
					var newPhoto = event.target.files[0];
					if (newPhoto) {
						var fileType = newPhoto.type;
						if (fileType === 'image/jpg' || fileType === 'image/png') {
							const reader = new FileReader();
							reader.onload = function(e) {
								const base64String = e.target.result;
								var userId = "000001"; //getId(userdata);
								var lastPhoto = "/profile/000001.png"; //getPhoto(userdata).split("/raw")[1];
								deleteFile({
									accountId: "kW15c5s",
									apiKey: "secret_kW15c5sBHzqeSq3LwMpc2fG5Tnry",
									querystring: {
										filePath: lastPhoto
									}
								}).then(
									() => {console.log("Success.");
											uploadFile(userId, fileType.split("/")[1], base64String).then(
											(res) => {console.log("Success."); 
												//changePhoto(userdata, res);
												$("#user-photo").css("background-image", "url(" + res + ")");
												$("#profile div").css("background-image", "url(" + res + ")");
											},
											error => console.error(error)
									);},
									error => console.error(error)
								);
							};
							reader.readAsDataURL(newPhoto);
						} else {
							alert('Please select a file with .jpg, .jpeg, or .png extension.');
						}
					}
				});
			})
		} else {
			window.location.href = "../login/login.html";
		}
	}
	
	// layout foot
	if (whichPage == 0) {
		if (whichType == "homePage") {
			main.innerHTML += "<div class='section'><div class='section-ad'></div></div><div class='section'><div class='section-last'>© Meraki</div></div>";
			var adPic = "edit-hover.png";//adFunc(); //****
			$(".section-ad").css("background-image", "url(" + adPic + ")");
		} else {
			main.innerHTML += "<div class='section'><button id='backBtn'>回首頁<span></span><span></span><span></span><span></span></button></div><div class='section'><div class='section-last'>© Meraki</div></div>";
		}
	} else if (whichPage == 1) {
		if (whichType == "mybook") {
			main.innerHTML += "<div class='section'><div class='section-ad'></div></div><div class='section'><div class='section-last'>© Meraki</div></div>";
			var adPic = "edit-hover.png";//adFunc(); //****
			$(".section-ad").css("background-image", "url(" + adPic + ")");
		} else if (whichType == "search") {
			main.innerHTML += "<div class='section'><button id='backBtn'>回首頁<span></span><span></span><span></span><span></span></button></div><div class='section'><div class='section-last'>© Meraki</div></div>";
		}
	} else {
		main.innerHTML += "<div class='section'><div class='section-last'>© Meraki</div></div>";
	}
	
	// layout profile
	if (isLogin == 0) {
		user.innerHTML = "<button id='signupBtn'>註冊<span></span><span></span><span></span><span></span></button><button id='loginBtn'>登入<span></span><span></span><span></span><span></span></button>";
		allQuery("normal");
	} else if (isLogin == 1) {
		fetch('/homepage', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(response => response.json())
		.then(data => {
			var userName = data.username;
			var photo = data.userphoto; //****
			user.innerHTML = "<div id='profile'><div></div></div><div id='profileName'></div><button id='signoutBtn'>登出<span></span><span></span><span></span><span></span></button>";
			var profile = document.getElementById("profile").getElementsByTagName("div")[0];
			var profileName = document.getElementById("profileName");
			profile.style.backgroundImage = "url('"+ photo + "')";
			profileName.innerHTML = userName;
			$("#signoutBtn").click(function (){
				window.localStorage.removeItem("userdata");
				window.location.href = "../homepage/homepage.html";
			});
			allQuery("normal");
		})
	}
	
	// signin signout
	$("#signupBtn").click(function (){
		window.location.href = "../signup/signup.html";
	});

	$("#loginBtn").click(function (){
		window.location.href = "../login/login.html";
	});
}

function allQuery (type) {
	
	if (type == "reward") {
		queryBook = rewardBook;
		var openLetter = "r";
	} else {
		queryBook = content;
		var openLetter = "";
	}
	
	// bookmark hover
	$("." + openLetter + "bookmark").mouseenter(function (){
		$(this).css("background-image", "url('bookmark-on.png')");
	});

	$("." + openLetter + "bookmark").mouseleave(function (){
		var markIDR = $(this).parent().attr("id").substr(0, 1);
		if (markIDR == "r") {
			markIDR = 0;
		} else {
			markIDR = parseInt(markIDR);
		}
		var markIDL = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
		if (queryBook[markIDR][markIDL][4] == "bookmark-on.png") {
			$(this).css("background-image", "url('bookmark-on.png')");
		} else {
			$(this).css("background-image", "url('bookmark-off.png')");
		}
	});

	// change bookmark
	$("." + openLetter + "bookmark").click(function (){
		if (isLogin == 0) {
			window.location.href = "../login/login.html";
		} else {
			var markIDR = $(this).parent().attr("id").substr(0, 1);
			if (markIDR == "r") {
				markIDR = 0;
			} else {
				markIDR = parseInt(markIDR);
			}
			var markIDL = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
			if (queryBook[markIDR][markIDL][4] == "bookmark-on.png") {
				$(this).css("background-image", "url('bookmark-off.png')");
				queryBook[markIDR][markIDL][4] = "bookmark-off.png";
				//changeMark(userdata, queryBook[markIDR][markIDL][0], queryBook[markIDR][markIDL][4]);
				for (var i=0; i<3; i++) {
					for (var j=0; j<queryBook[i].length; j++) {
						if (queryBook[i][j][0] == queryBook[markIDR][markIDL][0]) {
							$("#" + i.toString() + j.toString() + " .bookmark").css("background-image", "url('bookmark-off.png')");
							queryBook[i][j][4] = "bookmark-off.png";
						}
					}
				}
			} else {
				$(this).css("background-image", "url('bookmark-on.png')");
				queryBook[markIDR][markIDL][4] = "bookmark-on.png";
				//changeMark(userdata, queryBook[markIDR][markIDL][0], queryBook[markIDR][markIDL][4]);
				for (var i=0; i<3; i++) {
					for (var j=0; j<queryBook[i].length; j++) {
						if (queryBook[i][j][0] == queryBook[markIDR][markIDL][0]) {
							$("#" + i.toString() + j.toString() + " .bookmark").css("background-image", "url('bookmark-on.png')");
							queryBook[i][j][4] = "bookmark-on.png";
						}
					}
				}
			}
		}
	});
	
	// preview screen
	$("." + openLetter + "preview").click(function () {
		var page = 0;
		var markIDR = $(this).parent().attr("id").substr(0, 1);
		if (markIDR == "r") {
			markIDR = 0;
			$("#reward-screen-container").remove();
		} else {
			markIDR = parseInt(markIDR);
		}
		var markIDL = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
		var preview_pic = ["https://upcdn.io/kW15c5s/raw/bookpage/000019-page0.png", "https://upcdn.io/kW15c5s/raw/bookpage/000019-page1.png", "https://upcdn.io/kW15c5s/raw/bookpage/000019-page2.png", "https://upcdn.io/kW15c5s/raw/bookpage/construction.png"];//getPreviewFunc(content[markIDR][markIDL][0]);
		$("body").append("<div id='preview-screen-container'><div id='preview-screen'>" + queryBook[markIDR][markIDL][1] + "<br><span>" + queryBook[markIDR][markIDL][2] +"</span><div id='preview-pic'><div id='switchPage'><div id='leftPage'>〈</div><div id='rightPage'>〉</div></div></div><button id='editBtn'>編輯</buttton><button id='close'>×</buttton></div></div>");
		$("#preview-pic").css("background-image", "url('" + preview_pic[page] + "')");
		$("#close").click(function () {
			$("#preview-screen-container").remove();
			queryBook = content;
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
				window.localStorage.setItem("bookdata", queryBook[markIDR][markIDL][0]);
				window.location.href = "../edit/edit.html";
			} else {
				window.location.href = "../login/login.html";
			}
		});
	});

	// edit button
	$("." + openLetter + "edit").click(function () {
		var markIDR = $(this).parent().attr("id").substr(0, 1);
		if (markIDR == "r") {
			markIDR = 0;
		} else {
			markIDR = parseInt(markIDR);
		}
		var markIDL = parseInt($(this).parent().attr("id").substr(1, ($(this).parent().attr("id").length - 1)));
		if (isLogin == 1) {
			window.localStorage.setItem("bookdata", queryBook[markIDR][markIDL][0]);
			window.location.href = "../edit/edit.html";
		} else {
			window.location.href = "../login/login.html";
		}
	});
	
	// back button
	$("#backBtn").click(function () {
		window.location.href = "../homepage/homepage.html";
	});
}

$("#home").click(function () {
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
		var optionText = $(this).text();
		menu(0, "theme", optionText);
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
		var optionText = $(this).text();
		menu(0, "author", optionText);
	});
});

$("#search input").keypress(function (event) {
	if (event.key === "Enter") {
		var key_word = $("#search input").val().trim();
		if (key_word != "") {
			menu(whichPage, "search", key_word);
		}
	}
});

$("#menu2").click(function () {
	if (isLogin == 1) {
		menu(1, "mybook", "");
	} else {
		window.location.href = "../login/login.html";
	}
});

$("#reward").click(function () {
	if (isLogin == 1) {
		var books = [[["000007", "盲人「看」顏色", "圖：龔郁雯/文 ：龔郁婷", "https://upcdn.io/kW15c5s/raw/bookcover/000001.png", "bookmark-off.png"], 
					  ["000027", "如果顏色是個人", "圖/文：陳薇安", "https://upcdn.io/kW15c5s/raw/bookcover/000027.png", "bookmark-off.png"]]]; //getRewardFunc(userdata); //****
		rewardBook = books;
		$("body").append("<div id='reward-screen-container'><div id='reward-screen'>已解鎖繪本<div id='bookshelf-container'><div class='bookshelf'></div></div><button id='close'>×</buttton></div></div>");
		$("#reward-screen .bookshelf").html("");
		for (var j=0; j<rewardBook[0].length; j++) {
			$("#reward-screen .bookshelf").append("<div id='r" + rewardBook[0][j][0] + "' class='book'>" +
											"<div class='cover'></div>" +
											"<div id='r" + j.toString() + "' class='mask'>" +
												"<div class='rbookmark'></div>" +
												"<div class='rpreview'></div>" +
												"<div class='redit'></div>" +
											"</div>" +
											"<div class='book-name'>" + rewardBook[0][j][1] + "</div>" +
											"<div class='author-name'>" + rewardBook[0][j][2] + "</div>" +
										"</div>");
			$("#r" + rewardBook[0][j][0] + " .cover").css("background-image", "url('" + rewardBook[0][j][3] + "')");
		}
	} else {
		window.location.href = "../login/login.html";
	}
	
	allQuery("reward");
	
	$("#close").click(function () {
		$("#reward-screen-container").remove();
	});
});

$("#menu3").click(function () {
	if (isLogin == 1) {
		menu(2, "", "");
	} else {
		window.location.href = "../login/login.html";
	}
});

const getBookLists = async (userEmail) => {
    try {
        // Fetch user data based on email
        const user = await UserModel.findOne({ email: userEmail });

        // If user is not found, return random recommendations
        if (!user) {
            const randomBooks = await Book.aggregate([{ $sample: { size: 5 } }]);
            return {
                selectedBooks: randomBooks,
                recommendedBooks: randomBooks,
                unfinishedBooks: []
            };
        }

        // Fetch the book lists for a logged-in user
        const selectedBooks = await Book.find({ state: 'choice' }).limit(5);
        const recommendedBooks = await Book.aggregate([{ $sample: { size: 5 } }]);
        const unfinishedBooks = await Book.find({ state: 'unfinished' });

        return {
            selectedBooks: selectedBooks,
            recommendedBooks: recommendedBooks,
            unfinishedBooks: unfinishedBooks
        };

    } catch (error) {
        console.error('Error fetching book lists:', error);
        return null;
    }
};

module.exports.getBookLists = getBookLists;