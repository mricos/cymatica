import Gradient from './Gradient.js';
import Chladni from './Chladni.js';
import Draggable from './Draggable.js';
import Variables from './Variables.js';
import Stats from './Stats.js';
import EventBus from './Eventbus.js';
import InputHandler from './InputHandler.js';
import Info from './Info.js';
import Crosshairs from './Crosshairs.js';

let app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x000000,
    resizeTo: window,
    // resolution: 1.1 for my macbook, 1.5 for 4k monitor
    //resolution: window.devicePixelRatio || 1,
});


window.addEventListener('load', (event) => {
    initApp();
});

function initApp() {
    console.log('Initializing app...');
    document.body.appendChild(app.view);

    app.stats = new Stats(app); // Stats is a Container
    app.eventBus = new EventBus();
    app.eventBus.debug = true;
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
        new Draggable(app, 200, 122),
        new Draggable(app, 250, 200),
        new Draggable(app, 180, 220)];


    app.info= new Info(app);
    app.vars = new Variables(app);
    app.crosshairs = new Crosshairs(app);
    app.stage.addChild(app.vars);
    app.vars.addVariable("V", app.chladni,{min:0.01, max:5, stride:1});
    app.vars.addVariable("TT", app.chladni, {min:-20, max:20, stride:1});
    app.vars.addVariable("F", app.chladni, {min:0.001, max:2, stride:.01});
    app.vars.addVariable("PV", app.chladni, {min:-4, max:4, stride:1});
    app.input.init();



    app.eventBus.subscribe("variableSelected", (data) => {
        app.info.setContent(`${data.variable}`);
    });
    app.eventBus.subscribe('parametersChanged', (data) => {
        app.chladni.updateNodes(app.draggablePoints);
        app.gradient.redraw=true;
    });

    app.eventBus.subscribe('toggleGradient', (data) => {
        app.gradient.redraw=true;
        app.gradient.showGradient = !app.gradient.showGradient;
        app.gradient.redraw=true;
    });

    app.eventBus.subscribe('hotCornerUpperRight', (data) => {
        app.info.visible = !app.info.visible;
    });


    app.eventBus.subscribe('hotCornerLowerLeft', (data) => {
        app.eventBus.publish('toggleGradient');
    });

    app.eventBus.subscribe('hotCornerUpperLeft', (data) => {
        app.vars.visible = !app.vars.visible;
    });

    app.eventBus.subscribe('hotCornerLowerRight', (data) => {
        app.stats.visible = !app.stats.visible;
        app.crosshairs.visible = true; //!app.crosshairs.visible;
    });

    app.eventBus.subscribe('keypress', (data) => {
        if (data.key === 'g' || data.key === 'G') {
            app.eventBus.publish('toggleGradient');
    }});

    app.eventBus.subscribe('mousemove', (data) => {
        app.stats.setMouse(data.event);
        if(data.event.clientY >  app.vars.y + app.vars.height) {
            app.vars.mouseToVariable(data.event);
        }
    });

    // This is a hack to unselect variables when clicking outside vars
    app.eventBus.subscribe('click', (event) => {
        if(event.clientY <  app.vars.y + app.vars.height &&
            event.clientX > app.vars.x + app.vars.width) {
            app.vars.unselectAll();
            app.info.setContent("summary");
        }
    });

    app.eventBus.subscribe('resize', (data) => {
            app.renderer.resize(window.innerWidth, window.innerHeight);
            app.stats.update();
            app.vars.onResize();
        });

    app.ticker.add(() => {
        app.stats.update(app.ticker.lastTime);
        app.gradient.update();
        app.chladni.update();
        app.info.update();
    });

    app.info.setContent("summary");

    //app.eventBus.publish('parametersChanged'); // first time
    //app.eventBus.publish('resize'); // first time
}
