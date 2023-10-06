export default class Stats extends PIXI.Container {
    constructor(app) {
        super();
        this.app = app;
        this.fpsText = new PIXI.Text('FPS: 0',
            {
                fontFamily: 'courier',
            fontSize: 14,
            fill: 0xffffff});
        this.fpsText.visible=true;
        this.addChild(this.fpsText);
        this.lastTime = 0;
        this.frameCount = 0;
        this.visible = false;
    }

    setMouse(event){
        this.app.stats.mouseX=event.clientX;
        this.app.stats.mouseY=event.clientY;
    }
    update(currentTime) {
        let app=this.app;
        this.frameCount++;
        let res=this.app.renderer.resolution;
        this.fpsText.text = `FPS: ${this.totalFrames}\n`;

        const delta = currentTime - this.lastTime;
        if (delta >= 1000) { // Update every second
            this.fpsText.text = `FPS: ${this.frameCount}\n`;
            this.totalFrames = this.frameCount;
            this.frameCount = 0;
            this.lastTime = currentTime;
        }
        this.fpsText.text += `Render.resolution: ${
            this.app.renderer.resolution.toFixed(2)}\n`;
        this.fpsText.text += `Render W/H: ${this.app.renderer.width}`;
        this.fpsText.text += `/${this.app.renderer.height}\n`;

        this.fpsText.text += `Scaled W/H: ${
            (app.renderer.width/res).toFixed(2)}`;
        this.fpsText.text += `/${
            (app.renderer.height/res).toFixed(2)}\n`;

        this.fpsText.text += `Stats x/y: ${
                this.x.toFixed(2)}`;
        this.fpsText.text += `/${this.y.toFixed(2)}\n`;
        this.fpsText.text += `Stats W/H: ${
                this.width.toFixed(2)}`;
        this.fpsText.text += `/${this.height.toFixed(2)}\n`;


        const bounds = this.getBounds();
        const widthInPixels = bounds.width;
        const heightInPixels = bounds.height;
        this.fpsText.text += `Stats bounds: ${widthInPixels.toFixed(2)}x${heightInPixels.toFixed(2)}\n`;
        this.fpsText.text += `screen: ${app.renderer.screen.width.toFixed(2)}x${app.renderer.screen.height.toFixed(2)}\n`;
        this.fpsText.text += `view: ${app.view.width.toFixed(2)}x${app.view.height.toFixed(2)}\n`;
        this.fpsText.text += `mouse: ${this.mouseX}x${this.mouseY}\n`;

        this.x = app.renderer.screen.width - this.width -10;
        this.y = app.renderer.screen.height - this.height;

    }
}