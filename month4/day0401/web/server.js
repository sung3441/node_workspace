/*서버 구축하기 */
var http = require("http"); //http 모듈 가져오기
var fs = require("fs"); //fs 모듈 가져오기)파일을 다룰 때 사용되는 모듈

var mysql = require("mysql");//mysql을 연동하기 위한 모듈 가져오기
//외부 모듈이다. 따라서 개발 시 추가 설치가 필요하다.
//npm : node.js package manager
//추가 설치 명령어 : cmd> npm install 모듈명

var server = http.createServer(function(request, response){
    //클라이언트에 응답하기
    //클라이언트에게 보여줄 html 문서를 이루고 있는 코드를 읽어들여서,
    //응답 정보로 보내보자!!!

    //클라이언트가 브라우저의 URL에 어떤 주소를 입력했는지를 조사!
    //그 조사 결과에 따라서 아래 코드 중 어떤 코드가 실행될지를 결정짓자!!
    //request객체란 클라이언트의 요청 정보를 가진 객체이기 때문에 클라이언트가
    //입력한 url정보도 이 객체를 통해 얻어낼 수 있다.

    var url = request.url;

    console.log("클라이인트가 요청 시 입력한 주소는 ", url);

    //localhost:8888/member/form :   회원가입 디자인폼 요청으로간주
    //localhost:8888/member/regist :   회원가입 요청으로간주
    //localhost:8888/member/result :   회원가입 완료로 간주
    if(url == "/member/form"){ //회원가입을 희망하는 사람
        fs.readFile("./regist_form.html", "utf8", function(error, data){
             response.end(data);

        });

    }else if(url == "/member/regist"){ //등록을 원하는
        //쿼리문 수행 전에 node.js가 mysql에 접속을 성공해야 한다.
        var con = mysql.createConnection({
            url : "localhost:3306", //mysql의 포트 번호, db는 네트워크 프로그램이므로 포트를 사용!!
            database : "nodejs", //사용 중인 db명
            user : "root", //유저 아이디
            password : "1234" //비밀번호
        });//접속!!
        console.log("접속 결과 객체", con);

        //mysql에 값 등록 하기
        var sql = "insert into member(user_id, user_pass, user_name)";
        sql += " values('superman', '0000', '슈퍼맨')";
        
        //쿼리문 수행
        con.query(sql, function(err, fields){
            //쿼리문 수행 후 정상적으로 수행됐나 확인
            if(err){
                console.log("쿼리문 수행 중 에러발생", err);
            }else{
                console.log("등록 성공");
            }    
        }); 
        
    }else if(url == "/member/result"){
        fs.readFile("./result.html", "utf8", function(error, data){
            response.end(data);

        });

    }



    // fs.readFile("./result.html", "utf8", function(){
    //     response.end(data);

    // });

    //회원가입을 희망하는 사람                              // 에러, 파일의 내용
    // fs.readFile("./regist_form.html", "utf8", function(error, data){
    //     //파일의 내용을 모두 읽어들인 순간 이 익명함수가 동작!!

    //     response.end(data);
    // });


});//서버 객체 생성

//서버 가동
server.listen(8888, function(){
    console.log("server is runing at 8888...");
});


