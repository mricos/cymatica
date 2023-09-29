export default class Grid {
    constructor (app) {
        this.app = app;
        this.showGradient = false;
        this.chladni = app.chladni;
        this.gridSpacing = 10; // Adjust as needed for performance vs. resolution
        this.gridSize = 10; // or any other value you prefe

    }

    init(){
       // this.app.bgContainer.addChild(this.backgroundGraphics);
    }

    drawBackground() {
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
        backgroundContainer.addChild(square);
    }

    clear(){
        this.app.gradientContainer.children.forEach((child) => {
            if (child instanceof PIXI.Graphics) {
                child.clear();
            }
        });

    }

    drawGradientField() {
        let chladni = this.chladni;
        let app = this.app;
        let gridSize = this.gridSize;

        const width = app.renderer.width;
        const height = app.renderer.height;


        let maxInfluence = -Infinity;
        let minInfluence = Infinity;

        // First pass to get min and max influence
        for (let x = 0; x < width; x += gridSize) {
            for (let y = 0; y < height; y += gridSize) {
                let influence = 0;
                for (let node of chladni.nodes) {
                    let distance = Math.sqrt((x - node.x)
                                    ** 2 + (y - node.y) ** 2);
                    influence += Math.sin(2 * Math.PI * chladni.F
                        * (chladni.T - (distance / chladni.V)) / 60);
                }
                maxInfluence = Math.max(maxInfluence, influence);
                minInfluence = Math.min(minInfluence, influence);
            }
        }

        // Second pass to draw the gradient
        for (let x = 0; x < width; x += gridSize) {
            for (let y = 0; y < height; y += gridSize) {
                let influence = 0;
                for (let node of chladni.nodes) {
                    let distance = Math.sqrt((x - node.x)
                                    ** 2 + (y - node.y) ** 2);
                    influence += Math.sin(2 * Math.PI * chladni.F
                                * (chladni.T -
                                    (distance / chladni.V)) / 60);
                }

                const pixiGraphics = new PIXI.Graphics();

                let norm =
                    (influence - minInfluence) / (maxInfluence - minInfluence);

                pixiGraphics.beginFill(
                PIXI.utils.rgb2hex([norm,norm,norm]));
                pixiGraphics.drawRect(x, y, gridSize, gridSize);
                pixiGraphics.endFill();
                app.gradientContainer.addChild(pixiGraphics);
            }
        }
    }


}

