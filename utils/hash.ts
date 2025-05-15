import * as Crypto from "expo-crypto";

async function sha256(str: string): Promise<string> {
    const digest = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        str,
    );
    return digest;
}

export { sha256 };
