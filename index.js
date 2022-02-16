class AppleBridge {
    constructor() {
        this._events = {
            music: [],
            tv: []
        };
    }

    /**
     * Listen to events
     * @param {String} event
     * @param {String} service
     * @param {Function} callback
     */
    on(event, service, callback) {
        if (!this._events[service]) return;
        if (!this._events[service][event]) this._events[service][event] = [];

        this._events[service][event].push(callback);
    }

    /**
     * Emit an event
     * @param {String} event
     * @param {String} service
     * @param  {...any} args
     */
    emit(event, service, ...args) {
        if (!this._events[service] || !this._events[service][event]) return;

        this._events[service][event].forEach((callback) => {
            callback(...args);
        });
    }

    /**
     * Remove listener
     * @param {String} event
     * @param {String} service
     * @param {Function} callback
     */
    off(event, service, callback) {
        if (!this._events[service] || !this._events[service][event]) return;

        this._events[service][event] = this._events[service][event].filter(
            (cb) => cb !== callback
        );
    }

    /**
     * Listen to events (once)
     * @param {String} event
     * @param {String} service
     * @param {Function} callback
     */
    once(event, service, callback) {
        const self = this;

        function onceCallback(...args) {
            callback(...args);
            self.off(event, service, onceCallback);
        }

        this.on(event, service, onceCallback);
    }

    /**
     * Get instance
     * @returns {AppleBridge}
     */
    static getInstance() {
        if (!this._instance) this._instance = new AppleBridge();

        return this._instance;
    }

    /**
     * Listen to events
     * @param {String} event
     * @param {String} service
     * @param {Function} callback
     */
    static on(event, service, callback) {
        this.getInstance().on(event, service, callback);
    }

    /**
     * Emit an event
     * @param {String} event
     * @param {String} service
     * @param  {...any} args
     */
    static emit(event, service, ...args) {
        this.getInstance().emit(event, service, ...args);
    }

    /**
     * Remove listener
     * @param {String} event
     * @param {String} service
     * @param {Function} callback
     */
    static off(event, service, callback) {
        this.getInstance().off(event, service, callback);
    }

    /**
     * Listen to events (once)
     * @param {String} event
     * @param {String} service
     * @param {Function} callback
     */
    static once(event, service, callback) {
        this.getInstance().once(event, service, callback);
    }
}

module.exports = AppleBridge;
