var test = require("tape");
var shot = require("shot");
var handler = require('../lib/handler.js');
var equal = require('deep-equal');
var fs = require('fs');

test("testing the server gives a response", function(t){
  var request = {
    method: 'GET',
    url: '/',
  }

  shot.inject(handler.handler, request, function(res){
    var actual = res.payload;
    var expected = fs.readFileSync(__dirname + "/../public/index.html").toString();
    t.equal(actual, expected, "congrats, data sent to server");
    t.end();
  });
})

test("testing the server is up and running", function(t){
  var request = {
    method: 'POST',
    url: '/redis',
    payload: [{"name":"school","value":"One"},{"name":"ta","value":"two"},{"name":"student","value":"three"},{"name":"school-year","value":"four"},{"name":"group","value":"five"},{"name":"date","value":"2016-02"},{"name":"personal-appearance","value":"3"},{"name":"appearance-others","value":"2"},{"name":"likes","value":"2"},{"name":"dislikes","value":"1"},{"name":"strengths","value":"0"},{"name":"identify-emotions-self","value":"1"},{"name":"identify-emotions-others","value":"2"},{"name":"bodily-reaction-emotions","value":"2"},{"name":"identify-response-emotions","value":"2"},{"name":"plan-respond-emotions","value":"0"},{"name":"good-eye-contact","value":"3"},{"name":"good-distance-touch","value":"2"},{"name":"identify-expressions","value":"2"},{"name":"body-language-self","value":"2"},{"name":"body-language-others","value":"1"},{"name":"good-volume","value":"0"}]
  }

  shot.inject(handler.handler, request, function(res){
    var actual = res.payload;
    var expected = "data sent";
    t.equal(actual, expected, "congrats, data sent to server");
    t.end();
  });
})

test("the server handles errors correctly", function(t){
  var request = {
    method: 'POST',
    url: '/redis',
    simulate: {
      error: true
    }
  }

  shot.inject(handler.handler, request, function(res){
    var actual = res.payload;
    var expected = "there has been an error";
    t.equal(actual, expected, "congrats, data sent to server");
    t.end();
  });
})

test('hash creation when TA is not in database', function(t){
  var details = require('./fixtures/details.js');
  var questions = require('./fixtures/questions.js');
  var actual = handler.createHash(details, questions, null).dataObject;
  var expected = require('./fixtures/data-object.js');
  t.deepEqual(actual,expected,'hash created correctly');
  t.end();
});

test('hash creation when TA is already in database', function(t){
  var details = require('./fixtures/details.js');
  var questions = require('./fixtures/questions.js');
  var data = require('./fixtures/data.js');
  var actual = handler.createHash(details, questions, data).dataObject;
  var expected = require('./fixtures/data-object-update.js').dataObject;
  t.ok(expected.every(function(el, i){
    return equal(el, actual[i]);
  }),'hash created correctly');
  t.end();
});

test('teardown', function (t) {
  handler.client.end();
  t.end();
})
