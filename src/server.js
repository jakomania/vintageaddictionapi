#!/usr/bin/env node
const User = require("../models/User");
/**
 * Module dependencies.
 */

var server = require('./app').server;
var mongoose = require("mongoose");
var port = 3000


server.listen(port, () => {
    console.log(`Starting server on port ${port}`);
});

//Mongo DB connection
mongoose.connect("mongodb://127.0.0.1:27017/va_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
