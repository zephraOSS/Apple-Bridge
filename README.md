# Apple-Bridge
Retrieve data from Apple Services on macOS and Windows

# Example
```js
// Example
const AppleBridge = require("apple-bridge"),
    bridge = new AppleBridge();
    
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
* On Windows, Apple TV and Apple Music data is retrieved from iTunes.
* On macOS, Apple TV and Apple Music data is retrieved from the respective app.