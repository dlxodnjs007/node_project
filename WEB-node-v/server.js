// var http = require('http');
// var fs = require('fs');

// var app = http.createServer(function(req, res) {
//     var url = req.url
//     if(req.url == '/') {
//         url = '/main.html';
//     }
//     if(req.url == '/favicon.ico') {
//         return res.writeHead(404);
//     }
//     res.writeHead(200);
//     res.end(fs.readFileSync(__dirname + url));
// });

// app.listen(3000, function(){
//     console.log("server is running.");
// })
//-----------------------------------------------
// var express = require('express')
// var app = express()

// app.get('/', function (req, res) {
// res.sendFile(__dirname + '/main.html');
// })

// app.listen(3000);

var http = require('http');	// 서버 만드는 모듈 불러오기
var fs = require('fs');

var app = http.createServer(function(request,response){
    var url = request.url;
    if(request.url == '/'){
      url = '/index.html';	// 실행할 url
    }
    if(request.url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    response.end(fs.readFileSync(__dirname + url));
 
});

app.listen(3000);		// 실행할 port