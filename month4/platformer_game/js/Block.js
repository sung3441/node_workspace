/*블럭을 정의한다 */
class Block extends GameObject{
    //이 시점부터는 gameObject에 있는 코드를 사용할 수 있게됨
    constructor(container, src, width, height, x, y, velX, velY){
        //내가 초기화 되기 전에 부모를 먼저 초기화
        super(container, src, width, height, x, y, velX, velY);

    }
}