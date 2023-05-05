#!/usr/bin/env node

/**
 * Module dependencies.
 */

var server = require('./app');
var port = 3000

server.listen(port, () => {
    console.log(`Starting server on port ${port}`);
});