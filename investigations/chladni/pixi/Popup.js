class Popup  {
    constructor(app) {
        this.app = app;
        this.variables = {};
        this.texts = [];
        this.container = new PIXI.Container();
        this.selectedText = null;
        this.init();
    }

    init() {
        // Attach the pointermove event directly to the app.stage
        window.addEventListener('pointermove', this.update.bind(this));
    }

    addVariable(key, obj, meta = { min: 0, max: 1, stride: 0.1 }) {
        const text = new PIXI.Text(`${key}: ${obj[key]}`, {
            fontFamily: 'Arial',
            fontSize: 16,
            fill: 0xffffff
        });

        text.x = 50;
        text.y = 50 + this.texts.length * 30;
        text.interactive = true;
        text.buttonMode = true;
        text.metadata = meta;

        text.on('pointerdown', () => this.selectVariable(text, key, obj));

        this.texts.push(text);
        this.container.addChild(text);
        this.variables[key] = obj;
    }

    selectVariable(text, key, obj) {
        if (this.selectedText) {
            this.selectedText.style.fill = 0xffffff;
        }
        this.selectedText = text;
        this.selectedText.style.fill = 0xff0000;
    }

    update(event) {
        console.log('Updating');

        if (this.selectedText && event.buttons === 1) {
            console.log(event);

            const key = this.selectedText.text.split(":")[0].trim();
            const obj = this.variables[key];
            const { min, max, stride } = this.selectedText.metadata;

            const scaledX = event.clientX / window.innerWidth;
            const scaledY = event.clientY / window.innerHeight;

            const baseValue = this.calculateBaseValue(scaledX, min, max, stride);
            const fineControl = this.calculateFineControl(scaledY, max - min);

            obj[key] = Math.min(max, Math.max(min, baseValue + fineControl));
            this.selectedText.text = `${key}: ${obj[key].toFixed(2)}`;
        }
    }


    calculateBaseValue(scaledX, min, max, stride) {
        const range = max - min;
        const value = scaledX * range + min;
        return Math.round(value / stride) * stride;
    }

    calculateFineControl(scaledY, range) {
        return (scaledY * range) - (range / 2);
    }
}

export default Popup;