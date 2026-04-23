<script lang="ts">
  import { goto } from "$app/navigation";
  import DeckVaultContent from "$lib/features/deck-vault/ui/DeckVaultContent.svelte";
  import { getMatchmakingLobbyContext } from "$lib/features/matchmaking/ui/useMatchmakingLobbyController.svelte.js";

  const PAGE_TITLE = "Deck Vault - Lorcana Simulator";
  const controller = getMatchmakingLobbyContext();
</script>

<svelte:head>
  <title>{PAGE_TITLE}</title>
</svelte:head>

<div class="px-4 sm:px-6 lg:px-8 min-h-0 flex-1 overflow-y-auto">
  <DeckVaultContent
    playerContext={controller.playerContext}
    selectionDisabled={controller.deckSelection.selectionDisabled}
    onBack={() => goto("/matchmaking")}
  />
</div>
