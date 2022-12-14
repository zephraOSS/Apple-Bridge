import { fetchITunes } from "./win32";
import { fetchApp } from "./darwin";

import { TimeChange } from "./managers/timeChange";
import { checkIfMusicInstalled } from "./utils/checkIfMusicInstalled";

import EventEmitter from "events";

export class AppleBridge {
    public emitter = new EventEmitter();
    public isMusicInstalled: boolean;

    static instance: AppleBridge;

    constructor() {
        if (AppleBridge.instance) return AppleBridge.instance;

        AppleBridge.instance = this;

        this.init();
    }

    async init() {
        this.isMusicInstalled = await checkIfMusicInstalled();

        if (!this.isMusicInstalled) return;

        new TimeChange();

        const currentTrack =
            process.platform === "win32"
                ? fetchITunes()
                : await fetchApp.appleMusic();

        AppleBridge.emit(currentTrack?.playerState, "music", currentTrack);
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
