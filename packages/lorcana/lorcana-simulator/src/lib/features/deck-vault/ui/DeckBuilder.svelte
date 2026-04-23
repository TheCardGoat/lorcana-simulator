<script lang="ts">
  import { Button } from "$lib/design-system/primitives/button";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import type { MatchmakingPlayerContextState } from "@/features/matchmaking/state/player-context.svelte.js";
  import {
    fetchDeckListSnapshotByDeckListId,
    updateDeckForProfile,
    type ProfileDeckSummary,
  } from "@/features/matchmaking/api/player-context-api.js";
  import { getAllCardsById } from "@tcg/lorcana-cards";
  import { getFullName, type LorcanaCardDefinition } from "@tcg/lorcana-types";
  import ArrowLeft from "@lucide/svelte/icons/arrow-left";
  import Loader from "@lucide/svelte/icons/loader-circle";
  import Minus from "@lucide/svelte/icons/minus";
  import Plus from "@lucide/svelte/icons/plus";
  import Trash2 from "@lucide/svelte/icons/trash-2";
  import Copy from "@lucide/svelte/icons/copy";

  interface Props {
    playerContext: MatchmakingPlayerContextState;
    deckSummary: ProfileDeckSummary;
    onBack: () => void;
  }

  let { playerContext, deckSummary, onBack }: Props = $props();

  type DeckEntry = { cardPublicId: string; quantity: number };

  let loading = $state(true);
  let loadError = $state<string | null>(null);
  let saving = $state(false);
  let saveError = $state<string | null>(null);

  let deckName = $state(deckSummary.deckName);
  let entries = $state<DeckEntry[]>([]);
  let cardsById = $state<Record<string, LorcanaCardDefinition>>({});

  let importOpen = $state(false);
  let importText = $state("");
  let exportOpen = $state(false);
  let copyFeedback = $state<string | null>(null);

  let searchQuery = $state("");

  $effect(() => {
    void loadDeck();
  });

  async function loadDeck(): Promise<void> {
    loading = true;
    loadError = null;
    try {
      const [snapshot, catalog] = await Promise.all([
        fetchDeckListSnapshotByDeckListId(deckSummary.activeDeckListId),
        getAllCardsById(),
      ]);
      cardsById = catalog;
      entries = snapshot.historicDeck.map((c) => ({
        cardPublicId: c.cardPublicId,
        quantity: c.quantity,
      }));
    } catch (error) {
      loadError = error instanceof Error ? error.message : "Failed to load deck";
    } finally {
      loading = false;
    }
  }

  const totalCards = $derived(entries.reduce((sum, e) => sum + e.quantity, 0));

  const sortedEntries = $derived.by(() => {
    return [...entries].sort((a, b) => {
      const nameA = cardNameFor(a.cardPublicId);
      const nameB = cardNameFor(b.cardPublicId);
      return nameA.localeCompare(nameB);
    });
  });

  function cardNameFor(publicId: string): string {
    const card = cardsById[publicId];
    return card ? getFullName(card) : publicId;
  }

  function adjustQuantity(publicId: string, delta: number): void {
    const idx = entries.findIndex((e) => e.cardPublicId === publicId);
    if (idx === -1) {
      if (delta > 0) entries = [...entries, { cardPublicId: publicId, quantity: 1 }];
      return;
    }
    const next = entries[idx].quantity + delta;
    if (next <= 0) {
      entries = entries.filter((e) => e.cardPublicId !== publicId);
    } else {
      const copy = [...entries];
      copy[idx] = { ...copy[idx], quantity: Math.min(next, 4) };
      entries = copy;
    }
  }

  function removeCard(publicId: string): void {
    entries = entries.filter((e) => e.cardPublicId !== publicId);
  }

  function buildDeckText(): string {
    return sortedEntries
      .map((e) => `${e.quantity} ${cardNameFor(e.cardPublicId)}`)
      .join("\n");
  }

  async function handleSave(): Promise<void> {
    const activeProfile = playerContext.activeProfile;
    if (!activeProfile) {
      saveError = "No active profile";
      return;
    }
    const trimmedName = deckName.trim();
    if (!trimmedName) {
      saveError = "Deck name is required";
      return;
    }
    if (entries.length === 0) {
      saveError = "Deck is empty";
      return;
    }

    saving = true;
    saveError = null;
    try {
      await updateDeckForProfile(activeProfile.gameProfileId, deckSummary.deckId, {
        deckName: trimmedName,
        deckText: buildDeckText(),
      });
      await playerContext.loadProfileDecks(activeProfile.gameProfileId, { force: true });
      onBack();
    } catch (error) {
      saveError = error instanceof Error ? error.message : "Failed to save deck";
    } finally {
      saving = false;
    }
  }

  function applyImport(): void {
    const parsed = parseDeckText(importText);
    if (parsed.length === 0) {
      return;
    }
    entries = parsed;
    importOpen = false;
    importText = "";
  }

  function parseDeckText(text: string): DeckEntry[] {
    const byName: Record<string, string> = {};
    for (const [id, card] of Object.entries(cardsById)) {
      byName[getFullName(card).toLowerCase()] = id;
    }
    const aggregated = new Map<string, number>();
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      const match = /^(\d+)\s+(.+)$/.exec(trimmed);
      if (!match) continue;
      const qty = Number.parseInt(match[1], 10);
      const name = match[2].trim().toLowerCase();
      const id = byName[name];
      if (id && qty > 0) {
        aggregated.set(id, Math.min((aggregated.get(id) ?? 0) + qty, 4));
      }
    }
    return Array.from(aggregated.entries()).map(([cardPublicId, quantity]) => ({
      cardPublicId,
      quantity,
    }));
  }

  async function copyExport(): Promise<void> {
    try {
      await navigator.clipboard.writeText(buildDeckText());
      copyFeedback = "Copied!";
      setTimeout(() => {
        copyFeedback = null;
      }, 1500);
    } catch {
      copyFeedback = "Copy failed";
    }
  }

  const searchResults = $derived.by(() => {
    const query = searchQuery.trim().toLowerCase();
    if (query.length < 2) return [] as Array<{ id: string; name: string }>;
    const results: Array<{ id: string; name: string }> = [];
    for (const [id, card] of Object.entries(cardsById)) {
      const name = getFullName(card);
      if (name.toLowerCase().includes(query)) {
        results.push({ id, name });
        if (results.length >= 20) break;
      }
    }
    return results.sort((a, b) => a.name.localeCompare(b.name));
  });
</script>

<div class="mx-auto w-full max-w-5xl space-y-6 py-4">
  <!-- Header -->
  <div class="flex items-start justify-between gap-4">
    <div class="flex items-center gap-3">
      <Button
        variant="ghost"
        size="icon"
        class="size-9 text-slate-100 hover:bg-white/10 hover:text-white"
        onclick={onBack}
        aria-label="Back to deck vault"
      >
        <ArrowLeft class="size-5" />
      </Button>
      <div>
        <h2 class="text-xl font-bold text-white">Edit deck</h2>
        <p class="text-sm text-slate-400">{totalCards} cards</p>
      </div>
    </div>

    <div class="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        class="border-white/15 bg-transparent text-slate-100 hover:bg-white/10"
        onclick={() => { importOpen = !importOpen; exportOpen = false; }}
      >
        Import
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        class="border-white/15 bg-transparent text-slate-100 hover:bg-white/10"
        onclick={() => { exportOpen = !exportOpen; importOpen = false; }}
      >
        Export
      </Button>
      <Button
        type="button"
        size="sm"
        disabled={saving || loading}
        onclick={() => void handleSave()}
        class="min-w-24"
      >
        {#if saving}
          <Loader class="mr-2 size-4 animate-spin" />
          Saving…
        {:else}
          Save
        {/if}
      </Button>
    </div>
  </div>

  <!-- Name -->
  <div class="space-y-2">
    <label class="text-sm font-medium text-slate-200" for="deck-builder-name">Deck name</label>
    <Input
      id="deck-builder-name"
      bind:value={deckName}
      maxlength={120}
      disabled={saving}
      class="border-white/10 bg-white/5 text-slate-100"
    />
  </div>

  {#if saveError}
    <div
      class="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
      role="alert"
    >
      {saveError}
    </div>
  {/if}

  <!-- Import panel -->
  {#if importOpen}
    <div class="space-y-3 rounded-lg border border-white/10 bg-white/5 p-4">
      <p class="text-sm text-slate-300">
        Paste a deck list (one line per entry, format: <code>4 Card Name - Version</code>). This
        replaces the current list.
      </p>
      <Textarea
        bind:value={importText}
        rows={10}
        placeholder={`4 Mickey Mouse - Brave Little Tailor\n4 Tinker Bell - Giant Fairy`}
        class="min-h-40 border-white/10 bg-white/5 text-slate-100"
      />
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          class="border-white/15 bg-transparent text-slate-100 hover:bg-white/10"
          onclick={() => { importOpen = false; importText = ""; }}
        >
          Cancel
        </Button>
        <Button type="button" size="sm" onclick={applyImport} disabled={!importText.trim()}>
          Replace deck
        </Button>
      </div>
    </div>
  {/if}

  <!-- Export panel -->
  {#if exportOpen}
    <div class="space-y-3 rounded-lg border border-white/10 bg-white/5 p-4">
      <div class="flex items-center justify-between gap-2">
        <p class="text-sm text-slate-300">Deck text (paste into other tools):</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          class="border-white/15 bg-transparent text-slate-100 hover:bg-white/10"
          onclick={() => void copyExport()}
        >
          <Copy class="mr-1.5 size-3.5" />
          {copyFeedback ?? "Copy"}
        </Button>
      </div>
      <Textarea
        readonly
        value={buildDeckText()}
        rows={12}
        class="min-h-48 border-white/10 bg-white/5 text-slate-100"
      />
    </div>
  {/if}

  <!-- Card search -->
  <div class="space-y-2">
    <label class="text-sm font-medium text-slate-200" for="deck-builder-search">Add cards</label>
    <Input
      id="deck-builder-search"
      bind:value={searchQuery}
      placeholder="Search by name…"
      disabled={loading || saving}
      class="border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-400"
    />
    {#if searchResults.length > 0}
      <div class="max-h-64 space-y-1 overflow-y-auto rounded-lg border border-white/10 bg-slate-900/60 p-2">
        {#each searchResults as result (result.id)}
          {@const existing = entries.find((e) => e.cardPublicId === result.id)?.quantity ?? 0}
          <button
            type="button"
            class="flex w-full items-center justify-between rounded px-2 py-1.5 text-left text-sm text-slate-100 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={existing >= 4}
            onclick={() => adjustQuantity(result.id, 1)}
          >
            <span>{result.name}</span>
            <span class="text-xs text-slate-400">
              {existing > 0 ? `${existing}/4` : "Add"}
            </span>
          </button>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Deck list -->
  <div class="space-y-2">
    <h3 class="text-sm font-medium text-slate-200">Deck ({totalCards})</h3>
    {#if loading}
      <div class="flex items-center gap-2 text-sm text-slate-400">
        <Loader class="size-4 animate-spin" />
        Loading deck…
      </div>
    {:else if loadError}
      <div class="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
        {loadError}
      </div>
    {:else if entries.length === 0}
      <p class="text-sm text-slate-400">
        No cards yet. Use the search above or <button
          type="button"
          class="underline hover:text-slate-200"
          onclick={() => { importOpen = true; }}
        >import a list</button>.
      </p>
    {:else}
      <div class="divide-y divide-white/10 rounded-lg border border-white/10 bg-slate-900/40">
        {#each sortedEntries as entry (entry.cardPublicId)}
          <div class="flex items-center justify-between gap-3 px-3 py-2">
            <span class="text-sm text-slate-100">{cardNameFor(entry.cardPublicId)}</span>
            <div class="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                class="size-7 text-slate-300 hover:bg-white/10 hover:text-white"
                onclick={() => adjustQuantity(entry.cardPublicId, -1)}
                aria-label="Decrease quantity"
              >
                <Minus class="size-3.5" />
              </Button>
              <span class="w-6 text-center text-sm tabular-nums text-slate-100">
                {entry.quantity}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                class="size-7 text-slate-300 hover:bg-white/10 hover:text-white"
                disabled={entry.quantity >= 4}
                onclick={() => adjustQuantity(entry.cardPublicId, 1)}
                aria-label="Increase quantity"
              >
                <Plus class="size-3.5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                class="size-7 text-rose-300 hover:bg-rose-500/15 hover:text-rose-200"
                onclick={() => removeCard(entry.cardPublicId)}
                aria-label="Remove card"
              >
                <Trash2 class="size-3.5" />
              </Button>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
