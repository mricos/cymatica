export default class Crosshairs extends PIXI.Container {
    constructor(app) {
        super();
        this.app = app;
        this.crossX = 0;
        this.crossY = 0;
        this.visible = false;
        this.crosshairsContainer = this.makeCrosshairs();
        this.addChild(this.crosshairsContainer);
        this.init();
    }

    onResize() {
        // Calculate the new position
        const newX = this.app.renderer.width/2;
        const newY = this.app.renderer.height / 2;

        // Update the position of the crosshairs container
        this.crosshairsContainer.x = newX;
        this.crosshairsContainer.y = newY;
    }


    makeCrosshairs() {
        const container = new PIXI.Container();
        container.visible = true
        const crosshairGraphics = new PIXI.Graphics();
        crosshairGraphics.visible = true;
        const crosshairSize = 20; // Adjust as needed
        container.addChild(crosshairGraphics);

        crosshairGraphics.lineStyle(2, 0xFF0000, 1);

        // Horizontal line
        crosshairGraphics.moveTo(-crosshairSize, 0);
        crosshairGraphics.lineTo(crosshairSize, 0);

        // Vertical line
        crosshairGraphics.moveTo(0, -crosshairSize);
        crosshairGraphics.lineTo(0, crosshairSize);

        // Center the crosshairs within the container
        crosshairGraphics.x = 0;
        crosshairGraphics.y = 0;

        // Adjust this to center the crosshairs within the container
        crosshairGraphics.pivot.set(0, 0);

        this.addChild(container);

        // Set these to position the center of the crosshairs on the screen
        container.x = 50;
        container.y = 50;

        return container;
    }


    centerGraphic(graphic) {
        graphic.x  = this.app.renderer.width/2;
        graphic.y = this.app.renderer.height/2;
    }

    init() {
        const circle = new PIXI.Graphics();

        // Draw a circle
        circle.beginFill(0xff9900);
        circle.drawCircle(0, 0, 10);
        circle.endFill();
        circle.pivot.x = 0;
        circle.pivot.y = 0;
        // Add the circle to the stage
        this.addChild(circle);
        this.centerGraphic(circle);
    }




}

