// app.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./model/User"); // Ensure this path is correct
const Book = require("./model/book");
const Page = require("./model/Page");
const Category = require("./model/category");
const Author = require("./model/author");

mongoose.connect("mongodb+srv://admin:ls020816@cluster0.cc2dcjm.mongodb.net/Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

const app = express();
app.set('view engine', 'html'); 

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve static files from the root directory

app.use(session({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
    res.redirect('../login/login.html'); // set default to login page 
});

// Signup route
app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Check if all fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if the user already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: "Email already registered" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already registered" });
        }

        const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
        });
    
        return res.json({ success: true });

    } catch (err) {
        // Handle any unexpected errors
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Login route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Missing credentials" });
        }
        
        const user = await User.findOne({ email: req.body.email });
		if (user) {
            //check if password matches
            const result = req.body.password === user.password;
            if (result) { // Login successful
                // Retrieve username from the database
                const username = user.username;
                // Login successful
                req.session.user = { username };

                return res.json({ success: true });
            } else {
                res.status(400).json({ error: "Password doesn't match" });
            }
		} else {
		    res.status(400).json({ error: "User doesn't exist" });
		}
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// homepage
app.post('/homepage', async (req, res) => {
    // Check if the user is authenticated by verifying the session
    if (!req.session.user) {
        return res.status(400).json({ error: "Missing credentials" });
    }

    const username = req.session.user.username;
    return res.json({ username }); // Return the username in the response
});


// forget password 
app.post('/forgetpassword', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Missing credentials" });
        }
        
        const user = await User.findOne({ email: req.body.email });
		if (user) {
            const username = user.username; 
            req.session.user = { username };
            return res.json({ success: true, username: username }); 
		} else {
		    res.status(400).json({ error: "User doesn't exist" });
		}
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/update', async (req, res) => {
    try {
        const { password } = req.body;
        
        // Check if all fields are provided
        if ( !password ) {
            return res.status(400).json({ error: "Missing credentials"});
        }

        // Find the user by username
        if (!req.session.user) {
            return res.status(400).json({ error: "user not undefined" });
        }
    
        const username = req.session.user.username;
        // console.log(Username);

        // Find the user by username 
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: "User doesn't exist" });
        }

        // Update the user's password
        user.password = password;
        await user.save();

        return res.json({ success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// homepage
app.post('/homepage', async (req, res) => {
    // Check if the user is authenticated by verifying the session
    if (!req.session.user) {
        return res.status(400).json({ error: "Missing credentials" });
    }

    const username = req.session.user.username;
    // return res.json({ username }); // Return the username in the response
    const userEmail = req.session.user.email;

    try {
        const bookLists = await getBookLists(userEmail);
        if (bookLists) {
            return res.json(bookLists);
        } else {
            return res.status(500).json({ error: "Failed to retrieve book lists" });
        }
    } catch (error) {
        console.error('Error in /homepage route:', error);
        return res.status(500).json({ error: "Internal server error" });
    }
    
});

app.post('/random-books', async (req, res) => {
    try {
        const selectedBooks = await Book.aggregate([{ $sample: { size: 5 } }]);
        const recommendedBooks = await Book.aggregate([{ $sample: { size: 5 } }]);
        const unfinishedBooks = await Book.aggregate([{ $sample: { size: 2 } }]);

        res.json({
            selectedBooks,
            recommendedBooks,
            unfinishedBooks
        });
    } catch (error) {
        console.error('Error fetching random books:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
/*
// Logout route
app.post('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ error: "Internal Server Error" });
            }
            res.json({ success: true });
        });
    });
});

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: "Unauthorized" });
}
*/
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
