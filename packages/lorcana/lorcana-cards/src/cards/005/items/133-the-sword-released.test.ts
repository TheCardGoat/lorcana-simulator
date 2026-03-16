import { describe, expect, it } from "bun:test";
import { theSwordReleased } from "./133-the-sword-released";

describe("The Sword Released", () => {
  it("is still marked blocked while POWER APPOINTED lacks working runtime support", () => {
    expect(theSwordReleased.missingImplementation).toBe(true);
    expect(theSwordReleased.missingTests).toBe(true);
  });
});
