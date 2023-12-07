import * as PIXI from 'pixi.js';
export class VectorEntity {
    constructor(app) {
        this.app = app;
        this.graphics = new PIXI.Graphics();
        app.stage.addChild(this.graphics);
    }

    update(delta) {
        // Update logic for the entity
    }

    draw() {
        // Drawing logic for the entity
    }

    // ... other common methods ...
}

