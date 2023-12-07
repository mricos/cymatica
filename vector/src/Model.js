export default class Model {
    constructor() {
        this.data = {};
        this.listeners = [];
    }

    subscribe(listener) {
        this.listeners.push(listener);
    }

    set(update) {
        this.data = { ...this.data, ...update };
        this.notify();
    }

    notify() {
        this.listeners.forEach(listener => listener(this.data));
    }
}

