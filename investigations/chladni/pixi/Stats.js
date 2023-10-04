export default class Stats extends PIXI.Container {
    constructor(app) {
        super();
        this.app = app;
        this.fpsText = new PIXI.Text('FPS: 0',
            {
                fontFamily: 'courier',
            fontSize: 18,
            fill: 0xffffff});
        this.fpsText.visible=false;
        this.addChild(this.fpsText);
        this.lastTime = 0;
        this.frameCount = 0;
    }

    update(currentTime) {
        this.frameCount++;
        const delta = currentTime - this.lastTime;

        if (delta >= 1000) { // Update every second
            this.fpsText.visible=true;

            this.fpsText.x = this.app.renderer.width  -
                this.fpsText.width - 20; // Set the x position
            this.fpsText.y = this.app.renderer.height -
                this.fpsText.height -  10; // Set the y position

            this.fpsText.text = `FPS: ${this.frameCount}`;
            this.frameCount = 0;
            this.lastTime = currentTime;
        }
    }
}
