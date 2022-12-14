import { exec } from "child_process";

export async function checkIfMusicInstalled(): Promise<boolean> {
    const music = await checkIfAppIsInstalled("iTunes", "Music");

    console[music ? "info" : "warn"](
        "[checkIfMusicInstalled]",
        music ? "Found" : "Not found"
    );

    return music;
}

export async function checkIfAppIsInstalled(
    appName: string,
    appNameMac?: string
): Promise<boolean> {
    return new Promise((resolve, reject) => {
        exec(
            process.platform === "win32"
                ? `where ${appName}`
                : `which ${appNameMac ?? appName}`,
            (err, stdout) => {
                if (err) reject(false);
                else resolve(stdout.includes(appName));
            }
        );
    });
}
