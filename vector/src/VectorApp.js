import * as PIXI from 'pixi.js';
import VectorScene from './VectorScene';
import VectorUI from './VectorUI';

export default class VectorArt {
    constructor() {
        this.app = new PIXI.Application({ /*...*/ });
        this.scene = new VectorScene(this.app);
        this.ui = new VectorUI(this.app, this.scene);
    }

    start() {
        document.body.appendChild(this.app.view);
        this.app.ticker.add(delta => this.update(delta));
    }

    update(delta) {
        this.scene.update(delta);
    }
}
