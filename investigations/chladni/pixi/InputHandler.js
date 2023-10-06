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


    handleClick(event) {
        const x = event.clientX;
        const y = event.clientY;
        const width = window.innerWidth;
        const height = window.innerHeight;

        const hotCornerSize = this.app.vars.y; // top bar height
        this.app.eventBus.publish('click', event);


        if (x < hotCornerSize) {
            if (y < 50) {
                this.app.eventBus.publish('hotCornerUpperLeft');
                console.log('Upper left', x, y);
            } else if (y > height - hotCornerSize) {
                this.app.eventBus.publish('hotCornerLowerLeft');
            }
        } else if (x > width - hotCornerSize) {
            if (y < 50) {
                this.app.eventBus.publish('hotCornerUpperRight');
            } else if (y > height - hotCornerSize) {
                this.app.eventBus.publish('hotCornerLowerRight');
            }
        }
    }

    init(){
        let app = this.app;

        window.addEventListener('resize', (event) => {
            event.newWidth = window.innerWidth;
            event.newHeight = window.innerHeight;
            this.app.eventBus.publish('resize', event);
        });

        document.addEventListener('keydown', event => {
            if (event.repeat) return; // Ignore holding down key
            app.eventBus.publish('keypress',
                { key: event.key, event: event });
        });

        window.addEventListener('click', (event) => {
            this.handleClick(event);
        });

        window.addEventListener('mousemove', (event) => {
            app.eventBus.publish('mousemove', {event: event });
        });
    }

}
