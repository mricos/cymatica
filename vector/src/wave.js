import * as PIXI from 'pixi.js';

export function createWave(app, { freq, amplitude, phase }) {
    const height = app.screen.height;
    const width = app.screen.width;
    const radius = height / 4; // Half of total height

    let graphics = new PIXI.Graphics();
    graphics.lineStyle(2, 0xFFFFFF, 1);

    // Draw wavy shape
    for (let angle = 0; angle <= 360; angle++) {
        const rad = (angle + phase) * (Math.PI / 180);
        const sinWave = Math.sin(rad * freq) * amplitude * radius;
        const x = width / 2 + (radius + sinWave) * Math.cos(rad);
        const y = height / 2 + (radius + sinWave) * Math.sin(rad);

        if (angle === 0) {
            graphics.moveTo(x, y);
        } else {
            graphics.lineTo(x, y);
        }
    }

    graphics.closePath();
    app.stage.addChild(graphics);
}
