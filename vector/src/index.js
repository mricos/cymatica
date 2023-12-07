import * as PIXI from 'pixi.js';
import { Wave } from './Wave';
import VectorUI from './VectorUI';

function getURLParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        freq: parseFloat(params.get('freq')) || 1,
        amplitude: parseFloat(params.get('amplitude')) || 0,
        phase: parseFloat(params.get('phase')) || 0
    };
}

function setup() {
    let app = new PIXI.Application({ 
        width: window.innerWidth, 
        height: window.innerHeight, 
        backgroundColor: 0x1099bb 
    });
    document.body.appendChild(app.view);

    const params = getURLParams();
    let wave = new Wave(app, params);

    app.ticker.add((delta) => {
        wave.update(delta);
        wave.draw();
    });
}

setup();
