const MAX_WIDTH = 10000;
export class Background{
  constructor(stageWidth, stageHeight){
    this.x = 0;
    this.y = 0;
    this.speed = 0.5;

    this.resize(stageWidth, stageHeight);
  }

  create(stage){
    this.sprite = PIXI.Sprite.from('./images/noonbackground.png');
    stage.addChild(this.sprite);
    this.sprite.width = MAX_WIDTH;
    this.sprite.height = this.stageHeight;
  }

  resize(stageWidth, stageHeight){
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  draw(){
    this.sprite.x = this.x;
  }

  move(code, isCenter){
    if(this.x > 0){
      this.x = 0;
      return;
    }
    if(code === 'ArrowLeft'){
      this.x += this.speed;
    }else if(code === 'ArrowRight'){
      this.x -= this.speed;
    }
    this.draw();
  }
}
