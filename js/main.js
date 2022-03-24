import { Cat } from './module/cat.js';

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

    this.resize();
    this.setApplication();
    window.addEventListener('keydown', this.keydown.bind(this));
    window.addEventListener('keyup', this.keyup.bind(this));
  }

  resize(){
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;

    if(this.app){
      this.app.width = this.canvasWidth;
      this.app.height = this.canvasHeight;
    }
    if(this.background){
      this.background.width = this.canvasWidth;
      this.background.height = this.canvasHeight;
    }
  }

  setApplication(){
    this.app = new PIXI.Application({width: this.canvasWidth, height: this.canvasHeight});
    document.body.appendChild(this.app.view);

    this.background = PIXI.Sprite.from('./images/noonbackground.png');
    this.background.width = this.canvasWidth;
    this.background.height = this.canvasHeight;
    this.app.stage.addChild(this.background);

    this.cat = new Cat(100, 450);
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
  }
}

window.onload = () => {
  new App();
}