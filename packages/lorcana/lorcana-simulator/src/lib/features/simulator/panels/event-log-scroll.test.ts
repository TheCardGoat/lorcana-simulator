import { describe, expect, it } from "bun:test";

import { isScrolledNearBottom, shouldAutoScrollOnNewRows } from "./event-log-scroll.js";

describe("event log scroll helpers", () => {
  it("treats a viewport within the threshold as pinned to the bottom", () => {
    expect(
      isScrolledNearBottom({
        scrollHeight: 640,
        scrollTop: 404,
        clientHeight: 220,
      }),
    ).toBe(true);
  });

  it("detects when the viewport has moved away from the bottom", () => {
    expect(
      isScrolledNearBottom({
        scrollHeight: 640,
        scrollTop: 320,
        clientHeight: 220,
      }),
    ).toBe(false);
  });

  it("auto-scrolls only when new rows arrive and the log is pinned", () => {
    expect(shouldAutoScrollOnNewRows(6, 5, true)).toBe(true);
    expect(shouldAutoScrollOnNewRows(6, 6, true)).toBe(false);
    expect(shouldAutoScrollOnNewRows(6, 5, false)).toBe(false);
  });
});
