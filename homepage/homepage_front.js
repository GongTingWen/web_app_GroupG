
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
	apiKey: "public_W142iekD5fGNTaRHUxK81WE6wLtQ" // This is your API key.
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
			var fetchbook = "/contentFunc";
			var json_data = { userdata: userdata };
			var section_name = ["本月精選", "為您推薦", "最新繪本", "繼續完成"];
		} else if (whichType == "theme") {
			var fetchbook = "/categoryBookFunc";
			var json_data = { userdata: userdata, whichKey: whichKey, whichType: whichType };
			var section_name = [whichKey];
		} else if (whichType == "author") {
			var fetchbook = "/categoryBookFunc";
			var json_data = { userdata: userdata, whichKey: whichKey, whichType: whichType };
			var section_name = [whichKey];
		} else if (whichType == "search") {
			var fetchbook = "/searchBookFunc";
			var json_data = { userdata: userdata, whichKey: whichKey };
			var section_name = ["根據 " + whichKey + " 的搜尋結果"];
		}
	} else if (whichPage == 1) {
		if (whichType == "mybook") {
			var fetchbook = "/myBookFunc";
			var json_data = { userdata: userdata };
			var section_name = ["繼續完成", "已加書籤", "已完成"];
		} else if (whichType == "search") {
			var fetchbook = "/searchInMyBookFunc";
			var json_data = { userdata: userdata, whichKey: whichKey };
			var section_name = ["在我的繪本中，根據 " + whichKey + " 的搜尋結果"];
		}
	} else {
		var fetchbook = "/blank";
		var json_data = {};
		var section_name = [];
	}
	
	//layout main
	fetch(fetchbook, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(json_data)
	})
	.then(response => response.json())
	.then(data => {
		var books = data.books;
		if (whichType == "mybook" || whichType == "homePage") {
			var ad = data.ad;
		}
		content = books;
		
		var main = document.getElementById("main");
		main.innerHTML = "";
		
		if (whichPage != 2) {
			var whichshelf = 0;
			for (var i=0; i<section_name.length; i++) {
				if (content[i].length != 0) {
					main.innerHTML +=   "<div class='section'>" +
											"<div class='section-name'>" + section_name[i] + "</div>" +
											"<div class='bookshelf'>" +
											"</div>" +
										"</div>";
					var bookshelf = document.getElementsByClassName("bookshelf")[whichshelf];
					whichshelf += 1;
					for (var j=0; j<content[i].length; j++) {
						bookshelf.innerHTML +=  "<div id='" + "a" + i.toString() + content[i][j][0] + "' class='book'>" +
													"<div class='cover'></div>" +
													"<div id='" + i.toString() + j.toString() + "' class='mask'>" +
														"<div class='bookmark'></div>" +
														"<div class='preview'></div>" +
														"<div class='edit'></div>" +
													"</div>" +
													"<div class='book-name'>" + content[i][j][1] + "</div>" +
													"<div class='author-name'>" + content[i][j][2] + "</div>" +
												"</div>";
						var cover = document.getElementById("a" + i.toString() + content[i][j][0]).getElementsByClassName("cover")[0];
						var bookmark = document.getElementById("a" + i.toString() + content[i][j][0]).getElementsByClassName("bookmark")[0];
						cover.style.backgroundImage = "url(" + content[i][j][3] + ")";
						bookmark.style.backgroundImage = "url(" + content[i][j][4] + ")";
					}
				} else {
					if (whichType == "search" && whichPage == 0) {
						main.innerHTML +=   "<div class='section'>" +
											"<div class='section-name'>" + "沒有根據 " + whichKey + " 的搜尋結果"+ "</div>" +
											"<div class='bookshelf'>" +
											"</div>" +
										"</div>";
					} else if (whichType == "search" && whichPage == 1) {
						main.innerHTML +=   "<div class='section'>" +
											"<div class='section-name'>" + "在我的繪本中，沒有根據 " + whichKey + " 的搜尋結果" + "</div>" +
											"<div class='bookshelf'>" +
											"</div>" +
										"</div>";
					}
				}
			}
		} else {
			if (isLogin == 1) {
				fetch('/person', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ userdata: userdata })
				})
				.then(response => response.json())
				.then(data => {
					var userId = data.userId;
					var userName = data.username; 
					var totalDay = data.totalDay;
					var contiDay = data.contiDay;
					var unlock = data.unlock;
					main.innerHTML +=   "<div class='section-info'>" +
											"<div id='left-col'>" + 
												"<div id='user-photo'><div id='photo-mask'><label id='photoBtn'><input type='file' accept='.jpg, .jpeg, .png'></input></label></div></div>" + 
												"<div id='user-name'><input value='" + userName + "'></input><div id='name-fix'>" + userName + "</div><div id='nameBtn'></div></div>" + 
												"<div id='information'><div>總計登入天數： " + totalDay.toString() + " 天</div><div>連續登入天數： " + contiDay.toString() +" 天</div><div>已解鎖繪本數： " + unlock.toString() + " 本</div></div>" + 
											"</div>" +
											"<div id='right-col'><div id='right-col-inner'></div></div>" +
										"</div><div class='section'><div class='section-last'>© Meraki</div></div>";
					$("#user-name input").css("display", "none");
					var photo = data.photo;
					$("#user-photo").css("background-image", "url(" + photo + ")");
					var rewardList = data.award;
					var right_html = "";
					for (var i=0; i<rewardList.length; i++) {
						right_html += "<div class='right-col-info'>" + rewardList[rewardList.length-1-i] + "</div>";
					}
					$("#right-col-inner").html(right_html);
					$("#nameBtn").click(function () {
						$("#user-name input").val($("#name-fix").text());
						$("#user-name input").css("display", "block");
						$("#name-fix").css("display", "none");
						$("#nameBtn").css("display", "none");
						$("#user-name input").keypress(function (event) {
							if (event.key === "Enter") {
								var key_word = $("#user-name input").val().trim();
								fetch('/updatename', {
									method: 'POST',
									headers: {
										'Content-Type': 'application/json'
									},
									body: JSON.stringify({ userdata: userdata, newname: key_word })
								})
								.then(response => response.json())
								.then(data => {
									if (key_word != "") {
										userName = key_word;
										$("#name-fix").text(userName);
										$("#profileName").text(userName);
										$("#user-name input").css("display", "none");
										$("#name-fix").css("display", "block");
										$("#nameBtn").css("display", "block");
									}
								})
								.catch(error => {
									console.error('Error:', error);
								});
							}
						});
					});
					$("#photoBtn input").change(function (event) { 
						var newPhoto = event.target.files[0];
						if (newPhoto) {
							var fileType = newPhoto.type;
							if (fileType === 'image/jpg' || fileType === 'image/png' || fileType === 'image/jpeg') {
								$("#loading").css("display", "flex");
								const reader = new FileReader();
								reader.onload = function(e) {
									const base64String = e.target.result;
									fetch('/lastphoto', {
										method: 'POST',
										headers: {
											'Content-Type': 'application/json'
										},
										body: JSON.stringify({ userdata: userdata })
									})
									.then(response => response.json())
									.then(data => {
										var lastPhoto = data.path.split("/raw")[1];
										deleteFile({
											accountId: "W142iek",
											apiKey: "secret_W142iekEhVzUBtkUhWc41mTyHFov",
											querystring: {
												filePath: lastPhoto
											}
										}).then(
											() => {console.log("Success.");
												uploadFile(userId, fileType.split("/")[1], base64String).then(
													(res) => {console.log("Success."); 
													fetch('/updatephotourl', {
														method: 'POST',
														headers: {
															'Content-Type': 'application/json'
														},
														body: JSON.stringify({ userdata: userdata, filepath: res })
													})
													$("#loading").css("display", "none");
													$("#user-photo").css("background-image", "url(" + res + ")");
													$("#profile div").css("background-image", "url(" + res + ")");
													},
													error => console.error(error)
											);},
											error => {$("#loading").css("display", "none"); console.error(error);}
										);
									})
									.catch(error => {
										$("#loading").css("display", "none");
										console.error('Error:', error);
									});
								};
								reader.readAsDataURL(newPhoto);
							} else {
								alert('Please select a file with .jpg, .jpeg, or .png extension.');
							}
						}
					});
				})
				.catch(error => {
					console.error('Error:', error);
				});
			} else {
				window.location.href = "../login/login.html";
			}
		}
		
		//layoutfoot
		if (whichPage == 0) {
			if (whichType == "homePage") {
				main.innerHTML += "<div class='section'><div class='section-ad'></div></div><div class='section'><div class='section-last'>© Meraki</div></div>";
				var adPic = ad;
				$(".section-ad").css("background-image", "url(" + adPic + ")");
			} else {
				main.innerHTML += "<div class='section'><button id='backBtn'>回首頁<span></span><span></span><span></span><span></span></button></div><div class='section'><div class='section-last'>© Meraki</div></div>";
			}
		} else if (whichPage == 1) {
			if (whichType == "mybook") {
				main.innerHTML += "<div class='section'><div class='section-ad'></div></div><div class='section'><div class='section-last'>© Meraki</div></div>";
				var adPic = ad; //****
				$(".section-ad").css("background-image", "url(" + adPic + ")");
			} else if (whichType == "search") {
				main.innerHTML += "<div class='section'><button id='backBtn'>回首頁<span></span><span></span><span></span><span></span></button></div><div class='section'><div class='section-last'>© Meraki</div></div>";
			}
		}

		//layout profile
		if (isLogin == 0) {
			user.innerHTML = "<button id='signupBtn'>註冊<span></span><span></span><span></span><span></span></button><button id='loginBtn'>登入<span></span><span></span><span></span><span></span></button>";
			allQuery("normal");
		} else if (isLogin == 1) {
			fetch('/profile', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ userdata: userdata })
			})
			.then(response => response.json())
			.then(data => {
				var userName = data.username;
				var photo = data.photo;
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
		
	})
	.catch(error => {
        console.error('Error:', error);
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
				fetch('/changemark', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ userdata: userdata, bookId: queryBook[markIDR][markIDL][0], newmark: queryBook[markIDR][markIDL][4] })
				})
				for (var i=0; i<content.length; i++) {
					for (var j=0; j<content[i].length; j++) {
						if (content[i][j][0] == queryBook[markIDR][markIDL][0]) {
							$("#" + i.toString() + j.toString() + " .bookmark").css("background-image", "url('bookmark-off.png')");
							content[i][j][4] = "bookmark-off.png";
						}
					}
				}
			} else {
				$(this).css("background-image", "url('bookmark-on.png')");
				queryBook[markIDR][markIDL][4] = "bookmark-on.png";
				fetch('/changemark', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ userdata: userdata, bookId: queryBook[markIDR][markIDL][0], newmark: queryBook[markIDR][markIDL][4] })
				})
				for (var i=0; i<content.length; i++) {
					for (var j=0; j<content[i].length; j++) {
						if (content[i][j][0] == queryBook[markIDR][markIDL][0]) {
							$("#" + i.toString() + j.toString() + " .bookmark").css("background-image", "url('bookmark-on.png')");
							content[i][j][4] = "bookmark-on.png";
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
		fetch('/previewpic', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
				body: JSON.stringify({ bookId: queryBook[markIDR][markIDL][0] })
			})
		.then(response => response.json())
		.then(data => {
			var preview_pic = data.preview_pic;
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
		})
		.catch(error => {
			console.error('Error:', error);
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
	fetch('/theme', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then(response => response.json())
	.then(data => {
		var alltheme = data.theme;
		var themehtml = "";
		for (var i=0; i<alltheme.length; i++) {
			themehtml += "<div class='themeOpt'>" + alltheme[i] + "</div>";
		}
		$("#themeList").html(themehtml);
		$(".themeOpt").click(function () {
			var optionText = $(this).text();
			menu(0, "theme", optionText);
		});
	})
	.catch(error => {
		console.error('Error:', error);
	});
});

$("#author").mouseenter(function (){
	fetch('/author', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then(response => response.json())
	.then(data => {
		var allauthor = data.author;
		var authorhtml = "";
		for (var i=0; i<allauthor.length; i++) {
			authorhtml += "<div class='authorOpt'>" + allauthor[i] + "</div>";
		}
		$("#authorList").html(authorhtml);
		$(".authorOpt").click(function () {
			var optionText = $(this).text();
			menu(0, "author", optionText);
		});
	})
	.catch(error => {
		console.error('Error:', error);
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
		fetch('/rewardbook', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ userdata: userdata })
			})
			.then(response => response.json())
			.then(data => {
				var books = data.rewardbook;
				rewardBook = books;
				$("body").append("<div id='reward-screen-container'><div id='reward-screen'>已解鎖繪本<div id='bookshelf-container'><div class='bookshelf'></div></div><button id='close'>×</buttton></div></div>");
				$("#reward-screen .bookshelf").html("");
				for (var j=0; j<rewardBook[0].length; j++) {
					$("#reward-screen .bookshelf").append("<div id='b" + rewardBook[0][j][0] + "' class='book'>" +
													"<div class='cover'></div>" +
													"<div id='r" + j.toString() + "' class='mask'>" +
														"<div class='rbookmark'></div>" +
														"<div class='rpreview'></div>" +
														"<div class='redit'></div>" +
													"</div>" +
													"<div class='book-name'>" + rewardBook[0][j][1] + "</div>" +
													"<div class='author-name'>" + rewardBook[0][j][2] + "</div>" +
												"</div>");
					$("#b" + rewardBook[0][j][0] + " .cover").css("background-image", "url('" + rewardBook[0][j][3] + "')");
				}

				allQuery("reward");
				
				$("#close").click(function () {
					$("#reward-screen-container").remove();
				});
			})
			.catch(error => {
				console.error('Error:', error);
			});
	} else {
		window.location.href = "../login/login.html";
	}
});

$("#menu3").click(function () {
	if (isLogin == 1) {
		menu(2, "", "");
	} else {
		window.location.href = "../login/login.html";
	}
});