import { Cat } from './module/cat.js';

class App{
  constructor(){
    let app = new PIXI.Application({width: 1920, height: 1080});
    document.body.appendChild(app.view);

    let background = PIXI.Sprite.from('./images/noonbackground.png');
    app.stage.addChild(background);

    this.cat = new Cat(100, 100, app);
  }
}

window.onload = () => {
  new App();
}