var canvDF = document.createElement("canvas");
var ctxDF = canvDF.getContext("2d");
var imgDF = new Image();
var imgDataDF = "";
var pixelDataDF = "";

var canvGD = document.createElement("canvas");
var ctxGD = canvGD.getContext("2d");
var imgGD = new Image();
var imgDataGD = "";
var pixelDataGD = "";

var canvFX = document.createElement("canvas");
var ctxFX = canvFX.getContext("2d");
var imgFX = new Image();
var imgDataFX = "";
var pixelDataFX = "";

var canvShow = document.createElement("canvas");
var ctxShow = canvShow.getContext("2d");
var imgShow = new Image();
var imgDataShow = "";
var pixelDataShow = "";
	
var colorDF = [];
var colorGD = [];
var colorFX = [];
var colorShow = [];

var areaInfo = {};

var eraserOn = 0;
var autoOn = 0;

refresh();

function refresh() {
	imgShow.onload = function () {
		
		colorDF = [];
		colorGD = [];
		colorFX = [];
		colorShow = [];
		areaInfo = {};
		
		canvDF.width = imgDF.width;
		canvDF.height = imgDF.height;
		canvDF.style.display = "none";
		ctxDF.drawImage(imgDF, 0, 0);
		imgDataDF = ctxDF.getImageData(0, 0, canvDF.width, canvDF.height);
		pixelDataDF = imgDataDF.data;
		
		canvGD.width = imgGD.width;
		canvGD.height = imgGD.height;
		canvGD.style.display = "none";
		ctxGD.drawImage(imgGD, 0, 0);
		imgDataGD = ctxGD.getImageData(0, 0, canvGD.width, canvGD.height);
		pixelDataGD = imgDataGD.data;
		
		canvFX.width = imgFX.width;
		canvFX.height = imgFX.height;
		canvFX.style.display = "none";
		ctxFX.drawImage(imgFX, 0, 0);
		imgDataFX = ctxFX.getImageData(0, 0, canvFX.width, canvFX.height);
		pixelDataFX = imgDataFX.data;
		
		canvShow.width = imgShow.width;
		canvShow.height = imgShow.height;
		canvShow.style.display = "none";
		ctxShow.drawImage(imgShow, 0, 0);
		imgDataShow = ctxShow.getImageData(0, 0, canvShow.width, canvShow.height);
		pixelDataShow = imgDataShow.data;
		
		for (var i=0; i<pixelDataDF.length; i+=4){
			
			var redDF = pixelDataDF[i];
			var greenDF = pixelDataDF[i+1];
			var blueDF = pixelDataDF[i+2];
			var aDF = pixelDataDF[i+3];
			colorDF.push([redDF,greenDF,blueDF,aDF]);
			
			var redGD = pixelDataGD[i];
			var greenGD = pixelDataGD[i+1];
			var blueGD = pixelDataGD[i+2];
			var aGD = pixelDataGD[i+3];
			colorGD.push([redGD,greenGD,blueGD,aGD]);
			
			var redFX = pixelDataFX[i];
			var greenFX = pixelDataFX[i+1];
			var blueFX = pixelDataFX[i+2];
			var aFX = pixelDataFX[i+3];
			colorFX.push([redFX,greenFX,blueFX,aFX]);
			
			var redShow = pixelDataShow[i];
			var greenShow = pixelDataShow[i+1];
			var blueShow = pixelDataShow[i+2];
			var aShow = pixelDataShow[i+3];
			colorShow.push([redShow,greenShow,blueShow,aShow]);
			
			var code = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
			var eachDF = "#" + code[Math.floor(redDF/16)] + code[redDF%16] + code[Math.floor(greenDF/16)] + code[greenDF%16] + code[Math.floor(blueDF/16)] + code[blueDF%16];
			if (aDF != 0 && aFX == 0) {
				if (areaInfo.hasOwnProperty(eachDF)) {
					areaInfo[eachDF] += 1;
				} else {
					areaInfo[eachDF] = 1;
				}
			}
		}
		
		function sort_object(obj) {
			var items = Object.keys(obj).map(function(key) {
				return [key, obj[key]];
			});
			items.sort(function(first, second) {
				return second[1] - first[1];
			});
			return items;
		} 

		areaInfo = sort_object(areaInfo);
		
		for (let i = 0; i < pixelDataDF.length; i += 4) {
			pixelDataDF[i] = colorShow[i / 4][0];
			pixelDataDF[i + 1] = colorShow[i / 4][1];
			pixelDataDF[i + 2] = colorShow[i / 4][2];
		}
		
		var canvSH = document.getElementById("color");
		var ctxSH = canvSH.getContext("2d");
		canvSH.width = imgDF.width;
		canvSH.height = imgDF.height;
		ctxSH.putImageData(imgDataDF, 0, 0);
	};
	
	var pageNow = returnPage();
	var page_frame = "";
	fetch('/ifCreatePage', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
			body: JSON.stringify({ bookId: book_id, userdata: userdata, pageNow: pageNow })
		})
	.then(response => response.json())
	.then(data => {
		async function loadImg () {
			var myHeaders = new Headers();
			var myInit = {
			  method: "GET",
			  headers: myHeaders,
			  mode: "cors",
			  cache: "default",
			};
			
			var allImg = data.booklayer;
			
			for (var i=0; i<5;i++) {
				const myRequest = new Request(allImg[i], myInit);

				await fetch(myRequest)
				  .then(function (response) {
					return response.blob();
				  })
				  .then(function (myBlob) {
					const objectURL = URL.createObjectURL(myBlob);
					if (i == 0) {
						page_frame = objectURL;
						$("#frame").css("background-image", "url('" + page_frame + "')");
					} else if (i == 1) {
						imgDF.src = objectURL;
					} else if (i == 2) {
						imgGD.src = objectURL;
					} else if (i == 3) {
						imgFX.src = objectURL;
					} else if (i == 4) {
						imgShow.src = objectURL;
					}
				  });
			}
		}
		
		loadImg ();
	})
	.catch(error => {
		console.error('Error:', error);
	});
}

var touch = document.getElementById("book");
touch.addEventListener("click", coloring);

function coloring() {
	var e = event || window.event;
	var x = Math.round(canvDF.width * (e.clientX - touch.offsetLeft) / (1 * window.innerHeight));
	var y = Math.round(canvDF.height * (e.clientY - touch.offsetTop) / (0.625 * window.innerHeight));
	var pos = y * canvDF.width + x;
	var oColor = colorDF[pos];
	var start = -1;
	var posS = 0;
	var posE = 0;
	var finish = 0;
	
	var canvSH = document.getElementById("color");
	var ctxSH = canvSH.getContext("2d");
	canvSH.width = imgDF.width;
	canvSH.height = imgDF.height;
	ctxSH.putImageData(imgDataDF, 0, 0);
	
	if(eraserOn == 0 && autoOn == 0 && colorDF[pos][3] != 0) {
		var hexColor = document.getElementById("penBtn").getElementsByTagName("input")[0].value;
		var code = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
		var nhex = [0, 0, 0, 0, 0, 0];
		for (var k=0; k<6; k++) {
			for (var m=0; m<16; m++) {
				if (hexColor.substr(k+1,1) == code[m]) {
					nhex[k] = m;
				} 
			}
		}
		var r = nhex[0] * 16 + nhex[1];
		var g = nhex[2] * 16 + nhex[3];
		var b = nhex[4] * 16 + nhex[5];
		var pixelN = 0;
		var mean = 0;
		for (var i=0;i<canvDF.width*canvDF.height;i++) {
			if (oColor[0] == colorDF[i][0] && oColor[1] == colorDF[i][1] && oColor[2] == colorDF[i][2]) {
				if (start == -1) {
					posS = Math.floor(i/canvDF.width);
					start = 0;
				}
				posE = Math.floor(i/canvDF.width);
				mean += colorGD[i][0];
				pixelN += 1;
			}
		}
		mean = mean / pixelN;
		for (var i=0;i<canvDF.width*canvDF.height;i++) {
			if (oColor[0] == colorDF[i][0] && oColor[1] == colorDF[i][1] && oColor[2] == colorDF[i][2]) {
				var r_f = Math.max(Math.min(r + (colorGD[i][0] - mean), 255), 0);
				var g_f = Math.max(Math.min(g + (colorGD[i][1] - mean), 255), 0);
				var b_f = Math.max(Math.min(b + (colorGD[i][2] - mean), 255), 0);
				colorShow[i] = [r_f,g_f,b_f];
			}
		}
		
		for (let j = 0; j < Math.ceil((posE-posS+1)/4); j += 1) {
			(function(j){
				setTimeout(function () {
					for (let k = 0; k < 26240; k += 4) {
						pixelDataDF[(4 * j + posS) * 6560 + k] = colorShow[((4 * j + posS) * 6560 + k) / 4][0];
						pixelDataDF[(4 * j + posS) * 6560 + k + 1] = colorShow[((4 * j + posS) * 6560 + k) / 4][1];
						pixelDataDF[(4 * j + posS) * 6560 + k + 2] = colorShow[((4 * j + posS) * 6560 + k) / 4][2];
					}
					ctxSH.putImageData(imgDataDF, 0, 0);
				}, j * 1);
			})(j);
		}
		ctxSH.putImageData(imgDataDF, 0, 0);
		
	} else if (eraserOn == 1 && colorDF[pos][3] != 0){
		for (var i=0;i<canvDF.width*canvDF.height;i++) {
			if (oColor[0] == colorDF[i][0] && oColor[1] == colorDF[i][1] && oColor[2] == colorDF[i][2]) {
				if (start == -1) {
					posS = Math.floor(i/canvDF.width);
					start = 0;
				}
				posE = Math.floor(i/canvDF.width);
				colorShow[i] = [255,255,255];
			}
		}
		
		for (let j = 0; j < Math.ceil((posE-posS+1)/4); j += 1) {
			(function(j){
				setTimeout(function () {
					for (let k = 0; k < 26240; k += 4) {
						pixelDataDF[(4 * j + posS) * 6560 + k] = colorShow[((4 * j + posS) * 6560 + k) / 4][0];
						pixelDataDF[(4* j + posS) * 6560 + k + 1] = colorShow[((4 * j + posS) * 6560 + k) / 4][1];
						pixelDataDF[(4 * j + posS) * 6560 + k + 2] = colorShow[((4 * j + posS) * 6560 + k) / 4][2];
					}
					ctxSH.putImageData(imgDataDF, 0, 0);
				}, j * 1);
			})(j);
		}
		ctxSH.putImageData(imgDataDF, 0, 0);
		
	} else if (autoOn == 1) {
		$("#loading").css("display", "flex");
		var hexColor = document.getElementById("penBtn").getElementsByTagName("input")[0].value;
		var json_data = {
			"mode":"transformer", // transformer, diffusion or random
			"num_colors":12, // max 12, min 2
			"temperature":"1.3", // max 2.4, min 0
			"num_results":1, // max 50 for transformer, 5 for diffusion
			"adjacency":[ "0", "75", "33", "45", "31", "18", "0", "75", "33", "45", "31", "18", 
						  "75", "0", "58", "51", "77", "77", "75", "0", "58", "51", "77", "77", 
						  "33", "58", "0", "0", "0", "0", "33", "58", "0", "0", "0", "0", 
						  "45", "51", "0", "0", "0", "0", "45", "51", "0", "0", "0", "0", 
						  "31", "77", "0", "0", "0", "0", "31", "77", "0", "0", "0", "0", 
						  "18", "77", "0", "0", "0", "0", "18", "77", "0", "0", "0", "0", 
						  "0", "75", "33", "45", "31", "18", "0", "75", "33", "45", "31", "18", 
						  "75", "0", "58", "51", "77", "77", "75", "0", "58", "51", "77", "77", 
						  "33", "58", "0", "0", "0", "0", "33", "58", "0", "0", "0", "0", 
						  "45", "51", "0", "0", "0", "0", "45", "51", "0", "0", "0", "0", 
						  "31", "77", "0", "0", "0", "0", "31", "77", "0", "0", "0", "0", 
						  "18", "77", "0", "0", "0", "0", "18", "77", "0", "0", "0", "0"], // nxn adjacency matrix as a flat array of strings
			"palette":[hexColor, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"], // locked colors as hex codes, or '-' if blank
		}

		let color = [];

		$.ajax({
			type: "post",
			url: "https://api.huemint.com/color",
			data: JSON.stringify(json_data),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(response) {
				color = response.results[0].palette;
				finish = 1;
			},
			error: function(xhr, status, error) {
				console.error(error);
			}
		});
		
		var timeDelay = setInterval(function() {
			if (finish==1){
				finish = 2;
				for (var i=0;i<Math.min(12, areaInfo.length);i++) {
					var oColor = areaInfo[i][0];
					var code = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
					var ohex = [0, 0, 0, 0, 0, 0];
					for (var k=0; k<6; k++) {
						for (var m=0; m<16; m++) {
							if (oColor.substr(k+1,1) == code[m]) {
								ohex[k] = m;
							} 
						}
					}
					var or = ohex[0] * 16 + ohex[1];
					var og = ohex[2] * 16 + ohex[3];
					var ob = ohex[4] * 16 + ohex[5];
					oColor = [or,og,ob];
					
					var nColor = color[i];
					var nhex = [0, 0, 0, 0, 0, 0];
					for (var k=0; k<6; k++) {
						for (var m=0; m<16; m++) {
							if (nColor.substr(k+1,1) == code[m]) {
								nhex[k] = m;
							} 
						}
					}
					var nr = nhex[0] * 16 + nhex[1];
					var ng = nhex[2] * 16 + nhex[3];
					var nb = nhex[4] * 16 + nhex[5];
					nColor = [nr,ng,nb];
					
					var pixelN = 0;
					var mean = 0;
					for (var l=0;l<canvDF.width*canvDF.height;l++) {
						if (oColor[0] == colorDF[l][0] && oColor[1] == colorDF[l][1] && oColor[2] == colorDF[l][2]) {
							mean += colorGD[l][0];
							pixelN += 1;
						}
					}
					mean = mean / pixelN;
					for (var u=0;u<canvDF.width*canvDF.height;u++) {
						if (colorFX[u][3] == 0 && oColor[0] == colorDF[u][0] && oColor[1] == colorDF[u][1] && oColor[2] == colorDF[u][2]) {
							var r_f = Math.max(Math.min(nColor[0] + (colorGD[u][0] - mean), 255), 0);
							var g_f = Math.max(Math.min(nColor[1] + (colorGD[u][1] - mean), 255), 0);
							var b_f = Math.max(Math.min(nColor[2] + (colorGD[u][2] - mean), 255), 0);
						} else if (colorFX[u][3] != 0) {
							var r_f = colorFX[u][0];
							var g_f = colorFX[u][1];
							var b_f = colorFX[u][2];
						} else {
							var r_f = colorShow[u][0];
							var g_f = colorShow[u][1];
							var b_f = colorShow[u][2];
						}
						colorShow[u] = [r_f,g_f,b_f];
					}
				}
				posS = 0;
				posE = 1024;
				
				$("#loading").css("display", "none");
				
				for (let j = 0; j < Math.ceil((posE-posS+1)/4); j += 1) {
					(function(j){
						setTimeout(function () {
							for (let k = 0; k < 26240; k += 4) {
								pixelDataDF[(4 * j + posS) * 6560 + k] = colorShow[((4 * j + posS) * 6560 + k) / 4][0];
								pixelDataDF[(4 * j + posS) * 6560 + k + 1] = colorShow[((4 * j + posS) * 6560 + k) / 4][1];
								pixelDataDF[(4 * j + posS) * 6560 + k + 2] = colorShow[((4 * j + posS) * 6560 + k) / 4][2];
							}
							ctxSH.putImageData(imgDataDF, 0, 0);
						}, j * 1);
					})(j);
				}
				ctxSH.putImageData(imgDataDF, 0, 0);
				clearInterval(timeDelay);
			}
		}, 1);		
	}
}

var eraser = document.getElementById("eraserBtn");
eraser.addEventListener("click", changeMode);

function changeMode() {
	if (eraserOn == 0) {
		eraserOn = 1;
		eraser.style.backgroundImage = "url('eraser_on.png')";
		autoOn = 0;
		auto.style.backgroundImage = "url('auto_off.png')";
	} else {
		eraserOn = 0;
		eraser.style.backgroundImage = "url('eraser_off.png')";
	}
}

var auto = document.getElementById("autoBtn");
auto.addEventListener("click", changeMode2);

function changeMode2() {
	if (autoOn == 0) {
		autoOn = 1;
		auto.style.backgroundImage = "url('auto_on.png')";
		eraserOn = 0;
		eraser.style.backgroundImage = "url('eraser_off.png')";
	} else {
		autoOn = 0;
		auto.style.backgroundImage = "url('auto_off.png')";
	}
}

var rs = document.getElementById("resetBtn");
rs.addEventListener("click", rsMode);

function rsMode() {
	for (var i=0;i<canvDF.width*canvDF.height;i++) {
		colorShow[i] = [255,255,255];
	}
	
	var canvSH = document.getElementById("color");
	var ctxSH = canvSH.getContext("2d");
	canvSH.width = imgDF.width;
	canvSH.height = imgDF.height;
	
	for (let j = 0; j < Math.ceil(canvDF.height/4); j += 1) {
		(function(j){
		    setTimeout(function () {
				for (let k = 0; k < 26240; k += 4) {
					pixelDataDF[4 * j * 6560 + k] = colorShow[(4 * j * 6560 + k) / 4][0];
					pixelDataDF[4 * j * 6560 + k + 1] = colorShow[(4 * j * 6560 + k) / 4][1];
					pixelDataDF[4 * j * 6560 + k + 2] = colorShow[(4 * j * 6560 + k) / 4][2];
				}
				ctxSH.putImageData(imgDataDF, 0, 0);
			}, j * 1);
		})(j);
	}
	ctxSH.putImageData(imgDataDF, 0, 0);
}