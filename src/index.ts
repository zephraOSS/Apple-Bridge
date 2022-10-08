import { fetchITunes } from "./win32";
import EventEmitter from "events";

export class AppleBridge {
    public emitter = new EventEmitter();

    static instance: AppleBridge;

    constructor() {
        if (AppleBridge.instance) return AppleBridge.instance;

        AppleBridge.instance = this;
    }

    /**
     * Listen to events
     * @param {String} event
     * @param {String} service
     * @param {Function} callback
     */
    on(event, service, callback) {
        this.emitter.on(`${service}:${event}`, callback);
    }

    /**
     * Emit an event
     * @param {String} event
     * @param {String} service
     * @param  {...any} args
     */
    emit(event, service, ...args) {
        this.emitter.emit(`${service}:${event}`, ...args);
    }

    /**
     * Remove listener
     * @param {String} event
     * @param {String} service
     * @param {Function} callback
     */
    off(event, service, callback) {
        this.emitter.off(`${service}:${event}`, callback);
    }

    /**
     * Listen to events (once)
     * @param {String} event
     * @param {String} service
     * @param {Function} callback
     */
    once(event, service, callback) {
        this.emitter.once(`${service}:${event}`, callback);
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
