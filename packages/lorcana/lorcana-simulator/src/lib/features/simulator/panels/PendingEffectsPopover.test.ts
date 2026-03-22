import { describe, expect, it, mock } from "bun:test";
import { render } from "svelte/server";

import PendingEffectsPopover from "@/features/simulator/panels/PendingEffectsPopover.svelte";
import type { PendingEffectsPopoverItem } from "@/features/simulator/panels/PendingEffectsPopover.svelte";

const baseItem: PendingEffectsPopoverItem = {
  id: "pending:1",
  kind: "pending",
  title: "Rapunzel - Gifted with Healing",
  subtitle: "Triggered ability in bag",
  detail: "Select a valid target for this effect.",
  badge: "Pending",
  isActive: true,
  card: {
    cardId: "card-1",
    definitionId: "001-001",
    isMasked: false,
    label: "Rapunzel - Gifted with Healing",
    ownerId: "player_one",
    ownerSide: "playerOne",
    zoneId: "play",
    cardType: "character",
    inkType: ["amber"],
    facePresentation: "faceUp",
    set: "001",
    cardNumber: 18,
  },
  statusMessage: "Selecting targets...",
  onCancel: mock(() => {}),
};

describe("PendingEffectsPopover", () => {
  it("renders middle, top, and bottom dock positions", () => {
    const middle = render(PendingEffectsPopover, {
      props: {
        items: [baseItem],
        open: true,
        initialDockPosition: "middle",
      },
    }).body;

    const top = render(PendingEffectsPopover, {
      props: {
        items: [baseItem],
        open: true,
        initialDockPosition: "top",
      },
    }).body;

    const bottom = render(PendingEffectsPopover, {
      props: {
        items: [baseItem],
        open: true,
        initialDockPosition: "bottom",
      },
    }).body;

    expect(middle).toContain('data-dock-position="middle"');
    expect(middle).toContain("Move to top");
    expect(middle).toContain(">Bottom<");
    expect(top).toContain('data-dock-position="top"');
    expect(top).toContain("Move to bottom");
    expect(top).toContain(">Center<");
    expect(bottom).toContain('data-dock-position="bottom"');
    expect(bottom).toContain("Move to top");
    expect(bottom).toContain(">Center<");
  });

  it("renders the stripped compact layout with art, title, actions, and active styling", () => {
    const { body } = render(PendingEffectsPopover, {
      props: {
        items: [baseItem],
        open: true,
      },
    });

    expect(body).toContain('data-view-mode="compact"');
    expect(body).toContain('data-action-count="1"');
    expect(body).toContain('alt="Rapunzel - Gifted with Healing"');
    expect(body).toContain(
      'aria-label="Open full card preview for Rapunzel - Gifted with Healing"',
    );
    expect(body).toContain(">Cancel<");
    expect(body).toContain("effect-card--active");
    expect(body).not.toContain(">Triggered ability in bag<");
    expect(body).not.toContain(">Active<");
    expect(body).not.toContain("effect-status-message--compact");
    expect(body).not.toContain("effect-card__header");
  });
});
