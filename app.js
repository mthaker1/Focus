const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require("./config/database");

// Connect to Database
mongoose.connect(config.database, {useNewUrlParser: true, useUnifiedTopology: true,});

// On Connection
mongoose.connection.on("connected", () => {
  console.log("Connected to database" + config.database);
});

// On Error of Connection
mongoose.connection.on('error', (err) => {
  console.log("Database error:" + err);
});


const app = express();

const users = require("./routes/users");
const motivationalQuotes = require("./routes/motivationalQuotes");

// Port Number

const port = 3000;


// CORS Middleware

app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware - Parses incoming requests body, grabbing data

app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use('/users', users);
app.use('/motivationalQuotes', motivationalQuotes);

// Index Route

app.get("/", (req, res) => {
  res.send("Invalid Endpoint");
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, ''));
});


// Start Server

app.listen(port, () => {
  console.log("Server started on port" + port);
});
