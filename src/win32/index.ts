import { AppleBridge } from "../index";
import { execSync } from "child_process";

import * as path from "path";

if (process.platform === "win32") setInterval(fetchAll, 1000);

function fetchAll() {
    fetchAppleMusic();
    fetchAppleTV();
}

/**
 * @description Fetch Apple Music data
 * @returns {TrackData} Current track data
 */
function fetchAppleMusic() {
    if (
        process.platform !== "win32" ||
        (AppleBridge.getInstance().emitter.listenerCount("music:playing") ===
            0 &&
            AppleBridge.getInstance().emitter.listenerCount("music:paused") ===
                0 &&
            AppleBridge.getInstance().emitter.listenerCount("music:stopped") ===
                0)
    )
        return;

    const data = fetchITunes();

    if (Object.keys(data).length === 0 || data.playerState === "stopped")
        AppleBridge.emit("stopped", "music");
    else AppleBridge.emit(data.playerState, "music", data);
}

/**
 * @description Get (iTunes) player state
 * @returns {PlayerState} Player state
 */
export function getPlayerState(): PlayerState {
    return fetchITunes().playerState;
}

export function fetchITunes(type = "currentTrack") {
    if (process.platform !== "win32") return;

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

    return JSON.parse(decodeURI(data)) as TrackData;
}

/*
 * Fetch Apple TV data
 * @returns {Object} Apple TV data
 */
async function fetchAppleTV() {}
