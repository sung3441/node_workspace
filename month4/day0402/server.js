var http = require("http"); //내장 모듈 따라서 별도의 설치 불필요
var fs = require("fs");

var server = http.createServer(function(request, response){
    //request : 클라이언트의 요청 정보
    //response : 클라이언트에게 응답할 정보
    fs.readFile("../day0401/web/regist_form.html", "utf8", function(error, data){
        response.end(data);
        response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});


    });



    //클라이언트에 지정한 문자열을 전송
    //HTTP의 형식을 갖추어서 클라이언트에게 응답을 해보자
});






















server.listen(7878, function(){
    console.log("My server is running at 7878...");

}); //서버 가동