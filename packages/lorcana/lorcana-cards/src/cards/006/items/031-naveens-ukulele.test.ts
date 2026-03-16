import { describe, expect, it } from "bun:test";
import { naveensUkulele } from "./031-naveens-ukulele";

describe("Naveen's Ukulele", () => {
  it("stays flagged as blocked until temporary singer-threshold modifiers are supported", () => {
    expect(naveensUkulele.missingImplementation).toBe(true);
    expect(naveensUkulele.missingTests).toBe(true);
  });
});
