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
import {
	getInkHex,
	getInkRgb,
} from "@/features/simulator/model/lorcana-colors.js";
import {
	getInkableIconUrl,
	getInkSymbolUrl,
	getLoreIconUrl,
	getStatSmallIconUrl,
} from "@/features/simulator/model/asset-urls.js";
import { buildSimulatorAssetUrl } from "$lib/config/public-url-config.js";
import type { LorcanaInkName } from "@/features/simulator/model/lorcana-colors.js";
import { getCardActionCategoryIcon } from "@/features/simulator/model/action-icons.js";
import { maybeUseLorcanaBoardPresenter } from "@/features/simulator/context/game-context.svelte.js";
import { maybeUseSimulatorCardContext } from "@/features/simulator/context/simulator-card-context.svelte.js";

interface CardHoverCardContentProps {
	card: LorcanaCardSnapshot;
	actions?: CardActionView[];
	contextMessage?: string | null;
	locationOccupants?: LorcanaCardSnapshot[];
	onAction?: (action: CardActionView) => void;
	headerActions?: Snippet;
}

let {
	card,
	actions = [],
	contextMessage = null,
	locationOccupants,
	onAction,
	headerActions,
}: CardHoverCardContentProps = $props();

interface RenderableRulesEntry extends LorcanaCardTextEntrySnapshot {
	kind: "keyword" | "ability";
	textEntryIndex: number;
	/** Index within ability-only entries (excluding keywords), matching engine's abilityIndex */
	activatedAbilityIndex: number;
}

interface TextToken {
	type: "text" | "symbol";
	value: string;
}

interface LocationOccupantStatusChip {
	id: string;
	label: string;
	tone: "neutral" | "warning" | "danger";
}

const TEXT_SYMBOL_BASE_URL = buildSimulatorAssetUrl("symbols");
const TEXT_SYMBOLS: Record<string, string> = {
	E: "exert.svg",
	W: "willpower-2.svg",
	L: "lore-2.svg",
	S: "strength-simple-2.svg",
	I: "ink-simple-2.svg",
};
const TEXT_SYMBOL_PATTERN = /\{([EWLSI])\}/gi;

const SIMPLE_KEYWORD_PATTERN =
	/^(Rush|Ward|Evasive|Bodyguard|Support|Reckless|Vanish|Alert)$/i;
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
	const classifications = cardSnapshot.classifications?.filter(
		(classification) => Boolean(classification?.trim()),
	);

	if (classifications && classifications.length > 0) {
		return classifications.join(" · ");
	}

	return formatCardType(cardSnapshot.cardType);
}

function normalizeInk(ink: string): LorcanaInkName {
	const normalized = ink.toLowerCase() as LorcanaInkName;
	// Validate it's a valid ink type
	if (
		["amber", "amethyst", "emerald", "ruby", "sapphire", "steel"].includes(
			normalized,
		)
	) {
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

function getLocationOccupantStatusChips(
	occupant: LorcanaCardSnapshot,
): LocationOccupantStatusChip[] {
	const chips: LocationOccupantStatusChip[] = [];

	if (occupant.readyState === "exerted") {
		chips.push({ id: "exerted", label: "Exerted", tone: "warning" });
	} else {
		chips.push({ id: "ready", label: "Ready", tone: "neutral" });
	}

	if (occupant.isDrying) {
		chips.push({ id: "drying", label: "Drying", tone: "warning" });
	}

	if ((occupant.damage ?? 0) > 0) {
		chips.push({
			id: "damage",
			label: `${occupant.damage} damage`,
			tone: "danger",
		});
	}

	return chips;
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
const secondaryInk = $derived(
	normalizeInk(card.inkType?.[1] ?? card.inkType?.[0] ?? "amber"),
);
const inkColor = $derived(getInkHex(primaryInk));
const inkRgb = $derived(getInkRgb(primaryInk));
const secondaryInkRgb = $derived(getInkRgb(secondaryInk));
const effectiveWillpower = $derived((card.willpower ?? 0) - (card.damage ?? 0));
const hasCharacterStats = $derived(
	card.cardType === "character" &&
		(card.strength !== undefined ||
			card.willpower !== undefined ||
			card.loreValue !== undefined),
);
const textEntries = $derived(
	(() => {
		let abilityCounter = 0;
		return (card.textEntries ?? []).reduce<RenderableRulesEntry[]>(
			(entries, entry, textEntryIndex) => {
				const title = entry.title.trim();
				if (!title) {
					return entries;
				}

				const kind = isKeywordTitle(title) ? "keyword" : "ability";
				const activatedAbilityIndex =
					kind === "ability" ? abilityCounter++ : -1;
				const description = entry.description?.trim();
				entries.push({
					title,
					...(description ? { description } : {}),
					kind,
					textEntryIndex,
					activatedAbilityIndex,
				});

				return entries;
			},
			[],
		);
	})(),
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
					typeof move.params.abilityIndex === "number"
						? move.params.abilityIndex
						: 0;
				const singleMoveAction: CardActionView = {
					...action,
					moves: [move],
				};
				return [[abilityIndex, singleMoveAction]] as const;
			});
		}),
	),
);
const nonAbilityActions = $derived(
	actions.filter((action) => action.categoryId !== "activate-ability"),
);
const enabledNonAbilityActions = $derived(
	nonAbilityActions.filter((a) => a.enabled),
);
const disabledNonAbilityActions = $derived(
	nonAbilityActions.filter((a) => !a.enabled),
);
const grantSourceByTitle = $derived(
	new Map(
		(card.grantSources ?? []).flatMap((source) =>
			source.grants.map((grant) => [grant, source.sourceLabel] as const),
		),
	),
);
const cardText = $derived(card.text?.trim() ?? "");
const board = maybeUseLorcanaBoardPresenter();
const simulatorCardContext = maybeUseSimulatorCardContext();
const cardTextLines = $derived(
	cardText
		? cardText
				.split("\n")
				.map((line) => ({
					text: line.trim(),
					isKeyword: isKeywordTitle(line.trim()),
				}))
				.filter((line) => line.text.length > 0)
		: [],
);
const hasActions = $derived(nonAbilityActions.length > 0);
const resolvedLocationOccupants = $derived.by(() => {
	if (card.cardType !== "location") {
		return [];
	}

	if (locationOccupants) {
		return locationOccupants;
	}

	const playZoneCards = board?.getZoneCards(card.ownerSide, "play") ?? [];
	return playZoneCards.filter(
		(playCard) =>
			playCard.cardType === "character" && playCard.atLocationId === card.cardId,
	);
});
const locationOccupantCountLabel = $derived(
	resolvedLocationOccupants.length === 1
		? "1 character here"
		: `${resolvedLocationOccupants.length} characters here`,
);
const showLocationOccupants = $derived(card.cardType === "location");
const hasTextBoxContent = $derived(
	hasStructuredText || Boolean(cardText),
);
const cardTags = $derived(getLorcanaCardTags(card));

function handleLocationOccupantEnter(occupant: LorcanaCardSnapshot): void {
	simulatorCardContext?.setExternalPreviewCard(occupant);
}

function handleLocationOccupantLeave(occupant: LorcanaCardSnapshot): void {
	if (simulatorCardContext?.previewCard?.cardId === occupant.cardId) {
		simulatorCardContext.setExternalPreviewCard(null);
	}
}
</script>

<div
  class="card-skeleton"
  class:card-skeleton--with-utility-actions={Boolean(headerActions)}
  style="--ink-color: {inkColor}; --ink-rgb: {inkRgb.replace('rgb(', '').replace(')', '')}; --ink-rgb-secondary: {secondaryInkRgb.replace('rgb(', '').replace(')', '')};"
>
  {#if headerActions}
    <div class="card-utility-actions">
      {@render headerActions()}
    </div>
  {/if}

  <!-- Name Banner -->
  <div class="name-banner">
    <div class="cost-icon-element">
      <img src={getInkableIconUrl(card.inkable)} alt="" class="ink-bg" />
      <span class="cost-value">{card.cost ?? 0}</span>
    </div>
    <span class="card-name">
      {#if card.label.includes(" - ")}
        {@const [name, version] = card.label.split(" - ")}
        <span class="name-text">{name}</span>
        <span class="version-text">{version}</span>
      {:else}
        <span class="name-text">{card.label}</span>
      {/if}
    </span>
    {#if card.inkType && card.inkType.length > 0}
      <div class="ink-icons">
        {#each card.inkType as ink (ink)}
          <img src={getInkSymbolUrl(ink)} alt={ink} title={ink} class="ink-icon-small" />
        {/each}
      </div>
    {/if}
  </div>

  {#if hasCharacterStats}
    <!-- Combined Type + Stats Row -->
    <div class="meta-row">
      <div class="type-line type-line--compact">
        <span class="card-type">{getTypeLineLabel(card)}</span>

      </div>

      <div class="stats-row stats-row--compact">
        {#if card.strength !== undefined}
          <div class="stat-box stat-strength">
            <img src={getStatSmallIconUrl("strength")} alt="Strength" class="stat-icon" />
            <span class="stat-value">{card.strength}</span>
          </div>
        {/if}
        {#if card.willpower !== undefined}
          <div class="stat-box stat-willpower">
            <img src={getStatSmallIconUrl("defense")} alt="Willpower" class="stat-icon" />
            <span class="stat-value">{effectiveWillpower}</span>
          </div>
        {/if}
        {#if card.loreValue !== undefined}
          <div class="stat-box stat-lore">
            <img src={getLoreIconUrl()} alt="lore" class="stat-icon" />
            <span class="stat-value">{card.loreValue}</span>
          </div>
        {/if}
      </div>
    </div>
  {:else}
    <!-- Type Line -->
    <div class="type-line">
      <span class="card-type">{getTypeLineLabel(card)}</span>
    </div>
  {/if}

  {#if contextMessage}
    <div class="context-banner">
      <span class="context-banner__label">Unavailable</span>
      <span class="context-banner__message">{contextMessage}</span>
    </div>
  {/if}

  {#if showLocationOccupants}
    <section class="location-occupants-section" aria-label={locationOccupantCountLabel}>
      <div class="location-occupants-header">
        <div class="location-occupants-copy">
          <span class="location-occupants-eyebrow">At this location</span>
          <span class="location-occupants-title">{locationOccupantCountLabel}</span>
        </div>
        <span class="location-occupants-count">{resolvedLocationOccupants.length}</span>
      </div>

      {#if resolvedLocationOccupants.length > 0}
        <div class="location-occupants-list" data-testid="location-occupants-list">
          {#each resolvedLocationOccupants as occupant (occupant.cardId)}
            <article class="location-occupant-card">
              <div class="location-occupant-main">
                <button
                  type="button"
                  class="location-occupant-name-button"
                  onpointerenter={() => handleLocationOccupantEnter(occupant)}
                  onpointerleave={() => handleLocationOccupantLeave(occupant)}
                  onfocus={() => handleLocationOccupantEnter(occupant)}
                  onblur={() => handleLocationOccupantLeave(occupant)}
                  aria-label={`Highlight ${occupant.label} on the board`}
                >
                  <span
                    class="location-occupant-dot"
                    style="--occupant-ink-rgb: {getInkRgb(normalizeInk(occupant.inkType?.[0] ?? 'amber')).replace('rgb(', '').replace(')', '')};"
                  ></span>
                  <span class="location-occupant-name">{occupant.label}</span>
                </button>

                <div class="location-occupant-chips">
                  {#each getLocationOccupantStatusChips(occupant) as chip (chip.id)}
                    <span class={`location-occupant-chip location-occupant-chip--${chip.tone}`}>
                      {chip.label}
                    </span>
                  {/each}
                </div>
              </div>
            </article>
          {/each}
        </div>
      {:else}
        <p class="location-occupants-empty">No characters are here right now.</p>
      {/if}
    </section>
  {/if}

  <!-- Text Box -->
  {#if hasTextBoxContent}
    <div class="text-box">
      {#if hasStructuredText}
        {#each textEntries as entry, index (`${entry.title}-${index}`)}
          {@const entryAction =
            entry.kind === "ability" ? activatedAbilityActionsByIndex.get(entry.activatedAbilityIndex) : undefined}
          {@const grantedBy = grantSourceByTitle.get(entry.title)}
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
              {#if entryAction.reason && !entryAction.enabled}
                <span class="entry-description">{entryAction.reason}</span>
              {:else if entry.description}
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
              {#if grantedBy}
                <span class="granted-by-annotation">Granted by {grantedBy}</span>
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
              {#if grantedBy}
                <span class="granted-by-annotation">Granted by {grantedBy}</span>
              {/if}
            </p>
          {/if}
        {/each}
      {:else if cardText}
        {#each cardTextLines as line, lineIndex (`line-${lineIndex}`)}
          {#if line.isKeyword}
            <p class="rules-entry rules-entry--keyword">
              <span class="keyword-title">{line.text}</span>
            </p>
          {:else}
            <p class="ability-text">
              {#each tokenizeTextWithSymbols(line.text) as token, tokenIndex (`${token.type}-${token.value}-${tokenIndex}`)}
                {#if token.type === "symbol"}
                  <img src={`${TEXT_SYMBOL_BASE_URL}/${token.value}`} alt="" class="inline-symbol inline-symbol--body" />
                {:else}
                  {token.value}
                {/if}
              {/each}
            </p>
          {/if}
        {/each}
      {/if}

    </div>
  {/if}

  {#if hasActions}
    <div class="action-chip-section" data-testid="card-hover-action-chip-section">
      <div class="action-chip-row">
        {#each enabledNonAbilityActions as action (action.id)}
          {@const ActionIcon = getCardActionCategoryIcon(action.categoryId)}
          <button
            type="button"
            class="action-chip"
            onclick={() => onAction?.(action)}
            aria-label={action.detail ? `${action.label}: ${action.detail}` : action.label}
            title={action.detail ?? action.label}
            data-testid={`card-hover-action-chip-${action.categoryId}`}
          >
            <span class="action-chip__icon-shell" data-action-icon={action.categoryId} aria-hidden="true">
              <ActionIcon class="action-chip__icon" />
            </span>
            <span class="action-chip__content">
              <span class="action-chip__label">{action.label}</span>
              {#if action.detail}
                <span class="action-chip__detail">{action.detail}</span>
              {/if}
            </span>
          </button>
        {/each}

        {#each disabledNonAbilityActions as action (action.id)}
          {@const ActionIcon = getCardActionCategoryIcon(action.categoryId)}
          <button
            type="button"
            class="action-chip action-chip--disabled"
            disabled
            aria-label={action.reason ? `${action.label}: ${action.reason}` : action.label}
            title={action.reason ?? action.detail ?? action.label}
            data-testid={`card-hover-action-chip-${action.categoryId}`}
          >
            <span class="action-chip__icon-shell" data-action-icon={action.categoryId} aria-hidden="true">
              <ActionIcon class="action-chip__icon" />
            </span>
            <span class="action-chip__content">
              <span class="action-chip__label">{action.label}</span>
              {#if action.detail}
                <span class="action-chip__detail">{action.detail}</span>
              {:else if action.reason}
                <span class="action-chip__detail">{action.reason}</span>
              {/if}
            </span>
          </button>
        {/each}
      </div>
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
    --ink-rgb-secondary: 136, 136, 136;

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

  button {
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
  }

  .card-utility-actions {
    position: absolute;
    top: -0.6rem;
    right: -0.6rem;
    z-index: 4;
  }

  .card-skeleton--with-utility-actions .name-banner {
    padding-right: 4.25rem;
  }

  .tag-section {
    padding-top: 2px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .action-chip-section {
    padding-top: 2px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .action-chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
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

  .location-occupants-section {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    padding: 0.75rem;
    border-radius: 0.95rem;
    border: 1px solid rgba(var(--ink-rgb), 0.28);
    background:
      linear-gradient(180deg, rgba(var(--ink-rgb), 0.16) 0%, rgba(15, 23, 42, 0.22) 100%),
      rgba(12, 18, 29, 0.5);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      0 10px 28px rgba(2, 6, 23, 0.18);
  }

  .location-occupants-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .location-occupants-copy {
    display: flex;
    flex-direction: column;
    gap: 0.08rem;
    min-width: 0;
  }

  .location-occupants-eyebrow {
    font-size: 0.63rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(226, 232, 240, 0.6);
  }

  .location-occupants-title {
    font-size: 0.88rem;
    font-weight: 700;
    line-height: 1.2;
    color: rgba(248, 250, 252, 0.96);
  }

  .location-occupants-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2rem;
    height: 2rem;
    padding: 0 0.5rem;
    border-radius: 999px;
    border: 1px solid rgba(var(--ink-rgb), 0.38);
    background: rgba(2, 6, 23, 0.42);
    font-size: 0.92rem;
    font-weight: 800;
    color: rgba(248, 250, 252, 0.98);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }

  .location-occupants-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .location-occupant-card {
    display: flex;
    align-items: center;
    padding: 0.45rem 0.55rem;
    border-radius: 0.9rem;
    background:
      linear-gradient(135deg, rgba(15, 23, 42, 0.84) 0%, rgba(30, 41, 59, 0.72) 100%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.06),
      0 8px 20px rgba(2, 6, 23, 0.18);
  }

  .location-occupant-main {
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.65rem;
    width: 100%;
  }

  .location-occupant-name-button {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    min-width: 0;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
    text-align: left;
    transition: transform 120ms ease, opacity 120ms ease;
  }

  .location-occupant-name-button:hover,
  .location-occupant-name-button:focus-visible {
    transform: translateX(2px);
  }

  .location-occupant-name-button:focus-visible {
    outline: 2px solid rgba(var(--ink-rgb), 0.55);
    outline-offset: 4px;
    border-radius: 0.4rem;
  }

  .location-occupant-dot {
    width: 0.58rem;
    height: 0.58rem;
    flex-shrink: 0;
    border-radius: 999px;
    background: rgba(var(--occupant-ink-rgb), 0.95);
    box-shadow:
      0 0 0 2px rgba(var(--occupant-ink-rgb), 0.18),
      0 0 12px rgba(var(--occupant-ink-rgb), 0.34);
  }

  .location-occupant-name {
    min-width: 0;
    font-size: 0.78rem;
    font-weight: 700;
    line-height: 1.2;
    color: rgba(248, 250, 252, 0.98);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .location-occupant-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    justify-content: flex-end;
  }

  .location-occupant-chip {
    display: inline-flex;
    align-items: center;
    min-height: 1.25rem;
    padding: 0.12rem 0.45rem;
    border-radius: 999px;
    border: 1px solid transparent;
    font-size: 0.63rem;
    font-weight: 700;
    letter-spacing: 0.01em;
  }

  .location-occupant-chip--neutral {
    background: rgba(51, 65, 85, 0.84);
    border-color: rgba(148, 163, 184, 0.34);
    color: rgba(226, 232, 240, 0.92);
  }

  .location-occupant-chip--warning {
    background: rgba(120, 53, 15, 0.8);
    border-color: rgba(251, 191, 36, 0.34);
    color: rgba(254, 243, 199, 0.96);
  }

  .location-occupant-chip--danger {
    background: rgba(127, 29, 29, 0.82);
    border-color: rgba(248, 113, 113, 0.36);
    color: rgba(254, 226, 226, 0.97);
  }

  .location-occupants-empty {
    margin: 0;
    padding: 0.2rem 0.1rem 0;
    font-size: 0.78rem;
    line-height: 1.35;
    color: rgba(226, 232, 240, 0.72);
  }

  /* Top Row: Cost + Rarity */
  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .cost-icon-element {
    width: 42px;
    height: 42px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cost-icon-element .ink-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
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
      rgba(var(--ink-rgb), 0.72) 42%,
      rgba(var(--ink-rgb-secondary), 0.72) 58%,
      rgba(var(--ink-rgb-secondary), 0.9) 100%
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
    width: 32px;
    height: 32px;
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

  .stats-row--compact .stat-box {
    gap: 4px;
    padding: 3px 7px;
    border-radius: 14px;
  }

  .stats-row--compact .stat-icon {
    width: 24px;
    height: 24px;
  }

  .stats-row--compact .stat-value {
    font-size: 0.74rem;
  }

  .stat-box {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 12px 12px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .stat-icon {
    width: 24px;
    height: 24px;
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.3));
  }

  .stat-value {
    font-size: 0.9rem;
    font-weight: 700;
    color: white;
  }

  .stat-strength {
    position: relative;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    gap: 0;
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, rgba(185, 28, 28, 0.3) 100%);
    border-color: rgba(239, 68, 68, 0.4);
  }

  .stat-strength .stat-value {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fca5a5;
    z-index: 1;
  }

  .stat-willpower {
    position: relative;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    gap: 0;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(37, 99, 235, 0.3) 100%);
    border-color: rgba(59, 130, 246, 0.4);
  }

  .stat-willpower .stat-value {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #93c5fd;
    z-index: 1;
  }

  .stat-strength .stat-icon,
  .stat-willpower .stat-icon {
    width: 100%;
    height: 100%;
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

  .stats-row--compact .stat-strength,
  .stats-row--compact .stat-willpower {
    width: 32px;
    height: 32px;
    padding: 0;
    flex-shrink: 0;
  }

  .stats-row--compact .stat-strength .stat-value,
  .stats-row--compact .stat-willpower .stat-value {
    font-size: 0.8rem;
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

  .granted-by-annotation {
    display: block;
    margin-top: 0.15rem;
    font-size: 0.62rem;
    font-style: italic;
    color: rgba(100, 80, 60, 0.7);
    line-height: 1.3;
  }

  .action-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
    max-width: 100%;
    border: 1px solid rgba(var(--ink-rgb), 0.42);
    border-radius: 999px;
    padding: 0.34rem 0.62rem 0.34rem 0.42rem;
    background:
      linear-gradient(180deg, rgba(var(--ink-rgb), 0.2) 0%, rgba(var(--ink-rgb), 0.12) 100%),
      rgba(15, 22, 36, 0.86);
    color: #edf4ff;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      0 4px 10px rgba(0, 0, 0, 0.18);
    transition:
      transform 140ms ease,
      border-color 140ms ease,
      background 140ms ease,
      box-shadow 140ms ease;
  }

  .action-chip:hover:enabled {
    transform: translateY(-1px);
    border-color: rgba(var(--ink-rgb), 0.58);
    background:
      linear-gradient(180deg, rgba(var(--ink-rgb), 0.28) 0%, rgba(var(--ink-rgb), 0.16) 100%),
      rgba(18, 28, 45, 0.9);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      0 8px 16px rgba(0, 0, 0, 0.22);
  }

  .action-chip--disabled {
    cursor: not-allowed;
    opacity: 0.78;
    border-color: rgba(115, 124, 144, 0.28);
    background:
      linear-gradient(180deg, rgba(92, 100, 118, 0.18) 0%, rgba(62, 67, 83, 0.12) 100%),
      rgba(15, 22, 36, 0.72);
  }

  .action-chip__icon-shell {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.7rem;
    height: 1.7rem;
    border-radius: 999px;
    background: rgba(8, 12, 22, 0.34);
    color: rgba(255, 255, 255, 0.92);
    flex-shrink: 0;
  }

  .action-chip__icon {
    width: 0.95rem;
    height: 0.95rem;
  }

  .action-chip__content {
    display: inline-flex;
    align-items: baseline;
    gap: 0.35rem;
    min-width: 0;
    flex-wrap: wrap;
  }

  .action-chip__label {
    font-size: 0.76rem;
    font-weight: 700;
    line-height: 1.2;
    color: #f8fbff;
  }

  .action-chip__detail {
    font-size: 0.66rem;
    line-height: 1.2;
    color: rgba(227, 237, 252, 0.78);
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
