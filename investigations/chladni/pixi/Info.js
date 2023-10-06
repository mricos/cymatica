class Info extends PIXI.Container {
    constructor(app) {
        super();
        this.app = app;

        this.visible = false;
        app.eventBus.subscribe('resize', this.resize.bind(this));
        app.stage.addChild(this);
        this.init();
    }

    init(string="") {
        this.removeChildren();
        this.text = new PIXI.Text(string,
        {
            fontFamily: 'courier',
            fontSize: 14,
            fill: 0xffffff
        });

        this.text.interactive = true;
        this.text.buttonMode = true;
        this.addChild(this.text);
        this.resize();
    }

    setContent(name='summary') {
        const id = `${name}_info`;
        const summaryDiv = document.getElementById(`${id}`);
        const popupDiv = document.getElementById('popup');

        if(summaryDiv && popupDiv) {
            popupDiv.innerHTML = summaryDiv.innerHTML;
        } else {
            console.error(`Element with id ${id} or 'popup' is not found`);
        }
    }


    update(event) {
        if (this.visible) {
            document.getElementById('popup').style.display = 'block';
        }
        else{
            document.getElementById('popup').style.display = 'none';
        }
    }

    resize() {
        this.x = this.app.renderer.width - this.width - 30;
        this.y = 0 + 30;
    }
}

export default Info;