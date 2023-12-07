import Model from './Model';

export default class VectorUI {
    constructor(app) {
        this.app = app;
        this.model = new Model();
        this.createXYController();
        this.model.subscribe(this.onModelUpdate.bind(this));
    }

    createXYController() {
        this.xyControllerElement = document.createElement('div');
        this.xyControllerElement.className = 'xy-controller';
        document.body.appendChild(this.xyControllerElement);

        this.xyControllerElement.addEventListener('pointermove', this.handlePointerMove.bind(this));
    }


    handlePointerMove(event) {
        const bounds = this.xyControllerElement.getBoundingClientRect(); // Use xyControllerElement
        const x = (event.clientX - bounds.left) / bounds.width; // Normalized X
        const y = (event.clientY - bounds.top) / bounds.height; // Normalized Y

        const frequency = x * 99 + 1; // Map X to 1 - 100
        const amplitude = y * 5; // Map Y to 0 - 5

        this.model.set({ frequency, amplitude });
    }

    onModelUpdate(data) {
        console.log('Model updated:', data);
    }
}
