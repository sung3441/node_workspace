/*
클라이언트의 요청을 받을 웹서버를 구착한다!!
*/

var http = require("http"); //http 모듈(웹 서버 모듈) 가져오기

var server = http.createServer(); //서버 객체 생성

//클라이언트의 접속을 감지!
server.on("connection",function(){
    //클라이언트가 서버에 연결 되면 호출되는 함수
    console.log("클라이언트의 접속 감지!!");

});

//클라이언트 요청에 대해, 응답하기!
//만일 응답 처리를 안할 경우 클라이언트는 무한대기에 빠진다.

//1521:오라클용 포트, 3306:MYSql 포트, 21:기본포트
server.listen(9999, function(){ //클라이언트의 접속을 기다림
    
    console.log("Second Server is running at 9999 port...")
});