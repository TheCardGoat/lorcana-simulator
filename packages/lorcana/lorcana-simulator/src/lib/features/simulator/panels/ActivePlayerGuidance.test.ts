import { describe, expect, it } from "bun:test";
import { render } from "svelte/server";

import ActivePlayerGuidance from "@/features/simulator/panels/ActivePlayerGuidance.svelte";

const baseItem = {
  id: "guidance-1",
  message: "Choose who goes first.",
  actions: [],
  mode: "pregame" as const,
  order: 1,
};

describe("ActivePlayerGuidance", () => {
  it("renders mirrored top-hand clearance when guidance is moved above the board", () => {
    const { body } = render(ActivePlayerGuidance, {
      props: {
        items: [baseItem],
        anchor: "top",
      },
    });

    expect(body).toContain("guidance-anchor--top");
    expect(body).toContain("guidance-anchor--hand-target-top");
    expect(body).not.toContain("guidance-anchor--hand-target-bottom");
    expect(body).toContain('data-guidance-position="top"');
    expect(body).toContain("Move guidance to bottom");
  });

  it("preserves bottom-hand clearance for the default position", () => {
    const { body } = render(ActivePlayerGuidance, {
      props: {
        items: [baseItem],
        anchor: "bottom",
      },
    });

    expect(body).toContain("guidance-anchor--bottom");
    expect(body).toContain("guidance-anchor--hand-target-bottom");
    expect(body).not.toContain("guidance-anchor--hand-target-top");
    expect(body).toContain('data-guidance-position="bottom"');
    expect(body).toContain("Move guidance to top");
  });

  it("renders an inline hover reference with bold-underlined styling hooks", () => {
    const { body } = render(ActivePlayerGuidance, {
      props: {
        items: [
          {
            ...baseItem,
            message: "Select a valid target for Dragon Fire.",
            inlineReference: {
              label: "Dragon Fire",
              card: null,
              prefix: "Select a valid target for ",
              suffix: ".",
            },
          },
        ],
      },
    });

    expect(body).toContain("guidance-message-reference");
    expect(body).toContain("Dragon Fire");
    expect(body).toContain("Select a valid target for ");
  });

  it("adds normal-weight copy styling when inline reference content is present", () => {
    const { body } = render(ActivePlayerGuidance, {
      props: {
        items: [
          {
            ...baseItem,
            message:
              "Resolve optional effect from Mulan - Disguised Soldier: WHERE DO I SIGN IN?. When you play this character, you may draw a card, then choose and discard a card.",
            inlineReference: {
              label: "Mulan - Disguised Soldier: WHERE DO I SIGN IN?.",
              card: null,
              prefix: "Resolve optional effect from ",
              suffix:
                " When you play this character, you may draw a card, then choose and discard a card.",
            },
          },
        ],
      },
    });

    expect(body).toContain("guidance-message--with-inline-reference");
    expect(body).toContain("Mulan - Disguised Soldier: WHERE DO I SIGN IN?.");
  });
});
