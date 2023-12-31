class Chladni {
    constructor( app, N_ ) {
        this.app = app;
        this.N = N_ || 1000;
        this.p = [];
        this.V = 0.5;
        this.F = 0.15;
        this.PV = -1.5;
        this.d = 1;
        this.nodes = [];
        this.T = 0;
        this.TT = 1;
        this.particles = [];
        this.container = new PIXI.Container();
        this.init();
    }

    init(n=1000) {
        let app = this.app;
        this.nodes-[{x: app.view.width, y: app.view.height}]
        for (let i = 0; i < this.N; i++) {
            const particle = new PIXI.Graphics();
            particle.beginFill(0xFFFFFF);
            particle.drawCircle(0, 0, 2);
            particle.endFill();
            this.container.addChild(particle);
            this.particles.push(particle);
            this.p[i] = {   x: Math.random() * app.view.width,
                            y: Math.random() * app.view.height };
        }

    }

    updateNodes(nodes) {
        this.nodes = nodes.map(point => ({ x: point.x, y: point.y }));
    }

    update() {
        if (!this.nodes ||  !this.nodes[0]) return;

        for (let i = 0; i < this.N; i++) {
            let R = 0, D = 0, C = 0;
            for (let j = 0; j < this.nodes.length; j++) {
                let sx = this.nodes[j].x;
                let sy = this.nodes[j].y;

                let L = Math.sqrt((this.p[i].x - sx) ** 2 +
                    (this.p[i].y - sy) ** 2);

                C += Math.sin(2 * Math.PI * this.F *
                    (this.T - (L / this.V)) / 60);

                L = Math.sqrt((this.p[i].x + this.d - sx) ** 2 +
                    (this.p[i].y - sy) ** 2);
                R += Math.sin(2 * Math.PI * this.F *
                    (this.T - (L / this.V)) / 60);

                L = Math.sqrt((this.p[i].x - sx) ** 2 +
                    (this.p[i].y + this.d - sy) ** 2);
                D += Math.sin(2 * Math.PI * this.F *
                    (this.T - (L / this.V)) / 60);
            }

            R = Math.abs(R);
            D = Math.abs(D);
            C = Math.abs(C);

            this.updateParticlePosition(i, R, D, C);
            this.draw(i, C);
        }

        this.T += this.TT;
    }

    updateParticlePosition(i, R, D, C) {
        let L = Math.sqrt((R - C) ** 2 + (D - C) ** 2);
        if (L !== 0) {
            let VX = this.PV * (R - C) / L;
            let VY = this.PV * (D - C) / L;
            this.p[i].x += VX;
            this.p[i].y += VY;
        }

        if (this.p[i].x < 0 || this.p[i].x > this.app.view.width ||
            this.p[i].y < 0 || this.p[i].y > this.app.view.height || C < 0.0025) {
            this.p[i].x = Math.random() * this.app.view.width;
            this.p[i].y = Math.random() * this.app.view.height;
        }
    }

    draw(i, C) {
        const particle = this.particles[i];
        particle.x = this.p[i].x;
        particle.y = this.p[i].y;
        particle.tint = PIXI.utils.rgb2hex([1 - C, 1 - C, 1 - C]);
    }
}

export default Chladni;