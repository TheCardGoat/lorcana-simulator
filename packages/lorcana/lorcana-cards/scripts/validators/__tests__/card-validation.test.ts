import { describe, expect, it } from "bun:test";
import type { CanonicalCard, IdMapping, PipelineIdMapping } from "../../types";
import {
  validateCanonicalIdNames,
  validateFullNameCanonicalId,
  validateIdMapping,
  validatePipelineIdMapping,
  validateUniqueCardIds,
} from "../card-validation";

function minimalCard(overrides: Partial<CanonicalCard> = {}): CanonicalCard {
  return {
    id: "test",
    canonicalId: "t1t",
    name: "Test",
    version: "1",
    inkType: ["amber"],
    cost: 0,
    inkable: false,
    vanilla: true,
    cardType: "character",
    rulesText: "",
    strength: 0,
    willpower: 0,
    lore: 0,
    ...overrides,
  } as CanonicalCard;
}

describe("validatePipelineIdMapping", () => {
  it("returns empty array for valid pipeline mapping", () => {
    const pipelineIdMapping: PipelineIdMapping = {
      byShortId: { abc: "dragon fire", def: "alice" },
      byCanonicalKey: { "dragon fire": "abc", alice: "def" },
      byPrintingId: {},
    };
    expect(validatePipelineIdMapping(pipelineIdMapping)).toEqual([]);
  });

  it("returns error when byShortId and byCanonicalKey are inconsistent", () => {
    const pipelineIdMapping: PipelineIdMapping = {
      byShortId: { s1: "dragon fire" },
      byCanonicalKey: { "dragon fire": "s2" },
      byPrintingId: {},
    };
    const errors = validatePipelineIdMapping(pipelineIdMapping);
    expect(errors.length).toBeGreaterThanOrEqual(1);
    expect(errors.some((e) => e.includes("inconsistent"))).toBe(true);
  });
});

describe("validateIdMapping", () => {
  it("returns empty array for valid mapping", () => {
    const idMapping: IdMapping = {
      byShortId: { abc: "elsa - ice queen", def: "alice - curious" },
      byFullName: { "elsa - ice queen": "abc", "alice - curious": "def" },
    };
    expect(validateIdMapping(idMapping)).toEqual([]);
  });

  it("returns error when duplicate short ID maps to multiple fullNames", () => {
    const idMapping: IdMapping = {
      byShortId: { xyz: "card one" },
      byFullName: { "card one": "xyz", "card two": "xyz" },
    };
    const errors = validateIdMapping(idMapping);
    expect(errors.length).toBeGreaterThanOrEqual(1);
    expect(errors.some((e) => e.includes("Duplicate short ID") && e.includes("xyz"))).toBe(true);
    expect(errors.some((e) => e.includes("card one") && e.includes("card two"))).toBe(true);
  });

  it("returns error when byShortId and byFullName are inconsistent", () => {
    const idMapping: IdMapping = {
      byShortId: { s1: "card one" },
      byFullName: { "card one": "s2" },
    };
    const errors = validateIdMapping(idMapping);
    expect(errors.length).toBeGreaterThanOrEqual(1);
    expect(errors.some((e) => e.includes("inconsistent"))).toBe(true);
  });
});

describe("validateCanonicalIdNames", () => {
  it("returns empty array when all cards have canonicalId and same canonicalId implies same name", () => {
    const cards: Record<string, CanonicalCard> = {
      a: minimalCard({ canonicalId: "ci_1", name: "Card A" }),
      b: minimalCard({ canonicalId: "ci_1", name: "Card A" }),
    };
    expect(validateCanonicalIdNames(cards)).toEqual([]);
  });

  it("returns error when card is missing canonicalId", () => {
    const cards: Record<string, CanonicalCard> = {
      a: minimalCard({ canonicalId: undefined }),
    };
    const errors = validateCanonicalIdNames(cards);
    expect(errors.length).toBe(1);
    expect(errors[0]).toContain("missing canonicalId");
  });

  it("returns error when same canonicalId has cards with different names", () => {
    const cards: Record<string, CanonicalCard> = {
      a: minimalCard({ id: "a", canonicalId: "ci_1", name: "Name One" }),
      b: minimalCard({ id: "b", canonicalId: "ci_1", name: "Name Two" }),
    };
    const errors = validateCanonicalIdNames(cards);
    expect(errors.length).toBe(1);
    expect(errors[0]).toContain("ci_1");
    expect(errors[0]).toContain("different names");
    expect(errors[0]).toContain("Name One");
    expect(errors[0]).toContain("Name Two");
  });

  it("passes when same canonicalId has names that differ only by case (case-insensitive check)", () => {
    const cards: Record<string, CanonicalCard> = {
      a: minimalCard({ id: "a", canonicalId: "ci_1", name: "Heihei" }),
      b: minimalCard({ id: "b", canonicalId: "ci_1", name: "HeiHei" }),
    };
    expect(validateCanonicalIdNames(cards)).toEqual([]);
  });

  it("collects all violations before returning", () => {
    const cards: Record<string, CanonicalCard> = {
      a: minimalCard({ id: "a", canonicalId: undefined }),
      b: minimalCard({ id: "b", canonicalId: "ci_1", name: "X" }),
      c: minimalCard({ id: "c", canonicalId: "ci_1", name: "Y" }),
    };
    const errors = validateCanonicalIdNames(cards);
    expect(errors.length).toBe(2);
    expect(errors.some((e) => e.includes("missing canonicalId"))).toBe(true);
    expect(errors.some((e) => e.includes("different names"))).toBe(true);
  });
});

describe("validateFullNameCanonicalId", () => {
  it("returns empty array when all cards have canonicalId", () => {
    const cards: Record<string, CanonicalCard> = {
      a: minimalCard({ canonicalId: "ci_1" }),
      b: minimalCard({ id: "b", canonicalId: "ci_2" }),
    };
    expect(validateFullNameCanonicalId(cards)).toEqual([]);
  });

  it("returns error when card is missing canonicalId", () => {
    const cards: Record<string, CanonicalCard> = {
      a: minimalCard({ canonicalId: "" }),
    };
    const errors = validateFullNameCanonicalId(cards);
    expect(errors.length).toBe(1);
    expect(errors[0]).toContain("missing canonicalId");
  });
});

describe("validateUniqueCardIds", () => {
  it("returns empty array when all cards have unique ids", () => {
    const cards: Record<string, CanonicalCard> = {
      "set1-104": minimalCard({ id: "set1-104", name: "Aladdin", version: "Heroic Outlaw" }),
      "set1-211-enchanted": minimalCard({
        id: "set1-211-enchanted",
        name: "Aladdin",
        version: "Heroic Outlaw",
      }),
    };
    expect(validateUniqueCardIds(cards)).toEqual([]);
  });

  it("returns error when two cards share the same id", () => {
    const cards: Record<string, CanonicalCard> = {
      "set1-104": minimalCard({ id: "wrC", name: "Aladdin", version: "Heroic Outlaw" }),
      "set1-211-enchanted": minimalCard({
        id: "wrC",
        name: "Aladdin",
        version: "Heroic Outlaw",
      }),
    };
    const errors = validateUniqueCardIds(cards);
    expect(errors.length).toBe(1);
    expect(errors[0]).toContain('Duplicate card id "wrC"');
    expect(errors[0]).toContain("2 cards");
  });
});
