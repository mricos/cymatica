// Utility function to map a value from one range to another
function mapValue(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

export default class InputHandler {
    constructor(app) {
        this.app = app;
        this.parametersChanged = false;
    }

    cursorPositionCallback(event) {
        // Display the x and y values in the corner
        displayCoordinates(cursorX, cursorY);
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

    init(){
        let app = this.app;

        document.addEventListener('keydown', event => {
            if (event.key === 'g') {
                //app.gradient.showGradient = !app.gradient.showGradient;
                //app.eventBus.publish('parametersChanged', event.data);
                app.eventBus.publish('toggleGradient', event.data);
            }
            if (event.key === 'ArrowUp') {
                this.chladni.TT *= 1.1;

            }
            if (event.key === 'ArrowDown') {
                this.chladni.TT /= 1.1;
            }
            if (event.key === 'h') {
            }

        });


       // window.addEventListener('mousemove',this.handleMouseEvents.bind(this));
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
