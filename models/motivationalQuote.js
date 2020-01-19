const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const config = require('../config/database');

// User Schema
const MotivationalQuoteSchema = mongoose.Schema({
  quoteText: {
    type: String
  },
  quoteAuthor: {
    type: String
  }
});

const MotivationalQuote = module.exports = mongoose.model('MotivationalQuote', MotivationalQuoteSchema);

module.exports.getMotivationalQuoteById = function(id, callback){
    MotivationalQuote.findById(id, callback);
}