import { AppleBridge } from "../index";
import { execSync } from "child_process";

import * as path from "path";

let fetchAllInterval: NodeJS.Timeout;

if (process.platform === "win32")
    fetchAllInterval = setInterval(fetchAll, 1000);

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

    if (
        !data ||
        Object.keys(data).length === 0 ||
        data.playerState === "stopped"
    )
        AppleBridge.emit("stopped", "music");
    else AppleBridge.emit(data.playerState, "music", data);
}

/**
 * @description Get (iTunes) player state
 * @returns {PlayerState} Player state
 */
export function getPlayerState(): PlayerState {
    return fetchITunes()?.playerState;
}

export function quitITunes() {
    console.log("[Win32][quitITunes]", "Stopping fetch interval");
    clearTimeout(fetchAllInterval);

    console.log("[Win32][quitITunes]", "Killing iTunes in 3 seconds");
    setTimeout(() => {
        try {
            console.log("[Win32][quitITunes]", "Killing iTunes");
            execSync(`taskkill /F /IM "iTunes.exe"`);
        } catch (e) {
            console.error("[Win32][quitITunes]", "Error killing iTunes:", e);
        }
    }, 3000);
}

export function fetchITunes(type = "currentTrack"): TrackData {
    if (process.platform !== "win32") return;
    if (!AppleBridge.getInstance().isMusicInstalled) return;

    try {
        const data = execSync(
            `cscript //Nologo "${path.join(
                __dirname.replace("app.asar", "app.asar.unpacked"),
                "wscript",
                "fetch.js"
            )}" ${type}`,
            {
                encoding: "utf8",
                windowsHide: true
            }
        );

        try {
            return JSON.parse(decodeURI(data));
        } catch (e) {
            console.error("[Win32][fetchITunes]", "Error parsing JSON:", e);

            return undefined;
        }
    } catch (e) {
        console.error(
            "[Win32][fetchITunes]",
            "Stopping fetch interval due to error"
        );
        console.error("[Win32][fetchITunes]", "Error fetching iTunes:", e);

        AppleBridge.emit("stopped", "music");

        if (e.stdout?.includes("There is no script engine for file extension"))
            AppleBridge.emit("jsFileExtensionError", "music");

        clearTimeout(fetchAllInterval);

        return undefined;
    }
}

/*
 * Fetch Apple TV data
 * @returns {Object} Apple TV data
 */
async function fetchAppleTV() {}
