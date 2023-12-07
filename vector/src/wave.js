import { VectorEntity } from './VectorEntity';

export class Wave extends VectorEntity {
    constructor(app, params) {
        super(app);
        this.freq = params.freq || 1;
        this.amplitude = params.amplitude || 0;
        this.phase = params.phase || 0;
    }

    update(delta) {
        this.phase += 360 * delta; 
        if (this.phase > 360) {
            this.phase -= 360;
        }
    }

    draw() {
        super.draw();
        // Drawing logic for the wave using 
        // this.freq, this.amplitude, and this.phase
        // Implement the drawing logic based on these properties
    }
}
