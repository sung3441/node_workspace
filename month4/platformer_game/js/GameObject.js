/*
객체지향에서는 현실에서의 상속의 개념을 코드로 구현이 가능하다.
즉, 모든 자식이 보유해야할 공통 코드를, 자식 객체마다 코드를 중복
시키지 않고, 부모 객체에 공통 코드를 작성할 수 있다.
이러한 코드 기법을 지원하는 이유??? 
코드의 재사용 => 유지보수성이 높아진다. => 시간이 세이브
*/

//이 클래스는 게임에 등장할 모든 객체의 최상위 객체이다.
class GameObject{
    constructor(container, src, width, height, x, y, velX, velY) {
        this.img = document.createElement("img");
        this.container = container;
        this.src = src;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;

        this.init();
    }
    
    init(){
        this.img.src = this.src;
        this.img.style.width = this.width+"px";
        this.img.style.height = this.height+"px";

        this.img.style.left = this.x+"px";
        this.img.style.top = this.y+"px";
        this.img.style.position = "absolute";
        
        this.container.appendChild(this.img);
    }

    tick(){
        //어떤 동작을 수행할지 알 수 없으므로, 코드를 작성해서는 안된다.
        //이렇게 부모 클래스가 내용없이(몸체 없이 ) 작성한 메서드를 가리켜,
        //추상 메서드라고 하며, 추상 메서드의 본 목적은 자신이 불완전하게 남겨놓은
        //기능을 자식에게 구현할 것을 강제하기 위함이다.
        
    }

    render(){

        
    }
}