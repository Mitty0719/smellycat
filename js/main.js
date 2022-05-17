import { Background } from './module/background.js';
import { Cat } from './module/cat.js';
import { Text } from './module/text.js';
import { Cloud } from './module/cloud.js';

class App{
  constructor(){
    this.keyInfo = {
      ArrowRight: {
        idle: null,
        isDown: false
      },
      ArrowLeft: {
        idle: null,
        isDown: false
      },
    }
    WebFont.load({
      google: {
        families: ['Indie Flower']
      }
    });
    this.texts = [];
    this.clouds = [];
    this.cloudCnt = 1;

    this.resize();
    this.setApplication();
    window.addEventListener('keydown', this.keydown.bind(this));
    window.addEventListener('keyup', this.keyup.bind(this));
    window.addEventListener('resize', this.resize.bind(this));

    setTimeout(()=>{
      const sampleText = new Text('S m e l l y  C a t', 'title', 1000, 1000, this.app);
      sampleText.createText(this.stageWidth, this.stageHeight);
      this.texts.push(sampleText);
    }, 2000);

  }

  resize(){
    this.stageWidth = window.innerWidth;
    this.stageHeight = window.innerHeight;

    if(this.app){
      this.app.width = this.stageWidth;
      this.app.height = this.stageHeight;
    }
    if(this.background){
      this.background.width = this.stageWidth;
      this.background.height = this.stageHeight;
    }
  }

  setApplication(){
    this.app = new PIXI.Application({width: this.stageWidth, height: this.stageHeight});
    document.body.appendChild(this.app.view);

    this.background = new Background(this.stageWidth, this.stageHeight);
    this.background.create(this.app.stage);

    this.cat = new Cat(this.stageWidth, this.stageHeight, 100, this.stageHeight / 1.6);
    this.app.loader.add('cat', `./images/cats/black_gold_eyes.png`)
    .add('cloud1', './images/cloud/cloud1.png')
    .add('cloud2', './images/cloud/cloud2.png')
    .load(this.createElement.bind(this))
    .load(this.animate.bind(this));

  }
  createElement(){
    this.cat.create(this.app.stage);
    this.createCloud();
  }

  keydown(e){
    const keyInfo = this.keyInfo[e.code];
    if(keyInfo && !keyInfo.isDown){
      keyInfo.isDown = true;
      keyInfo.idle = setInterval(()=>{
        const isCenter = this.cat.checkCenter(this.background.x);
        this.cat.move(e.code, isCenter);
        this.background.move(e.code, isCenter);
      }, 10);
    }
  };
  keyup(e){
    const keyInfo = this.keyInfo[e.code];
    if(keyInfo && keyInfo.isDown){
      keyInfo.isDown = false;
      clearInterval(keyInfo.idle);
      this.cat.setMotion();
    }
  }

  animate(){
    requestAnimationFrame(this.animate.bind(this));
    this.cat.draw();

    for(let i = 0; i < this.texts.length; i++){
      this.texts[i].draw();
    }

    for(let i = 0; i < this.clouds.length; i++){
      this.clouds[i].draw();
    }
  }

  createCloud(){
    for(let i = 0; i < this.cloudCnt; i++){
      const cloud = new Cloud(this.stageWidth, this.stageHeight, 3, Math.floor(Math.random() * 2));
      cloud.create(this.app.stage);
      this.clouds.push(cloud);
    }
  }
}






window.onload = () => {
  new App();
}
