const ASSET_WIDTH = 64, ASSET_HEIGHT = 64;
const ASSET_TYPE = {
  1: [0], // 여름
  0: [2, 3, 4, 5, 6, 7, 14, 15, 16, 17], // 봄
  2: [23, 24, 25, 26, 27, 28, 29, 30], // 가을
  3: [33, 34, 35, 36, 37] // 겨울
}
export class Tree{
  constructor(x, y, scale, type){
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.type = ASSET_TYPE[type][Math.floor( Math.random() * ASSET_TYPE[type].length )];
    this.speed = 0.5;
  }

  create(stage, loader){
    const baseTexture = loader.resources['tree'].texture.baseTexture;
    const rect = new PIXI.Rectangle(this.type * ASSET_WIDTH, 0, ASSET_WIDTH, ASSET_HEIGHT);
    const texture = new PIXI.Texture(baseTexture, rect);
    // texture.frame = rect;
    // console.log(texture.frame);

    this.sprite = new PIXI.Sprite(texture);
    this.sprite.position.set(this.x, this.y);
    this.sprite.scale.set(this.scale, this.scale);

    stage.addChild(this.sprite);
  }

  move(code){
    if(code === 'ArrowLeft'){
      this.x += this.speed;
    }else if(code === 'ArrowRight'){
      this.x -= this.speed;
    }
    this.sprite.x = this.x;
    
  }
}