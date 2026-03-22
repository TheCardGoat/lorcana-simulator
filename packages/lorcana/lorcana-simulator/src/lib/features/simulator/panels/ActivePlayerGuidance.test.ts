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
    expect(body).toContain(">Bottom<");
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
    expect(body).toContain(">Top<");
  });
});
