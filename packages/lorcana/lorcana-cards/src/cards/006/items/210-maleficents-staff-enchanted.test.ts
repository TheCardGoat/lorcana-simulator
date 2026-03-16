import { describe, expect, it } from "bun:test";
import { maleficentsStaffEnchanted } from "./210-maleficents-staff-enchanted";

describe("Maleficent's Staff (Enchanted)", () => {
  it("inherits the same blocked return-to-hand trigger gap as the base printing", () => {
    expect(maleficentsStaffEnchanted.missingImplementation).toBe(true);
    expect(maleficentsStaffEnchanted.missingTests).toBe(true);
  });
});
