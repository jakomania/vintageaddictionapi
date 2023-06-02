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

//Mongo DB connectio
mongoose.connect("mongodb+srv://admin:DXGxk8sN0DBxUPqh@cluster0.fdnw8ln.mongodb.net/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// admin iOu3aizONnHaXtjG