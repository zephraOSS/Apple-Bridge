import { AppleBridge } from "../index";

export class TimeChange {
    private static instance: TimeChange;

    constructor() {
        if (TimeChange.instance) return TimeChange.instance;

        TimeChange.instance = this;

        this.init();
    }

    init() {
        let lastElapsedTime: number = 0;

        AppleBridge.instance.on("playing", "music", (currentTrack) => {
            if (lastElapsedTime === currentTrack.elapsedTime) return;
            else if (lastElapsedTime + 1 === currentTrack.elapsedTime)
                return (lastElapsedTime = currentTrack.elapsedTime);

            lastElapsedTime = currentTrack.elapsedTime;

            AppleBridge.instance.emit("timeChange", "music", currentTrack);
        });
    }
}
