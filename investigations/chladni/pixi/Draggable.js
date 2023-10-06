export default class Draggable {
    constructor(app, x = -1, y = -1) {
        this.app = app;
        this.x = x;
        this.y = y;
        this.d = 20;
        this.dragging = false;
        this.offsetX = 0;
        this.offsetY = 0;
        this.graphics = new PIXI.Graphics();
        this.graphics.interactive = true;
        this.draw();
        this.initInteraction();
    }

    draw() {
        this.graphics.clear();
        this.graphics.beginFill(0x808080);
        this.graphics.drawCircle(this.x, this.y, this.d / 2);
        this.graphics.alpha = 0.4;
        this.graphics.endFill();
        this.app.stage.addChild(this.graphics);
    }

    initInteraction() {
        this.graphics.on('pointerdown', this.pressed, this);
        this.graphics.on('pointerup', this.released, this);
        this.graphics.on('pointerupoutside', this.released, this);
        this.app.stage.on('mousemove', this.onMouseMove, this); // Changed this line
    }

    released(event) {
        this.dragging = false;
        window.removeEventListener('mousemove', this.onMouseMove.bind(this)); // Using bound method
        console.log('Released not dragging');
    }

    pressed(event) {
        this.dragging = true;
        let res = this.app.renderer.resolution;
        this.offsetX = event.clientX/res - this.x;
        this.offsetY = event.clientY/res - this.y;
        console.log(this.app.renderer.resolution, event.data.global.x, event.data.global.y);
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
    }

    onMouseMove(event) {
        if (this.dragging) {
            let res=this.app.renderer.resolution;
            this.x = event.clientX/res - this.offsetX;
            this.y = event.clientY/res - this.offsetY;
            this.draw();
            this.app.eventBus.publish('parametersChanged');
        }
    }


}