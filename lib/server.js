var Http = require('http');
var Url = require('url');

var server = Http.createServer(handler).listen(8000);

function handler(req,res){
  // console.log(req.url, "hekjahsdf");
  var path = Url.parse(req.url).path;
  console.log(path,"adsfs", req.method);
  if (req.method === "POST" && path === "/redis"){
    var body = "";
    req.on("data", function(chunk){
      body += chunk;
    });
    console.log("im here");
    req.on("error", function(){
      res.end("there has been an error");
    });
    req.on("end", function(chunk){
      if (chunk){
        body += chunk;
      }
      res.end("data sent");
    });
  }
}

function end(){
  server.close();
}


console.log("server running on localhost:8000");

module.exports = {
  handler: handler,
  end: end
};
