export class Text{
  // title, subtitle, bubble
  constructor(content, type, fadeTime, showTime, app){
    this.content = content;
    this.type = type;
    this.opacity = 0;
    this.fadeTime = fadeTime;
    this.showTime = showTime;
    this.app = app;
    this.hasShow = false;
    this.isFinish = false;
    this.fadeSpeed = fadeTime / 1000 / 60;
  }

  createText(stageWidth, stageHeight){
    this.text = new PIXI.Text(this.content);
    this.style = new PIXI.TextStyle();
    let posX = 0, posY = 0;

    if(this.type === 'title'){
      this.style.fontFamily = 'Indie Flower';
      this.style.fontSize = 50;
      this.style.fill = 'black';
      this.style.align = 'left'
      this.style.padding = 20;
    }else if(this.type === 'subtitle'){
      this.style.fontFamily = 'Indie Flower';
      this.style.fontSize = 30;
      this.style.fill = 'black';
      this.style.align = 'center'
      this.style.padding = 20;
    }else if(this.type === 'buble'){
      this.style.fontFamily = 'Indie Flower';
      this.style.fontSize = 10;
      this.style.fill = 'black';
      this.style.align = 'center'
    }
    this.text.style = this.style;

    posX = (stageWidth - this.text.width) / 2;
    posY = stageHeight / 5;
    this.text.alpha = this.opacity;
    this.text.position.set(posX, posY);
    this.app.stage.addChild(this.text);
  }

  draw(){
    if(!this.hasShow){
      if(this.opacity >= 1){
        this.opacity = 1;
        setTimeout(()=>{
          this.hasShow = true;
        }, this.showTime);
      }else{
        this.opacity += this.fadeSpeed;
      }
    } else {
      if(this.opacity > 0){
        this.opacity -= this.fadeSpeed;
      } else {
        this.opacity = 0;
        this.isFinish = true;
      }
    }
    this.text.alpha = this.opacity;
  }

}
