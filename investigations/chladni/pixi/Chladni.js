class Chladni {
    constructor(app, N_, draggablePoints) {
        this.app = app;
        this.N = N_;
        this.p = [];
        this.V = 0.5;
        this.F = 0.15;
        this.PV = -1.5;
        this.d = 1;
        this.nodes = draggablePoints.map(
                point => ({ x: point.x, y: point.y })
            );
        this.T = 0;
        this.TT = 1;
        this.particles = [];
    }

    init() {
        let app = this.app;
        for (let i = 0; i < this.N; i++) {
            const particle = new PIXI.Graphics();
            particle.beginFill(0xFFFFFF);
            particle.drawCircle(0, 0, 3);
            particle.endFill();
            app.stage.addChild(particle);
            this.particles.push(particle);
            this.p[i] = { x: Math.random() * app.view.width,
                y: Math.random() * app.view.height };
        }
    }
    run() {

        for (let i = 0; i < this.N; i++) {
            this.R = 0;
            this.D = 0;
            this.C = 0;
            for (let j = 0; j < this.nodes.length; j++) {
                let sx = this.nodes[j].x;
                let sy = this.nodes[j].y;

                // Calculation for C ""
                // L is distance from particle to point attractor
                this.L = Math.sqrt((this.p[i].x - sx) * (this.p[i].x - sx)
                    + (this.p[i].y - sy) * (this.p[i].y - sy));
                //
                this.C += Math.sin(2 * Math.PI * this.F
                    * (this.T - (this.L / this.V)) / 60);

                // Calculation for R
                this.L = Math.sqrt((this.p[i].x + this.d - sx) *
                    (this.p[i].x + this.d - sx) + (this.p[i].y - sy) *
                    (this.p[i].y - sy));
                this.R += Math.sin(2 * Math.PI * this.F *
                    (this.T - (this.L / this.V)) / 60);

                // Calculation for D
                this.L = Math.sqrt((this.p[i].x - sx) *
                    (this.p[i].x - sx) + (this.p[i].y + this.d - sy) *
                    (this.p[i].y + this.d - sy));
                this.D += Math.sin(2 * Math.PI * this.F *
                    (this.T - (this.L / this.V)) / 60);
         }
            this.updateParticlePosition(i);
            this.draw(i);
        }
        this.T += this.TT;
    }

    updateParticlePosition(i) {
        this.L = Math.sqrt(((this.R - this.C) ** 2) + ((this.D - this.C) ** 2));
        let VX = this.PV * (this.R - this.C) / this.L;
        let VY = this.PV * (this.D - this.C) / this.L;
        this.p[i].x += VX;
        this.p[i].y += VY;

        // Check if particle is out of bounds and reset its position if necessary
        if (this.p[i].x < 0 || this.p[i].x > this.app.view.width ||
            this.p[i].y < 0 || this.p[i].y > this.app.view.height || this.C < 0.0025) {
                this.p[i].x = Math.random() * this.app.view.width;
                this.p[i].y = Math.random() * this.app.view.height;
        }
    }

    draw(i) {
        const particle = this.particles[i];
        particle.x = this.p[i].x;
        particle.y = this.p[i].y;
        particle.tint = PIXI.utils.rgb2hex([1 - this.C, 1 - this.C, 1 - this.C]);
    }
}


// Exporting the Chladni class to be used in main.js
export default Chladni;
