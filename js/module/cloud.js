import {getRandomSignNumber} from '../util.js';
const TYPE = [
  {src: './images/cloud/cloud1.png', width: 64, height: 64, scene: 5},
  {src: './images/cloud/cloud2.png', width: 64, height: 64, scene: 4},
];
export class Cloud{
  constructor(stageWidth, stageHeight, scale, type){
    this.type = TYPE[type];
    this.direction = getRandomSignNumber();
    this.width = this.type.width;
    this.height = this.type.height;
    this.x = this.direction === -1 ? stageWidth : -(this.width * scale);
    this.y = Math.floor(Math.random() * 40);
    this.speed = (Math.floor(Math.random() % 1, 3) + 0.2) * this.direction;
    // this.speed = 5 * this.direction;
    this.scale = scale;
  }

  create(stage){
    let motionCnt = 0;
    const texture = PIXI.Texture.from(this.type.src);
    const rect = new PIXI.Rectangle(0, 0, this.width, this.height);
    texture.frame = rect;

    setInterval(()=>{
      if(motionCnt > this.type.scene-1){
        rect.x = 0;
        motionCnt = 0;
      }
      this.sprite.texture.frame = rect;
      rect.x = this.type.width * motionCnt;
      motionCnt++;
    }, 3000);

    this.sprite = new PIXI.Sprite(texture);
    this.sprite.position.set(this.x, this.y);
    this.sprite.scale.set(this.scale, this.scale);

    stage.addChild(this.sprite);
  }

  draw(){
    this.x += this.speed;
    this.sprite.x = this.x;
  }
  move(code){
    if(code === 'ArrowLeft'){
      this.x += Math.abs(this.speed);
    }else if(code === 'ArrowRight'){
      this.x += -(Math.abs(this.speed));
    }
    this.sprite.x = this.x;
  }
  checkOutScreen(stageWidth){
    if(this.direction === -1 && this.x < -(this.width * this.scale)){
      return true;
    }else if(this.direction === 1 && this.x > stageWidth){
      return true;
    }
    return false;
  }
}