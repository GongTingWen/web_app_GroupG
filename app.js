
var mysql = require('mysql');

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve static files from the root directory

app.set('view engine', 'html'); 

app.get('/', (req, res) => {
    res.redirect('../homepage/homepage.html');
});

app.post('/login', async (req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	if (!username || !password) {
		return res.status(400).json({ error: "Missing credentials" });
	} else {
		var conn = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '',
			database:'meraki',
			port: 3306
		});
		
		await conn.connect((err) => {
		  if (err) {
			console.error('連接失敗：', err.stack);
			return;
		  }
		  conn.query("SELECT userId, userPassword, userLogin, userAccu, userSucc, userAward FROM user WHERE userEmail = ?", username, function(err, rows, fields) {
				if (err) throw err;
				var len = 0;
				for (var each in rows[0]) {
					len ++;
				}
				if (len == 0) {
					var a = "";
				} else {
					var a = rows[0].userPassword;
					var b = rows[0].userLogin;
					var d = rows[0].userAccu;
					var e = rows[0].userSucc;
					var f = rows[0].userAward;
					var g = rows[0].userId;
				}
				if (!a) {
					return res.status(400).json({ error: "User doesn't exist" });
				} else {
					if (password == a) {
						var c = new Date();
						c = new Date((c.getMonth() + 1) + "/" + c.getDate() + "/" + c.getFullYear());
						var difference = Math.abs(c - b);
						var days = difference / (1000 * 3600 * 24)
						if (days == 1) {
							conn.query("UPDATE user SET userLogin = ? WHERE userEmail = ?", [c,username], function(err, rows) {if (err) throw err;});
							conn.query("UPDATE user SET userAccu = ? WHERE userEmail = ?", [(d+1),username], function(err, rows) {if (err) throw err;});
							conn.query("UPDATE user SET userSucc = ? WHERE userEmail = ?", [(e+1),username], function(err, rows) {if (err) throw err;});
						} else if (days > 1) {
							conn.query("UPDATE user SET userLogin = ? WHERE userEmail = ?", [c,username], function(err, rows) {if (err) throw err;});
							conn.query("UPDATE user SET userAccu = ? WHERE userEmail = ?", [(d+1),username], function(err, rows) {if (err) throw err;});
							conn.query("UPDATE user SET userSucc = ? WHERE userEmail = ?", [1,username], function(err, rows) {if (err) throw err;});
							e = 0;
						}
						else {
							d -= 1;
							e -= 1;
						}
						if ((d+1)%10 == 0) {
							if (days != 0) {
								f += 1;
								conn.query("SELECT MAX(rewardId) AS maxId FROM reward", function(err, rows, fields) {
									if (err) throw err;
									var maxId = rows[0].maxId;
									var userPasswordC = conn.query("INSERT INTO reward (rewardId, userId, bookNum, rewardInfo) VALUES (?, ?, ?, ?)", [(maxId+1), g, f, "累積登入十天"], function(err, rows, fields) {
										if (err) throw err;
									});
								});
							}
						}
						if ((e+1)%3 == 0) {
							if (days != 0) {
								f += 1;
								conn.query("SELECT MAX(rewardId) AS maxId FROM reward", function(err, rows, fields) {
									if (err) throw err;
									var maxId = rows[0].maxId;
									conn.query("INSERT INTO reward (rewardId, userId, bookNum, rewardInfo) VALUES (?, ?, ?, ?)", [(maxId+1), g, f, "連續登入三天"], function(err, rows, fields) {
										if (err) throw err;
									});
								});
							}
						}
						conn.query("UPDATE user SET userAward = ? WHERE userEmail = ?", [f,username], function(err, rows) {if (err) throw err; conn.end();});
						return res.json({ success: true });
					} else {
						return res.status(400).json({ error: "Password doesn't match"});
					}
				}
		  });
		});
	}
});


app.post('/signup', async (req, res) => {
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	if (!username || !email || !password) {
		return res.status(400).json({ error: "Missing credentials" });
	} else {
		var conn = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '',
			database:'meraki',
			port: 3306
		});
		
		await conn.connect((err) => {
		  if (err) {
			console.error('連接失敗：', err.stack);
			return;
		  }
		  conn.query("SELECT userId, userEmail, userPassword FROM user", function(err, rows, fields) {
				if (err) throw err;
				var maxId = 0;
				for (var each in rows) {
					maxId = rows[each].userId;
					var a = rows[each].userEmail;
					var b = rows[each].userPassword;
					if (email == a) {
						return res.status(400).json({ error: "Email already registered" });
					} else if (password == b) {
						return res.status(400).json({ error: "Password already used" });
					}
				}
				if (password.length > 12 || password.length < 6) {
					return res.status(400).json({ error: "Password length error" });
				} else if (/[^A-Za-z0-9]/.test(password)) {
					return res.status(400).json({ error: "Password form error" });
				} else {
					var c = new Date();
					c = new Date((c.getMonth() + 1) + "/" + c.getDate() + "/" + c.getFullYear());
					var d = [(maxId+1), username, email, password, "https://upcdn.io/kW15c5s/raw/profile/sample.jpg", c, 1, 1, 0];
					conn.query("INSERT INTO user (userId, userName, userEmail, userPassword, userPhoto, userLogin, userAccu, userSucc, userAward) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", d,function(err, rows) {if (err) throw err; conn.end();});
					return res.json({ success: true });
				}
		  });
		});
	}
});

app.post('/forgetpassword', async (req, res) => {
	var email = req.body.email;
	if (!email) {
		return res.status(400).json({ error: "Missing credentials" });
	} else {
		var conn = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '',
			database:'meraki',
			port: 3306
		});
		
		await conn.connect((err) => {
		  if (err) {
			console.error('連接失敗：', err.stack);
			return;
		  }
		  conn.query("SELECT userName, userEmail FROM user", function(err, rows, fields) {
			if (err) throw err;
			for (var each in rows) {
				var a = rows[each].userEmail;
				var b = rows[each].userName;
				if (email == a) {
					return res.json({ success: true, username: b});
				}
			}
			return res.status(400).json({ error: "User doesn't exist" });
			conn.end();
		  });
		});
	}
});

app.post('/updatepassword', async (req, res) => {
	var email = req.body.email;
	var password = req.body.password;
	if (!password) {
		return res.status(400).json({ error: "Missing credentials" });
	} else {
		var conn = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '',
			database:'meraki',
			port: 3306
		});
		
		await conn.connect((err) => {
		  if (err) {
			console.error('連接失敗：', err.stack);
			return;
		  }
		  conn.query("SELECT userPassword FROM user", function(err, rows, fields) {
				if (err) throw err;
				for (var each in rows) {
					var a = rows[each].userPassword;
					if (password == a) {
						return res.status(400).json({ error: "Password already used" });
					}
				}
				if (password.length > 12 || password.length < 6) {
					return res.status(400).json({ error: "Password length error" });
				} else if (/[^A-Za-z0-9]/.test(password)) {
					return res.status(400).json({ error: "Password form error" });
				} else {
					conn.query("UPDATE user SET userPassword = ? WHERE userEmail = ?", [password,email],function(err, rows) {if (err) throw err; conn.end();});
					return res.json({ success: true });
				}
		  });
		});
	}
});

app.post('/contentFunc', async (req, res) => {
	var email = req.body.userdata;
	var conn = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database:'meraki',
		port: 3306
	});
		
	await conn.connect((err) => {
		if (err) {
			console.error('連接失敗：', err.stack);
			return;
		}
		var books = [[],[],[],[]];
		var ad = "";
		if (email === null) {
			conn.query("SELECT * FROM book WHERE bookState = ?", ["choice"], function(err, rows, fields) {
				if (err) throw err;
				for (var each in rows) {
					var a = rows[each].bookId;
					var b = rows[each].bookName;
					var c = rows[each].bookAuthor;
					var d = rows[each].bookCoverURL; 
					var e = "bookmark-off.png";
					books[0].push([a,b,c,d,e]);
				}
			});
			conn.query("SELECT * FROM book WHERE bookState <> ?", ["reward"], function(err, rows, fields) {
				if (err) throw err;
				var len = [];
				for (var each in rows) {
					len.push(each);
				}
				var randomNum = [];
				for (var i=0; i<5; i++) {
					var x = Math.floor((Math.random() * len.length) + 1) - 1;
					randomNum.push(len[x]);
					len.splice(x, 1);
				}
				for (var j=0; j<5; j++) {
					var a = rows[randomNum[j]].bookId;
					var b = rows[randomNum[j]].bookName;
					var c = rows[randomNum[j]].bookAuthor;
					var d = rows[randomNum[j]].bookCoverURL; 
					var e = "bookmark-off.png";
					books[1].push([a,b,c,d,e]);
				}
			});
			conn.query("SELECT * FROM book WHERE bookState <> ? ORDER BY bookPublish DESC LIMIT 5", ["reward"], function(err, rows, fields) {
				if (err) throw err;
				for (var each in rows) {
					var a = rows[each].bookId;
					var b = rows[each].bookName;
					var c = rows[each].bookAuthor;
					var d = rows[each].bookCoverURL; 
					var e = "bookmark-off.png";
					books[2].push([a,b,c,d,e]);
				}
			});
			conn.query("SELECT adURL FROM ad", function(err, rows, fields) {
				if (err) throw err;
				var len = 0;
				for (var each in rows) {
					len ++;
				}
				var x = Math.floor((Math.random() * len) + 1) - 1;
				ad = rows[x].adURL;
				conn.end();
				return res.json({ books: books, ad: ad });
			});
		} else {
			conn.query("SELECT userId FROM user WHERE userEmail = ?", email, function(err, rows, fields) {
				if (err) throw err;
				var userId = rows[0].userId;
				conn.query("SELECT b.*, (SELECT COUNT(*) FROM mark m WHERE m.bookId = b.bookId AND m.userId = ?) AS have FROM book b WHERE b.bookState = ?", [userId, "choice"], function(err, rows, fields) {
					if (err) throw err;
					for (var each in rows) {
						var a = rows[each].bookId;
						var b = rows[each].bookName;
						var c = rows[each].bookAuthor;
						var d = rows[each].bookCoverURL;
						var e = rows[each].have;
						if (e == 0) {
							var e = "bookmark-off.png";
						} else {
							var e = "bookmark-on.png";
						}
						books[0].push([a,b,c,d,e]);
					}
				});
				conn.query("SELECT b.bookCategory, b.bookTag FROM book b JOIN condi c ON b.bookId = c.bookId WHERE c.userId = ?", userId, function(err, rows, fields) {
					if (err) throw err;
					var testText = "";
					for (var each in rows) {
						var f = rows[each].bookCategory;
						var g = rows[each].bookTag.replace(",", "");
						testText += f + g;
					}
					testText = "[㊣" + testText + "]";
					conn.query("SELECT b.*, (SELECT COUNT(*) FROM mark m WHERE m.bookId = b.bookId AND m.userId = ?) AS have FROM book b WHERE (b.bookCategory REGEXP ? OR b.bookTag REGEXP ?) AND b.bookState <> ?", [userId, testText, testText, "reward"], function (err, rows, fields) {
						if (err) throw err;
						var len = [];
						for (var each in rows) {
							len.push(each);
						}
						if (len.length > 5) {
							var randomNum = [];
							for (var i=0; i<5; i++) {
								var x = Math.floor((Math.random() * len.length) + 1) - 1;
								randomNum.push(len[x]);
								len.splice(x, 1);
							}
							for (var j=0; j<5; j++) {
								var a = rows[randomNum[j]].bookId;
								var b = rows[randomNum[j]].bookName;
								var c = rows[randomNum[j]].bookAuthor;
								var d = rows[randomNum[j]].bookCoverURL; 
								var e = rows[randomNum[j]].have;
								if (e == 0) {
									var e = "bookmark-off.png";
								} else {
									var e = "bookmark-on.png";
								}
								books[1].push([a,b,c,d,e]);
							}
							conn.end();
							return res.json({ books: books, ad: ad });
						} else {
							var haveList = "";
							for (var each in rows) {
								var a = rows[each].bookId;
								var b = rows[each].bookName;
								var c = rows[each].bookAuthor;
								var d = rows[each].bookCoverURL; 
								var e = rows[each].have;
								if (e == 0) {
									var e = "bookmark-off.png";
								} else {
									var e = "bookmark-on.png";
								}
								haveList += " OR b.bookId = " + a;
								books[1].push([a,b,c,d,e]);
							}
							haveList = haveList.substr(4, haveList.length);
							conn.query("SELECT b.*, (SELECT COUNT(*) FROM mark m WHERE m.bookId = b.bookId AND m.userId = ?) AS have FROM book b WHERE NOT (?) and b.bookState <> ?", [userId, haveList, "reward"], function (err, rows, fields) {
								if (err) throw err;
								var len2 = [];
								for (var each in rows) {
									len2.push(each);
								}
								var randomNum2 = [];
								for (var i=0; i<5-books[1].length; i++) {
									var x = Math.floor((Math.random() * len2.length) + 1) - 1;
									randomNum2.push(len2[x]);
									len2.splice(x, 1);
								}
								for (var j=0; j<randomNum2.length; j++) {
									var a = rows[randomNum2[j]].bookId;
									var b = rows[randomNum2[j]].bookName;
									var c = rows[randomNum2[j]].bookAuthor;
									var d = rows[randomNum2[j]].bookCoverURL; 
									var e = rows[randomNum2[j]].have;
									if (e == 0) {
										var e = "bookmark-off.png";
									} else {
										var e = "bookmark-on.png";
									}
									books[1].push([a,b,c,d,e]);
								}
								conn.end();
								return res.json({ books: books, ad: ad });
							});
						}
					});
				});
				conn.query("SELECT b.*, (SELECT COUNT(*) FROM mark m WHERE m.bookId = b.bookId AND m.userId = ?) AS have FROM book b WHERE b.bookState <> ? ORDER BY b.bookPublish DESC LIMIT 5", [userId, "reward"], function(err, rows, fields) {
					if (err) throw err;
					for (var each in rows) {
						var a = rows[each].bookId;
						var b = rows[each].bookName;
						var c = rows[each].bookAuthor;
						var d = rows[each].bookCoverURL; 
						var e = rows[each].have;
						if (e == 0) {
							var e = "bookmark-off.png";
						} else {
							var e = "bookmark-on.png";
						}
						books[2].push([a,b,c,d,e]);
					}
				});
				conn.query("SELECT b.*,(SELECT COUNT(*) FROM mark m WHERE m.bookId = b.bookId AND m.userId = ?) AS have FROM book b JOIN condi c ON b.bookId = c.bookId WHERE c.userId = ? AND c.conditionType = ?", [userId, userId, "incomplete"], function(err, rows, fields) {
					if (err) throw err;
					for (var each in rows) {
						var a = rows[each].bookId;
						var b = rows[each].bookName;
						var c = rows[each].bookAuthor;
						var d = rows[each].bookCoverURL; 
						var e = rows[each].have;
						if (e == 0) {
							var e = "bookmark-off.png";
						} else {
							var e = "bookmark-on.png";
						}
						books[3].push([a,b,c,d,e]);
					}
				});
				conn.query("SELECT adURL FROM ad", function(err, rows, fields) {
					if (err) throw err;
					var len = 0;
					for (var each in rows) {
						len ++;
					}
					var x = Math.floor((Math.random() * len) + 1) - 1;
					ad = rows[x].adURL;
				});				
			});
		}
	});
});

app.post('/categoryBookFunc', async (req, res) => {
	var email = req.body.userdata;
	var whichKey = req.body.whichKey;
	var whichType = req.body.whichType;
	var conn = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database:'meraki',
		port: 3306
	});
		
	await conn.connect((err) => {
		if (err) {
			console.error('連接失敗：', err.stack);
			return;
		}
		var books = [[]];
		if (email === null) {
			if (whichType == "theme") {
				conn.query("SELECT * FROM book WHERE bookCategory = ?", [whichKey], function(err, rows, fields) {
					if (err) throw err;
					for (var each in rows) {
						var a = rows[each].bookId;
						var b = rows[each].bookName;
						var c = rows[each].bookAuthor;
						var d = rows[each].bookCoverURL; 
						var e = "bookmark-off.png";
						books[0].push([a,b,c,d,e]);
					}
					conn.end();
					return res.json({ books: books });
				});
			} else {
				conn.query("SELECT * FROM book WHERE LOCATE(?, bookAuthor) > 0", [whichKey], function(err, rows, fields) {
					if (err) throw err;
					for (var each in rows) {
						var a = rows[each].bookId;
						var b = rows[each].bookName;
						var c = rows[each].bookAuthor;
						var d = rows[each].bookCoverURL; 
						var e = "bookmark-off.png";
						books[0].push([a,b,c,d,e]);
					}
					conn.end();
					return res.json({ books: books });
				});
			}
		} else {
			conn.query("SELECT userId FROM user WHERE userEmail = ?", email, function(err, rows, fields) {
				if (err) throw err;
				var userId = rows[0].userId;
				if (whichType == "theme") {
					conn.query("SELECT b.*, (SELECT COUNT(*) FROM mark m WHERE m.bookId = b.bookId AND m.userId = ?) AS have FROM book b WHERE b.bookCategory = ? AND b.bookState <> ?", [userId, whichKey, "reward"], function(err, rows, fields) {
						if (err) throw err;
						for (var each in rows) {
							var a = rows[each].bookId;
							var b = rows[each].bookName;
							var c = rows[each].bookAuthor;
							var d = rows[each].bookCoverURL; 
							var e = rows[each].have;
							if (e == 0) {
								var e = "bookmark-off.png";
							} else {
								var e = "bookmark-on.png";
							}
							books[0].push([a,b,c,d,e]);
						}
						conn.end();
						return res.json({ books: books });
					});
				} else {
					conn.query("SELECT b.*, (SELECT COUNT(*) FROM mark m WHERE m.bookId = b.bookId AND m.userId = ?) AS have FROM book b WHERE LOCATE(?, b.bookAuthor) > 0 AND b.bookState <> ?", [userId, whichKey, "reward"], function(err, rows, fields) {
						if (err) throw err;
						for (var each in rows) {
							var a = rows[each].bookId;
							var b = rows[each].bookName;
							var c = rows[each].bookAuthor;
							var d = rows[each].bookCoverURL; 
							var e = rows[each].have;
							if (e == 0) {
								var e = "bookmark-off.png";
							} else {
								var e = "bookmark-on.png";
							}
							books[0].push([a,b,c,d,e]);
						}
						conn.end();
						return res.json({ books: books });
					});
				}
			});
		}
	});
});

app.post('/searchBookFunc', async (req, res) => {
	var email = req.body.userdata;
	var whichKey = req.body.whichKey;
	var conn = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database:'meraki',
		port: 3306
	});
		
	await conn.connect((err) => {
		if (err) {
			console.error('連接失敗：', err.stack);
			return;
		}
		var books = [[]];
		if (email === null) {
			conn.query("SELECT * FROM book WHERE LOCATE(?, bookName) > 0 OR LOCATE(?, bookCategory) > 0 OR LOCATE(?, bookAuthor) > 0 OR LOCATE(?, bookTag) > 0", [whichKey, whichKey, whichKey, whichKey], function(err, rows, fields) {
				if (err) throw err;
				for (var each in rows) {
					var a = rows[each].bookId;
					var b = rows[each].bookName;
					var c = rows[each].bookAuthor;
					var d = rows[each].bookCoverURL; 
					var e = "bookmark-off.png";
					books[0].push([a,b,c,d,e]);
				}
				conn.end();
				return res.json({ books: books });
			});
		} else {
			conn.query("SELECT userId FROM user WHERE userEmail = ?", email, function(err, rows, fields) {
				if (err) throw err;
				var userId = rows[0].userId;
				conn.query("SELECT b.*, (SELECT COUNT(*) FROM mark m WHERE m.bookId = b.bookId AND m.userId = ?) AS have FROM book b WHERE (LOCATE(?, b.bookName) + LOCATE(?, b.bookCategory) + LOCATE(?, b.bookAuthor) + LOCATE(?, b.bookTag)> 0) AND b.bookState <> ?", [userId, whichKey, whichKey, whichKey, whichKey, "reward"], function(err, rows, fields) {
					if (err) throw err;
					for (var each in rows) {
						var a = rows[each].bookId;
						var b = rows[each].bookName;
						var c = rows[each].bookAuthor;
						var d = rows[each].bookCoverURL; 
						var e = rows[each].have;
						if (e == 0) {
							var e = "bookmark-off.png";
						} else {
							var e = "bookmark-on.png";
						}
						books[0].push([a,b,c,d,e]);
					}
					conn.end();
					return res.json({ books: books });
				});
			});
		}
	});
});

app.post('/profile', async (req, res) => {
	var email = req.body.userdata;
	var conn = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database:'meraki',
		port: 3306
	});
		
	await conn.connect((err) => {
		if (err) {
			console.error('連接失敗：', err.stack);
			return;
		}
		conn.query("SELECT userName, userPhoto FROM user WHERE userEmail = ?", email, function(err, rows, fields) {
			if (err) throw err;
			var a = rows[0].userName;
			var b = rows[0].userPhoto;
			conn.end();
			return res.json({ username: a, photo: b });
		});
	});
});

app.post('/theme', async (req, res) => {
	var conn = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database:'meraki',
		port: 3306
	});
		
	await conn.connect((err) => {
		if (err) {
			console.error('連接失敗：', err.stack);
			return;
		}
		var theme = [];
		conn.query("SELECT categoryName FROM category", function(err, rows, fields) {
			if (err) throw err;
			for (var each in rows) {
				var a = rows[each].categoryName;
				theme.push(a);
			}
			conn.end();
			return res.json({ theme: theme });
		});
	});
});

app.post('/author', async (req, res) => {
	var conn = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database:'meraki',
		port: 3306
	});
		
	await conn.connect((err) => {
		if (err) {
			console.error('連接失敗：', err.stack);
			return;
		}
		var author = [];
		conn.query("SELECT authorName FROM author", function(err, rows, fields) {
			if (err) throw err;
			for (var each in rows) {
				var a = rows[each].authorName;
				author.push(a);
			}
			conn.end();
			return res.json({ author: author });
		});
	});
});

app.post('/changemark', async (req, res) => {
	var conn = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database:'meraki',
		port: 3306
	});
		
	await conn.connect((err) => {
		if (err) {
			console.error('連接失敗：', err.stack);
			return;
		}
		var email = req.body.userdata;
		var bookId = req.body.bookId;
		var newmark = req.body.newmark;
		if (newmark == "bookmark-off.png") {
			conn.query("SELECT userId FROM user WHERE userEmail = ?", email, function(err, rows, fields) {
				if (err) throw err;
				var userId = rows[0].userId;
				conn.query("DELETE FROM mark WHERE userId = ? AND bookId = ?", [userId, bookId], function(err, rows, fields) {
					if (err) throw err;
					conn.end();
				});
			});
		} else {
			conn.query("SELECT userId FROM user WHERE userEmail = ?", email, function(err, rows, fields) {
				if (err) throw err;
				var userId = rows[0].userId;
				conn.query("SELECT MAX(markId) AS maxId FROM mark", function(err, rows, fields) {
					if (err) throw err;
					var maxId = rows[0].maxId;
					conn.query("INSERT INTO mark (markId, userId, bookId) VALUES (?, ?, ?)", [(maxId+1), userId, bookId], function(err, rows, fields) {
						if (err) throw err;
						conn.end();
					});
				});
			});
		}
	});
});

app.post('/mybookFunc', async (req, res) => {
	var conn = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database:'meraki',
		port: 3306
	});
		
	await conn.connect((err) => {
		if (err) {
			console.error('連接失敗：', err.stack);
			return;
		}
		var email = req.body.userdata;
		var books = [[], [], []];
		var ad = "";
		conn.query("SELECT userId FROM user WHERE userEmail = ?", email, function(err, rows, fields) {
			if (err) throw err;
			var userId = rows[0].userId;
			conn.query("SELECT b.*,(SELECT COUNT(*) FROM mark m WHERE m.bookId = b.bookId AND m.userId = ?) AS have FROM book b JOIN condi c ON b.bookId = c.bookId WHERE c.userId = ? AND c.conditionType = ?", [userId, userId, "incomplete"], function(err, rows, fields) {
				if (err) throw err;
				for (var each in rows) {
					var a = rows[each].bookId;
					var b = rows[each].bookName;
					var c = rows[each].bookAuthor;
					var d = rows[each].bookCoverURL; 
					var e = rows[each].have;
					if (e == 0) {
						var e = "bookmark-off.png";
					} else {
						var e = "bookmark-on.png";
					}
					books[0].push([a,b,c,d,e]);
				}
			});
			conn.query("SELECT b.bookId, b.bookName, b.bookAuthor, b.bookCoverURL FROM book b JOIN mark m ON b.bookId = m.bookId WHERE m.userId = ?", userId, function(err, rows, fields) {
				if (err) throw err;
				for (var each in rows) {
					var a = rows[each].bookId;
					var b = rows[each].bookName;
					var c = rows[each].bookAuthor;
					var d = rows[each].bookCoverURL; 
					var e = "bookmark-on.png";
					books[1].push([a,b,c,d,e]);
				}
			});
			conn.query("SELECT b.*,(SELECT COUNT(*) FROM mark m WHERE m.bookId = b.bookId AND m.userId = ?) AS have FROM book b JOIN condi c ON b.bookId = c.bookId WHERE c.userId = ? AND c.conditionType = ?", [userId, userId, "complete"], function(err, rows, fields) {
				if (err) throw err;
				for (var each in rows) {
					var a = rows[each].bookId;
					var b = rows[each].bookName;
					var c = rows[each].bookAuthor;
					var d = rows[each].bookCoverURL; 
					var e = rows[each].have;
					if (e == 0) {
						var e = "bookmark-off.png";
					} else {
						var e = "bookmark-on.png";
					}
					books[2].push([a,b,c,d,e]);
				}
			});
			conn.query("SELECT adURL FROM ad", function(err, rows, fields) {
				if (err) throw err;
				var len = 0;
				for (var each in rows) {
					len ++;
				}
				var x = Math.floor((Math.random() * len) + 1) - 1;
				ad = rows[x].adURL;
				conn.end();
				return res.json({ books: books, ad: ad });
			});		
		});
	});
});

app.post('/searchInMyBookFunc', async (req, res) => {
	var email = req.body.userdata;
	var whichKey = req.body.whichKey;
	var conn = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database:'meraki',
		port: 3306
	});
		
	await conn.connect((err) => {
		if (err) {
			console.error('連接失敗：', err.stack);
			return;
		}
		var books = [[]];
		conn.query("SELECT userId FROM user WHERE userEmail = ?", email, function(err, rows, fields) {
			if (err) throw err;
			var userId = rows[0].userId;
			conn.query("SELECT b.*, COALESCE(marks.have, 0) AS have FROM book b LEFT JOIN (SELECT bookId, COUNT(*) AS have FROM mark WHERE userId = ? GROUP BY bookId) marks ON b.bookId = marks.bookId WHERE b.bookId IN (SELECT bookId FROM condi WHERE userId = ? UNION SELECT bookId FROM mark WHERE userId = ?) AND (LOCATE(?, b.bookName) + LOCATE(?, b.bookCategory) + LOCATE(?, b.bookAuthor) + LOCATE(?, b.bookTag)> 0)", [userId, userId, userId, whichKey, whichKey, whichKey, whichKey], function(err, rows, fields) {
				if (err) throw err;
				for (var each in rows) {
					var a = rows[each].bookId;
					var b = rows[each].bookName;
					var c = rows[each].bookAuthor;
					var d = rows[each].bookCoverURL; 
					var e = rows[each].have;
					if (e == 0) {
						var e = "bookmark-off.png";
					} else {
						var e = "bookmark-on.png";
					}
					books[0].push([a,b,c,d,e]);
				}
				conn.end();
				return res.json({ books: books });
			});
		});
	});
});

app.post('/previewpic', async (req, res) => {
	var bookId = req.body.bookId;
	var conn = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database:'meraki',
		port: 3306
	});
		
	await conn.connect((err) => {
		if (err) {
			console.error('連接失敗：', err.stack);
			return;
		}
		var preview_pic = [];
		conn.query("SELECT frameURL FROM page WHERE bookId = ?", bookId, function(err, rows, fields) {
			if (err) throw err;
			for (var each in rows) {
				var a = rows[each].frameURL;
				preview_pic.push(a);
			}
			conn.end();
			return res.json({ preview_pic: preview_pic });
		});
	});
});

app.post('/rewardbook', async (req, res) => {
	var email = req.body.userdata;
	var conn = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database:'meraki',
		port: 3306
	});
		
	await conn.connect((err) => {
		if (err) {
			console.error('連接失敗：', err.stack);
			return;
		}
		var rewardbook = [[]];
		conn.query("SELECT userId, userAward FROM user WHERE userEmail = ?", email, function(err, rows, fields) {
			if (err) throw err;
			var userId = rows[0].userId;
			var userAward = rows[0].userAward;
			conn.query("SELECT b.*, (SELECT COUNT(*) FROM mark m WHERE m.bookId = b.bookId AND m.userId = ?) AS have FROM book b WHERE b.bookState = ? LIMIT ?", [userId, "reward", userAward], function(err, rows, fields) {
				if (err) throw err;
				for (var each in rows) {
					var a = rows[each].bookId;
					var b = rows[each].bookName;
					var c = rows[each].bookAuthor;
					var d = rows[each].bookCoverURL; 
					var e = rows[each].have;
					if (e == 0) {
						var e = "bookmark-off.png";
					} else {
						var e = "bookmark-on.png";
					}
					rewardbook[0].push([a,b,c,d,e]);
				}
				conn.end();
				return res.json({ rewardbook: rewardbook });
			});
		});
	});
});

app.post('/person', async (req, res) => {
	var email = req.body.userdata;
	var conn = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database:'meraki',
		port: 3306
	});
		
	await conn.connect((err) => {
		if (err) {
			console.error('連接失敗：', err.stack);
			return;
		}
		conn.query("SELECT * FROM user WHERE userEmail = ?", email, function(err, rows, fields) {
			if (err) throw err;
			var a = rows[0].userId;
			var b = rows[0].userName;
			var c = rows[0].userAccu;
			var d = rows[0].userSucc;
			var e = rows[0].userPhoto;
			var f = rows[0].userAward;
			var infoList = [];
			conn.query("SELECT r.rewardInfo, b.bookName FROM (SELECT rewardInfo FROM reward WHERE userId = ?) r JOIN (SELECT bookName FROM book WHERE bookState = ? LIMIT ?) b ON 1 = 1;", [a, "reward", f], function(err, rows, fields) {
				if (err) throw err;
				for (var each in rows) {
					infoList.push(rows[each].rewardInfo + "，獲得《" + rows[each].bookName + "》");
				}
				conn.end();
				return res.json({ userId: a, username: b, totalDay: c, contiDay: d, unlock: f, photo: e, award: infoList });
			});
		});
	});
});

app.post('/blank', async (req, res) => {
	return res.json({ books: [[]] });
});

app.post('/updatename', async (req, res) => {
	var email = req.body.userdata;
	var newname = req.body.newname;
	var conn = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database:'meraki',
		port: 3306
	});
		
	await conn.connect((err) => {
		if (err) {
			console.error('連接失敗：', err.stack);
			return;
		}
		conn.query("UPDATE user SET userName = ? WHERE userEmail = ?", [newname, email], function(err, rows, fields) {if (err) throw err; conn.end(); return res.json({ });});
	});
});

app.post('/updatephotourl', async (req, res) => {
	var email = req.body.userdata;
	var newurl = req.body.filepath;
	var conn = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database:'meraki',
		port: 3306
	});
		
	await conn.connect((err) => {
		if (err) {
			console.error('連接失敗：', err.stack);
			return;
		}
		conn.query("UPDATE user SET userPhoto = ? WHERE userEmail = ?", [newurl, email], function(err, rows, fields) {if (err) throw err; conn.end(); return res.json({ });});
	});
});

app.post('/lastphoto', async (req, res) => {
	var email = req.body.userdata;
	var conn = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database:'meraki',
		port: 3306
	});
		
	await conn.connect((err) => {
		if (err) {
			console.error('連接失敗：', err.stack);
			return;
		}
		conn.query("SELECT userPhoto FROM user WHERE userEmail = ?", email, function(err, rows, fields) {if (err) throw err; conn.end(); return res.json({ path: rows[0].userPhoto });});
	});
});

app.post('/ifCreateCondition', async (req, res) => {
	var email = req.body.userdata;
	var bookId = req.body.bookId;
	var conn = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database:'meraki',
		port: 3306
	});
		
	await conn.connect((err) => {
		if (err) {
			console.error('連接失敗：', err.stack);
			return;
		}
		conn.query("SELECT * FROM user WHERE userEmail = ?", email, function(err, rows, fields) {
			if (err) throw err;
			var a = rows[0].userName;
			var b = rows[0].userId;
			var c = rows[0].userPhoto;
			conn.query("SELECT * FROM book WHERE bookId = ?", bookId, function(err, rows, fields) {
				if (err) throw err;
				var d = rows[0].bookTotalpage;
				var e = rows[0].bookName;
				var f = rows[0].bookAuthor;
				conn.query("SELECT MAX(conditionId) AS maxId FROM condi", function(err, rows, fields) {
					var g = rows[0].maxId;
					if (err) throw err;
					conn.query("SELECT COUNT(conditionType) AS have FROM condi WHERE bookId = ? AND userId = ?", [bookId, b], function(err, rows, fields) {
						if (err) throw err;
						if (rows[0].have == 0) {
							conn.query("INSERT INTO condi (conditionId, userId, bookId, conditionType) VALUES (?, ?, ?, ?)", [(g+1), b, bookId, "incomplete"], function(err, rows, fields) {if (err) throw err; conn.end(); return res.json({ username: a, userId: b, photo: c, totalPage: d, bookname: e, author: f });});
						} else {
							conn.end();
							return res.json({ username: a, userId: b, photo: c, totalPage: d, bookname: e, author: f });
						}
					});
				});
			});
		});
	});
});

app.post('/ifCreatePage', async (req, res) => {
	var email = req.body.userdata;
	var bookId = req.body.bookId;
	var pageNow = req.body.pageNow;
	var conn = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database:'meraki',
		port: 3306
	});
		
	await conn.connect((err) => {
		if (err) {
			console.error('連接失敗：', err.stack);
			return;
		}
		conn.query("SELECT userId FROM user WHERE userEmail = ?", email, function(err, rows, fields) {
			if (err) throw err;
			var a = rows[0].userId;
			conn.query("SELECT * FROM page WHERE bookId = ? AND pageNumber = ?", [bookId, pageNow], function(err, rows, fields) {
				if (err) throw err;
				var b = rows[0].frameURL;
				var c = rows[0].diffURL;
				var d = rows[0].gradientURL;
				var e = rows[0].fixURL;
				var booklayer = [b, c, d, e];
				conn.query("SELECT MAX(workId) AS maxId FROM work", function(err, rows, fields) {
					var f = rows[0].maxId;
					if (err) throw err;
					conn.query("SELECT workURL FROM work WHERE bookId = ? AND userId = ? AND pageNum = ?", [bookId, a, pageNow], function(err, rows, fields) {
						if (err) throw err;
						var len = 0;
						for (var each in rows) {
							len ++;
						}
						if (len == 0) {
							conn.query("INSERT INTO work (workId, userId, bookId, pageNum, workURL) VALUES (?, ?, ?, ?, ?)", [(f+1), a, bookId, pageNow, "https://upcdn.io/W142iek/raw/bookpage/white.png"], function(err, rows, fields) {if (err) throw err; booklayer.push("https://upcdn.io/W142iek/raw/bookpage/white.png"); conn.end(); return res.json({ booklayer: booklayer });});
						} else {
							booklayer.push(rows[0].workURL);
							conn.end();
							return res.json({ booklayer: booklayer });
						}
					});
				});
			});
		});
	});
});

app.post('/lastshow', async (req, res) => {
	var email = req.body.userdata;
	var bookId = req.body.bookId;
	var pageNow = req.body.pageNow;
	var conn = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database:'meraki',
		port: 3306
	});
		
	await conn.connect((err) => {
		if (err) {
			console.error('連接失敗：', err.stack);
			return;
		}
		conn.query("SELECT userId FROM user WHERE userEmail = ?", email, function(err, rows, fields) {
			if (err) throw err;
			var userId = rows[0].userId;
			conn.query("SELECT workURL FROM work WHERE userId = ? AND bookId = ? AND pageNum = ?", [userId, bookId, pageNow], function(err, rows, fields) {if (err) throw err; conn.end(); return res.json({ workurl: rows[0].workURL });});
		});
	});
});

app.post('/updateshow', async (req, res) => {
	var email = req.body.userdata;
	var bookId = req.body.bookId;
	var pageNow = req.body.pageNow;
	var newurl = req.body.filepath;
	var conn = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database:'meraki',
		port: 3306
	});
		
	await conn.connect((err) => {
		if (err) {
			console.error('連接失敗：', err.stack);
			return;
		}
		conn.query("SELECT userId FROM user WHERE userEmail = ?", email, function(err, rows, fields) {
			if (err) throw err;
			var userId = rows[0].userId;
			conn.query("UPDATE work SET workURL = ? WHERE userId = ? AND bookId = ? AND pageNum = ?", [newurl, userId, bookId, pageNow], function(err, rows, fields) {if (err) throw err; conn.end(); return res.json({ });});
		});
	});
});

app.post('/changeCondi', async (req, res) => {
	var email = req.body.userdata;
	var bookId = req.body.bookId;
	var totalPage = req.body.totalPage;
	var conn = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database:'meraki',
		port: 3306
	});
		
	await conn.connect((err) => {
		if (err) {
			console.error('連接失敗：', err.stack);
			return;
		}
		conn.query("SELECT userId FROM user WHERE userEmail = ?", email, function(err, rows, fields) {
			if (err) throw err;
			var userId = rows[0].userId;
			conn.query("SELECT COUNT(workId) AS acturalPage FROM work WHERE userid = ? AND bookId = ?", [userId, bookId], function(err, rows, fields) {
				if (err) throw err;
				if (rows[0].acturalPage == totalPage) {
					conn.query("UPDATE condi SET conditionType = ? WHERE userId = ? AND bookId = ?", ["complete", userId, bookId], function(err, rows, fields) {if (err) throw err; conn.end(); return res.json({ });});					
				} else {
					conn.end();
					return res.json({ });
				}
			});
		});
	});
});

app.post('/havepage', async (req, res) => {
	var email = req.body.userdata;
	var bookId = req.body.bookId;
	var conn = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database:'meraki',
		port: 3306
	});
		
	await conn.connect((err) => {
		if (err) {
			console.error('連接失敗：', err.stack);
			return;
		}
		conn.query("SELECT userId FROM user WHERE userEmail = ?", email, function(err, rows, fields) {
			if (err) throw err;
			var userId = rows[0].userId;
			conn.query("SELECT COUNT(workId) AS have FROM work WHERE userId = ? AND bookId = ?", [userId, bookId], function(err, rows, fields) {if (err) throw err; conn.end(); return res.json({ havePage: rows[0].have });});
		});
	});
});

app.post('/allImg', async (req, res) => {
	var email = req.body.userdata;
	var bookId = req.body.bookId;
	var pageNow = req.body.pageNow;
	var conn = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database:'meraki',
		port: 3306
	});
		
	await conn.connect((err) => {
		if (err) {
			console.error('連接失敗：', err.stack);
			return;
		}
		conn.query("SELECT userId FROM user WHERE userEmail = ?", email, function(err, rows, fields) {
			if (err) throw err;
			var a = rows[0].userId;
			conn.query("SELECT * FROM page WHERE bookId = ? AND pageNumber = ?", [bookId, pageNow], function(err, rows, fields) {
				if (err) throw err;
				var b = rows[0].frameURL;
				var booklayer = [b];
				conn.query("SELECT workURL FROM work WHERE bookId = ? AND userId = ? AND pageNum = ?", [bookId, a, pageNow], function(err, rows, fields) {
					if (err) throw err;
					booklayer.push(rows[0].workURL);
					conn.end();
					return res.json({ booklayer: booklayer });
				});
			});
		});
	});
});

app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
});