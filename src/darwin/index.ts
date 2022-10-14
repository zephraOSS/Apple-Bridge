import { AppleBridge } from "../index";
import { exec } from "child-process-promise";
import * as path from "path";

setInterval(fetchAll, 1000);

function fetchAll() {
    fetchAppleMusic();
    fetchAppleTV();
}

/*
 * Fetch Apple Music data
 * @returns {Object} Current track data
 */
async function fetchAppleMusic() {
    if (
        AppleBridge.getInstance().emitter.listenerCount("music:playing") ===
            0 &&
        AppleBridge.getInstance().emitter.listenerCount("music:paused") === 0 &&
        AppleBridge.getInstance().emitter.listenerCount("music:stopped") === 0
    )
        return;

    const data = await fetchApp.appleMusic();

    if (Object.keys(data).length === 0 || data.playerState === "stopped")
        AppleBridge.emit("stopped", "music");
    else AppleBridge.emit(data.playerState, "music", data);
}

/*
 * Fetch Apple TV data
 * @returns {Object} Apple TV data
 */
async function fetchAppleTV() {}

export const fetchApp = {
    appleMusic: async (): Promise<TrackData> => {
        const data: string[] = (
            await exec(
                `osascript ${path.resolve(
                    `${__dirname.replace(
                        "app.asar",
                        "app.asar.unpacked"
                    )}/music.scpt`
                )}`
            )
        ).stdout.split(" -APPLEBRIDGEPLACEHOLDER- ");

        return {
            name: data[2],
            artist: data[1],
            album: data[3],
            mediaKind: parseInt(data[4]),
            elapsedTime: parseInt(data[6]),
            duration: parseInt(data[5]),
            remainingTime: parseInt(data[5]) - parseInt(data[6]),
            genre: data[7],
            releaseYear: null,
            id: data[8],
            playerState: data[0] as PlayerState
        };
    }
};
