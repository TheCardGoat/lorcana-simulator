<script lang="ts">
  import type { Snippet } from "svelte";
  import type {
    CardActionView,
    LorcanaCardSnapshot,
    LorcanaCardTextEntrySnapshot,
    LorcanaSimulatorMoveParams,
  } from "@/features/simulator/model/contracts.js";
  import CardTagStrip from "@/design-system/simulator/cards/CardTagStrip.svelte";
  import { getLorcanaCardTags } from "./card-tags.js";
  import {getInkHex, getInkRgb} from "@/features/simulator/model/lorcana-colors.js";
  import {getInkSymbolUrl, getRarityIconUrl, getStatIconUrl} from "@/features/simulator/model/asset-urls.js";
  import type {LorcanaInkName} from "@/features/simulator/model/lorcana-colors.js";

  interface CardHoverCardContentProps {
    card: LorcanaCardSnapshot;
    actions?: CardActionView[];
    contextMessage?: string | null;
    onAction?: (action: CardActionView) => void;
    headerActions?: Snippet;
  }

  let {
    card,
    actions = [],
    contextMessage = null,
    onAction,
    headerActions,
  }: CardHoverCardContentProps = $props();

  interface RenderableRulesEntry extends LorcanaCardTextEntrySnapshot {
    kind: "keyword" | "ability";
    textEntryIndex: number;
  }

  interface TextToken {
    type: "text" | "symbol";
    value: string;
  }

  const TEXT_SYMBOL_BASE_URL = "https://r2.tcg.online/public/lorcana/simulator/symbols";
  const TEXT_SYMBOLS: Record<string, string> = {
    E: "exert.svg",
    W: "defense.svg",
    L: "inkpot.svg",
    S: "strength.svg",
    I: "cost.svg",
  };
  const TEXT_SYMBOL_PATTERN = /\{([EWLSI])\}/gi;

  const SIMPLE_KEYWORD_PATTERN = /^(Rush|Ward|Evasive|Bodyguard|Support|Reckless|Vanish|Alert)$/i;
  const CHALLENGER_PATTERN = /^Challenger \+(\d+)$/i;
  const RESIST_PATTERN = /^Resist \+(\d+)$/i;
  const SINGER_PATTERN = /^Singer (\d+)$/i;
  const SING_TOGETHER_PATTERN = /^Sing Together (\d+)$/i;
  const BOOST_PATTERN = /^Boost (\d+)(?: \{I\})?$/i;
  const SHIFT_PATTERN = /^(Shift|Puppy Shift|Universal Shift) (\d+)(?: \{I\})?$/i;

  function isKeywordTitle(title: string): boolean {
    const normalized = title.trim();
    if (!normalized) {
      return false;
    }

    return (
      SIMPLE_KEYWORD_PATTERN.test(normalized) ||
      CHALLENGER_PATTERN.test(normalized) ||
      RESIST_PATTERN.test(normalized) ||
      SINGER_PATTERN.test(normalized) ||
      SING_TOGETHER_PATTERN.test(normalized) ||
      BOOST_PATTERN.test(normalized) ||
      SHIFT_PATTERN.test(normalized)
    );
  }

  function formatCardType(type: string | undefined): string {
    if (!type) return "Card";
    return type.charAt(0).toUpperCase() + type.slice(1);
  }

  function getTypeLineLabel(cardSnapshot: LorcanaCardSnapshot): string {
    const classifications = cardSnapshot.classifications?.filter((classification) =>
      Boolean(classification?.trim()),
    );

    if (classifications && classifications.length > 0) {
      return classifications.join(" · ");
    }

    return formatCardType(cardSnapshot.cardType);
  }

  function normalizeInk(ink: string): LorcanaInkName {
    const normalized = ink.toLowerCase() as LorcanaInkName;
    // Validate it's a valid ink type
    if (["amber", "amethyst", "emerald", "ruby", "sapphire", "steel"].includes(normalized)) {
      return normalized;
    }
    return "amber"; // fallback
  }

  function tokenizeTextWithSymbols(text: string | undefined): TextToken[] {
    if (!text) {
      return [];
    }

    const tokens: TextToken[] = [];
    let lastIndex = 0;

    for (const match of text.matchAll(TEXT_SYMBOL_PATTERN)) {
      const [fullMatch, symbolCode] = match;
      const start = match.index ?? 0;
      const symbolFile = TEXT_SYMBOLS[symbolCode.toUpperCase()];

      if (start > lastIndex) {
        tokens.push({ type: "text", value: text.slice(lastIndex, start) });
      }

      if (symbolFile) {
        tokens.push({ type: "symbol", value: symbolFile });
      } else {
        tokens.push({ type: "text", value: fullMatch });
      }

      lastIndex = start + fullMatch.length;
    }

    if (lastIndex < text.length) {
      tokens.push({ type: "text", value: text.slice(lastIndex) });
    }

    return tokens;
  }

  function isActivateAbilityMove(
    move: CardActionView["moves"][number] | undefined,
  ): move is CardActionView["moves"][number] & {
    moveId: "activateAbility";
    params: LorcanaSimulatorMoveParams["activateAbility"];
  } {
    return move?.moveId === "activateAbility";
  }

  // Derived state
  const primaryInk = $derived(normalizeInk(card.inkType?.[0] ?? "amber"));
  const inkColor = $derived(getInkHex(primaryInk));
  const inkRgb = $derived(getInkRgb(primaryInk));
  const effectiveWillpower = $derived((card.willpower ?? 0) - (card.damage ?? 0));
  const hasCharacterStats = $derived(
    card.cardType === "character" &&
      (card.strength !== undefined || card.willpower !== undefined || card.loreValue !== undefined),
  );
  const textEntries = $derived(
    (card.textEntries ?? []).reduce<RenderableRulesEntry[]>((entries, entry, textEntryIndex) => {
      const title = entry.title.trim();
      if (!title) {
        return entries;
      }

      const description = entry.description?.trim();
      entries.push({
        title,
        ...(description ? { description } : {}),
        kind: isKeywordTitle(title) ? "keyword" : "ability",
        textEntryIndex,
      });

      return entries;
    }, []),
  );
  const hasStructuredText = $derived(textEntries.length > 0);
  const activatedAbilityActionsByIndex = $derived(
    new Map(
      actions.flatMap((action) => {
        if (action.categoryId !== "activate-ability") {
          return [];
        }

        return action.moves.flatMap((move) => {
          if (!isActivateAbilityMove(move)) {
            return [];
          }

          const abilityIndex =
            typeof move.params.abilityIndex === "number" ? move.params.abilityIndex : 0;
          return [[abilityIndex, action]] as const;
        });
      }),
    ),
  );
  const nonAbilityActions = $derived(actions.filter((action) => action.categoryId !== "activate-ability"));
  const cardText = $derived(card.text?.trim() ?? "");
  const hasActions = $derived(nonAbilityActions.length > 0);
  const hasTextBoxContent = $derived(hasStructuredText || Boolean(cardText) || hasActions);
  const cardTags = $derived(getLorcanaCardTags(card));
</script>

<div
  class="card-skeleton"
  style="--ink-color: {inkColor}; --ink-rgb: {inkRgb.replace('rgb(', '').replace(')', '')};"
>
  {#if headerActions}
    <div class="card-utility-actions">
      {@render headerActions()}
    </div>
  {/if}

  <!-- Name Banner -->
  <div class="name-banner">
    <img src={getInkSymbolUrl(primaryInk)} alt="" class="banner-ink" />
    <span class="card-name">
      {#if card.label.includes(" - ")}
        {@const [name, version] = card.label.split(" - ")}
        <span class="name-text">{name}</span>
        <span class="version-text">{version}</span>
      {:else}
        <span class="name-text">{card.label}</span>
      {/if}
    </span>
  </div>

  {#if hasCharacterStats}
    <!-- Combined Type + Stats Row -->
    <div class="meta-row">
      <div class="type-line type-line--compact">
        <span class="card-type">{getTypeLineLabel(card)}</span>
        {#if card.inkType && card.inkType.length > 0}
          <span class="separator">·</span>
          <div class="ink-icons">
            {#each card.inkType as ink (ink)}
              <img src={getInkSymbolUrl(ink)} alt={ink} title={ink} class="ink-icon-small" />
            {/each}
          </div>
        {/if}
      </div>

      <div class="stats-row stats-row--compact">
        <div class="cost-hexagon">
          <img src={getInkSymbolUrl(primaryInk)} alt="" class="ink-bg" />
          <span class="cost-value">{card.cost ?? 0}</span>
        </div>
        {#if card.rarity}
          <img src={getRarityIconUrl(card.rarity)} alt={card.rarity} class="rarity-icon" />
        {/if}
        {#if card.strength !== undefined}
          <div class="stat-box stat-strength">
            <img src={getStatIconUrl("strength")} alt="Strength" class="stat-icon" />
            <span class="stat-value">{card.strength}</span>
          </div>
        {/if}
        {#if card.willpower !== undefined}
          <div class="stat-box stat-willpower">
            <img src={getStatIconUrl("defense")} alt="Willpower" class="stat-icon" />
            <span class="stat-value">{effectiveWillpower}</span>
          </div>
        {/if}
        {#if card.loreValue !== undefined}
          <div class="stat-box stat-lore">
            <span class="lore-icon">◆</span>
            <span class="stat-value">{card.loreValue}</span>
          </div>
        {/if}
      </div>
    </div>
  {:else}
    <!-- Type Line -->
    <div class="type-line">
      <span class="card-type">{getTypeLineLabel(card)}</span>
      {#if card.inkType && card.inkType.length > 0}
        <span class="separator">·</span>
        <div class="ink-icons">
          {#each card.inkType as ink (ink)}
            <img src={getInkSymbolUrl(ink)} alt={ink} title={ink} class="ink-icon-small" />
          {/each}
        </div>
      {/if}
    </div>
  {/if}

  {#if contextMessage}
    <div class="context-banner">
      <span class="context-banner__label">Unavailable</span>
      <span class="context-banner__message">{contextMessage}</span>
    </div>
  {/if}

  <!-- Text Box -->
  {#if hasTextBoxContent}
    <div class="text-box">
      {#if hasStructuredText}
        {#each textEntries as entry, index (`${entry.title}-${index}`)}
          {@const entryAction =
            entry.kind === "ability" ? activatedAbilityActionsByIndex.get(entry.textEntryIndex) : undefined}
          {#if entryAction}
            <button
              type="button"
              class="rules-entry rules-entry--action rules-entry--inline-ability"
              class:rules-entry--action-disabled={!entryAction.enabled}
              disabled={!entryAction.enabled}
              onclick={() => onAction?.(entryAction)}
              aria-label={entryAction.reason ? `${entryAction.label}: ${entryAction.reason}` : entryAction.label}
              title={entryAction.reason ?? entryAction.label}
            >
              <span class="ability-title">
                {#each tokenizeTextWithSymbols(entry.title) as token, tokenIndex (`${token.type}-${token.value}-${tokenIndex}`)}
                  {#if token.type === "symbol"}
                    <img
                      src={`${TEXT_SYMBOL_BASE_URL}/${token.value}`}
                      alt=""
                      class="inline-symbol inline-symbol--ability-title"
                    />
                  {:else}
                    {token.value}
                  {/if}
                {/each}
              </span>
              {#if entry.description}
                <span class="entry-description">
                  {#each tokenizeTextWithSymbols(entry.description) as token, tokenIndex (`${token.type}-${token.value}-${tokenIndex}`)}
                    {#if token.type === "symbol"}
                      <img
                        src={`${TEXT_SYMBOL_BASE_URL}/${token.value}`}
                        alt=""
                        class="inline-symbol inline-symbol--description"
                      />
                    {:else}
                      {token.value}
                    {/if}
                  {/each}
                </span>
              {/if}
            </button>
          {:else}
            <p class="rules-entry rules-entry--{entry.kind}">
              {#if entry.kind === "ability"}
                <span class="ability-title">
                  {#each tokenizeTextWithSymbols(entry.title) as token, tokenIndex (`${token.type}-${token.value}-${tokenIndex}`)}
                    {#if token.type === "symbol"}
                      <img
                        src={`${TEXT_SYMBOL_BASE_URL}/${token.value}`}
                        alt=""
                        class="inline-symbol inline-symbol--ability-title"
                      />
                    {:else}
                      {token.value}
                    {/if}
                  {/each}
                </span>
              {:else}
                <span class="keyword-title">
                  {#each tokenizeTextWithSymbols(entry.title) as token, tokenIndex (`${token.type}-${token.value}-${tokenIndex}`)}
                    {#if token.type === "symbol"}
                      <img
                        src={`${TEXT_SYMBOL_BASE_URL}/${token.value}`}
                        alt=""
                        class="inline-symbol inline-symbol--title"
                      />
                    {:else}
                      {token.value}
                    {/if}
                  {/each}
                </span>
              {/if}
              {#if entry.description}
                <span class="entry-description">
                  {#each tokenizeTextWithSymbols(entry.description) as token, tokenIndex (`${token.type}-${token.value}-${tokenIndex}`)}
                    {#if token.type === "symbol"}
                      <img
                        src={`${TEXT_SYMBOL_BASE_URL}/${token.value}`}
                        alt=""
                        class="inline-symbol inline-symbol--description"
                      />
                    {:else}
                      {token.value}
                    {/if}
                  {/each}
                </span>
              {/if}
            </p>
          {/if}
        {/each}
      {:else if cardText}
        <p class="ability-text">
          {#each tokenizeTextWithSymbols(cardText) as token, tokenIndex (`${token.type}-${token.value}-${tokenIndex}`)}
            {#if token.type === "symbol"}
              <img src={`${TEXT_SYMBOL_BASE_URL}/${token.value}`} alt="" class="inline-symbol inline-symbol--body" />
            {:else}
              {token.value}
            {/if}
          {/each}
        </p>
      {/if}

      {#each nonAbilityActions as action (action.id)}
        <button
          type="button"
          class="rules-entry rules-entry--action rules-entry--inline-ability"
          class:rules-entry--action-disabled={!action.enabled}
          disabled={!action.enabled}
          onclick={() => onAction?.(action)}
          aria-label={action.reason ? `${action.label}: ${action.reason}` : action.label}
          title={action.reason ?? action.label}
        >
          <span class="ability-title">{action.label}</span>
          {#if action.detail}
            <span class="entry-description">{action.detail}</span>
          {/if}
          {#if action.reason && !action.enabled}
            <span class="entry-description">{action.reason}</span>
          {/if}
        </button>
      {/each}
    </div>
  {/if}

  {#if cardTags.length > 0}
    <div class="tag-section">
      <CardTagStrip tags={cardTags} />
    </div>
  {/if}
</div>

<style>
  .card-skeleton {
    --ink-color: #888;
    --ink-rgb: 136, 136, 136;

    position: relative;
    width: min(100%, 22rem);
    margin: 0 auto;
    background: linear-gradient(180deg, #2a2a3e 0%, #1a1a28 100%);
    border-radius: 16px;
    border: 3px solid var(--ink-color);
    padding: 12px;
    /*font-family: system-ui, -apple-system, sans-serif;*/
    box-shadow:
      0 4px 20px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.05) inset;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .card-utility-actions {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    z-index: 3;
  }

  .tag-section {
    padding-top: 2px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .context-banner {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 0.65rem 0.75rem;
    border-radius: 0.85rem;
    border: 1px solid rgba(244, 114, 114, 0.35);
    background:
      linear-gradient(180deg, rgba(127, 29, 29, 0.34) 0%, rgba(69, 10, 10, 0.34) 100%),
      rgba(24, 24, 35, 0.5);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }

  .context-banner__label {
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(254, 202, 202, 0.92);
  }

  .context-banner__message {
    font-size: 0.82rem;
    line-height: 1.35;
    color: rgba(254, 242, 242, 0.95);
  }

  /* Top Row: Cost + Rarity */
  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .cost-hexagon {
    width: 38px;
    height: 42px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    /* Hexagonal shape */
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    background: var(--ink-color);
    box-shadow: 0 2px 8px rgba(var(--ink-rgb), 0.4);
  }

  .cost-hexagon .ink-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.3;
  }

  .cost-value {
    position: relative;
    z-index: 1;
    font-size: 1.1rem;
    font-weight: 800;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }

  .rarity-icon {
    width: 28px;
    height: 28px;
    object-fit: contain;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  }

  /* Art Frame */
  .art-frame {
    aspect-ratio: 4 / 3;
    background: linear-gradient(
      180deg,
      rgba(var(--ink-rgb), 0.25) 0%,
      rgba(var(--ink-rgb), 0.1) 50%,
      rgba(var(--ink-rgb), 0.05) 100%
    );
    border-radius: 10px;
    border: 2px solid rgba(var(--ink-rgb), 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .art-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .art-label {
    font-size: 1rem;
    font-weight: 600;
    color: rgba(var(--ink-rgb), 0.6);
    text-align: center;
    padding: 8px;
  }

  /* Name Banner */
  .name-banner {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: linear-gradient(
      90deg,
      rgba(var(--ink-rgb), 0.9) 0%,
      rgba(var(--ink-rgb), 0.7) 50%,
      rgba(var(--ink-rgb), 0.5) 100%
    );
    border-radius: 8px;
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.2),
      0 1px 0 rgba(255, 255, 255, 0.1) inset;
  }

  .banner-ink {
    width: 20px;
    height: 20px;
    filter: brightness(0) invert(1);
    opacity: 0.9;
  }

  .card-name {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    min-width: 0;
  }

  .name-text {
    font-size: 0.95rem;
    /*font-family:*/
    /*  var(--lorcana-font-card-name, "The Bystander Collection Sans Medium", "Bogle", sans-serif);*/
    font-weight: 500;
    color: white;
    line-height: 1.2;
    overflow-wrap: break-word;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }

  .version-text {
    font-size: 0.7rem;
    /*font-family:*/
    /*  var(--lorcana-font-card-version, "Brandon Text Condensed Bold", "Bogle", sans-serif);*/
    font-weight: 700;
    color: rgba(255, 255, 255, 0.75);
    font-style: normal;
  }

  /* Type Line */
  .type-line {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    background: rgba(var(--ink-rgb), 0.15);
    border-radius: 6px;
    border-left: 3px solid var(--ink-color);
  }

  .meta-row {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .type-line--compact {
    flex: 1;
    min-width: 0;
    padding: 4px 7px;
    gap: 4px;
    border-left-width: 2px;
  }

  .type-line--compact .card-type {
    font-size: 0.63rem;
    letter-spacing: 0.045em;
  }

  .type-line--compact .separator {
    opacity: 0.7;
  }

  .type-line--compact .ink-icons {
    gap: 3px;
  }

  .type-line--compact .ink-icon-small {
    width: 12px;
    height: 12px;
  }

  .card-type {
    font-size: 0.75rem;
    /*font-family:*/
    /*  var(--lorcana-font-card-types, "Brandon Text Condensed Black Italic", "Bogle", sans-serif);*/
    font-style: italic;
    font-weight: 900;
    color: rgba(var(--ink-rgb), 1);
    text-transform: none;
    letter-spacing: 0.05em;
  }

  .separator {
    color: rgba(255, 255, 255, 0.4);
  }

  .ink-icons {
    display: flex;
    gap: 4px;
    align-items: center;
  }

  .ink-icon-small {
    width: 16px;
    height: 16px;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
  }

  /* Stats Row */
  .stats-row {
    display: flex;
    justify-content: center;
    gap: 12px;
    padding: 8px 0;
  }

  .stats-row--compact {
    justify-content: flex-end;
    gap: 4px;
    padding: 0;
    flex-shrink: 0;
    white-space: nowrap;
  }

  .stats-row--compact .cost-hexagon {
    width: 26px;
    height: 29px;
  }

  .stats-row--compact .cost-value {
    font-size: 0.85rem;
  }

  .stats-row--compact .rarity-icon {
    width: 16px;
    height: 16px;
  }

  .stats-row--compact .stat-box {
    gap: 4px;
    padding: 3px 7px;
    border-radius: 14px;
  }

  .stats-row--compact .stat-icon {
    width: 12px;
    height: 12px;
  }

  .stats-row--compact .stat-value {
    font-size: 0.74rem;
  }

  .stats-row--compact .lore-icon {
    font-size: 0.75rem;
  }

  .stat-box {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .stat-icon {
    width: 18px;
    height: 18px;
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.3));
  }

  .stat-value {
    font-size: 0.9rem;
    font-weight: 700;
    color: white;
  }

  .stat-strength {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, rgba(185, 28, 28, 0.3) 100%);
    border-color: rgba(239, 68, 68, 0.4);
  }

  .stat-strength .stat-value {
    color: #fca5a5;
  }

  .stat-willpower {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(37, 99, 235, 0.3) 100%);
    border-color: rgba(59, 130, 246, 0.4);
  }

  .stat-willpower .stat-value {
    color: #93c5fd;
  }

  .stat-lore {
    background: linear-gradient(135deg, rgba(251, 191, 36, 0.3) 0%, rgba(217, 119, 6, 0.3) 100%);
    border-color: rgba(251, 191, 36, 0.4);
  }

  .lore-icon {
    font-size: 1rem;
    color: #fcd34d;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
  }

  .stat-lore .stat-value {
    color: #fcd34d;
  }

  /* Text Box - Parchment Style */
  .text-box {
    background: linear-gradient(180deg, #d4c4a8 0%, #c4b498 100%);
    border-radius: 8px;
    padding: 10px;
    border: 1px solid rgba(139, 90, 43, 0.3);
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.15) inset,
      0 1px 0 rgba(255, 255, 255, 0.3) inset;
  }

  .rules-entry {
    margin: 0;
    font-size: 0.72rem;
    line-height: 1.5;
    color: #2a2a28;
    word-break: break-word;
  }

  .rules-entry + .rules-entry {
    margin-top: 0.42rem;
  }

  .rules-entry--action {
    width: 100%;
    border: 0;
    padding: 0.34rem 0.42rem;
    background: transparent;
    text-align: left;
    cursor: pointer;
    display: block;
    border-radius: 0.55rem;
    transition:
      transform 140ms ease,
      background 140ms ease,
      box-shadow 140ms ease;
  }

  .rules-entry--action:hover:enabled {
    background: linear-gradient(180deg, rgba(123, 63, 27, 0.14) 0%, rgba(92, 46, 18, 0.08) 100%);
    box-shadow:
      0 0 0 1px rgba(123, 63, 27, 0.26),
      0 6px 14px rgba(92, 46, 18, 0.16);
    transform: translateX(2px) translateY(-1px);
  }

  .rules-entry--action:hover:enabled .entry-description {
    color: #1d1711;
  }

  .rules-entry--inline-ability {
    position: relative;
    margin-inline: -0.35rem;
    padding-inline: 0.42rem;
  }

  .rules-entry--action:hover:enabled .ability-title {
    filter: brightness(1.12);
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.12),
      0 4px 10px rgba(58, 20, 7, 0.2);
  }

  .rules-entry--action-disabled {
    cursor: not-allowed;
    opacity: 0.72;
  }

  .rules-entry--action-disabled .ability-title {
    background: rgba(77, 65, 53, 0.9);
    color: rgba(247, 239, 224, 0.78);
  }

  .keyword-title {
    /*font-family:*/
    /*  var(--lorcana-font-keyword-title, "Brandon Text Condensed Black", "Bogle", sans-serif);*/
    font-weight: 800;
    color: #1f1a14;
  }

  .rules-entry--keyword .entry-description {
    /*font-family:*/
    /*  var(--lorcana-font-keyword-reminder, "Brandon Text Condensed Medium Italic", "Bogle",*/
    /*    sans-serif);*/
    margin-left: 0.22rem;
    font-style: italic;
    font-weight: 500;
  }

  .rules-entry--ability .entry-description {
    margin-left: 0.34rem;
    font-style: normal;
  }

  .rules-entry--action .entry-description {
    margin-left: 0.34rem;
    font-style: normal;
  }

  .ability-title {
    display: inline-block;
    padding: 0.08rem 0.36rem 0.1rem;
    border-radius: 0 0 10px 0;
    background: var(--lorcana-card-ability-title-bg);
    color: #f7efe0;
    font-size: 0.68rem;
    font-weight: 900;
    line-height: 1.2;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    vertical-align: baseline;
  }

  .ability-text {
    margin: 0;
    font-size: 0.72rem;
    line-height: 1.5;
    color: #2a2a28;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .inline-symbol {
    display: inline-block;
    width: 0.86em;
    height: 0.86em;
    margin: 0 0.08em;
    vertical-align: -0.11em;
    object-fit: contain;
  }

  .inline-symbol--ability-title {
    width: 0.88em;
    height: 0.88em;
    vertical-align: -0.08em;
  }

  .inline-symbol--title {
    width: 0.86em;
    height: 0.86em;
  }

  .inline-symbol--description,
  .inline-symbol--body {
    width: 0.9em;
    height: 0.9em;
  }

  /* Footer */
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 4px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.65rem;
    color: rgba(255, 255, 255, 0.4);
  }

  .set-code {
    font-weight: 600;
    text-transform: uppercase;
  }

  .card-number {
    opacity: 0.7;
  }

  /* Action Buttons */
  .action-buttons {
    display: flex;
    gap: 8px;
    margin-top: 4px;
  }

  .action-btn {
    flex: 1;
    padding: 8px 12px;
    border: none;
    border-radius: 8px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .action-btn--play {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
  }

  .action-btn--play:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
  }

  .action-btn--play:active {
    transform: translateY(0);
  }
</style>
