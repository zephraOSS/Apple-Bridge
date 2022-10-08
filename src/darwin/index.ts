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

    const data = (
        await exec(
            `osascript ${path.resolve(
                `${__dirname.replace(
                    "app.asar",
                    "app.asar.unpacked"
                )}/music.scpt`
            )}`
        )
    ).stdout;

    if (!data || data === "stopped") AppleBridge.emit("stopped", "music");
    else {
        const [
            artist,
            title,
            album,
            mediaKind,
            duration,
            elapsedTime,
            remainingTime,
            genre,
            id,
            playerState
        ] = data.split(" -APPLEBRIDGEPLACEHOLDER- ");

        AppleBridge.emit(playerState, "music", {
            artist,
            title,
            album,
            mediaKind,
            duration,
            elapsedTime,
            remainingTime,
            genre,
            id,
            playerState
        });
    }
}

/*
 * Fetch Apple TV data
 * @returns {Object} Apple TV data
 */
async function fetchAppleTV() {}
