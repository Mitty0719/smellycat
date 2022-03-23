const MOTION = {
  liedown: {
    scene: 9,
    pos: [
      [0, 0], [1, 0], [2, 0], [3, 0],
      [0, 1], [1, 1], [2, 1], [3, 1],
      [0, 2]
    ]
  },
  sit: {
    scene: 4,
    pos: [
      [0, 3], [1, 3], [2, 3], [3, 3],
    ]
  },
  sitdown: {
    scene: 6,
    pos: [
      [0, 4], [1, 4], [2, 4], [3, 4],
      [0, 5], [1, 5], [2, 5], [3, 5],
      [0, 6], [1, 6]
    ]
  },
  walkleft: {
    scene: 4,
    pos: [
      [0, 6], [1, 6], [2, 6], [3, 6]
    ]
  },
  walkbottom: {
    scene: 4,
    pos: [
      [0, 7], [1, 7], [2, 7], [3, 7]
    ]
  },
  walkright: {
    scene: 4,
    pos: [
      [0, 8], [1, 8], [2, 8], [3, 8]
    ]
  },
  walkright2: {
    scene: 4,
    pos: [
      [0, 9], [1, 9], [2, 9], [3, 9]
    ]
  },
  walkright3: {
    scene: 4,
    pos: [
      [0, 8], [1, 8], [2, 8], [3, 8]
    ]
  },
  walktop: {
    scene: 4,
    pos: [
      [0, 9], [1, 9], [2, 9], [3, 9]
    ]
  },
  walkleft2: {
    scene: 4,
    pos: [
      [0, 10], [1, 10], [2, 10], [3, 10]
    ]
  },
  walkleft3: {
    scene: 4,
    pos: [
      [0, 11], [1, 11], [2, 11], [3, 11]
    ]
  },
};
const ASSET_WIDTH = 32, ASSET_HEIGHT = 32;

export class Cat{
  constructor(x, y, app){
    this.x = x;
    this.y = y;
    this.speed = 1;
    this.motion = MOTION.walkleft;
    
    app.loader.add('spritesheet', `./images/cats/black_gold_eyes.png`).load(this.create.bind(this, app.stage));
  }
  create(stage){
    let motionCnt = 0;

    const texture = PIXI.Texture.from(`./images/cats/black_gold_eyes.png`);
    const rect = new PIXI.Rectangle(0, 0, ASSET_WIDTH, ASSET_HEIGHT);
    texture.frame = rect;

    let idle = setInterval(()=>{
      if(++motionCnt >= this.motion.scene - 1){
        rect.x = 0;
        motionCnt = 0;
      }
      this.sprite.texture.frame = rect;
      console.log(this.motion.pos[motionCnt], motionCnt);
      rect.x = ASSET_WIDTH * this.motion.pos[motionCnt][0];
      rect.y = ASSET_WIDTH * this.motion.pos[motionCnt][1];
    }, 80);

    this.sprite = new PIXI.Sprite(texture);
    this.sprite.position.set(300, 300);
    this.sprite.scale.set(2, 2);

    stage.addChild(this.sprite);
  }

  draw(){
    this.sprite.x = this.x;
    this.sprite.y = this.y;
  }

  animate(){

  }
}