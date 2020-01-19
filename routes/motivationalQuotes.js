const express = require('express');
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/database")

const MotivationalQuote = require("../models/motivationalQuote");

// Motivational Quote
router.get('/randomMotivationalQuote', passport.authenticate("jwt", { session: false }), (req, res, next) => {
  MotivationalQuote.findOne((error, response) => {
    console.log(response);
    if (error)
        res.json({success: false, msg: 'Failed to register user'});
    else
        res.json({success: true, msg: response});
    });
});


module.exports = router;