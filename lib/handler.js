var redis = require('redis');
var client = redis.createClient(process.env.REDISCLOUD_URL);
var Url = require('url');
var fs = require('fs');

function handler(req,res){
  var path = Url.parse(req.url).path;
  if (req.method === "POST" && path === "/redis"){
    var body = "";
    req.on("data", function(chunk){
      body += chunk;
    });
    req.on("error", function(){
      res.end("there has been an error");
    });
    req.on("end", function(){
      if (body){
        var data = JSON.parse(body);
        parseData(data);
      }
      res.end("data sent");
    });
  } else if (path === '/'){
    console.log(__dirname);
    fs.readFile(__dirname + '/../public/index.html',function(err,data){
      if (err){
        console.log(err);
      } else {
        res.end(data);
      }
    });
  } else {
    fs.readFile(__dirname + '/../public' + req.url, function(err, data){
      console.log(req.url);
      if (err) {
        console.log(err);
      } else {
        var fileEnd = req.url.split('.')[1];
        var fileType;
        if (fileEnd === 'svg'){
          fileType = 'image/svg+xml';
        } else {
          fileType = 'text/' + fileEnd;
        }
        console.log({'Content-Type' : fileType});
        res.writeHead(200, {'Content-Type' : fileType});
        res.end(data);
      }
    });
  }
}

function sendDataToRedis(data){
  client.hset(data.school, data.ta, JSON.stringify(data.dataObject), function(err,res){
    if (err) {
      console.log(err)
    }
    if (res === 0) {
      console.log('Record updated');
    } else if (res === 1){
      console.log('Record added to database')
    }
  });
}

function parseData(dataArray) {
  var details = dataArray.slice(0, 6);
  var questions = dataArray.slice(6);
  var parsed = details.reduce(function(object, elem){
    object[elem.name] = elem.value;
    return object;
  }, {});

  return getData(parsed, questions);
}

function getData(data, questions) {
  return client.hget(data.school, data.ta, function(err, res){
    if (err) {
      console.log(err);
    }
    sendDataToRedis(createHash(data, questions, JSON.parse(res)));
  });
}

function createHash(object, questions, data){
  var student;
  var group;
  if (!data){
    data = {};
  }

  var obj = {
    school: object.school,
    ta: object.ta,
    dataObject: data
  }

  if (data[object.group] && data[object.group][object.student]) {
    student = data[object.group][object.student];
  } else {
    student = {};
  }

  if (data[object.group]) {
    group = data[object.group];
  } else {
    group = {};
  }

  student[object.date] = questions;
  group[object.student] = student;
  obj.dataObject[object.group] = group;

  return obj;
}

module.exports = {
  handler: handler,
  client: client,
  createHash: createHash,
}
