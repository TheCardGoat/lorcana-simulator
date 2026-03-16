<script lang="ts">
    import type {LorcanaPlayerSide, LorcanaTableSeat} from "@/features/simulator/model/contracts.js";
  import { cn } from "$lib/utils.js";
    import {DeckStack} from "@/design-system/simulator/cards/index.js";
    import {createZoneAnchorId} from "@/features/simulator/animations/board-move-animations.js";
    import {useLorcanaBoardPresenter} from "@/features/simulator/context/game-context.svelte.js";

  interface DeckZoneProps {
    isOpponent: boolean;
    playerSide: LorcanaPlayerSide;
    seat: LorcanaTableSeat;
    onClick?: () => void;
  }

  let { isOpponent, playerSide, seat, onClick }: DeckZoneProps = $props();

  const board = useLorcanaBoardPresenter();
  const count = $derived(board.getDeckCount(playerSide));
  const ownerId = $derived(board.getOwnerIdForSide(playerSide));
</script>

<button
  type="button"
  class={cn(
    "flex flex-col items-center gap-1 p-2 rounded-lg cursor-pointer transition-all duration-150",
    "border-2",
    isOpponent
      ? "bg-zone-opponent-bg border-zone-opponent-border"
      : "bg-zone-bg border-zone-border",
    "hover:-translate-y-0.5 hover:shadow-lg"
  )}
  style="min-width: calc(var(--zone-card-width, 50px) + 1rem); min-height: calc(var(--zone-card-height, 70px) + 1rem);"
  data-player-seat={seat}
  data-zone-id="deck"
  data-board-anchor-id={createZoneAnchorId(playerSide, "deck")}
  onclick={onClick}
>
  <DeckStack {count} {ownerId} />
</button>
