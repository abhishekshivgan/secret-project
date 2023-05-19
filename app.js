//jshint esversion:6
require('dotenv').config()
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption");
// const md5 = require("md5");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://0.0.0.0:27017/userDB", {useNewUrlParser: true});

const userSchema = new mongoose.Schema ({
    email: String,
    password: String
});

// mongoose-encryption + dotenv
// userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ["password"]}); 

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

// ************ using bcrypt ************//

// app.post("/register", async function(req, res) {
//     bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
//         try {
//             const newUser = new User ({
//                 email: req.body.username,
//                 password: hash
//             });
//             await newUser.save();
//             res.render("secrets");
//         }
//         catch (err) {
//             console.log(err);
//         }
//     });
// });

// app.post("/login", async function(req, res) {
//     try {
//         const username = req.body.username;
//         const password = req.body.password;
//         await User.findOne({email: username}).then(function (foundUser) {
//             if (foundUser) {
//                 bcrypt.compare(password, foundUser.password, function(err, result) {
//                     if (result === true) {
//                         res.render("secrets");
//                     } else {
//                         res.send("Wrong password! Please enter the right password");
//                     }
//                 })
                
//             } else {
//                 res.send("No user found!");
//             }
//         })
//     }
//     catch (err) {
//         console.log(err);
//     }
// });

// ************ end of bcrypt ************//

app.listen(3000, function(req, res) {
    console.log("Server started on port 3000");
})