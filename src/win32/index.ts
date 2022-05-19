import { AppleBridge } from "../index";

const iTunes = WScript.CreateObject("iTunes.Application");

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
    if (Object.keys(AppleBridge.getInstance().events.music).length === 0)
        return;

    const data = iTunes.currentTrack;

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
                id
            ] = data,
            playerState = getITunesPlayerState();

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

function getITunesPlayerState() {
    const playerState = iTunes.playerState;

    switch (playerState) {
        case 0:
            return "stopped";
        case 1:
            return "playing";
        case 2:
            return "paused";
        default:
            return "unknown";
    }
}

/*
 * Fetch Apple TV data
 * @returns {Object} Apple TV data
 */
async function fetchAppleTV() {}
