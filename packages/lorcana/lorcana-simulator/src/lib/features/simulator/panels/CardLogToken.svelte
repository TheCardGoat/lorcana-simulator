<script lang="ts">
  import {
    maybeUseSimulatorCardContext,
  } from "@/features/simulator/context/simulator-card-context.svelte.js";
  import { maybeUseLorcanaSidebarPresenter } from "@/features/simulator/context/game-context.svelte.js";
  import CardTextToken from "./CardTextToken.svelte";

  interface CardLogTokenProps {
    cardId: string;
    fallbackLabel?: string;
    fallbackInkType?: string[];
  }

  let { cardId, fallbackLabel, fallbackInkType }: CardLogTokenProps = $props();

  const sidebar = maybeUseLorcanaSidebarPresenter();
  const cardContext = maybeUseSimulatorCardContext();

  const snapshot = $derived(sidebar?.resolveCardSnapshot?.(cardId) ?? null);
  // staticResources.instances knows every dealt card's definition, so the
  // static name resolver MUST NOT be used when the projected snapshot is
  // masked for the current viewer (e.g. an opponent's hand/deck card surfaced
  // in a pending-effect or manual-log row). For move-log entries, hidden
  // references are already stripped from the payload by `privateField`, so
  // the cardId never reaches the token.
  //
  // Non-masked path: prefer localized labels (fallbackLabel populated by the
  // harness adapter, or snapshot.label projected by `#projectCard`) so users
  // on non-English locales see translated names. The static lookup returns
  // the raw English definition name and is only used when no localized label
  // is available — e.g. historical entries whose card has left every
  // projected zone.
  const isMasked = $derived(snapshot?.isMasked === true);
  const staticName = $derived(
    !isMasked ? (sidebar?.resolveCardName?.(cardId) ?? null) : null,
  );
  const label = $derived(
    isMasked
      ? (fallbackLabel ?? snapshot?.label ?? cardId)
      : (fallbackLabel ?? snapshot?.label ?? staticName ?? cardId),
  );
  const inkType = $derived(fallbackInkType ?? snapshot?.inkType);

  function handleHover(): void {
    if (!cardContext) return;
    // Don't set a masked snapshot — GlobalCardPreview hides when isMasked is true,
    // which would suppress any existing pinned/hovered preview instead of showing nothing.
    if (snapshot?.isMasked) return;
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
    // Only clear if handleHover actually set something (masked cards are skipped).
    if (snapshot?.isMasked) return;
    cardContext?.setExternalPreviewCard(null);
  }
</script>

<CardTextToken card={{ label, inkType }} onHover={handleHover} onLeave={handleLeave} />
