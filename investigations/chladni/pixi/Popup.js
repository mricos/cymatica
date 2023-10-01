
export default class Popup {

    constructor(app,x=10,y=10) {
        this.app = app;
        this.parametersText="";
    }

    init() {

        this.parametersText = new PIXI.Text('', {
            fontFamily: 'monospace',
            fontSize: 14,
            fill: 0xffffff
        });
        this.app.stage.addChild(this.parametersText);
        //this.displayParameters(this.app.chladni, -1, -1);
    }

    displayParameters()  {
        // Extract non-circular properties from chladni for display
        let chladni = this.app.chladni;
        const debugInfo = {
            N: chladni.N,
            V: chladni.V,
            F: chladni.F,
            PV: chladni.PV,
            d: chladni.d,
            T: chladni.T,
            TT: chladni.TT
        };
        let x=0;
        let y=0;
        // Update the PIXI Text object
        this.parametersText.text =
            `x: ${x}, y: ${y}\n${JSON.stringify(debugInfo, null, 2)}`;
    }
}
