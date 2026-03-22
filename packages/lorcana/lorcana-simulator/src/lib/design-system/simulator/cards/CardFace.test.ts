import { describe, expect, it } from "bun:test";
import { render } from "svelte/server";
import type { LorcanaCardSnapshot } from "@/features/simulator/model/contracts.js";
import CardFaceTestHost from "./CardFace.test-host.svelte";

function createCardSnapshot(overrides: Partial<LorcanaCardSnapshot> = {}): LorcanaCardSnapshot {
  return {
    cardId: "card-1",
    definitionId: "def-card-1",
    facePresentation: "faceUp",
    isMasked: false,
    label: "Darkwing Duck - Cool Under Pressure",
    ownerId: "player-two",
    ownerSide: "playerTwo",
    zoneId: "play",
    cardType: "character",
    strength: 6,
    baseStrength: 6,
    willpower: 8,
    baseWillpower: 8,
    loreValue: 2,
    baseLoreValue: 2,
    readyState: "ready",
    damage: 0,
    ...overrides,
  };
}

describe("CardFace", () => {
  it("renders centered damage, bottom-right stat modifiers, and bottom-left non-stat tags", () => {
    const { body } = render(CardFaceTestHost, {
      props: {
        card: createCardSnapshot({
          damage: 3,
          strength: 2,
          willpower: 10,
          loreValue: 3,
          readyState: "exerted",
          isDrying: true,
        }),
        damage: 3,
        displayWidth: 132,
        displayHeight: 184,
        aspectRatio: 734 / 1024,
      },
    });

    expect(body).toContain('data-testid="card-face-damage-indicator"');
    expect(body).toContain('data-testid="card-face-stat-modifiers"');
    expect(body).toContain('data-testid="card-face-stat-modifier-strength"');
    expect(body).toContain('data-testid="card-face-stat-modifier-willpower"');
    expect(body).toContain('data-testid="card-face-stat-modifier-lore"');
    expect(body).toContain(">-4</span>");
    expect(body).toContain(">+2</span>");
    expect(body).toContain(">+1</span>");
    expect(body).toContain('data-testid="card-face-tag-strip"');
    expect(body).toContain('aria-label="Fresh Ink"');
    expect(body).toContain('aria-label="Exerted"');
    expect(body).not.toContain('aria-label="Damaged 3"');
  });

  it("renders stat modifiers in lore-strength-willpower order", () => {
    const { body } = render(CardFaceTestHost, {
      props: {
        card: createCardSnapshot({
          strength: 10,
          willpower: 6,
          loreValue: 5,
        }),
        displayWidth: 132,
        displayHeight: 184,
        aspectRatio: 734 / 1024,
      },
    });

    expect(body).toContain('data-testid="card-face-stat-modifier-strength"');
    expect(body).toContain('data-testid="card-face-stat-modifier-willpower"');
    expect(body).toContain('data-testid="card-face-stat-modifier-lore"');
    expect(body).not.toContain('data-testid="card-face-tag-strip"');
    expect(body.indexOf('data-testid="card-face-stat-modifier-lore"')).toBeLessThan(
      body.indexOf('data-testid="card-face-stat-modifier-strength"'),
    );
    expect(body.indexOf('data-testid="card-face-stat-modifier-strength"')).toBeLessThan(
      body.indexOf('data-testid="card-face-stat-modifier-willpower"'),
    );
  });

  it("uses the art-only asset path when requested", () => {
    const { body } = render(CardFaceTestHost, {
      props: {
        card: createCardSnapshot({
          set: "004",
          cardNumber: 128,
        }),
        displayWidth: 132,
        displayHeight: 108,
        imageFormat: "art_only",
        aspectRatio: 734 / 602,
      },
    });

    expect(body).toContain("https://r2.tcg.online/public/lorcana/004/art_only/128.webp");
  });
});
