<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, userEvent, within } from "storybook/test";
  import LorcanaTabletopSimulatorStoryWrapper
      from "@/features/simulator-devtools/storybook/LorcanaTabletopSimulatorStoryWrapper.svelte";

  async function runPreGameInteractionTest({
    canvasElement,
    step,
  }: {
    canvasElement: HTMLElement;
    step: (label: string, action: () => void | Promise<void>) => void | Promise<void>;
  }) {
    const canvas = within(canvasElement);

    await step("shows the initial first-player choice", async () => {
      await expect(canvas.getByRole("heading", { name: "Available Moves" })).toBeInTheDocument();
      await expect(canvas.getByRole("button", { name: "Player One goes first" })).toBeVisible();
      await expect(canvas.getByRole("button", { name: "Player Two goes first" })).toBeVisible();
    });

    await step("advances to the mulligan step after choosing player one", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "Player One goes first" }));

      await expect(canvas.getByText("Which cards to alter?")).toBeVisible();
      await expect(canvas.getByRole("button", { name: "Keep hand" })).toBeVisible();
      await expect(canvas.getByRole("button", { name: "Alter all cards" })).toBeVisible();
      await expect(canvas.getByRole("button", { name: "Alter 0 Cards" })).toBeDisabled();
      await expect(canvas.getByRole("button", { name: /Hades - Looking for a Deal, cost 5/i })).toBeVisible();
    });
  }

  async function assertPlayerHandVisible({ canvasElement }: { canvasElement: HTMLElement }) {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId("hand-zone-playerOne")).toBeVisible();
  }

  const { Story } = defineMeta({
    component: LorcanaTabletopSimulatorStoryWrapper,
    parameters: {
      layout: "fullscreen",
    },
    title: "Lorcana/Board States",
  });
</script>

<Story
        name="Pre Game"
        args={{
        fixtureId: "pre-game",
        initialView: "playerOne",
  }}
/>

<Story
  name="Pre Game Interaction Test"
  args={{
    fixtureId: "pre-game",
    initialView: "playerOne",
  }}
  play={runPreGameInteractionTest}
/>

<Story
  name="Empty Board"
  args={{
    fixtureId: "empty-board",
    initialView: "playerOne",
  }}
/>

<Story
  name="Opening Hand"
  args={{
    fixtureId: "opening-hand",
    initialView: "playerOne",
  }}
/>

<Story
  name="Opening Hand Desktop 1440x900"
  args={{
    fixtureId: "opening-hand",
    initialView: "playerOne",
    frameWidth: "1440px",
    frameHeight: "900px",
  }}
  play={assertPlayerHandVisible}
/>

<Story
  name="Opening Hand Tablet 768x1024"
  args={{
    fixtureId: "opening-hand",
    initialView: "playerOne",
    frameWidth: "768px",
    frameHeight: "1024px",
  }}
  play={assertPlayerHandVisible}
/>

<Story
  name="Opening Hand Mobile 390x844"
  args={{
    fixtureId: "opening-hand",
    initialView: "playerOne",
    frameWidth: "390px",
    frameHeight: "844px",
  }}
  play={assertPlayerHandVisible}
/>

<Story
  name="Opening Skirmish"
  args={{
    fixtureId: "opening-skirmish",
    initialView: "playerOne",
  }}
/>

<Story
  name="Board Pressure"
  args={{
    fixtureId: "board-pressure",
    initialView: "authoritative",
  }}
/>

<Story
  name="Late Game"
  args={{
    fixtureId: "late-game",
    initialView: "playerOne",
  }}
/>

<Story
  name="Win State"
  args={{
    fixtureId: "win-state",
    initialView: "playerOne",
  }}
/>
