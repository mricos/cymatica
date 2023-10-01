import Parameters from './Parameters.js';
import Grid from './Grid.js';
import Chladni from './Chladni.js';
import Draggable from './Draggable.js';
import Popup from './Popup.js';
import FPSCounter from './FpsCounter.js';

// Creating the PIXI Application
const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x000000,
    interactive: true,  // Ensure this is set to true
    resolution: window.devicePixelRatio || 1,
});

window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});

// Creating an instance of the Chladni class
app.chladni = new Chladni(app, 1000, [{ x: 250, y: 250 }]);

// Initialize app.bgContainer before creating the Grid instance
app.gradientContainer  = new PIXI.Container();
app.chlandiContainer = new PIXI.Container();

app.stage.addChild(app.gradientContainer);
app.stage.addChild(app.chlandiContainer);
//app.chlandiContainer.sortableChildren = true; // render in order added
const grid = new Grid(app);



const draggablePoints = [
    new Draggable(app, 250, 250),
    new Draggable(app, 200, 200),
    new Draggable(app, 300, 250),
    // ... (rest of your existing code)
];
app.params = new Parameters(app, app.chladni, draggablePoints, grid);
let params=app.params;
app.params.init();
grid.init();
app.chladni.init();
const fpsCounter = new FPSCounter(app); // Create an FPS counter




app.ticker.add(() => {
    let params = app.params;
    fpsCounter.update(app.ticker.lastTime); // Update the FPS counter
    //popup.displayParameters();

        // Check if parameters have changed and the gradient is visible
    if (params.parametersChanged && grid.showGradient) {
            grid.clear();  // Clear the previous gradient
            grid.drawGradientField();  // Redraw the gradient with updated parameters
            params.parametersChanged = false;  // Reset the flag
        }

    if (params.parametersChanged && grid.showGradient && !grid.isDrawn) {
        grid.drawGradientField();
        grid.isDrawn = true;  // Set a flag to indicate the grid is drawn
    } else if (!grid.showGradient) {
        grid.clear();
        grid.isDrawn = false;  // Reset the flag when the grid is cleared
    }

    for (let i = 0; i < draggablePoints.length; i++) {
        app.chladni.nodes[i] = { x: draggablePoints[i].x, y: draggablePoints[i].y };
    }
    app.chladni.run();
});
document.body.appendChild(app.view);

app.stage.sortableChildren = true;

// Example usage
const popup = new Popup(app);
popup.addVariable("N", app.chladni);
popup.addVariable("V", app.chladni, {min:0, max:2, stride:0.01});
app.stage.interactive = true;
//app.stage.on('pointermove', (event) => {
//    console.log(event.data.global.x, event.data.global.y);
//});