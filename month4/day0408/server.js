var http = require("http"); //내장 모듈
//클라이언트가 업로드 한 바이너리 데이터 처리를 위한 모듈을 사용해야함!!
//쪼개져서 넘어오는 바이너리 데이터를 다시 복원시켜주는 역할!!
var multer = require("multer"); //외부모듈, 업로드 컴포넌트
//var oracledb = require("oracledb") //외부 모듈, 오라클과 접속 하게 해줌
var path = require("path"); //파일의 경로와 관련되어 유용한 기능을 보유한 모듈,
//확장자를 추출하는 기능포함

var mymodule = require("./mymodule.js");
var mysql = require("mysql");
var express = require("express"); //외부모듈 설치 필요!!
var app = express();//express객체 생성
var fs = require("fs"); //내부 모듈
var ejs = require("ejs");//외부 모듈

//필요한 각종 미들웨어 적용
app.use(express.static(__dirname+"/static")); //사용할 정적자원의 루트 경로

//업로드 모듈을 이용한 업로드 처리
var upload = multer({
    storage : multer.diskStorage({
        destination : function(request, file, cb){
            cb(null, __dirname+"/static/upload");//디렉터리 설정

        },//저장위치
        filename : function(request, file, cb){
            //업로드한 파일에 따라서 파일 확장자가 달라진다. 정보를 추출해 와야함.
            //path.extname(file.originalname)의 결과는 jpg, png등으로 추출해줌
            cb(null, new Date().valueOf()+path.extname(file.originalname));//파일이름을 시간으로 설정하면 중복을 방지할 수 있음

        }//저장할 이름
    })
}); 

var conStr = { //오라클을 연동할 때 사용할 접속 정보
    url : "localhost:3306",
    user : "root",
    password : "1234",
    database : "nodejs"
};

//글목록 요청 처리
app.get("/gallery/list", function(request, response){
    var sql = "select * from gallery order by gallery_id desc"; //내림차순으로 조회
    var con = mysql.createConnection(conStr);
    con.query(sql, function(error, result, fields){
        if(error){
            console.log("에러 발생", error);
        }else{
            fs.readFile("./gallery/list.ejs", "utf8", function(error1, data){
                response.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
                response.end(ejs.render(data, {
                    lib : mymodule,
                    galleryList : result
                }));
            });
            con.end();
        }
    });
});  


//글등록 요청 처리
app.post("/gallery/regist", upload.single("pic"), function(request, response){   
    //오라클접속방법
    //오라클에 접속할 때는 oracleXETNSListener과 oracleServiceXE가 켜져 있어야 한다.!!!!
    // oracledb.getConnection(conStr, function(error, con){
    //     if(error){
    //         console.log("접속 실패", error);

    //     }else{
    //         console.log("접속 성공");

    //     }
    // });
    var title = request.body.title;
    var writer = request.body.writer;
    var content = request.body.content;
    var filename = request.file.filename;//multer를 이용했기 떄문에 기존의 requset 객체에 추가가 된다.,
    console.log("레지스트 바디", request.body);
    var con = mysql.createConnection(conStr);
    var sql = "insert into gallery(title, writer, content, filename) values(?, ?, ?, ?)"
    con.query(sql, [title, writer, content, filename], function(error, fields){
        if(error){
            console.log("에러 발생", error);

        }else{
            response.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
            response.end(mymodule.getMsgUrl("등록 완료", "/gallery/list"));
        }
        con.end(); //mysql 접속 해제
    });
});

//상세보기 요청
app.get("/gallery/detail", function(request, response){
    var con = mysql.createConnection(conStr);
    var gallery_id = request.query.gallery_id;
    var sql = "select * from gallery where gallery_id="+gallery_id;
    //쿼리문 수행
    con.query(sql, function(error, result, fields){
        if(error){
            console.log(error);
        }else{
            con.query("update gallery set hit=hit+1 where gallery_id="+gallery_id, function(error2, fields){
                if(error2){
                    console.log(error2);
                }else{
                    console.log("히트,!!!");
                    fs.readFile("./gallery/detail.ejs", "utf8", function(error3, data){
                        if(error3){
                            console.log(error3);
                        }else{
                            response.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
                            response.end(ejs.render(data, {
                                record : result[0]
                            }));
                        }
                    });
                }
                con.end();
            });
        }
    });
});

//삭제 요청 처리(DB삭제 + 이미지 삭제)
app.get("/gallery/del", function(request, response){
    var gallery_id = request.query.gallery_id; //post방식일 때는 body에서 추충
    var filename = request.query.filename;
    //console.log(request.data);
    //삭제할 파일의 경로, 
    fs.unlink(__dirname+"/static/upload/"+filename, function(error){
        if(error){
            console.log("에러발생", error);
        }
        else{
            console.log("삭제완료!");
            var con = mysql.createConnection(conStr);
            var sql = "delete from gallery where gallery_id="+gallery_id;
            con.query(sql, function(error1, fields){
                if(error1){
                    console.log(error1, "에러발생~");
                }else{
                    response.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
                    response.end(mymodule.getMsgUrl("삭제완료", "/gallery/list"));
                }
                con.end();
            });
        }
    });
});


//수정 요청 처리(이미지 수정+DB수정)
app.get("/gallery/edit", function(request, response){
    console.log("수정 바디", request.query);
    response.end("야호");
});







var server = http.createServer(app); //기본 모듈에 express 모듈 연결
server.listen(9999, function(){
    console.log("Gallery Server is running at 9999 port...");
});