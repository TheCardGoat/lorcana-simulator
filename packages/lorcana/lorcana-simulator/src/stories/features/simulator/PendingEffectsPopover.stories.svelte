<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, within } from "storybook/test";

  import PendingEffectsPopover from "@/features/simulator/panels/PendingEffectsPopover.svelte";
  import type { PendingEffectsPopoverItem } from "@/features/simulator/panels/PendingEffectsPopover.svelte";
  import type { LorcanaCardSnapshot } from "@/features/simulator/model/contracts.js";

  const baseCard: LorcanaCardSnapshot = {
    cardId: "card-1",
    definitionId: "maleficent-sorceress",
    facePresentation: "faceUp",
    ownerId: "player-1",
    ownerSide: "playerOne",
    zoneId: "play",
    isMasked: false,
    label: "Maleficent - Sorceress",
    set: "009",
    cardNumber: 18,
    text: "CAST MY SPELL! When you play this character, you may draw a card.",
  };

  const storyItems: PendingEffectsPopoverItem[] = [
    {
      id: "pending:active",
      kind: "pending",
      title: "Maleficent - Sorceress",
      subtitle: "Pending resolution",
      detail: "Resolve this triggered effect.",
      badge: "Pending",
      card: baseCard,
      isActive: true,
      canResolve: true,
      onResolve: () => undefined,
    },
    {
      id: "bag:queued",
      kind: "bag",
      title: "Queued bag effect",
      subtitle: "Triggered ability in bag",
      detail: "Waiting for the current bag resolver.",
      badge: "Bag",
      card: null,
    },
  ];

  function dispatchPointerDrag(
    element: HTMLElement,
    targetWindow: Window,
    pointerId: number,
    from: { x: number; y: number },
    to: { x: number; y: number },
  ): void {
    element.dispatchEvent(
      new PointerEvent("pointerdown", {
        bubbles: true,
        button: 0,
        clientX: from.x,
        clientY: from.y,
        pointerId,
      }),
    );
    targetWindow.dispatchEvent(
      new PointerEvent("pointermove", {
        bubbles: true,
        button: 0,
        clientX: to.x,
        clientY: to.y,
        pointerId,
      }),
    );
    targetWindow.dispatchEvent(
      new PointerEvent("pointerup", {
        bubbles: true,
        button: 0,
        clientX: to.x,
        clientY: to.y,
        pointerId,
      }),
    );
  }

  async function verifyQueueOverlay({
    canvasElement,
    step,
  }: {
    canvasElement: HTMLElement;
    step: (label: string, action: () => void | Promise<void>) => void | Promise<void>;
  }) {
    const canvas = within(canvasElement);
    const targetWindow = canvasElement.ownerDocument.defaultView;
    if (!targetWindow) {
      throw new Error("Window unavailable for queue overlay story.");
    }

    await step("opens expanded with default anchors", async () => {
      const panel = canvas.getByRole("heading", { name: "Pending effects" }).closest("section");
      const reminder = canvasElement.querySelector<HTMLElement>('[data-queue-anchor="reminder"]');
      const panelAnchor = canvasElement.querySelector<HTMLElement>('[data-queue-anchor="panel"]');

      await expect(panel).toBeVisible();
      await expect(reminder).toBeTruthy();
      await expect(panelAnchor).toBeTruthy();
      expect(panel?.getAttribute("data-view-mode")).toBe("normal");
      expect(targetWindow.getComputedStyle(reminder!).top).toBe("16px");
      expect(targetWindow.getComputedStyle(reminder!).right).toBe("16px");
      expect(targetWindow.getComputedStyle(panelAnchor!).right).toBe("16px");
    });

    await step("renders an image thumbnail and placeholder fallback", async () => {
      await expect(canvas.getByAltText("Maleficent - Sorceress")).toBeVisible();
      await expect(canvas.getByText("Bag")).toBeVisible();
    });

    await step("toggles compact mode", async () => {
      const compactButton = canvas.getByRole("button", { name: "Compact" });
      compactButton.click();
      const panel = canvas.getByRole("heading", { name: "Pending effects" }).closest("section");
      expect(panel?.getAttribute("data-view-mode")).toBe("compact");
    });

    await step("drags reminder without moving the panel", async () => {
      const reminder = canvasElement.querySelector<HTMLElement>('[data-queue-anchor="reminder"]');
      const panelAnchor = canvasElement.querySelector<HTMLElement>('[data-queue-anchor="panel"]');
      const initialPanelTransform = panelAnchor?.style.transform ?? "";

      dispatchPointerDrag(reminder!, targetWindow, 11, { x: 40, y: 40 }, { x: 10, y: 120 });

      expect(reminder?.style.transform).not.toBe("translate3d(0px, 0px, 0px)");
      expect(panelAnchor?.style.transform).toBe(initialPanelTransform);
    });

    await step("drags panel without moving the reminder", async () => {
      const reminder = canvasElement.querySelector<HTMLElement>('[data-queue-anchor="reminder"]');
      const panelHeader = canvas.getByLabelText("Pending effects header");
      const initialReminderTransform = reminder?.style.transform ?? "";

      dispatchPointerDrag(panelHeader as HTMLElement, targetWindow, 12, { x: 80, y: 80 }, { x: 30, y: 170 });

      const panelAnchor = canvasElement.querySelector<HTMLElement>('[data-queue-anchor="panel"]');
      expect(panelAnchor?.style.transform).not.toBe("translate3d(0px, 0px, 0px)");
      expect(reminder?.style.transform).toBe(initialReminderTransform);
    });
  }

  const { Story } = defineMeta({
    component: PendingEffectsPopover,
    title: "Lorcana/Pending Effects Popover",
  });
</script>

<div style="position: relative; width: min(100%, 1080px); height: 720px; margin: 0 auto; background: linear-gradient(180deg, #21334e 0%, #120b17 100%); border-radius: 24px; overflow: hidden;">
  <Story
    name="Overlay Behavior"
    args={{
      items: storyItems,
    }}
    play={verifyQueueOverlay}
  />
</div>
