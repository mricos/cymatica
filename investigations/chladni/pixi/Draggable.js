class Draggable {
    constructor(app) {
        this.app = app;
        this.x = Math.random() * app.view.width/5 + app.view.width/2;
        this.y = Math.random() * app.view.height/5 + app.view.height/2;
        this.d = 20;
        this.bs = 10;
        this.dragging = false;
        this.rollover = false;
        this.offsetX = 0;
        this.offsetY = 0;
        this.graphics = new PIXI.Graphics();
        this.show();
    }

    show() {
        this.graphics.interactive = true;
        this.graphics.buttonMode = true;
        this.graphics.on('pointerdown', this.pressed.bind(this))
            .on('pointerup', this.released.bind(this))
            .on('pointerupoutside', this.released.bind(this))
            .on('pointermove', this.update.bind(this));
        this.app.stage.addChild(this.graphics);
        this.draw();
    }

    draw() {
        this.graphics.clear();
        this.graphics.beginFill(0xFFFFFF);
        this.graphics.drawCircle(this.x, this.y, this.d / 2);
        this.graphics.endFill();
    }

    pressed(event) {
        const distance = Math.sqrt((event.data.global.x - this.x) ** 2 +
            (event.data.global.y - this.y) ** 2);
        if (distance < this.d / 2) {
            this.dragging = true;
            this.offsetX = this.x - event.data.global.x;
            this.offsetY = this.y - event.data.global.y;
        }
    }

    released() {
        this.dragging = false;
        console.log(this.x, this.y);
    }

    update(event) {
        if (this.dragging) {
            this.x = event.data.global.x + this.offsetX;
            this.y = event.data.global.y + this.offsetY;
            this.draw();
        }
    }
}

export default Draggable;