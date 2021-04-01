/*
클라이언트의 브라우저에서 전송한 데이터를 가리켜 파라미터 값이라고 하고,
이 파라미터 값을 서버측에서 받아서 처리해본다!!

*/

var http = require("http");
var querystring = require("querystring"); //파라미터 처리 모듈

var server = http.createServer(function(request, response){
    //클라이언트가 전송한 파라미터 받기
    if(request.url == "/param"){
    //클라이언트가

    //get방식으로 전송 된 데이터 받아보기
        console.log("클라이언트의 요청 발견", querystring);
        //쿼리 스트링이 보유하고 있는 parse()메서드
    }
});

server.listen(7777, function(){
    console.log("server is running ar 7777...");

});