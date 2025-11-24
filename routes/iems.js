const express = require("express");
const router = express.Router();
const Iem = require("../models/iem.js");

// READ
router.get("/", function (req, res) {
    Iem.find()
        .then(function (iems) {
            res.render("iems/index", { iems: iems });
        })
        .catch(function (err) {
            console.log("Error fetching IEMs:", err);
            res.render("iems/index", { iems: [] });
        });
});

// NEW
router.get("/new", function (req, res) {
    res.render("iems/new");
});

// CREATE
router.post("/", function (req, res) {
    Iem.create({
        brand: req.body.brand,
        model: req.body.model,
        soundSignature: req.body.soundSignature,
        rating: req.body.rating
    })
        .then(function () {
            res.redirect("/iems");
        })
        .catch(function (err) {
            console.log("Error creating IEM:", err);
            res.redirect("/iems");
        });
});

// EDIT
router.get("/:id/edit", function (req, res) {
    Iem.findById(req.params.id)
        .then(function (iem) {
            res.render("iems/edit", { iem: iem });
        })
        .catch(function (err) {
            console.log("Error loading edit form:", err);
            res.redirect("/iems");
        });
});


// UPDATE
router.post("/:id", function (req, res) {
    Iem.findByIdAndUpdate(req.params.id, {
        brand: req.body.brand,
        model: req.body.model,
        soundSignature: req.body.soundSignature,
        rating: req.body.rating
    })
    .then(function () {
        res.redirect("/iems");
    })
    .catch(function (err) {
        console.log("Error updating IEM:", err);
        res.redirect("/iems");
    });
});

// DELETE
router.post("/:id/delete", function (req, res) {
    Iem.findByIdAndDelete(req.params.id)
        .then(function () {
            res.redirect("/iems");
        })
        .catch(function (err) {
            console.log("Error deleting IEM:", err);
            res.redirect("/iems");
        });
});

module.exports = router;