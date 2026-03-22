<script lang="ts">
  import { locales } from "$lib/paraglide/runtime.js";
  import { m } from "$lib/i18n/messages.js";
  import * as Dialog from "$lib/design-system/primitives/dialog";
  import type { AnimationSpeed, CardPreviewMode, PrimaryClickAction } from "@/features/simulator/context/game-context.svelte.js";
  import SimulatorSupportActions from "@/features/simulator/support/SimulatorSupportActions.svelte";

  type SupportedLocale = (typeof locales)[number];

  interface PlayerSettingsDialogProps {
    open?: boolean;
    selectedLocale: SupportedLocale;
    showRawLogRegistryJson?: boolean;
    skipActionConfirmation?: boolean;
    cardPreviewMode?: CardPreviewMode;
    primaryClickAction?: PrimaryClickAction;
    animationSpeed?: AnimationSpeed;
    soundVolume?: number;
    onLocaleSelection: (nextLocale: SupportedLocale) => void;
    onToggleRawLogRegistryJson?: (enabled: boolean) => void;
    onToggleSkipActionConfirmation?: (enabled: boolean) => void;
    onCardPreviewModeChange?: (mode: CardPreviewMode) => void;
    onPrimaryClickActionChange?: (action: PrimaryClickAction) => void;
    onAnimationSpeedChange?: (speed: AnimationSpeed) => void;
    onSoundVolumeChange?: (volume: number) => void;
  }

  let {
    open = $bindable(false),
    selectedLocale,
    showRawLogRegistryJson = false,
    skipActionConfirmation = false,
    cardPreviewMode = "delayed",
    primaryClickAction = "challenge",
    animationSpeed = "normal",
    soundVolume = 50,
    onLocaleSelection,
    onToggleRawLogRegistryJson,
    onToggleSkipActionConfirmation,
    onCardPreviewModeChange,
    onPrimaryClickActionChange,
    onAnimationSpeedChange,
    onSoundVolumeChange,
  }: PlayerSettingsDialogProps = $props();

  function getLocaleLabel(locale: SupportedLocale): string {
    return {
      en: m["sim.locale.name.en"]({}),
      es: m["sim.locale.name.es"]({}),
      de: m["sim.locale.name.de"]({}),
      it: m["sim.locale.name.it"]({}),
      "pt-br": m["sim.locale.name.pt-br"]({}),
    }[locale];
  }

  function handleLocaleSelection(event: Event): void {
    const selectElement = event.currentTarget;
    if (!(selectElement instanceof HTMLSelectElement)) {
      return;
    }

    const nextLocale = selectElement.value as SupportedLocale;
    if (!locales.includes(nextLocale)) {
      return;
    }

    onLocaleSelection(nextLocale);
  }

  function handleRawLogRegistryToggle(event: Event): void {
    const input = event.currentTarget;
    if (!(input instanceof HTMLInputElement)) {
      return;
    }

    onToggleRawLogRegistryJson?.(input.checked);
  }

  function handleSkipActionConfirmationToggle(event: Event): void {
    const input = event.currentTarget;
    if (!(input instanceof HTMLInputElement)) {
      return;
    }

    onToggleSkipActionConfirmation?.(input.checked);
  }

  function handleCardPreviewModeSelection(event: Event): void {
    const selectElement = event.currentTarget;
    if (!(selectElement instanceof HTMLSelectElement)) {
      return;
    }

    const nextMode = selectElement.value as CardPreviewMode;
    if (nextMode === "disabled" || nextMode === "immediate" || nextMode === "delayed") {
      onCardPreviewModeChange?.(nextMode);
    }
  }

  function handlePrimaryClickActionSelection(event: Event): void {
    const select = event.currentTarget;
    if (!(select instanceof HTMLSelectElement)) return;
    const next = select.value as PrimaryClickAction;
    if (next === "challenge" || next === "quest" || next === "none") {
      onPrimaryClickActionChange?.(next);
    }
  }

  function handleAnimationSpeedSelection(event: Event): void {
    const select = event.currentTarget;
    if (!(select instanceof HTMLSelectElement)) return;
    const next = select.value as AnimationSpeed;
    if (next === "fast" || next === "normal" || next === "slow") {
      onAnimationSpeedChange?.(next);
    }
  }

  function handleSoundVolumeChange(event: Event): void {
    const input = event.currentTarget;
    if (!(input instanceof HTMLInputElement)) return;
    onSoundVolumeChange?.(Number(input.value));
  }

</script>

<Dialog.Root bind:open>
  <Dialog.Portal>
    <Dialog.Overlay class="player-settings-overlay" />
    <Dialog.Content class="player-settings-dialog" showCloseButton={false}>
      <Dialog.Header class="gap-1">
        <Dialog.Title class="text-base font-semibold tracking-tight text-slate-100">
          {m["sim.settings.title"]({})}
        </Dialog.Title>
        <Dialog.Description class="text-sm text-slate-400">
          {m["sim.settings.description"]({})}
        </Dialog.Description>
      </Dialog.Header>

      <div class="grid gap-4">
        <div class="grid gap-1.5">
          <label class="text-xs font-medium uppercase tracking-widest text-slate-400" for="player-language-select">
            {m["sim.settings.languageLabel"]({})}
          </label>
          <select
            id="player-language-select"
            class="player-settings-select"
            bind:value={selectedLocale}
            onchange={handleLocaleSelection}
          >
            {#each locales as locale}
              <option value={locale}>{getLocaleLabel(locale as SupportedLocale)}</option>
            {/each}
          </select>
        </div>

        <div class="grid gap-1.5">
          <label
            class="player-settings-checkbox-row"
            for="player-skip-action-confirmation-toggle"
          >
            <input
              id="player-skip-action-confirmation-toggle"
              type="checkbox"
              checked={skipActionConfirmation}
              onchange={handleSkipActionConfirmationToggle}
            />
            <span>{m["sim.settings.skipActionConfirmationLabel"]({})}</span>
          </label>
          <p class="player-settings-help">{m["sim.settings.skipActionConfirmationDescription"]({})}</p>
        </div>

        <div class="grid gap-1.5">
          <label class="text-xs font-medium uppercase tracking-widest text-slate-400" for="player-card-preview-mode-select">
            {m["sim.settings.cardPreviewModeLabel"]({})}
          </label>
          <select
            id="player-card-preview-mode-select"
            class="player-settings-select"
            value={cardPreviewMode}
            onchange={handleCardPreviewModeSelection}
          >
            <option value="disabled">{m["sim.settings.cardPreviewMode.disabled"]({})}</option>
            <option value="immediate">{m["sim.settings.cardPreviewMode.immediate"]({})}</option>
            <option value="delayed">{m["sim.settings.cardPreviewMode.delayed"]({})}</option>
          </select>
          <p class="player-settings-help">{m["sim.settings.cardPreviewModeDescription"]({})}</p>
        </div>

        <div class="grid gap-1.5">
          <label class="text-xs font-medium uppercase tracking-widest text-slate-400" for="player-primary-click-action-select">
            {m["sim.settings.primaryClickActionLabel"]({})}
          </label>
          <select
            id="player-primary-click-action-select"
            class="player-settings-select"
            value={primaryClickAction}
            onchange={handlePrimaryClickActionSelection}
          >
            <option value="challenge">{m["sim.settings.primaryClickAction.challenge"]({})}</option>
            <option value="quest">{m["sim.settings.primaryClickAction.quest"]({})}</option>
            <option value="none">{m["sim.settings.primaryClickAction.none"]({})}</option>
          </select>
          <p class="player-settings-help">{m["sim.settings.primaryClickActionDescription"]({})}</p>
        </div>

        <div class="grid gap-1.5">
          <label class="text-xs font-medium uppercase tracking-widest text-slate-400" for="player-animation-speed-select">
            {m["sim.settings.animationSpeedLabel"]({})}
          </label>
          <select
            id="player-animation-speed-select"
            class="player-settings-select"
            value={animationSpeed}
            onchange={handleAnimationSpeedSelection}
          >
            <option value="fast">{m["sim.settings.animationSpeed.fast"]({})}</option>
            <option value="normal">{m["sim.settings.animationSpeed.normal"]({})}</option>
            <option value="slow">{m["sim.settings.animationSpeed.slow"]({})}</option>
          </select>
          <p class="player-settings-help">{m["sim.settings.animationSpeedDescription"]({})}</p>
        </div>

        <div class="grid gap-1.5">
          <label class="text-xs font-medium uppercase tracking-widest text-slate-400" for="player-sound-volume-slider">
            {m["sim.settings.soundVolumeLabel"]({})}
          </label>
          <div class="sound-volume-row">
            <input
              id="player-sound-volume-slider"
              type="range"
              min="0"
              max="100"
              step="1"
              value={soundVolume}
              oninput={handleSoundVolumeChange}
              class="sound-volume-slider"
            />
            <span class="sound-volume-value">{soundVolume}%</span>
          </div>
          <p class="player-settings-help">{m["sim.settings.soundVolumeDescription"]({})}</p>
        </div>

        <div class="grid gap-1.5">
          <label class="player-settings-checkbox-row" for="player-raw-log-registry-toggle">
            <input
              id="player-raw-log-registry-toggle"
              type="checkbox"
              checked={showRawLogRegistryJson}
              onchange={handleRawLogRegistryToggle}
            />
            <span>{m["sim.settings.logRegistryRawLabel"]({})}</span>
          </label>
          <p class="player-settings-help">{m["sim.settings.logRegistryRawDescription"]({})}</p>
        </div>

        <div class="grid gap-1.5">
          <div class="player-settings-support-copy">
            <p class="player-settings-support-title">{m["sim.support.title"]({})}</p>
            <p class="player-settings-help">{m["sim.support.description"]({})}</p>
          </div>
          <SimulatorSupportActions />
        </div>
      </div>

      <Dialog.Footer>
        <Dialog.Close class="player-settings-close" aria-label={m["sim.settings.closeAria"]({})}>
          {m["sim.settings.close"]({})}
        </Dialog.Close>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

<style>
  :global(.player-settings-overlay) {
    position: fixed;
    inset: 0;
    z-index: 50;
    background: rgba(2, 8, 18, 0.7);
    backdrop-filter: blur(3px);
  }

  :global(.player-settings-dialog) {
    max-width: min(92vw, 420px) !important;
    border-radius: 0.95rem;
    border: 1px solid rgba(108, 145, 192, 0.35) !important;
    background: rgba(9, 16, 28, 0.96) !important;
    box-shadow: 0 18px 48px rgba(2, 8, 18, 0.5);
    padding: 1.25rem;
    color: #e5edf7 !important;
  }

  :global(.player-settings-select) {
    width: 100%;
    border-radius: 0.55rem;
    border: 1px solid rgba(108, 145, 192, 0.42);
    background: rgba(14, 25, 40, 0.92);
    color: #e5edf7;
    padding: 0.5rem 0.6rem;
    font-size: 0.92rem;
  }

  :global(.player-settings-select:focus-visible) {
    outline: 2px solid rgba(147, 197, 253, 0.5);
    outline-offset: 1px;
    border-color: rgba(147, 197, 253, 0.75);
  }

  :global(.player-settings-close) {
    border-radius: 0.5rem;
    border: 1px solid rgba(125, 211, 252, 0.5);
    background: rgba(21, 48, 77, 0.8);
    color: #dbeafe;
    padding: 0.4rem 0.8rem;
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  :global(.player-settings-close:hover),
  :global(.player-settings-close:focus-visible) {
    background: rgba(34, 74, 117, 0.95);
    border-color: rgba(191, 219, 254, 0.82);
    outline: none;
  }

  :global(.player-settings-checkbox-row) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: #e5edf7;
  }

  :global(.player-settings-checkbox-row input) {
    margin: 0;
  }

  :global(.player-settings-help) {
    margin: 0;
    color: #9fb2c9;
    font-size: 0.75rem;
    line-height: 1.35;
  }

  .sound-volume-row {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .player-settings-support-copy {
    display: grid;
    gap: 0.18rem;
  }

  .player-settings-support-title {
    margin: 0;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #94a3b8;
  }

  .sound-volume-slider {
    flex: 1;
    accent-color: rgba(125, 211, 252, 0.8);
  }

  .sound-volume-value {
    min-width: 3ch;
    text-align: right;
    font-size: 0.85rem;
    font-variant-numeric: tabular-nums;
    color: #e5edf7;
  }
</style>
