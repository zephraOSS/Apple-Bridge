import { fetchITunes } from "./win32";

export class AppleBridge {
    public events: {
        music: Function[];
        tv: Function[];
    } = {
        music: [],
        tv: []
    };

    static instance: AppleBridge;

    /**
     * Listen to events
     * @param {String} event
     * @param {String} service
     * @param {Function} callback
     */
    on(event, service, callback) {
        if (!this.events[service]) return;
        if (!this.events[service][event]) this.events[service][event] = [];

        this.events[service][event].push(callback);
    }

    /**
     * Emit an event
     * @param {String} event
     * @param {String} service
     * @param  {...any} args
     */
    emit(event, service, ...args) {
        if (!this.events[service] || !this.events[service][event]) return;

        this.events[service][event].forEach((callback) => {
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
        if (!this.events[service] || !this.events[service][event]) return;

        this.events[service][event] = this.events[service][event].filter(
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
        if (!this.instance) AppleBridge.instance = new AppleBridge();

        return AppleBridge.instance;
    }

    /**
     * Listen to events
     * @param {String} event
     * @param {String} service
     * @param {Function} callback
     */
    static on(event, service, callback) {
        AppleBridge.getInstance().on(event, service, callback);
    }

    /**
     * Emit an event
     * @param {String} event
     * @param {String} service
     * @param  {...any} args
     */
    static emit(event, service, ...args) {
        AppleBridge.getInstance().emit(event, service, ...args);
    }

    /**
     * Remove listener
     * @param {String} event
     * @param {String} service
     * @param {Function} callback
     */
    static off(event, service, callback) {
        AppleBridge.getInstance().off(event, service, callback);
    }

    /**
     * Listen to events (once)
     * @param {String} event
     * @param {String} service
     * @param {Function} callback
     */
    static once(event, service, callback) {
        AppleBridge.getInstance().once(event, service, callback);
    }
}

setTimeout(function () {
    const currentTrack = fetchITunes();

    AppleBridge.emit(currentTrack.playerState, "music", currentTrack);
}, 500);
