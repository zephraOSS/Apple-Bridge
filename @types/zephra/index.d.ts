interface TrackData {
    name: string;
    artist: string;
    album: string;
    mediaKind: number;
    elapsedTime: number;
    duration: number;
    remainingTime: number;
    genre: string;
    releaseYear: number;
    id: string;
    playerState: PlayerState;
}

type PlayerState = "playing" | "paused" | "stopped";
