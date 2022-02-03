class AppleBridge {
    constructor() {
        this._events = {
            music: [],
            tv: [],
        };
    }

    on(event, service, callback) {
        if (!this._events[service]) return;
        if (!this._events[service][event]) this._events[service][event] = [];

        this._events[service][event].push(callback);
    }

    emit(event, service, ...args) {
        if (!this._events[service] || !this._events[service][event]) return;

        this._events[service][event].forEach((callback) => {
            callback(...args);
        });
    }

    off(event, service, callback) {
        if (!this._events[service] || !this._events[service][event]) return;

        this._events[service][event] = this._events[service][event].filter(
            (cb) => cb !== callback
        );
    }

    once(event, service, callback) {
        const self = this;

        function onceCallback(...args) {
            callback(...args);
            self.off(event, service, onceCallback);
        }

        this.on(event, service, onceCallback);
    }

    static getInstance() {
        if (!this._instance) this._instance = new AppleBridge();

        return this._instance;
    }

    static on(event, service, callback) {
        this.getInstance().on(event, service, callback);
    }

    static emit(event, service, ...args) {
        this.getInstance().emit(event, service, ...args);
    }

    static off(event, service, callback) {
        this.getInstance().off(event, service, callback);
    }

    static once(event, service, callback) {
        this.getInstance().once(event, service, callback);
    }
}

module.exports = AppleBridge;