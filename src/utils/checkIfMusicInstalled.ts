import { exec } from "child_process";

export async function checkIfMusicInstalled(): Promise<boolean> {
    if (process.platform !== "win32") return Promise.resolve(true);

    const music = await checkIfAppIsInstalled("iTunes");

    console[music ? "info" : "warn"](
        "[checkIfMusicInstalled]",
        music ? "Found" : "Not found"
    );

    return music;
}

export async function checkIfAppIsInstalled(appName: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        exec(`where ${appName}`, (err, stdout) => {
            if (err) {
                console.log("[checkIfAppIsInstalled]", err);
                reject(false);
            } else resolve(stdout.includes(appName));
        });
    });
}
