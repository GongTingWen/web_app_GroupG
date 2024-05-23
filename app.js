// app.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./model/User"); // Ensure this path is correct

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
    res.redirect('../login/login.html');
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
            if (result) {
                // Login successful
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

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
