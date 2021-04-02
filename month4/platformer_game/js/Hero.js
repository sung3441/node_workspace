/*
예전에 작성한 코드를 재사용해보자
*/
class Hero extends GameObject{
    constructor(container, src, width, height, x, y, velX, velY){
        //부모의 생성자 메서드를 호출하자!!(매개변수 빠짐없이)
        super(container, src, width, height, x, y, velX, velY);
        this.g = 0.2; //중력 가속도 효과를 내기 위한 변수, 이 변수는 상속과 상관없는 변수이다.
        this.jump = false; //주인공의 점프상태를 판단할 수 있는 변수(즉, 점프하는지 안하는지)
    }

    //히어로는 움직임이 있다. 따라서 메서드 정의가 요구된다.
    //그렇지만, 부모에게 물려받은 메서드가, 현재 나의 상황에는 맞지 않을 경우
    //업그레이드가 필요하다.(java, c# oop언어에서는 이러한 메서드 재정의 기법을 가리켜
    //오버라이딩(override)이라고 한다.)
    tick(){
        //코드에서는 보이지 않지만, 현재 클래스는 GameObject의 모든 것을 다 가지고 있는 것과
        //마찬가지다. 즉 , 내 것 처럼 접근할 수 있다.
        this.velY += this.g;
        this.y = this.y+this.velY;
        this.x += this.velX;

        for(var i = 0; i < blockAr.length; i++){
            var onBlock = collisionCheck(this.img, blockAr[i].img); 
            
            if(onBlock && this.jump==false){
                this.velY = 0;
                this.y = blockAr[i].y - this.height;
            }
            //주인공이 점프한 이후, 다시 하강하는 순간을 포착하여 벽돌 위에 서있을 수 있는
            //핵심 변수인 this.jump를 다시 false로 돌려놓기
            if(this.velY > 0){
                this.jump = false;
            }
        }
    }

    render(){
        this.img.style.top = this.y+"px"; 
        this.img.style.left = this.x+"px"; 

    }
} 