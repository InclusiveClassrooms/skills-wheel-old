var Http = require('http');
var Url = require('url');

Http.createServer(function(req,res){
  // console.log(req.url, "hekjahsdf");
  var path = Url.parse(req.url).path;
  console.log(path,"adsfs");
  // console.log(path);
  // res.end("hello");
  if (req.method === "POST" && path === "/redis"){
    var body = "";
    req.on("data", function(chunk){
      body += chunk;
    });
    req.on("end", function(){

      console.log(JSON.parse(body));
    });
  }
}).listen(8000);

console.log("server running on localhost:8000");
