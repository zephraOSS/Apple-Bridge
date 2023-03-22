import { execSync } from "child_process";

export function checkIfMusicRunning() {
    const cmd =
            process.platform === "win32" ? "tasklist" : "ps -ax | grep Music",
        app = process.platform === "win32" ? "iTunes.exe" : "Music";

    try {
        const res = execSync(cmd, { encoding: "utf8" });

        return res.toLowerCase().indexOf(app.toLowerCase()) > -1;
    } catch (err) {
        console.log("[checkIfMusicRunning]", err);
        return false;
    }
}
