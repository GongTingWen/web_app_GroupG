
var userdata = window.localStorage.getItem("userdata");
var book_id = window.localStorage.getItem("bookdata");
// console.log(book_id);
//ifCreateCondition(userdata, book_id);

var page = 0;
var totalPage = 2; //totalPageFunc(book_id);

var sendorNot = 0;

var base64Images = [];

const uploadManager = new Bytescale.UploadManager({
	apiKey: "public_kW15c5s5fNhx1V9REiavxdWpKDj1" // This is your API key.
});

var book_author = "author";
var book_full_name = "book";

if (book_id == "000007") {
    book_author = "圖：龔郁雯/文：龔郁婷";
    book_full_name = "盲人「看」顏色";
} else if (book_id == "000027") {
    book_author = "圖/文：陳薇安";
    book_full_name = "如果顏色是個人";
} else if (book_id == "000015") {
    book_author = "圖：龔郁雯/文：陳薇安";
    book_full_name = "石頭的輪迴";
} else if (book_id == "000021") {
    book_author = "圖/文：龔郁婷";
    book_full_name = "想嘗一口嗎？";
} else if (book_id == "000008") {
    book_author = "圖/文：陳薇安";
    book_full_name = "What color is your hat?";
} else if (book_id == "000024") {
    book_author = "圖：龔郁婷/文：陳薇安";
    book_full_name = "白色山藥不見了";
} else if (book_id == "000022") {
    book_author = "圖：龔郁婷/文：龔郁雯";
    book_full_name = "百變甜心";
} else if (book_id == "000023") {
    book_author = "圖/文：陳薇安";
    book_full_name = "Bon Appétit";
} else if (book_id == "000025") {
    book_author = "圖/文：陳薇安";
    book_full_name = "福爾摩沙食物圖鑑";
} else if (book_id == "000026") {
    book_author = "圖：龔郁雯/文：龔郁婷";
    book_full_name = "米米愛蛋糕";
}
var book_name = document.getElementById("book-name");
var book_nameText = book_full_name; //"如果顏色是個人"; //getBookNameFunc(book_id);
book_name.innerHTML = book_nameText;
$("title").html($("title").html() + book_nameText);

var author_name = document.getElementById("author-name");
author_name.innerHTML = book_author; //"圖/文：陳薇安"; //getAuthorkNameFunc(book_id);
fetch('/homepage', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	}
})
.then(response => response.json())
.then(data => {
	var userName = data.username; 
	var profileName = document.getElementById("profileName");
	profile.style.backgroundImage = "url('"+ photo + "')";
	profileName.innerHTML = userName;
	//profileName.innerHTML = userName;
})
var userId = "000001";//getId(userdata);
var photo = "book328553.png";//getPhoto(userdata);
var profile = document.getElementById("profile").getElementsByTagName("div")[0];

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
						"<fieldset id='download-container'><legend id='download'>輸出至裝置</legend><label for='opt1'><input type='radio' id='opt1' name='opt' value='0' checked />全部頁面</label>" + 
						"<label for='opt2'><input type='radio' id='opt2' name='opt' value='1'/>當前頁面</label><button id='downloadBtn'>輸出<span></span><span></span><span></span><span></span></button></fieldset><div id='copy-done'>已複製連結</div></div><button id='close'>×</buttton></div></div>");
	
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
		if ($("*[name= 'opt']").val() == "0") {
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



// Declare book_id globally
var book_id;

window.onload = function() {
    // Retrieve book_id from localStorage when the page loads
    book_id = window.localStorage.getItem("bookdata");
    console.log("Retrieved book_id:", book_id);

    // Call createBase64 function only after book_id is retrieved
    createBase64();
};

function createBase64() {
    console.log("Using book_id in createBase64:", book_id);
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

        for (var i = 0; i < pixelDataFR.length; i += 4) {
            var redFR = pixelDataFR[i];
            var greenFR = pixelDataFR[i + 1];
            var blueFR = pixelDataFR[i + 2];
            var aFR = pixelDataFR[i + 3];
            
            var redS = pixelDataS[i];
            var greenS = pixelDataS[i + 1];
            var blueS = pixelDataS[i + 2];
            var aS = pixelDataS[i + 3];
            
            if (aFR != 0) {
                colorSV.push([redFR, greenFR, blueFR, aFR]);
            } else {
                colorSV.push([redS, greenS, blueS, aS]);
            }
        }
        for (var j = 0; j < pixelDataFR.length; j += 4) {
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
    
    async function loadImg() {
        var myHeaders = new Headers();
        var myInit = {
            method: "GET",
            headers: myHeaders,
            mode: "cors",
            cache: "default",
        };
        
        console.log("Using book_id in loadImg:", book_id);
        var frameURL = getFrameURL(book_id);
        var allImg = ["https://upcdn.io/kW15c5s/raw/bookpage/000005-page0.png", "https://upcdn.io/kW15c5s/raw/bookpage/transparent.png"];

        for (var i = 0; i < 2; i++) {
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
    
    loadImg();
}

function getFrameURL(book_id) {
    var frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000001-page0.png";
    switch (book_id) {
        case "000001":
            frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000001-page0.png";
            break;
        case "000002":
            frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000002-page0.png";
            break;
        case "000003":
            frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000003-page0.png";
            break;
        case "000004":
            frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000004-page0.png";
            break;
        case "000005":
            frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000005-page0.png";
            break;
        case "000006":
            frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000006-page0.png";
            break;
        case "000007":
            frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000007-page0.png";
            break;
        case "000008":
            frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000008-page0.png";
            break;
        case "000009":
            frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000009-page0.png";
            break;
        case "000010":
            frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000010-page0.png";
            break;
        case "000011":
            frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000011-page0.png";
            break;
        case "000012":
            frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000012-page0.png";
            break;
        case "000013":
            frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000013-page0.png";
            break;
        case "000014":
            frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000014-page0.png";
            break;
        case "000015":
            frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000015-page0.png";
            break;
        case "000016":
            frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000016-page0.png";
            break;
        case "000017":
            frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000017-page0.png";
            break;
        case "000018":
            frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000018-page0.png";
            break;
        case "000020":
            frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000020-page0.png";
            break;
        case "000021":
            frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000021-page0.png";
            break;
        case "000022":
            frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000022-page0.png";
            break;
        case "000023":
            frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000023-page0.png";
            break;
        case "000024":
            frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000024-page0.png";
            break;
        case "000025":
            frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000025-page0.png";
            break;
        case "000026":
            frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000026-page0.png";
            break;
        case "000027":
            frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000027-page0.png";
            break;
        case "000028":
            frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000028-page0.png";
            break;
        case "000029":
            frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000029-page0.png";
            break;
        case "000030":
            frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000030-page0.png";
            break;
        default:
            frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000030-page0.png";
            break;
    }
    return frameURL;
}


// Call createBase64 function when needed
createBase64(someValue);

/*
var book_id = window.localStorage.getItem("bookdata");
function createBase64 (n) {
	
	console.log("Retrieved book_id:", book_id);
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
		console.log("Retrieved book_id:", book_id);
		var myInit = {
		  method: "GET",
		  headers: myHeaders,
		  mode: "cors",
		  cache: "default",
		};
		var frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000007-page0.png";
		//var fixURL = "https://upcdn.io/kW15c5s/raw/bookpage/transparent.png";
		
		console.log(book_id);
		if (book_id == "000001") {
			frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000001-page0.png";
		} else if (book_id == "000002") {
			frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000002-page0.png";
		} else if (book_id == "000003") {
			frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000003-page0.png";
		} else if (book_id == "000004") {
			frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000004-page0.png";
		} else if (book_id == "000005") {
			frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000005-page0.png";
		} else if (book_id == "000006") {
			frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000006-page0.png";
		} else if (book_id == "000007") {
			frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000007-page0.png";
		} else if (book_id == "000008") {
			frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000008-page0.png";
		} else if (book_id == "000009") {
			frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000009-page0.png";
		} else if (book_id == "000010") {
			frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000010-page0.png";
		} else if (book_id == "000011") {
			frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000011-page0.png";
		} else if (book_id == "000012") {
			frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000012-page0.png";
		} else if (book_id == "000013") {
			frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000013-page0.png";
		} else if (book_id == "000014") {
			frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000014-page0.png";
		} else if (book_id == "000015") {
			frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000015-page0.png";
		} else if (book_id == "000016") {
			frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000016-page0.png";
		} else if (book_id == "000017") {
			frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000017-page0.png";
		} else if (book_id == "000018") {
			frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000018-page0.png";
		} else if (book_id == "000020") {
			frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000020-page0.png";
		} else if (book_id == "000021") {
			frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000021-page0.png";
		} else if (book_id == "000022") {
			frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000022-page0.png";
		} else if (book_id == "000023") {
			frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000023-page0.png";
		} else if (book_id == "000024") {
			frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000024-page0.png";
		} else if (book_id == "000025") {
			frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000025-page0.png";
		} else if (book_id == "000026") {
			frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000026-page0.png";
		} else if (book_id == "000027") {
			frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000027-page0.png";
		} else if (book_id == "000028") {
			frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000028-page0.png";
		} else if (book_id == "000029") {
			frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000029-page0.png";
		} else if (book_id == "000030") {
			frameURL = "https://upcdn.io/kW15c5s/raw/bookpage/000030-page0.png";
		}

		var allImg = [frameURL, "https://upcdn.io/kW15c5s/raw/bookpage/transparent.png"]; //shareURL(userdata, book_id, page)
		
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
*/
