"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWatchPlayer = getWatchPlayer;
const ANICLI_URL = process.env.ANICLI_URL || "http://localhost:8001";
async function getWatchPlayer(animeId, title) {
    const response = await fetch(`${ANICLI_URL}/watch?title=${encodeURIComponent(title)}`);
    if (!response.ok) {
        throw new Error("anicli service error");
    }
    const data = await response.json();
    return {
        animeId,
        embedUrl: data.embedUrl,
    };
}
