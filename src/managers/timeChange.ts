import { AppleBridge } from "../index";

export class TimeChange {
    private static instance: TimeChange;

    constructor() {
        if (TimeChange.instance) return TimeChange.instance;

        TimeChange.instance = this;

        this.init();
    }

    init() {
        let lastTrackName: string;
        let lastElapsedTime: number = 0;

        AppleBridge.instance.on("playing", "music", (currentTrack) => {
            if (
                lastTrackName === currentTrack.name &&
                lastElapsedTime === currentTrack.elapsedTime
            )
                return;
            else if (
                lastElapsedTime + 1 === currentTrack.elapsedTime ||
                lastTrackName !== currentTrack.name
            ) {
                lastTrackName = currentTrack.name;
                lastElapsedTime = currentTrack.elapsedTime;

                return;
            }

            lastTrackName = currentTrack.name;
            lastElapsedTime = currentTrack.elapsedTime;

            AppleBridge.instance.emit("timeChange", "music", currentTrack);
        });
    }
}
