class Draggable {
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
        this.init();
    }

    init() {
        this.graphics.on('pointerdown', this.pressed.bind(this))
        this.graphics.on('pointerup', this.released.bind(this))
        this.app.stage.addChild(this.graphics);

        this.draw();
    }

    draw() {
        this.graphics.clear();
        this.graphics.beginFill(0x808080);
        this.graphics.drawCircle(this.x, this.y, this.d / 2);
        this.graphics.alpha = 0.4;
        this.graphics.endFill();
    }

    pressed(event) {
        this.dragging = true;
        this.offsetX = this.x - event.data.global.x;
        this.offsetY = this.y - event.data.global.y;
        window.addEventListener('mousemove', this.update.bind(this));
        console.log('Pressed and dragging')
    }

    released() {
        this.dragging = false;
        window.removeEventListener('mousemove', this.update.bind(this));
        console.log('released not dragging')

    }

    update(event) {
        if (this.dragging) {
            // Get the mouse coordinates directly from the event object
            this.x = event.clientX + this.offsetX;
            this.y = event.clientY + this.offsetY;
            this.draw();
            this.app.eventBus.publish('parametersChanged');
        }
    }
}

export default Draggable;
