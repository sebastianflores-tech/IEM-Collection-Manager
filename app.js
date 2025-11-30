const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const iemRoutes = require("./routes/iems.js");
const session = require("express-session");
const passport = require("passport");
const setupPassport = require("./config/passport")
require("dotenv").config(); 

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(function () {
    console.log("Connected to MongoDB");
  })
  .catch(function (err) {
    console.log("MongoDB connection error:", err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// forms
app.use(express.urlencoded({ extended: true }));

// session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// passport
setupPassport();
app.use(passport.initialize());
app.use(passport.session());

// allow global
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// iem routes
app.use("/iems", iemRoutes);

// static files
app.use(express.static(path.join(__dirname, "public")));

// home page
app.get("/", function (req, res) {
    res.render("home");
});

// auth log routes

// show login page
app.get("/login", function (req, res) {
  res.render("login");
});

// google login
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// google callback
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  function (req, res) {
    res.redirect("/iems");
  }
);

// github login
app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// github callback
app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
  }),
  function (req, res) {
    res.redirect("/iems");
  }
);

// logout
app.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server running at http://localhost:" + PORT);
});