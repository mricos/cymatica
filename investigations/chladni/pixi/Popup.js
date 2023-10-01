class Popup {
    constructor(app) {
        this.app = app;
        this.variables = {};
        this.texts = [];
        this.container = new PIXI.Container();
        this.app.stage.addChild(this.container);
        this.boundUpdate = this.update.bind(this);
        this.selectedText = null;
        this.init();
    }

    init() {
        //this.app.stage.on('pointerdown', this.boundUpdate);
        this.app.stage.on('pointermove', this.boundUpdate);
    }


    addVariable(key, obj, meta={min:0,max:1,stride:0.1}) {
        const text = new PIXI.Text(`${key}: ${obj[key]}`, {
            fontFamily: 'Arial',
            fontSize: 16,
            fill: 0xffffff});

        text.x = 50;
        text.y = 50;
        text.interactive = true;
        text.buttonMode = true;

        // Adding metadata to the text object
        text.metadata = meta;

        text.y += this.texts.length * 30;

        text.on('pointerdown', (event) => {
            this.pressed(event, key, text, obj);
        });

        this.texts.push(text);
        this.container.addChild(text);
        this.variables[key] = obj;
    }

    pressed(event, key, text, reference) {
        if (this.dragging &&  this.selectedText) {
            this.selectedText.style.fill = 0xffffff; // Reset color of previously selected text
        }
        this.selectedText = text;
        this.selectedText.style.fill = 0xff0000; // Change color of selected text
        this.dragging = true;

        console.log("pressed");
        this.app.stage.on('pointerup', this.released.bind(this));
        this.app.stage.on('pointerupoutside', this.released.bind(this));
    }

    released() {
        console.log("released");
        //this.dragging = false;
        //this.selectedText.style.fill = 0xffffff; // Reset color when released
        //this.app.stage.off('pointerup', this.released.bind(this));
        //this.app.stage.off('pointerupoutside', this.released.bind(this));
    }

    update(event) {
        console.log("update");

        if (this.dragging && this.selectedText) {
            const key = this.selectedText.text.split(":")[0].trim();
            const obj = this.variables[key];
            console.log(key);

            const scaledX = event.data.global.x / this.app.screen.width;
            const scaledY = event.data.global.y / this.app.screen.height;

            const { min, max, stride } = this.selectedText.metadata;

            const newValue = this.calculateNewValue(scaledX, scaledY, min, max, stride);

            obj[key] = newValue;
            this.selectedText.text = `${key}: ${newValue}`;
        }
    }

    boundUpdate(event) {
        console.log(this);  // Add this line
        console.log(event);  // Add this line
        this.update(event);
    }

    update(event) {
        console.log(event);

        if (this.dragging && this.selectedText) {
            const key = this.selectedText.text.split(":")[0].trim();
            const obj = this.variables[key];
            console.log(key);

            // Get the scaled x and y values
            const scaledX = event.data.global.x / this.app.screen.width;
            const scaledY = event.data.global.y / this.app.screen.height;

            // Accessing metadata from the text object
            const { min, max, stride } = this.selectedText.metadata;

            // Calculate the new value considering min, max, and stride
            const newValue = this.calculateNewValue(scaledX, scaledY, min, max, stride);

            obj[key] = newValue;
            this.selectedText.text = `${key}: ${newValue}`;
        }
    }



    updateOrig(event) {
        if (this.dragging && this.selectedText) {
            const key = this.selectedText.text.split(":")[0].trim();
            const obj = this.variables[key];
            console.log(key);
            // Update the value based on the mouse movement or any other criteria
            obj[key] = this.calculateNewValue(event.data.global.x, event.data.global.y);
            // You need to define calculateNewValue function
            this.selectedText.text = `${key}: ${obj[key]}`;
        }
    }

    calculateNewValue(scaledX, scaledY, min, max, stride) {
        console.log(scaledX, scaledY, min, max, stride);
        const range = max - min;
        //const value = (scaledX + scaledY) / 2 * range + min;
        const value = scaledX * range + min;

        // Considering stride
        const adjustedValue = Math.round(value / stride) * stride;

        // Ensure the value is within the min-max range
        return Math.min(max, Math.max(min, adjustedValue));
    }

}

export default Popup;