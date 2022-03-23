class App{
  constructor(){
    let app = new PIXI.Application({width: 640, height: 320});
    console.log(app);
  }
}

window.onload = () => {
  new App();
}