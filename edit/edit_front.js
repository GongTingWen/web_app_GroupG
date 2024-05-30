
var page = 0;
var totalPage = 2; //totalPageFunc();

var userdata = window.localStorage.getItem("userdata");

var sendorNot = 0;

var base64Images = [];

const uploadManager = new Bytescale.UploadManager({
	apiKey: "public_kW15c5s5fNhx1V9REiavxdWpKDj1" // This is your API key.
});

var book_name = document.getElementById("book-name");
var book_id = window.localStorage.getItem("bookdata");
var book_nameText = "絲念"; //getBookNameFunc(book_id);
book_name.innerHTML = book_nameText;
$("title").html($("title").html() + book_nameText);

var author_name = document.getElementById("author-name");
author_name.innerHTML = "圖/文：龔郁婷"; //getAuthorkNameFunc(book_id);

var userName = "史迪奇";//getName(userdata);
var userId = "000001";//getId(userdata);
var photo = "book328553.png";//getPhoto(userdata);
var profile = document.getElementById("profile").getElementsByTagName("div")[0];
var profileName = document.getElementById("profileName");
profile.style.backgroundImage = "url('"+ photo + "')";
profileName.innerHTML = userName;

var leaveBtn = document.getElementById("leaveBtn");
leaveBtn.addEventListener("click", saveImgLeave);

var leftPage = document.getElementById("leftPage");
leftPage.addEventListener("click", saveImgLeft);

var rightPage = document.getElementById("rightPage");
rightPage.addEventListener("click", saveImgRight);

function saveImgLeft() {
	if (page != 0) {
		var canvSH = document.getElementById("color");
		var newState = canvSH.toDataURL("image/png");
		var lastPhoto = "/show/000001_000001_page0.png"; //showURL(userdata, book_id, page).split("/raw")[1];
		deleteFile({
			accountId: "kW15c5s",
			apiKey: "secret_kW15c5sBHzqeSq3LwMpc2fG5Tnry",
			querystring: {
				filePath: lastPhoto
			}
		}).then(
			() => {console.log("Success.");
				uploadFile(newState).then(
					(res) => {console.log("Success."); 
						//updateFunc(userdata, book_id, page, res);
						page -= 1;
						refresh();
					},
				error => console.error(error)
			);},
			error => console.error(error)
		);
	}
}

function saveImgRight() {
	if (page != totalPage) {
		var canvSH = document.getElementById("color");
		var newState = canvSH.toDataURL("image/png");
		var lastPhoto = "/show/000001_000001_page0.png"; //showURL(userdata, book_id, page).split("/raw")[1];
		deleteFile({
			accountId: "kW15c5s",
			apiKey: "secret_kW15c5sBHzqeSq3LwMpc2fG5Tnry",
			querystring: {
				filePath: lastPhoto
			}
		}).then(
			() => {console.log("Success.");
				uploadFile(newState).then(
					(res) => {console.log("Success."); 
						//updateFunc(userdata, book_id, page, res);
						page += 1;
						refresh();
					},
				error => console.error(error)
			);},
			error => console.error(error)
		);
	}
}

function saveImgLeave() {
	var complete = 0;
	for (var i=0; i<totalPage; i++) {
		var a = 1; //ifFirst(userdata, book_id, i);
		if (a != 0) {
			complete += 1;
		}
	}
	if (complete == totalPage) {
		//changeComplete(userId, book_id);  
	}
	var canvSH = document.getElementById("color");
	var newState = canvSH.toDataURL("image/png");
	var lastPhoto = "/show/000001_000001_page0.png"; //showURL(userdata, book_id, page).split("/raw")[1];
	deleteFile({
			accountId: "kW15c5s",
			apiKey: "secret_kW15c5sBHzqeSq3LwMpc2fG5Tnry",
			querystring: {
				filePath: lastPhoto
			}
		}).then(
			() => {console.log("Success.");
					uploadFile(newState).then(
					(res) => {console.log("Success."); 
						//updateFunc(userdata, book_id, page, res);
						window.localStorage.removeItem("bookdata");
						window.history.back(-1);
					},
					error => console.error(error)
			);},
			error => console.error(error)
		);
}

function returnPage() {
	return page;
}

async function uploadFile (base64) {
	const base64Response = await fetch(base64);
	const blob = await base64Response.blob();
	const file = new File([blob], "x.png");
	try {
		const { fileUrl, filePath } = await uploadManager.upload({ 
			data: file,
			path: {
				folderPath: "/show",
				fileName: "{UTC_YEAR}{UTC_MONTH}{UTC_DAY}{UTC_HOUR}{UTC_MINUTE}{UTC_SECOND}_" + userId + "_" + book_id + "_page" + page + ".png"
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

$("#shareBtn").click(function () {
	var canvSH = document.getElementById("color");
	var newState = canvSH.toDataURL("image/png");
	var lastPhoto = "/show/000001_000001_page0.png"; //showURL(userdata, book_id, page).split("/raw")[1];
	deleteFile({
			accountId: "kW15c5s",
			apiKey: "secret_kW15c5sBHzqeSq3LwMpc2fG5Tnry",
			querystring: {
				filePath: lastPhoto
			}
		}).then(
			() => {console.log("Success.");
				uploadFile(newState).then(
					(res) => {console.log("Success."); 
					//updateFunc(userdata, book_id, page, res);
					},
					error => console.error(error)
				);},
			error => console.error(error)
		);
	sendorNot = 0;
	var address = "";
	$("body").append("<div id='share-screen-container'><div id='share-loading'>Loading</div><div id='share-screen'><div id='share-screen-inner'><fieldset id='icon-container'><legend id='share'>立即分享至</legend>" + 
						"<div class='line-it-button icon'></div>" +
						"<div class='x-share-button icon'></div></fieldset>" +
						"<div id='link-parent'></div>" + 
						"<fieldset id='download-container'><legend id='download'>輸出至裝置</legend><label for='opt'><input type='radio' id='opt' name='opt' value='0' checked />全部頁面</label>" + 
						"<label for='opt'><input type='radio' id='opt' name='opt' value='1'/>當前頁面</label><button id='downloadBtn'>輸出<span></span><span></span><span></span><span></span></button></fieldset><div id='copy-done'>已複製連結</div></div><button id='close'>×</buttton></div></div>");
	
	$("#share-screen").css("display", "none");
	$("#copy-done").css("display", "none");
	base64Images = [];
	var havePage = 2; //havePageFunc(userdata, book_id);
	for(var i=0; i<havePage; i++) {
		createBase64(i);
	}
	var okay = setInterval(function () {
		if (base64Images.length == havePage && sendorNot == 0) {
			sendorNot = 1;
			async function onFileSelected () {
				for (var i=0; i<base64Images.length;i++) {
					const base64Response = await fetch(base64Images[i]);
					const blob = await base64Response.blob();
					const file = new File([blob], book_nameText + "_page" + (i + 1) + ".jpeg");
					try {
						const { fileUrl, filePath } = await uploadManager.upload({
							data: file,
							path: {
								folderPath: "/share",
								fileName: "{UTC_YEAR}{UTC_MONTH}{UTC_DAY}{UTC_HOUR}{UTC_MINUTE}{UTC_SECOND}_" + userId + "_" + book_id + "_page" + i + ".jpeg"
							}
						});
						$("#link-parent").append("<div class='link-container'><div class='copy'>Page " + (i + 1) + "</div><input readonly value='" + fileUrl + "'/></div>");
						address += (fileUrl + '\n\n');
					} catch (e) {
						console.log(`Error:\n${e.message}`);
					}
				}
				address = address.replace(/\s+$/g, "");
				$("#share-screen").css("display", "flex");
				$(".link-container input").click(function () {
					$(this).select();
					$("#copy-done").css("display", "inline-block");
					document.execCommand("copy");
					setTimeout(function () {
						$("#copy-done").css("display", "none");
					}, 1000);
				});
			}
			onFileSelected();
			clearInterval(okay);
		}
	}, 1);
	$('.line-it-button').click(function () {
		const albumUrl = address;
		const lineShareUrl = `https://line.me/R/msg/text/?${encodeURIComponent(albumUrl)}`;
		window.open(lineShareUrl, '_blank');
	});
	$('.x-share-button').click(function () {
		const albumUrl = address;
		const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(albumUrl)}`;
		window.open(twitterShareUrl, '_blank');
	});
	$("#close").click(function () {
		$("#share-screen-container").remove();
	});
	$("#downloadBtn").click(function () {
		if ($("#opt").val() == "0") {
			for (var j=0; j<totalPage; j++) {
				const link = document.createElement('a');
				link.download = book_nameText + "_page" + (j + 1) + ".jpeg";
				link.href = base64Images[j];
				link.click();
			}
		} else {
			const link = document.createElement('a');
			link.download = book_nameText + "_page" + (page + 1) + ".jpeg";
			link.href = base64Images[page];
			link.click();
		}
	});
});

function createBase64 (n) {
	var colorSV = [];
	
	var canvFR = document.createElement("canvas");
	var ctxFR = canvFR.getContext("2d");
	var imgFR = new Image();
	var imgDataFR = "";
	var pixelDataFR = "";
		
	var canvS = document.createElement("canvas");
	var ctxS = canvS.getContext("2d");
	var imgS = new Image();
	var imgDataS = "";
	var pixelDataS = "";
	
	imgS.onload = function () {

		canvFR.width = imgFR.width;
		canvFR.height = imgFR.height;
		canvFR.style.display = "none";
		ctxFR.drawImage(imgFR, 0, 0);
		imgDataFR = ctxFR.getImageData(0, 0, canvFR.width, canvFR.height);
		pixelDataFR = imgDataFR.data;
		
		canvS.width = imgS.width;
		canvS.height = imgS.height;
		canvS.style.display = "none";
		ctxS.drawImage(imgS, 0, 0);
		imgDataS = ctxS.getImageData(0, 0, canvS.width, canvS.height);
		pixelDataS = imgDataS.data;

		for (var i=0; i<pixelDataFR.length; i+=4){
				
			var redFR = pixelDataFR[i];
			var greenFR = pixelDataFR[i+1];
			var blueFR = pixelDataFR[i+2];
			var aFR = pixelDataFR[i+3];
			
			var redS = pixelDataS[i];
			var greenS = pixelDataS[i+1];
			var blueS = pixelDataS[i+2];
			var aS = pixelDataS[i+3];
			
			if (aFR != 0){
				colorSV.push([redFR,greenFR,blueFR,aFR]);
			} else {
				colorSV.push([redS,greenS,blueS,aS]);
			}
		}
		for (var j=0; j<pixelDataFR.length; j+=4) {
			pixelDataFR[j] = colorSV[j / 4][0];
			pixelDataFR[j + 1] = colorSV[j / 4][1];
			pixelDataFR[j + 2] = colorSV[j / 4][2];
			pixelDataFR[j + 3] = 255;
		}
		var canvSV = document.createElement("canvas");
		var ctxSV = canvSV.getContext("2d");
		canvSV.width = imgFR.width;
		canvSV.height = imgFR.height;
		ctxSV.putImageData(imgDataFR, 0, 0);
		
		base64Images.push(canvSV.toDataURL('image/jpeg'));
	};
	
	async function loadImg () {
		var myHeaders = new Headers();
		var myInit = {
		  method: "GET",
		  headers: myHeaders,
		  mode: "cors",
		  cache: "default",
		};
		var allImg = ["https://upcdn.io/kW15c5s/raw/bookpage/000007-page0.png", "https://upcdn.io/kW15c5s/raw/bookpage/transparent.png"]; //shareURL(userdata, book_id, pageNow)
		
		for (var i=0; i<2;i++) {
			const myRequest = new Request(allImg[i], myInit);

			await fetch(myRequest)
			  .then(function (response) {
				return response.blob();
			  })
			  .then(function (myBlob) {
				const objectURL = URL.createObjectURL(myBlob);
				if (i == 0) {
					imgFR.src = objectURL;
				} else if (i == 1) {
					imgS.src = objectURL;
				}
			  });
		}
	}
    
	loadImg ();
}