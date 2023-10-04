import Gradient from './Gradient.js';
import Chladni from './Chladni.js';
import Draggable from './Draggable.js';
import Popup from './Popup.js';
import Stats from './Stats.js';
import EventBus from './Eventbus.js';
import InputHandler from './InputHandler.js';

let app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x000000,
    resizeTo: window,
    resolution: window.devicePixelRatio || 1,
});


window.addEventListener('load', (event) => {
    initApp();
});

function initApp() {
    console.log('Initializing app...');
    document.body.appendChild(app.view);

    app.stats = new Stats(app); // Stats is a Container
    app.eventBus = new EventBus();
    app.input = new InputHandler(app);
    app.chladni = new Chladni(app, 1000);
    app.gradient = new Gradient(app);

    app.stage.sortableChildren = true;
    app.stage.interactive = true;
    app.chladni.container.interactive = true;

    app.stage.addChild(app.gradient.container);
    app.stage.addChild(app.chladni.container);
    app.stage.addChild(app.stats); // stats is a Container


    app.draggablePoints = [
        new Draggable(app, 250, 250),
        new Draggable(app, 200, 200),
        new Draggable(app, 300, 250)];


    app.popup = new Popup(app);
    app.stage.addChild(app.popup.container);
    //popup.addVariable("N", app.chladni, {min:0, max:2000, stride:1});s
    app.popup.addVariable("V", app.chladni,{min:0.01, max:5, stride:1});
    app.popup.addVariable("TT", app.chladni, {min:-2, max:10, stride:1});
    app.popup.addVariable("F", app.chladni, {min:0.001, max:2, stride:.01});
    app.popup.addVariable("PV", app.chladni, {min:-4, max:4, stride:1});
    //app.popup.addVariable("fps", app.params, {min:0, max:2, stride:0.01});
    app.popup.addVariable("None", {None:true}, {min:0, max:2, stride:0.01});

    app.input.init();

    app.eventBus.subscribe('parametersChanged', (data) => {
        console.log('Parameters changed:', data);
        app.chladni.updateNodes(app.draggablePoints);
        app.gradient.redraw=true;

    });

    app.eventBus.subscribe('toggleGradient', (data) => {
        app.gradient.showGradient = !app.gradient.showGradient;
        app.gradient.redraw=true;
    });


    app.ticker.add(() => {
        let gradient = app.gradient;
        let chladni = app.chladni;
        let popup = app.popup;
        let stats = app.stats;
        let params = app.params;

        stats.update(app.ticker.lastTime);
        gradient.update();
        chladni.update();
    });

}