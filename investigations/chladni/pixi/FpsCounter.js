export default class FpsCounter {
    constructor(app) {
        this.app = app;
        //this.fpsText = new PIXI.Text('FPS: 0', {fontFamily: 'Arial', fontSize: 24, fill: 0xffffff});
        //this.fpsText.x = 10; // Set the x position
        //this.fpsText.y = 10; // Set the y position
        //app.stage.addChild(this.fpsText);
        this.lastTime = 0;
        this.frameCount = 0;
    }

    update(currentTime) {
        this.frameCount++;
        const delta = currentTime - this.lastTime;

        if (delta >= 1000) { // Update every second
            //this.fpsText.text = `FPS: ${this.frameCount}`;
            this.app.params.fps=`${this.frameCount}`;
            this.frameCount = 0;
            this.lastTime = currentTime;
        }
    }
}
