//jshint esversion:6
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://0.0.0.0:27017/userDB", {useNewUrlParser: true});

const userSchema = new mongoose.Schema ({
    email: String,
    password: String
});

const secret = "Thisismylittlesecret";
userSchema.plugin(encrypt, {secret: secret, encryptedFields: ["password"]});

const User = new mongoose.model("User", userSchema);

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/login", function(req, res) {
    res.render("login");
});

app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", async function(req, res) {
    try {
        const newUser = new User ({
            email: req.body.username,
            password: req.body.password
        });
        await newUser.save();
        res.render("secrets");
    }
    catch (err) {
        console.log(err);
    }
});

app.post("/login", async function(req, res) {
    try {
        const username = req.body.username;
        const password = req.body.password;
        await User.findOne({email: username}).then(function (foundUser) {
            if (foundUser) {
                if (foundUser.password === password) {
                    res.render("secrets");
                } else {
                    
                }
            }
        })
    }
    catch (err) {
        console.log(err);
    }
})

app.listen(3000, function(req, res) {
    console.log("Server started on port 3000");
})