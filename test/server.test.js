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
    var expected = "There has been an error sending the data to the database.";
    t.equal(actual, expected, "Error handled");
    t.end();
  });
});

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

test("A pdf is generated on request", function(t){
  var request = {
    method: 'POST',
    url: '/pdf',
    payload: '<head></head><body><h1>Test PDF</h1></body>'
  }

  shot.inject(handler.handler, request, function(res){;
    t.equal(res.statusCode, 200, "congrats, pdf created");
    t.end();
  });
});

test("Error message is sent when pdf fails to generate", function(t){
  var request = {
    method: 'POST',
    url: '/pdf',
    simulate: {
      error: true
    }
  }

  shot.inject(handler.handler, request, function(res){
    var actual = res.payload;
    var expected = "There has been an error generating the PDF.";
    t.equal(actual, expected, "Error handled");
    t.end();
  });
})

test('Static files are served', function(t){
  var request = {
    method: 'GET',
    url: '/index.js',
  }

  shot.inject(handler.handler, request, function(res){;
    t.deepEqual(res.rawPayload, fs.readFileSync(__dirname + '/../public/index.js'), "congrats, js file sent");
    t.end();
  });
});

test('Assets are served correctly', function(t){
  var request = {
    method: 'GET',
    url: '/assets/face-always.svg',
  }

  shot.inject(handler.handler, request, function(res){;
    t.deepEqual(res.rawPayload, fs.readFileSync(__dirname + '/../public/assets/face-always.svg'), "congrats, svg sent");
    t.equal(res.headers['Content-Type'], 'image/svg+xml', "congrats, correct file type sent");
    t.end();
  });
});

test('teardown', function (t) {
  if (process.env.REDISCLOUD_TEST) {
    handler.client.flushdb();
  } else {
    console.log("Tests not running on test database");
  }
  handler.client.end();
  t.end();
})
