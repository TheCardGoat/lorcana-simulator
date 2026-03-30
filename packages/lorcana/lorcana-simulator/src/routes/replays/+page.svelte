<script lang="ts">
  import { onMount } from "svelte";
import { Badge } from "$lib/design-system/primitives/badge";
  import { Button } from "$lib/design-system/primitives/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "$lib/design-system/primitives/card";
  import { Download, Eye, Trash2, Film, Upload } from "@lucide/svelte";
  import {
    listSavedReplays,
    deleteReplay,
    loadReplayData,
    isReplayStoreAvailable,
    importReplayFromFile,
    ReplayImportError,
    type SavedReplayMeta,
  } from "@/features/replay/index.js";
  import { downloadReplayZipFromBlob } from "@/features/replay/download-replay.js";

  let replays = $state<SavedReplayMeta[]>([]);
  let loading = $state(true);
  let storeAvailable = $state(false);
  let importing = $state(false);
  let importError = $state<string | null>(null);
  let isDragOver = $state(false);
  let fileInputEl = $state<HTMLInputElement | null>(null);

  const totalSizeBytes = $derived(
    replays.reduce((sum, r) => sum + (r.sizeBytes ?? 0), 0),
  );

  onMount(async () => {
    storeAvailable = isReplayStoreAvailable();
    if (!storeAvailable) {
      loading = false;
      return;
    }

    try {
      replays = await listSavedReplays();
    } catch (error) {
      console.error("[SavedReplays] Failed to load:", error);
    } finally {
      loading = false;
    }
  });

  function formatDate(iso: string): string {
    try {
      return new Date(iso).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  }

  function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function daysUntilExpiry(expiresAt: number): number {
    return Math.max(0, Math.ceil((expiresAt - Date.now()) / (24 * 60 * 60 * 1000)));
  }

  async function handleDelete(gameId: string): Promise<void> {
    try {
      await deleteReplay(gameId);
      replays = replays.filter((r) => r.gameId !== gameId);
    } catch (error) {
      console.error("[SavedReplays] Failed to delete:", error);
    }
  }

  async function handleDownload(gameId: string): Promise<void> {
    try {
      const blob = await loadReplayData(gameId);
      if (!blob) {
        console.error("[SavedReplays] Replay data not found in IndexedDB");
        return;
      }
      await downloadReplayZipFromBlob(gameId, blob);
    } catch (error) {
      console.error("[SavedReplays] Failed to download:", error);
    }
  }

  async function handleImportFile(file: File): Promise<void> {
    console.log("[ReplayImport] handleImportFile", { name: file.name, size: file.size });
    if (importing) {
      console.log("[ReplayImport] already importing, skipping");
      return;
    }
    importError = null;
    importing = true;
    try {
      console.log("[ReplayImport] calling importReplayFromFile...");
      const gameId = await importReplayFromFile(file);
      console.log("[ReplayImport] success, gameId:", gameId);
      window.open(`/replay/${gameId}`, "_blank");
    } catch (err) {
      if (err instanceof ReplayImportError) {
        console.warn("[ReplayImport] validation error:", err.message);
        importError = err.message;
      } else {
        console.error("[ReplayImport] unexpected error:", err);
        importError = "Failed to import replay.";
      }
    } finally {
      importing = false;
    }
  }

  function onFileInputChange(event: Event): void {
    const input = event.currentTarget as HTMLInputElement;
    const file = input.files?.[0];
    console.log("[ReplayImport] file input changed", file?.name);
    if (file) {
      void handleImportFile(file);
      input.value = "";
    }
  }

  function onDragEnter(event: DragEvent): void {
    event.preventDefault();
    console.log("[ReplayImport] dragenter, types:", event.dataTransfer?.types);
    isDragOver = true;
  }

  function onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  function onDragLeave(event: DragEvent): void {
    const zone = event.currentTarget as HTMLElement;
    if (!zone.contains(event.relatedTarget as Node | null)) {
      console.log("[ReplayImport] dragleave (exited zone)");
      isDragOver = false;
    }
  }

  function onDrop(event: DragEvent): void {
    event.preventDefault();
    isDragOver = false;
    const file = event.dataTransfer?.files[0];
    console.log("[ReplayImport] drop, file:", file?.name, "files count:", event.dataTransfer?.files.length);
    if (file) void handleImportFile(file);
    else console.warn("[ReplayImport] drop had no files", event.dataTransfer);
  }
</script>

<main class="mx-auto max-w-4xl px-4 py-8">
  <div class="mb-6 flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-slate-100">Saved Replays</h1>
      {#if replays.length > 0}
        <p class="mt-1 text-sm text-slate-400">
          {replays.length} replay{replays.length !== 1 ? "s" : ""} &middot; {formatBytes(totalSizeBytes)} stored
        </p>
      {/if}
    </div>

    {#if storeAvailable}
      <div>
        <input
          bind:this={fileInputEl}
          type="file"
          accept=".zip"
          class="hidden"
          onchange={onFileInputChange}
        />
        <Button
          variant="outline"
          size="sm"
          onclick={() => fileInputEl?.click()}
          disabled={importing}
        >
          <Upload class="mr-1.5 size-3.5" />
          {importing ? "Importing…" : "Import replay"}
        </Button>
      </div>
    {/if}
  </div>

  {#if importError}
    <div class="mb-4 rounded-md border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-300">
      {importError}
    </div>
  {/if}

  {#if loading}
    <div class="grid place-items-center py-24 text-slate-400">Loading saved replays...</div>
  {:else if !storeAvailable}
    <Card class="border-amber-400/20 bg-slate-950/80 text-slate-100">
      <CardHeader>
        <CardTitle>Storage unavailable</CardTitle>
        <CardDescription class="text-slate-300">
          Your browser does not support IndexedDB. Saved replays require IndexedDB to work.
        </CardDescription>
      </CardHeader>
    </Card>
  {:else}
    <!-- Drag & drop zone -->
    <div
      role="region"
      aria-label="Drop replay file here"
      class="mb-6 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors {isDragOver
        ? 'border-indigo-400/70 bg-indigo-400/10'
        : 'border-slate-700/50 bg-slate-950/40 hover:border-slate-600/60'}"
      ondragenter={onDragEnter}
      ondragover={onDragOver}
      ondragleave={onDragLeave}
      ondrop={onDrop}
    >
      <Upload class="mx-auto mb-3 size-8 text-slate-500" />
      <p class="text-sm font-medium text-slate-300">
        Drop a replay <span class="font-mono text-xs text-slate-400">.zip</span> file here
      </p>
      <p class="mt-1 text-xs text-slate-500">
        or use the <button
          class="underline underline-offset-2 hover:text-slate-300"
          onclick={() => fileInputEl?.click()}
        >Import replay</button> button above
      </p>
    </div>

    {#if replays.length === 0}
      <Card class="border-slate-700/50 bg-slate-950/80 text-slate-100">
        <CardHeader class="items-center text-center">
          <Film class="mb-2 size-10 text-slate-500" />
          <CardTitle>No saved replays</CardTitle>
          <CardDescription class="text-slate-400">
            Replays can be saved from the post-game summary after completing a match, or imported from a downloaded .zip file.
          </CardDescription>
        </CardHeader>
      </Card>
    {:else}
      <div class="flex flex-col gap-3">
        {#each replays as replay (replay.gameId)}
          <Card class="border-slate-700/40 bg-slate-950/70 text-slate-100">
            <CardContent class="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="truncate text-sm font-medium text-slate-200">
                    {formatDate(replay.completedAt)}
                  </span>
                  {#if replay.winnerId}
                    <Badge variant="secondary" class="rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-200">
                      Winner: {replay.winnerId}
                    </Badge>
                  {/if}
                  <Badge variant="secondary" class="rounded-full border border-white/10 bg-white/5 text-slate-300">
                    {replay.totalMoves} moves
                  </Badge>
                  <Badge variant="secondary" class="rounded-full border border-white/10 bg-white/5 text-slate-300">
                    {replay.totalTurns} turns
                  </Badge>
                </div>
                <div class="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span>{replay.playerIds[0]} vs {replay.playerIds[1]}</span>
                  <span>&middot;</span>
                  <span>{formatBytes(replay.sizeBytes)}</span>
                  <span>&middot;</span>
                  <span>Expires in {daysUntilExpiry(replay.expiresAt)}d</span>
                </div>
              </div>

              <div class="flex shrink-0 items-center gap-2">
                <Button variant="outline" size="sm" href={`/replay/${replay.gameId}`} target="_blank">
                  <Eye class="mr-1 size-3.5" />
                  Watch
                </Button>
                <Button variant="outline" size="sm" onclick={() => handleDownload(replay.gameId)}>
                  <Download class="size-3.5" />
                </Button>
                <Button variant="ghost" size="sm" class="text-slate-400 hover:text-rose-300" onclick={() => handleDelete(replay.gameId)}>
                  <Trash2 class="size-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        {/each}
      </div>
    {/if}
  {/if}
</main>
