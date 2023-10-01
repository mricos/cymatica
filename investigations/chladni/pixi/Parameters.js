// Utility function to map a value from one range to another
function mapValue(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

export default class Parameters {
    constructor(app, chladni, draggablePoints, grid) {
        this.parametersChanged = false;  // Add this flag
        this.debugText = new PIXI.Text('', {
            fontFamily: 'monospace',
            fontSize: 14,
            fill: 0xa0a0a0,
        });

        this.app = app;
        this.chladni=chladni;
        this.grid=grid;
        this.draggablePoints=draggablePoints;

        // this.N = N_;
        // this.p = [];
        // this.V = 0.5;
        // this.F = 0.15;
        // this.PV = -1.5;
        // this.d = 1;
        //this.T = 0;
        //this.TT = 1;
        this.nodes = draggablePoints.map(
                point => ({ x: point.x, y: point.y })
            );

        //this.particles = [];
    }

    cursorPositionCallback(event) {
        // Display the x and y values in the corner
        displayCoordinates(cursorX, cursorY);
    }

    displayParameters(x, y) {
        let chladni = this.chladni;
        // Extract non-circular properties from chladni for display
        const debugInfo = {
            N: chladni.N,
            V: chladni.V,
            F: chladni.F,
            PV: chladni.PV,
            d: chladni.d,
            T: chladni.T,
            TT: chladni.TT,
        };

        // Update the PIXI Text object
        debugText.text =d
            `x: ${x}, y: ${y}\n${JSON.stringify(debugInfo, null, 2)}`;
    }


    handleMouseEvents(event){
        let chladni=this.chladni;
        let app=this.app;
        //this.parametersChanged = false;  // Set the flag when parameters change

        if (event.shiftKey===true && event.ctrlKey===false) {
            chladni.V = mapValue(event.clientX, 0,
            app.view.width, .01, 1);
            chladni.PV = mapValue(event.clientY, 0,
            app.view.height, 0, 1.5);
            this.parametersChanged = true;  // Set the flag when parameters change

        }

    }

    setApp(app){
        this.app=app;
    }
    setGrid(grid){
        this.grid=grid;
    }
    setChladni(chladni){
        this.chladni=chladni;
    }
    init(){
        let app = this.app;
        this.app.stage.addChild(this.debugText);

        document.addEventListener('keydown', event => {
            if (event.key === 'g') {
                this.grid.showGradient = !this.grid.showGradient;
                this.parametersChanged = true;  // Set the flag when parameters change

            }
            if (event.key === 'ArrowUp') {
                this.chladni.TT *= 1.1;

            }
            if (event.key === 'ArrowDown') {
                this.chladni.TT /= 1.1;
            }
            if (event.key === 'g') {
            }

        });


        window.addEventListener('mousemove',this.handleMouseEvents.bind(this));
    }

        /*
        document.addEventListener('mousemove',
        function(event) {
            let chladni=this.chladni;
            let app=this.app;

            if (event.shiftKey===true && event.ctrlKey===false) {
                chladni.V = mapValue(event.clientX, 0,
                app.width, .01, 1);
                chladni.PV = mapValue(event.clientY, 0,
                app.height, 0, 1.5);
            }

            if (event.ctrlKey===true) {
                chladniInstance.F = mapValue(event.clientX, 0,
                    app.view.width, 0, .6);
                chladniInstance.TT = mapValue(event.clientY, 0,
                    app.view.height, .00001, 1);
            }

            if (event.buttons === 1 && event.shiftKey===true) {
                chladniInstance.d = mapValue(event.clientX, 0,
                    app.view.width, 0, 1);
                chladniInstance.s= mapValue(event.clientY, 0,
                    app.view.height, .0001, 1);
                chladniInstance.init();
            }
        });
         */
}
