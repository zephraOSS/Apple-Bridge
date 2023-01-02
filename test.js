const { AppleBridge } = require("./dist/index"),
    bridge = new AppleBridge();

log("Starting...");

bridge.on("playing", "music", (data) => {
    log("playing", "music", data);
    process.exit();
});

bridge.on("jsFileExtensionError", "music", () => {
    log("Apple-Bridge detected an JS file extension error.");
    process.exit();
});

function log(...args) {
    console.log("[TEST]", ...args);
}
