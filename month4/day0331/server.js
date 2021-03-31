/*
node.js는 브라우저에 탑재된 자바스크립트와는 목적이 다르다.
즉, 응용 프로그램 개발 중 주로 서버를 개발할 때 많이 사용됨

node.js는 자체적으로 많은 기능을 가지지 못한다.
따라서 주로 모듈을 이용해서 프로그램을 개발한다.
*/
var http = require("http"); //웹 기본 서버 모듈.
//이 모듈이 있으면 기본적인 웹서버를 구축할 수 있다.

var server = http.createServer(); //서버 객체 생성

//생성된 서버 객체를 이용하여, 서버를 가동
server.listen(9999, function(){
    //서버가 가동됐을 때 실행되는 익명함수
    console.log("My Server in running at 9999 port...");

}); 