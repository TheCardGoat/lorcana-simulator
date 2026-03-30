import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";

const handZoneSource = readFileSync(new URL("./HandZone.svelte", import.meta.url), "utf8");
const playZoneSource = readFileSync(new URL("./PlayZone.svelte", import.meta.url), "utf8");
const playZoneLocationEntrySource = readFileSync(
  new URL("./PlayZoneLocationEntry.svelte", import.meta.url),
  "utf8",
);

describe("simulator board DnD surface", () => {
  it("keeps draggable attachment limited to hand cards", () => {
    expect(handZoneSource).toContain("createOptionalDraggable");
    expect(playZoneSource).not.toContain("createOptionalDraggable");
    expect(playZoneLocationEntrySource).not.toContain("createOptionalDraggable");
  });

  it("removes play-zone card and location drop target markup", () => {
    expect(playZoneSource).not.toContain("data-card-drop-id");
    expect(playZoneLocationEntrySource).not.toContain("data-card-drop-id");
    expect(playZoneLocationEntrySource).not.toContain("data-location-drop-id");
    expect(playZoneLocationEntrySource).not.toContain("getCardDropState");
    expect(playZoneLocationEntrySource).not.toContain("getLocationDropState");
  });
});
