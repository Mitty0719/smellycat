import { Cat } from './module/cat.js';
import { Text } from './module/text.js';

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

    this.resize();
    this.setApplication();
    window.addEventListener('keydown', this.keydown.bind(this));
    window.addEventListener('keyup', this.keyup.bind(this));

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

    this.background = PIXI.Sprite.from('./images/noonbackground.png');
    this.background.width = this.stageWidth;
    this.background.height = this.stageHeight;
    this.app.stage.addChild(this.background);

    this.cat = new Cat(100, this.stageHeight / 1.6);
    this.app.loader.add('spritesheet', `./images/cats/black_gold_eyes.png`)
    .load(this.cat.create.bind(this.cat, this.app.stage))
    .load(this.animate.bind(this));
  }

  keydown(e){
    const keyInfo = this.keyInfo[e.code];
    if(keyInfo && !keyInfo.isDown){
      keyInfo.isDown = true;
      keyInfo.idle = setInterval(()=>{
        this.cat.move(e.code);
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
  }
}

window.onload = () => {
  new App();
}
