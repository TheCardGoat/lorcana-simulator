<script lang="ts">
  import { useSimulatorCardContext } from "@/features/simulator/context/simulator-card-context.svelte.js";
  import { useLorcanaSidebarPresenter } from "@/features/simulator/context/game-context.svelte.js";
  import CardTextToken from "./CardTextToken.svelte";

  interface CardLogTokenProps {
    cardId: string;
    fallbackLabel?: string;
    fallbackInkType?: string[];
  }

  let { cardId, fallbackLabel, fallbackInkType }: CardLogTokenProps = $props();

  const sidebar = useLorcanaSidebarPresenter();
  const cardContext = useSimulatorCardContext();

  const snapshot = $derived(sidebar.cardSnapshotsById[cardId] ?? null);
  const label = $derived(snapshot?.label ?? fallbackLabel ?? cardId);
  const inkType = $derived(snapshot?.inkType ?? fallbackInkType);

  function handleHover(): void {
    if (snapshot) {
      cardContext.setExternalPreviewCard(snapshot);
      return;
    }
    cardContext.setExternalPreviewCard({
      cardId,
      definitionId: cardId,
      label: fallbackLabel ?? cardId,
      ownerId: "",
      ownerSide: "playerOne",
      zoneId: "play",
      isMasked: false,
      facePresentation: "faceUp",
      inkType: fallbackInkType,
    });
  }

  function handleLeave(): void {
    cardContext.setExternalPreviewCard(null);
  }
</script>

<CardTextToken card={{ label, inkType }} onHover={handleHover} onLeave={handleLeave} />
