<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import LorcanaTabletopSimulatorStoryWrapper
      from "@/features/simulator-devtools/storybook/LorcanaTabletopSimulatorStoryWrapper.svelte";

  const { Story } = defineMeta({
    component: LorcanaTabletopSimulatorStoryWrapper,
    parameters: {
      layout: "fullscreen",
    },
    title: "Lorcana/Card Types",
  });
</script>

<Story
  name="All Card Types Combined"
  args={{
    fixtureId: "all-card-types-full-board",
    initialView: "playerOne",
  }}
/>
