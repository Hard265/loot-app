import { sha256 } from "./hash";

function getFileExtension(filename: string): string | null {
    const match = filename.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);
    return match ? match[1] : null;
}

async function getGravatarUri(email: string, size: number = 200) {
    const hash = await sha256(email.trim().toLowerCase());
    return `https://gravatar.com/avatar/${hash}?s=${size}&r=x&d=retro`;
}

export { getFileExtension, getGravatarUri };
