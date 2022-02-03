const AppleBridge = require("../index.js"),
    path = require("path");

setInterval(fetchAll, 1000);

function fetchAll() {
    fetchAppleMusic();
    fetchAppleTV();
}

/*
 * Fetch Apple Music data
 * @returns {Object} Apple Music data
 */
async function fetchAppleMusic() {
    if (Object.keys(AppleBridge.getInstance()._events.music).length === 0)
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
