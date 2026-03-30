/**
 * Download Replay as ZIP
 *
 * Fetches replay data from the API, packages it into a .zip file
 * containing replay.json, and triggers a browser download.
 */

import { zipSync } from "fflate";
import { fetchReplayBlob, decompressReplayBlob } from "./fetch-replay.js";

/**
 * Download replay data as a .zip file.
 */
export async function downloadReplayZip(gameId: string): Promise<void> {
  const compressed = await fetchReplayBlob(gameId);
  const data = await decompressReplayBlob(compressed);
  const json = new TextEncoder().encode(JSON.stringify(data, null, 2));

  const zipped = zipSync({ "replay.json": json });
  const blob = new Blob([new Uint8Array(zipped)], { type: "application/zip" });

  triggerBrowserDownload(blob, `replay-${gameId}.zip`);
}

/**
 * Download replay from an already-loaded ArrayBuffer (e.g., from IndexedDB).
 * Avoids an extra API call.
 */
export async function downloadReplayZipFromBlob(
  gameId: string,
  compressedBlob: ArrayBuffer,
): Promise<void> {
  const data = await import("./fetch-replay.js").then((m) =>
    m.decompressReplayBlob(compressedBlob),
  );
  const json = new TextEncoder().encode(JSON.stringify(data, null, 2));

  const zipped = zipSync({ "replay.json": json });
  const blob = new Blob([new Uint8Array(zipped)], { type: "application/zip" });

  triggerBrowserDownload(blob, `replay-${gameId}.zip`);
}

function triggerBrowserDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
