import toRgb from "hex-rgb";

function toRGBString(hex: string, alpha: number): string {
    return toRgb(hex, { format: "array" }).join(" ");
}

export { toRGBString };
