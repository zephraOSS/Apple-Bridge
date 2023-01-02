# Apple-Bridge

Retrieve data from Apple Services on macOS and Windows

# Events

- playing: music
- paused: music
- stopped: music
- timeChange: music
- jsFileExtensionError: music

# JS File Extension Error

*Only Windows*

This error is thrown when the `.js` file association data is missing or incorrect. This is not a problem with
Apple-Bridge.

[Learn more](https://www.winhelponline.com/blog/error-there-is-no-script-engine-for-file-extension-when-running-js-files/)

# Example

```ts
import { AppleBridge } from "apple-bridge";

const bridge = new AppleBridge();

let musicStatus;

bridge.on("playing", "music", (data) => {
    console.log(data);

    musicStatus = data.playerState; // "playing"
});

bridge.on("paused", "music", (data) => {
    console.log(data);

    musicStatus = data.playerState; // "paused"
});

bridge.on("stopped", "music", (data) => {
    console.log(data);

    musicStatus = data.playerState; // "stopped"
});
```

# Information

- On Windows, Apple TV and Apple Music data is retrieved from iTunes.
- On macOS, Apple TV and Apple Music data is retrieved from the respective app.
