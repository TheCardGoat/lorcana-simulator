<script lang="ts">
  import { LoaderCircle, NotebookPen, ScrollText, Trophy } from "@lucide/svelte";
  import { m } from "$lib/i18n/messages.js";
  import { Badge } from "$lib/design-system/primitives/badge";
  import { Button } from "$lib/design-system/primitives/button";
  import * as Dialog from "$lib/design-system/primitives/dialog";
  import {
    fetchPostGameRecord,
    savePostGameNote,
    type PostGameRecordEnvelope,
  } from "./notes-api.js";
  import type {
    PostGameNoteState,
    PostGameSectionId,
    PostGameSummary,
  } from "./types.js";

  interface PostGameSummaryDialogProps {
    open?: boolean;
    gameId: string;
    summary: PostGameSummary;
    onReturnToMatchmaking: () => void | Promise<void>;
    loadRecord?: (gameId: string) => Promise<PostGameRecordEnvelope>;
    saveNote?: (params: { gameId: string; note: string }) => Promise<PostGameRecordEnvelope>;
  }

  let {
    open = $bindable(false),
    gameId,
    summary,
    onReturnToMatchmaking,
    loadRecord = fetchPostGameRecord,
    saveNote = savePostGameNote,
  }: PostGameSummaryDialogProps = $props();

  let activeSection = $state<PostGameSectionId>("overview");
  let loadedGameId = $state<string | null>(null);
  let noteState = $state<PostGameNoteState>({
    value: "",
    lastSavedValue: "",
    isLoading: false,
    isSaving: false,
    loaded: false,
    error: null,
  });
  let record = $state<PostGameRecordEnvelope | null>(null);
  let leavingMatch = $state(false);

  const sectionButtons = [
    {
      id: "overview",
      label: m["sim.postGame.section.overview"]({}),
      icon: Trophy,
    },
    {
      id: "forensics",
      label: m["sim.postGame.section.forensics"]({}),
      icon: ScrollText,
    },
    {
      id: "notes",
      label: m["sim.postGame.section.notes"]({}),
      icon: NotebookPen,
    },
  ] satisfies Array<{ id: PostGameSectionId; label: string; icon: typeof Trophy }>;

  const viewerResultLabel = $derived.by(() => {
    switch (summary.outcome.viewerResult) {
      case "victory":
        return m["sim.postGame.result.victory"]({});
      case "defeat":
        return m["sim.postGame.result.defeat"]({});
      case "spectator":
        return m["sim.postGame.result.spectator"]({});
      default:
        return m["sim.postGame.result.complete"]({});
    }
  });

  const winnerLabel = $derived(getSideLabel(summary.outcome.winnerSide));
  const loserLabel = $derived(getSideLabel(summary.outcome.loserSide));
  const noteDirty = $derived(
    noteState.loaded && noteState.value.trim() !== noteState.lastSavedValue.trim(),
  );
  const noteStatus = $derived.by(() => {
    if (noteState.isLoading) {
      return m["sim.postGame.notes.loading"]({});
    }
    if (noteState.isSaving) {
      return m["sim.postGame.notes.saving"]({});
    }
    if (noteState.error) {
      return noteState.error;
    }
    if (!noteState.loaded) {
      return m["sim.postGame.notes.idle"]({});
    }
    if (noteDirty) {
      return m["sim.postGame.notes.unsaved"]({});
    }
    return m["sim.postGame.notes.saved"]({});
  });

  $effect(() => {
    if (!open) {
      return;
    }

    activeSection = "overview";
  });

  $effect(() => {
    const nextGameId = gameId;
    if (loadedGameId === nextGameId) {
      return;
    }

    loadedGameId = null;
    record = null;
    noteState = {
      value: "",
      lastSavedValue: "",
      isLoading: false,
      isSaving: false,
      loaded: false,
      error: null,
    };
  });

  $effect(() => {
    if (!open || noteState.loaded || noteState.isLoading || loadedGameId === gameId) {
      return;
    }

    noteState = {
      ...noteState,
      isLoading: true,
      error: null,
    };

    void loadRecord(gameId)
      .then((nextRecord) => {
        loadedGameId = gameId;
        record = nextRecord;
        noteState = {
          value: nextRecord.note,
          lastSavedValue: nextRecord.note,
          isLoading: false,
          isSaving: false,
          loaded: true,
          error: null,
        };
      })
      .catch((error: unknown) => {
        noteState = {
          ...noteState,
          isLoading: false,
          loaded: true,
          error:
            error instanceof Error
              ? error.message
              : m["sim.postGame.notes.loadError"]({}),
        };
      });
  });

  function getSideLabel(side: typeof summary.outcome.winnerSide): string {
    if (!side) {
      return m["sim.postGame.result.unknownPlayer"]({});
    }

    if (summary.outcome.viewerSide && side === summary.outcome.viewerSide) {
      return m["sim.player.you"]({});
    }

    if (summary.outcome.viewerSide && side !== summary.outcome.viewerSide) {
      return m["sim.player.opponent"]({});
    }

    return side === "playerOne"
      ? m["sim.player.side.playerOne"]({})
      : m["sim.player.side.playerTwo"]({});
  }

  function formatClock(timestamp: number): string {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  }

  async function handleSaveNotes(): Promise<void> {
    if (noteState.isSaving || noteState.isLoading) {
      return;
    }

    noteState = {
      ...noteState,
      isSaving: true,
      error: null,
    };

    try {
      const nextRecord = await saveNote({ gameId, note: noteState.value });
      record = nextRecord;
      noteState = {
        value: nextRecord.note,
        lastSavedValue: nextRecord.note,
        isLoading: false,
        isSaving: false,
        loaded: true,
        error: null,
      };
    } catch (error) {
      noteState = {
        ...noteState,
        isSaving: false,
        error:
          error instanceof Error
            ? error.message
            : m["sim.postGame.notes.saveError"]({}),
      };
    }
  }

  async function handleReturn(): Promise<void> {
    if (leavingMatch) {
      return;
    }

    leavingMatch = true;
    try {
      await onReturnToMatchmaking();
    } finally {
      leavingMatch = false;
    }
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Portal>
    <Dialog.Overlay class="post-game-overlay" />
    <Dialog.Content class="post-game-dialog" showCloseButton={false}>
      <Dialog.Title class="sr-only">{m["sim.postGame.title"]({})}</Dialog.Title>
      <Dialog.Description class="sr-only">
        {m["sim.postGame.description"]({})}
      </Dialog.Description>

      <header class="post-game-header">
        <div class="post-game-header__eyebrow">
          <Badge variant="outline" class="post-game-result-badge">{viewerResultLabel}</Badge>
          <span class="post-game-header__turn">
            {m["sim.postGame.turn"]({ turn: summary.outcome.finalTurnNumber })}
          </span>
        </div>
        <h2 class="post-game-header__title">{m["sim.postGame.title"]({})}</h2>
        <p class="post-game-header__summary">
          {#if summary.outcome.winnerSide && summary.outcome.loserSide}
            {winnerLabel}
            {m["sim.postGame.summary.defeated"]({ loser: loserLabel })}
          {:else}
            {m["sim.postGame.summary.completed"]({})}
          {/if}
        </p>
        <p class="post-game-header__reason">
          {summary.outcome.reason ?? m["sim.postGame.reason.none"]({})}
        </p>
      </header>

      <nav class="post-game-sections" aria-label={m["sim.postGame.section.aria"]({})}>
        {#each sectionButtons as section (section.id)}
          {@const Icon = section.icon}
          <button
            type="button"
            class="post-game-sections__button"
            class:post-game-sections__button--active={activeSection === section.id}
            onclick={() => (activeSection = section.id)}
          >
            <Icon class="size-4" />
            <span>{section.label}</span>
          </button>
        {/each}
      </nav>

      <div class="post-game-body">
        {#if activeSection === "overview"}
          <section class="post-game-panel">
            <div class="post-game-scoreboard">
              {#each [summary.players.playerOne, summary.players.playerTwo] as player (player.side)}
                <article class="post-game-scorecard">
                  <div class="post-game-scorecard__header">
                    <div>
                      <p class="post-game-scorecard__label">{getSideLabel(player.side)}</p>
                      <h3 class="post-game-scorecard__lore">
                        {player.lore}
                        <span>{m["sim.lore.label"]({})}</span>
                      </h3>
                    </div>
                    {#if summary.outcome.winnerSide === player.side}
                      <Badge class="post-game-scorecard__winner">
                        {m["sim.postGame.winner"]({})}
                      </Badge>
                    {/if}
                  </div>

                  <dl class="post-game-metrics">
                    <div><dt>{m["sim.postGame.metric.deck"]({})}</dt><dd>{player.deckCount}</dd></div>
                    <div><dt>{m["sim.postGame.metric.hand"]({})}</dt><dd>{player.handCount}</dd></div>
                    <div><dt>{m["sim.postGame.metric.discard"]({})}</dt><dd>{player.discardCount}</dd></div>
                    <div><dt>{m["sim.postGame.metric.ink"]({})}</dt><dd>{player.availableInk ?? "?"}/{player.inkwellCount}</dd></div>
                    <div><dt>{m["sim.postGame.metric.board"]({})}</dt><dd>{player.boardCount}</dd></div>
                    <div><dt>{m["sim.postGame.metric.ready"]({})}</dt><dd>{player.readyCount}/{player.exertedCount}</dd></div>
                  </dl>

                  <dl class="post-game-counters">
                    <div><dt>{m["sim.postGame.counter.played"]({})}</dt><dd>{summary.countersBySide[player.side].cardsPlayed}</dd></div>
                    <div><dt>{m["sim.postGame.counter.inked"]({})}</dt><dd>{summary.countersBySide[player.side].inked}</dd></div>
                    <div><dt>{m["sim.postGame.counter.quests"]({})}</dt><dd>{summary.countersBySide[player.side].quests}</dd></div>
                    <div><dt>{m["sim.postGame.counter.challenges"]({})}</dt><dd>{summary.countersBySide[player.side].challengeInitiations}</dd></div>
                    <div><dt>{m["sim.postGame.counter.moves"]({})}</dt><dd>{summary.countersBySide[player.side].movesToLocations}</dd></div>
                    <div><dt>{m["sim.postGame.counter.abilities"]({})}</dt><dd>{summary.countersBySide[player.side].abilityActivations}</dd></div>
                    <div><dt>{m["sim.postGame.counter.effects"]({})}</dt><dd>{summary.countersBySide[player.side].effectResolutions}</dd></div>
                    <div><dt>{m["sim.postGame.counter.passes"]({})}</dt><dd>{summary.countersBySide[player.side].passes}</dd></div>
                  </dl>
                </article>
              {/each}
            </div>

            <div class="post-game-overview-grid">
              <section class="post-game-card">
                <header>
                  <h3>{m["sim.postGame.highlights.title"]({})}</h3>
                  <p>{m["sim.postGame.highlights.description"]({})}</p>
                </header>
                <div class="post-game-highlight-list">
                  {#each summary.highlights as highlight (highlight.id)}
                    <article class="post-game-highlight" class:post-game-highlight--emphasis={highlight.emphasis}>
                      <div class="post-game-highlight__meta">
                        {#if highlight.turnNumber}
                          <Badge variant="outline">
                            {m["sim.postGame.turnShort"]({ turn: highlight.turnNumber })}
                          </Badge>
                        {/if}
                      </div>
                      <h4>{highlight.title}</h4>
                      <p>{highlight.detail}</p>
                    </article>
                  {/each}
                </div>
              </section>

              <section class="post-game-card">
                <header>
                  <h3>{m["sim.postGame.spotlights.lore"]({})}</h3>
                  <p>{m["sim.postGame.spotlights.loreDescription"]({})}</p>
                </header>
                <div class="post-game-spotlight-list">
                  {#each summary.topLoreContributors as spotlight (spotlight.id)}
                    <article class="post-game-spotlight">
                      <div>
                        <h4>{spotlight.label}</h4>
                        <p>{getSideLabel(spotlight.ownerSide)}</p>
                      </div>
                      <strong>{spotlight.value}</strong>
                    </article>
                  {/each}
                </div>
              </section>

              <section class="post-game-card">
                <header>
                  <h3>{m["sim.postGame.spotlights.played"]({})}</h3>
                  <p>{m["sim.postGame.spotlights.playedDescription"]({})}</p>
                </header>
                <div class="post-game-spotlight-list">
                  {#each summary.mostPlayedCards as spotlight (spotlight.id)}
                    <article class="post-game-spotlight">
                      <div>
                        <h4>{spotlight.label}</h4>
                        <p>{getSideLabel(spotlight.ownerSide)}</p>
                      </div>
                      <strong>{spotlight.value}</strong>
                    </article>
                  {/each}
                </div>
              </section>

              <section class="post-game-card">
                <header>
                  <h3>{m["sim.postGame.spotlights.abilities"]({})}</h3>
                  <p>{m["sim.postGame.spotlights.abilitiesDescription"]({})}</p>
                </header>
                <div class="post-game-spotlight-list">
                  {#each summary.mostTriggeredAbilities as spotlight (spotlight.id)}
                    <article class="post-game-spotlight">
                      <div>
                        <h4>{spotlight.label}</h4>
                        <p>{spotlight.cardLabel ?? getSideLabel(spotlight.ownerSide)}</p>
                      </div>
                      <strong>{spotlight.count}</strong>
                    </article>
                  {/each}
                </div>
              </section>
            </div>
          </section>
        {:else if activeSection === "forensics"}
          <section class="post-game-panel">
            <header class="post-game-panel__header">
              <div>
                <h3>{m["sim.postGame.forensics.title"]({})}</h3>
                <p>{m["sim.postGame.forensics.description"]({ entries: summary.totalLogEntries })}</p>
              </div>
            </header>

            <div class="post-game-forensics">
              {#each summary.forensics as entry (entry.id)}
                <article class="post-game-forensics__entry">
                  <div class="post-game-forensics__meta">
                    <Badge variant="outline">
                      {m["sim.postGame.turnShort"]({ turn: entry.turnNumber })}
                    </Badge>
                    <span>{getSideLabel(entry.actorSide)}</span>
                    <span>{formatClock(entry.timestamp)}</span>
                    <span>{entry.moveId}</span>
                  </div>
                  <p class="post-game-forensics__text">{entry.text}</p>

                  {#if entry.typedMessages.length > 0}
                    <div class="post-game-forensics__typed">
                      {#each entry.typedMessages as message (`${entry.id}:${message.key}`)}
                        <div class="post-game-forensics__typed-message">
                          <code>{message.key}</code>
                          <span>{message.text}</span>
                        </div>
                      {/each}
                    </div>
                  {/if}

                  {#if entry.cardReferences.length > 0}
                    <div class="post-game-forensics__cards">
                      {#each entry.cardReferences as card (`${entry.id}:${card.cardId}`)}
                        <Badge variant="outline">{card.label}</Badge>
                      {/each}
                    </div>
                  {/if}
                </article>
              {/each}
            </div>
          </section>
        {:else}
          <section class="post-game-panel">
            <header class="post-game-panel__header">
              <div>
                <h3>{m["sim.postGame.notes.title"]({})}</h3>
                <p>{m["sim.postGame.notes.description"]({})}</p>
              </div>
              {#if noteState.isLoading || noteState.isSaving}
                <LoaderCircle class="size-4 animate-spin text-slate-300" />
              {/if}
            </header>

            {#if record}
              <div class="post-game-server-placeholder">
                <h4>{m["sim.postGame.serverSummary.title"]({})}</h4>
                <p>{record.serverSummary.message}</p>
              </div>
            {/if}

            <label class="post-game-notes__label" for="post-game-notes">
              {m["sim.postGame.notes.fieldLabel"]({})}
            </label>
            <textarea
              id="post-game-notes"
              class="post-game-notes__textarea"
              bind:value={noteState.value}
              rows="10"
              placeholder={m["sim.postGame.notes.placeholder"]({})}
            ></textarea>
            <p class="post-game-notes__status" class:post-game-notes__status--error={Boolean(noteState.error)}>
              {noteStatus}
            </p>
            <div class="post-game-notes__actions">
              <Button
                variant="outline"
                onclick={() => {
                  activeSection = "overview";
                }}
              >
                {m["sim.postGame.notes.backToOverview"]({})}
              </Button>
              <Button onclick={handleSaveNotes} disabled={noteState.isSaving || noteState.isLoading}>
                {m["sim.postGame.notes.save"]({})}
              </Button>
            </div>
          </section>
        {/if}
      </div>

      <Dialog.Footer class="post-game-footer">
        <Button variant="outline" onclick={() => (open = false)}>
          {m["sim.postGame.close"]({})}
        </Button>
        <Button variant="secondary" onclick={() => (activeSection = "notes")}>
          {m["sim.postGame.notes.open"]({})}
        </Button>
        <Button onclick={handleReturn} disabled={leavingMatch}>
          {m["sim.postGame.returnToMatchmaking"]({})}
        </Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

<style>
  :global(.post-game-overlay) {
    background:
      radial-gradient(circle at top, rgba(14, 116, 144, 0.18), transparent 48%),
      rgba(2, 6, 23, 0.82);
    backdrop-filter: blur(10px);
  }

  :global(.post-game-dialog) {
    width: min(94vw, 74rem);
    max-width: 74rem;
    height: min(88vh, 54rem);
    padding: 0;
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
    border-color: rgba(125, 211, 252, 0.28);
    background:
      linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(2, 6, 23, 0.98)),
      rgba(2, 6, 23, 0.96);
    color: #e2e8f0;
    box-shadow: 0 32px 100px rgba(2, 6, 23, 0.6);
  }

  .post-game-header {
    padding: 1.1rem 1rem 0.95rem;
    background:
      radial-gradient(circle at top left, rgba(14, 165, 233, 0.18), transparent 42%),
      linear-gradient(180deg, rgba(15, 23, 42, 0.94), rgba(15, 23, 42, 0.74));
    border-bottom: 1px solid rgba(148, 163, 184, 0.16);
  }

  .post-game-header__eyebrow {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    flex-wrap: wrap;
  }

  :global(.post-game-result-badge) {
    border-color: rgba(125, 211, 252, 0.32);
    background: rgba(8, 47, 73, 0.78);
    color: #e0f2fe;
  }

  .post-game-header__turn {
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(191, 219, 254, 0.75);
  }

  .post-game-header__title {
    margin: 0.55rem 0 0;
    font-size: clamp(1.3rem, 2vw, 1.9rem);
    font-weight: 800;
    color: #f8fafc;
  }

  .post-game-header__summary {
    margin: 0.3rem 0 0;
    font-size: 0.96rem;
    color: rgba(226, 232, 240, 0.9);
  }

  .post-game-header__reason {
    margin: 0.35rem 0 0;
    color: rgba(148, 163, 184, 0.95);
    line-height: 1.5;
  }

  .post-game-sections {
    position: sticky;
    top: 0;
    z-index: 5;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.55rem;
    padding: 0.85rem 1rem;
    background: rgba(2, 6, 23, 0.94);
    border-bottom: 1px solid rgba(148, 163, 184, 0.12);
  }

  .post-game-sections__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    min-height: 2.65rem;
    border-radius: 999px;
    border: 1px solid rgba(51, 65, 85, 0.85);
    background: rgba(15, 23, 42, 0.96);
    color: rgba(226, 232, 240, 0.8);
    font-size: 0.82rem;
    font-weight: 700;
    transition: 160ms ease;
  }

  .post-game-sections__button--active {
    border-color: rgba(125, 211, 252, 0.52);
    background: linear-gradient(180deg, rgba(14, 116, 144, 0.9), rgba(8, 47, 73, 0.9));
    color: #f8fafc;
  }

  .post-game-body {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    padding: 0 1rem 1rem;
  }

  .post-game-panel {
    display: grid;
    gap: 1rem;
    padding-top: 1rem;
  }

  .post-game-panel__header h3 {
    margin: 0;
    font-size: 1.02rem;
    font-weight: 800;
  }

  .post-game-panel__header p {
    margin: 0.2rem 0 0;
    color: rgba(148, 163, 184, 0.92);
  }

  .post-game-scoreboard {
    display: grid;
    gap: 0.85rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .post-game-scorecard,
  .post-game-card,
  .post-game-server-placeholder,
  .post-game-forensics__entry {
    border: 1px solid rgba(51, 65, 85, 0.85);
    background: linear-gradient(180deg, rgba(15, 23, 42, 0.92), rgba(2, 6, 23, 0.94));
    border-radius: 1.1rem;
  }

  .post-game-scorecard {
    padding: 1rem;
  }

  .post-game-scorecard__header {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
    align-items: flex-start;
  }

  .post-game-scorecard__label {
    margin: 0;
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(125, 211, 252, 0.82);
  }

  .post-game-scorecard__lore {
    margin: 0.2rem 0 0;
    display: flex;
    gap: 0.45rem;
    align-items: baseline;
    font-size: 1.8rem;
    font-weight: 800;
    color: #f8fafc;
  }

  .post-game-scorecard__lore span {
    font-size: 0.86rem;
    color: rgba(191, 219, 254, 0.72);
  }

  :global(.post-game-scorecard__winner) {
    background: rgba(20, 83, 45, 0.85);
    color: #dcfce7;
  }

  .post-game-metrics,
  .post-game-counters {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.65rem;
    margin: 0.9rem 0 0;
  }

  .post-game-metrics div,
  .post-game-counters div {
    padding: 0.7rem 0.75rem;
    border-radius: 0.95rem;
    background: rgba(15, 23, 42, 0.72);
    border: 1px solid rgba(51, 65, 85, 0.52);
  }

  .post-game-metrics dt,
  .post-game-counters dt {
    font-size: 0.72rem;
    color: rgba(148, 163, 184, 0.88);
  }

  .post-game-metrics dd,
  .post-game-counters dd {
    margin: 0.2rem 0 0;
    font-size: 1rem;
    font-weight: 700;
    color: #f8fafc;
  }

  .post-game-overview-grid {
    display: grid;
    gap: 0.85rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .post-game-card {
    padding: 1rem;
  }

  .post-game-card header h3 {
    margin: 0;
    font-size: 0.96rem;
    font-weight: 800;
  }

  .post-game-card header p {
    margin: 0.2rem 0 0;
    font-size: 0.84rem;
    color: rgba(148, 163, 184, 0.92);
  }

  .post-game-highlight-list,
  .post-game-spotlight-list,
  .post-game-forensics {
    display: grid;
    gap: 0.65rem;
    margin-top: 0.9rem;
  }

  .post-game-highlight {
    padding: 0.85rem;
    border-radius: 1rem;
    background: rgba(15, 23, 42, 0.72);
    border: 1px solid rgba(51, 65, 85, 0.42);
  }

  .post-game-highlight--emphasis {
    border-color: rgba(125, 211, 252, 0.45);
    background: linear-gradient(180deg, rgba(14, 116, 144, 0.18), rgba(15, 23, 42, 0.76));
  }

  .post-game-highlight h4 {
    margin: 0.35rem 0 0;
    font-size: 0.94rem;
    font-weight: 700;
  }

  .post-game-highlight p,
  .post-game-spotlight p,
  .post-game-server-placeholder p,
  .post-game-forensics__text {
    margin: 0.28rem 0 0;
    line-height: 1.5;
    color: rgba(226, 232, 240, 0.88);
  }

  .post-game-highlight__meta {
    display: flex;
    gap: 0.45rem;
    flex-wrap: wrap;
  }

  .post-game-spotlight {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
    align-items: center;
    padding: 0.85rem;
    border-radius: 1rem;
    background: rgba(15, 23, 42, 0.72);
    border: 1px solid rgba(51, 65, 85, 0.42);
  }

  .post-game-spotlight h4,
  .post-game-server-placeholder h4 {
    margin: 0;
    font-size: 0.92rem;
    font-weight: 700;
  }

  .post-game-spotlight strong {
    font-size: 1.25rem;
    color: #f8fafc;
  }

  .post-game-forensics__entry {
    padding: 0.95rem;
  }

  .post-game-forensics__meta,
  .post-game-forensics__cards {
    display: flex;
    gap: 0.45rem;
    flex-wrap: wrap;
    align-items: center;
  }

  .post-game-forensics__meta {
    color: rgba(148, 163, 184, 0.92);
    font-size: 0.78rem;
  }

  .post-game-forensics__typed {
    margin-top: 0.75rem;
    display: grid;
    gap: 0.45rem;
  }

  .post-game-forensics__typed-message {
    display: grid;
    gap: 0.22rem;
    padding: 0.75rem;
    border-radius: 0.95rem;
    background: rgba(2, 6, 23, 0.54);
    border: 1px solid rgba(51, 65, 85, 0.48);
  }

  .post-game-forensics__typed-message code {
    font-size: 0.72rem;
    color: #bae6fd;
  }

  .post-game-forensics__cards {
    margin-top: 0.75rem;
  }

  .post-game-server-placeholder {
    padding: 0.95rem 1rem;
  }

  .post-game-notes__label {
    font-size: 0.84rem;
    font-weight: 700;
    color: rgba(226, 232, 240, 0.92);
  }

  .post-game-notes__textarea {
    width: 100%;
    resize: vertical;
    min-height: 13rem;
    border-radius: 1rem;
    border: 1px solid rgba(71, 85, 105, 0.9);
    background: rgba(2, 6, 23, 0.72);
    padding: 0.95rem 1rem;
    color: #f8fafc;
    line-height: 1.55;
    outline: none;
  }

  .post-game-notes__textarea:focus {
    border-color: rgba(56, 189, 248, 0.75);
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.14);
  }

  .post-game-notes__status {
    margin: 0;
    min-height: 1.25rem;
    font-size: 0.82rem;
    color: rgba(148, 163, 184, 0.95);
  }

  .post-game-notes__status--error {
    color: #fca5a5;
  }

  .post-game-notes__actions,
  :global(.post-game-footer) {
    display: flex;
    gap: 0.65rem;
    justify-content: flex-end;
    flex-wrap: wrap;
  }

  :global(.post-game-footer) {
    padding: 0.85rem 1rem calc(0.85rem + env(safe-area-inset-bottom));
    border-top: 1px solid rgba(148, 163, 184, 0.12);
    background: rgba(2, 6, 23, 0.96);
  }

  @media (max-width: 900px) {
    :global(.post-game-dialog) {
      width: min(96vw, 44rem);
      height: min(92vh, 56rem);
    }

    .post-game-scoreboard,
    .post-game-overview-grid,
    .post-game-metrics,
    .post-game-counters {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    .post-game-header,
    .post-game-sections,
    .post-game-body,
    :global(.post-game-footer) {
      padding-left: 0.85rem;
      padding-right: 0.85rem;
    }

    .post-game-sections {
      gap: 0.45rem;
    }

    .post-game-sections__button {
      min-height: 2.45rem;
      font-size: 0.74rem;
    }

    .post-game-notes__actions,
    :global(.post-game-footer) {
      justify-content: stretch;
    }

    .post-game-notes__actions :global([data-slot="button"]),
    :global(.post-game-footer [data-slot="button"]) {
      flex: 1 1 100%;
    }
  }
</style>
