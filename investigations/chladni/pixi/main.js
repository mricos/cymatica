import Parameters from './Parameters.js';
import Chladni from './Chladni.js.crap/index.js';
import Grid from './Grid.js';
import Draggable from './Draggable.js';

// Creating the PIXI Application
const app = new PIXI.Application({
    width: 700,
    height: 800,
    backgroundColor: 0x000000,
    resolution: window.devicePixelRatio || 1,
});

window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});

// Creating an instance of the Chladni class
app.chladni = new Chladni(app, 10000, [{ x: 250, y: 250 }]);

// Initialize app.bgContainer before creating the Grid instance
app.gradientContainer  = new PIXI.Container();
app.chlandiContainer = new PIXI.Container();

app.stage.addChild(app.gradientContainer);
app.stage.addChild(app.chlandiContainer);
//app.bgContainer.sortableChildren = true; // render in order added
const grid = new Grid(app);


const draggablePoints = [];


draggablePoints.push(new Draggable(app, 50, 50));
draggablePoints.push(new Draggable(app, 50, 650));
draggablePoints.push(new Draggable(app, 650, 50));
draggablePoints.push(new Draggable(app, 650, 650));

const params = new Parameters(app, app.chladni, draggablePoints, grid);
params.setApp(app);
params.setGrid(grid);
params.setChladni(app.chladni);

params.init();
grid.init();
app.chladni.init();

app.ticker.add(() => {


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
