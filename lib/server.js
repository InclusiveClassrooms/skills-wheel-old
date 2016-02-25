var Http = require('http');
var handler = require('./handler.js').handler;

var server = Http.createServer(handler).listen(8000);

console.log("server running on localhost:8000");
