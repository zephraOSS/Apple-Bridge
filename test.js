const { AppleBridge } = require("./dist/index"),
    bridge = new AppleBridge();

log("Starting...");

bridge.on("playing", "music", (data) => {
    log("playing", "music", data);
});

function log(...args) {
    console.log("[TEST]", ...args);
}

process.exit();
