import toRgb from "hex-rgb";

function toRGBString(hex: string, alpha: number): string {
    return toRgb(hex, { format: "array" }).join(" ");
}

function formatBytes(bytes: number, decimals?: number) {
    if (bytes === 0) return "0 Bytes";
    let k = 1024,
        dm = decimals || 2,
        sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export { toRGBString, formatBytes };
