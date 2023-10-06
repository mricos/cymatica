export default class Gradient {
    constructor (app) {
        this.app = app;
        this.redraw = true;
        this.showGradient = false;
        this.chladni = app.chladni;
        this.container = new PIXI.Container();
        this.gridSpacing = 10;
        this.gridSize = 10;

    }

    init(){
    }

    drawGradient() {
        for (let x = 0; x < app.view.width; x += gridSpacing) {
            for (let y = 0; y < app.view.height; y += gridSpacing) {
                let intensity = computeIntensityAt(x, y);
                let color = mapIntensityToColor(intensity);
                drawSquareAt(x, y, color);
            }
        }
    }

    computeIntensityAt(x, y) {
        let C = 0;
        for (let j = 0; j < chladni.nodes.length; j++) {
            let sx = chladni.nodes[j].x;
            let sy = chladni.nodes[j].y;
            let L = Math.sqrt((x - sx) * (x - sx) + (y - sy) * (y - sy));
            C += Math.sin(2 * Math.PI * chladni.F * (chladni.T
                - (L / chladni.V)) / 60);
        }
        return Math.abs(C);
    }

    mapIntensityToColor(intensity) {
        let colorValue = Math.min(1, intensity) * 255;
        return PIXI.utils.rgb2hex([colorValue, colorValue, colorValue]);
    }

    drawSquareAt(x, y, color) {
        let square = new PIXI.Graphics();
        square.beginFill(color);
        square.drawRect(x, y, gridSpacing, gridSpacing);
        square.endFill();
        this.container.addChild(square);
    }

    clear(){
        this.container.children.forEach((child) => {
            if (child instanceof PIXI.Graphics) {
                child.clear();
            }
        });

    }

    drawGradientField() {
        const { chladni, app, gridSize } = this;
        const { width, height } = app.renderer;

        const influences = [];
        let maxInfluence = -Infinity;
        let minInfluence = Infinity;

        // Calculate influences and find min/max
        for (let x = 0; x < width; x += gridSize) {
            for (let y = 0; y < height; y += gridSize) {
                let influence = chladni.nodes.reduce((sum, node) => {
                    const dx = x - node.x;
                    const dy = y - node.y;
                    const distance = Math.sqrt(dx*dx + dy*dy);
                    return sum + Math.sin(2 * Math.PI * chladni.F
                         * (chladni.T - (distance / chladni.V)) / 60);
                }, 0);

                influences.push({x, y, influence});

                maxInfluence = Math.max(maxInfluence, influence);
                minInfluence = Math.min(minInfluence, influence);
            }
        }

        const range = maxInfluence - minInfluence;
        const graphics = new PIXI.Graphics();
        this.container.addChild(graphics);

        // Draw the grid
        influences.forEach(({x, y, influence}) => {
            const norm = (influence - minInfluence) / range;

            graphics.beginFill(PIXI.utils.rgb2hex([norm, norm, norm]));
            graphics.drawRect(x, y, gridSize, gridSize);
            graphics.endFill();
        });
    }

    update(){
        if(this.showGradient){
            if(this.redraw){
                this.drawGradientField();
                this.redraw = false;
            }
        }else{
            this.clear();
        }
    }
}

