import { AppleBridge } from "../index";
import { execSync } from "child_process";
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
function fetchAppleMusic() {
    if (
        AppleBridge.getInstance().emitter.listenerCount("music:playing") ===
            0 &&
        AppleBridge.getInstance().emitter.listenerCount("music:paused") === 0 &&
        AppleBridge.getInstance().emitter.listenerCount("music:stopped") === 0
    )
        return;

    const data: any = fetchITunes();

    if (!data || data?.playerState === "stopped")
        AppleBridge.emit("stopped", "music");
    else AppleBridge.emit(data.playerState, "music", data);
}

// @ts-ignore
function getITunesPlayerState() {
    const playerState = fetchITunes("playerState");

    switch (playerState) {
        case "0":
            return "stopped";
        case "1":
            return "playing";
        case "2":
            return "paused";
        default:
            return "unknown";
    }
}

export function fetchITunes(type = "currentTrack") {
    const data = execSync(
        `cscript //Nologo "${path.join(
            __dirname,
            "wscript",
            "fetch.js"
        )}" ${type}`,
        {
            encoding: "utf8",
            windowsHide: true
        }
    );

    return type === "currentTrack" ? JSON.parse(decodeURI(data)) : data;
}

/*
 * Fetch Apple TV data
 * @returns {Object} Apple TV data
 */
async function fetchAppleTV() {}
