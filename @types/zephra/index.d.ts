interface TrackData {
    name: string;
    artist: string;
    album: string;
    mediaKind: MediaKind;
    elapsedTime: number;
    duration: number;
    remainingTime: number;
    genre: string;
    releaseYear: number;
    id: string;
    airPlayEnabled: boolean;
    airPlayDevice: {
        name: string;
        kind: AirPlayDeviceKind;
        selected: boolean;
    } | null;
    playerState: PlayerState;
}

type PlayerState = "playing" | "paused" | "stopped";
type MediaKind = "song" | "musicVideo" | "unknown";
type AirPlayDeviceKind =
    | "computer"
    | "AirPort Express"
    | "Apple TV"
    | "AirPlay device"
    | "Bluetooth device"
    | "HomePod"
    | "unknown";
