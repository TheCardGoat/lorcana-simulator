import { describe, expect, it } from "bun:test";
import { maleficentsStaff } from "./065-maleficents-staff";

describe("Maleficent's Staff", () => {
  it("stays flagged as blocked until return-to-hand effects emit trigger events", () => {
    expect(maleficentsStaff.missingImplementation).toBe(true);
    expect(maleficentsStaff.missingTests).toBe(true);
  });
});
