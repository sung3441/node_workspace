/*
흑인을 정희한다
*/
class BlackHuman extends Human{
    constructor(color){
        //this.x = 5;//부모클래스 초기화 전에 자식의 초기화가 먼저될 수 없음!!!
        //부모생성자 호출보다 앞서는 코드의 존재금지;
        super(color);

    }
    
    playBasketBall(){

        console.log("농구를 한다");
    }

    playBox(){
        console.log("복싱을 한다.")

    }
}