<script lang="ts">
  import { goto } from "$app/navigation";
  import MatchHistoryContent from "$lib/features/match-history/ui/MatchHistoryContent.svelte";
  import { Button } from "$lib/design-system/primitives/button";
  import ArrowLeft from "@lucide/svelte/icons/arrow-left";

  const PAGE_TITLE = "Match History - Lorcana Simulator";
</script>

<svelte:head>
  <title>{PAGE_TITLE}</title>
</svelte:head>

<div class="px-4 sm:px-6 lg:px-8 min-h-0 flex-1 overflow-y-auto">
  <div class="mx-auto max-w-2xl pb-8 pt-2">
    <div class="mb-4 flex items-center gap-3">
      <Button
        variant="ghost"
        size="sm"
        class="text-slate-400 hover:text-slate-200"
        onclick={() => goto("/matchmaking")}
      >
        <ArrowLeft class="size-4" />
      </Button>
      <h1 class="text-lg font-semibold tracking-tight text-slate-100">Match History</h1>
    </div>
    <MatchHistoryContent />
  </div>
</div>
