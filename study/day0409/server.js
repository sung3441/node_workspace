//http모듈 가져오기!!(내장모듈)
var http = require("http");

var server = http.createServer(function(request, response){
    //request = 클라이언트 측의 요청 정보가 담겨질 변수!
    //reponse = 클라이언트에게 응답해줄 정보를 담을 변수!
    response.end("Hello world!")

})

//포트 : 네트워크 프로그램간 식별을 위한 구분 고유값 1~1024 사이는 쓰지않음
//그 외에도 이미 사용 중이거나 사용하면 안되는 포트 번호들이 존재!
//ex : 3306(mysql에서 사용하는 포트 번호)

//9999포트 번호를 이용하여 서버를 가동
server.listen(9999, function(){
    //서버 가동 시 실행되는 곳!!
    console.log("use port Number : 9999")

})