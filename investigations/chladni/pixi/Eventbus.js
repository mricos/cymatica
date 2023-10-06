export default class EventBus {
    constructor() {
        this.subscribers = {};
        this.debug = false;
    }

    subscribe(eventType, callback) {
        if (!this.subscribers[eventType]) {
            this.subscribers[eventType] = [];
        }
        this.subscribers[eventType].push(callback);

        if (this.debug) {
            console.log(`Subscribed to ${eventType}`);
        };

        return () => this.unsubscribe(eventType, callback);  // Return an unsubscribe function
    }

    unsubscribe(eventType, callback) {
        if(debug) console.log(`Unsubscribing from ${eventType}`);

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
        if(this.debug) console.log(`Publishing ${eventType}`,data);

        if (this.subscribers[eventType]) {
            this.subscribers[eventType].forEach(callback => callback(data));
        }
    }
}