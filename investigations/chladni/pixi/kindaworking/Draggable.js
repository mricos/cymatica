class Draggable {
    constructor(app,x=-1,y=-1) {
        this.app = app;
        if(x==-1){
            this.x = Math.random() * app.view.width/5 + app.view.width/2;
        } else {
            this.x=x;
        }
        if(y==-1){
            this.y = Math.random() * app.view.height/5 + app.view.height/2;
        } else {
            this.y=y;
        }
        this.d = 20;
        this.bs = 10;
        this.boundUpdate = (event) => this.update(event);
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
            .on('pointermove', this.boundUpdate);  // Changed this line
        this.app.stage.addChild(this.graphics);
        this.draw();
    }

    draw() {
        this.graphics.clear();
        this.graphics.beginFill(0xFFFFFF);
        this.graphics.drawCircle(this.x, this.y, this.d / 2);
        this.graphics.endFill();
            // Check if app.params is defined before accessing its properties
            if (this.app.params) {
                this.app.params.parametersChanged = true;  // Set the flag when parameters change
            }

    }

    pressed(event) {
        const distance = Math.sqrt((event.data.global.x - this.x) ** 2 +
            (event.data.global.y - this.y) ** 2);
        if (distance < this.d / 2) {
            this.dragging = true;
            this.offsetX = this.x - event.data.global.x;
            this.offsetY = this.y - event.data.global.y;
        }

        if (this.dragging) {
            // Attach the 'pointermove' event to the app.view when dragging starts
            //this.app.view.addEventListener('pointermove', this.boundUpdate);
            this.app.stage.on('pointermove', this.boundUpdate);
        }
    }

    released() {
        this.dragging = false;
        console.log(this.x, this.y);

        // Remove the 'pointermove' event from the window when dragging stops
        //this.app.view.removeEventListener('pointermove', this.boundUpdate);
        this.app.stage.off('pointermove', this.boundUpdate);
    }

    update(event) {
        if (this.dragging) {
            const eventData = event.data ? event.data.global : event;
            this.x = eventData.x + this.offsetX;
            this.y = eventData.y + this.offsetY;
            this.draw();
            this.parametersChanged = true;  // Set the flag when parameters change

        }
    }
}

export default Draggable;