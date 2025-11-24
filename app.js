const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const iemRoutes = require("./routes/iems.js");
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

app.use(express.urlencoded({ extended: true }));

app.use("/iems", iemRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
    res.render("home");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server running at http://localhost:" + PORT);
});