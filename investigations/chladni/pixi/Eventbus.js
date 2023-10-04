export default class EventBus {
    constructor() {
        this.subscribers = {};
    }

    subscribe(eventType, callback) {
        if (!this.subscribers[eventType]) {
            this.subscribers[eventType] = [];
        }
        this.subscribers[eventType].push(callback);
        return () => this.unsubscribe(eventType, callback);  // Return an unsubscribe function
    }

    unsubscribe(eventType, callback) {
        if (this.subscribers[eventType]) {
            if (callback) {
                this.subscribers[eventType] = this.subscribers[eventType].filter(
                    (subscribedCallback) => subscribedCallback !== callback
                );
            } else {
                delete this.subscribers[eventType];  // Remove all subscribers of this event type if no specific callback is provided
            }
        }
    }

    publish(eventType, data) {
        if (this.subscribers[eventType]) {
            this.subscribers[eventType].forEach(callback => callback(data));
        }
    }
}