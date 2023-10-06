export default class Variables extends PIXI.Container {
    constructor(app) {
        super();
        this.app = app;
        this.variables = {};
        this.texts = [];
        this.visible = false;
        this.selectedText = null;
        this.init();
    }

    onResize() {
    }


    init() {
        this.x=50;
        this.y=50;
    }


    addVariable(key, obj, meta = { min: 0, max: 1, stride: 0.1 }) {
        const text = new PIXI.Text(`${key}: ${obj[key]}`, {
            fontFamily: 'Courier',
            fontSize: 16,
            fill: 0xffffff
        });

        text.x =0;
        text.y = this.texts.length * 30;
        text.interactive = true;
        text.buttonMode = true;
        text.metadata = meta;

        text.on('pointerdown', () =>{
            this.selectVariable(text, key, obj) // visual only
            this.app.eventBus.publish('variableSelected', { variable: key });
        });

        this.texts.push(text);
        this.addChild(text);
        this.variables[key] = obj;
    }

    selectVariable(text, key, obj) {
        if (this.selectedText) {
            this.selectedText.style.fill = 0xffffff;
        }
        this.selectedText = text;
        this.selectedText.style.fill = 0xff0000;
    }

    unselectAll() {
        this.texts.forEach(text => {
            text.style.fill = 0xffffff;
        });
        this.selectedText = null;
        this.app.eventBus.publish('variableDeselected');
    }

    // This should go in a mapper/crosshairs class
    mouseToVariable(event) {
        if (this.selectedText && event.buttons === 1) {
            console.log(event);

            const key = this.selectedText.text.split(":")[0].trim();
            const obj = this.variables[key];
            const { min, max } = this.selectedText.metadata;

            const scaledX = event.clientX / window.innerWidth;
            obj[key] = scaledX * (max - min) + min;

            this.selectedText.text = `${key}: ${obj[key].toFixed(2)}`;
            this.app.eventBus.publish('parametersChanged', event);
        }
    }

}

