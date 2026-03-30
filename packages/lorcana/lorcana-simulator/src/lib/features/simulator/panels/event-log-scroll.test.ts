import { describe, expect, it } from "bun:test";

import { isScrolledNearBottom, shouldAutoScrollOnNewRows } from "./event-log-scroll.js";

describe("event log scroll", () => {
  it("treats nearby bottom positions as pinned", () => {
    expect(
      isScrolledNearBottom({
        scrollHeight: 1000,
        scrollTop: 776,
        clientHeight: 200,
      }),
    ).toBe(true);
  });

  it("does not auto-scroll when the viewer is not pinned", () => {
    expect(shouldAutoScrollOnNewRows(10, 9, false)).toBe(false);
  });

  it("auto-scrolls when a new row is added while pinned", () => {
    expect(shouldAutoScrollOnNewRows(10, 9, true)).toBe(true);
  });

  it("does not require a new group to auto-scroll", () => {
    expect(shouldAutoScrollOnNewRows(12, 11, true)).toBe(true);
  });
});
