var test = require("tape");
var shot = require("shot");
var http = require("http");
var server = require("../lib/server.js")

test("testing the server is up and running", function(t){
  var request = {
    method: 'POST',
    url: '/redis',
  }

  shot.inject(server.handler, request, function(res){
    var actual = res.payload;
    var expected = "data sent";
    t.equal(actual, expected, "congrats, data sent to server");
    t.end();
  });
  server.end()
})
