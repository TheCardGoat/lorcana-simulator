<script lang="ts">
  import { locales } from "$lib/paraglide/runtime";
  import { m } from "$lib/paraglide/messages.js";
  import * as Dialog from "$lib/design-system/primitives/dialog";

  type SupportedLocale = (typeof locales)[number];

  interface PlayerSettingsDialogProps {
    open?: boolean;
    selectedLocale: SupportedLocale;
    showRawLogRegistryJson?: boolean;
    skipActionConfirmation?: boolean;
    onLocaleSelection: (nextLocale: SupportedLocale) => void;
    onToggleRawLogRegistryJson?: (enabled: boolean) => void;
    onToggleSkipActionConfirmation?: (enabled: boolean) => void;
  }

  let {
    open = $bindable(false),
    selectedLocale,
    showRawLogRegistryJson = false,
    skipActionConfirmation = false,
    onLocaleSelection,
    onToggleRawLogRegistryJson,
    onToggleSkipActionConfirmation,
  }: PlayerSettingsDialogProps = $props();

  function getLocaleLabel(locale: SupportedLocale): string {
    switch (locale) {
      case "en":
        return m["sim.locale.name.en"]({});
      case "es":
        return m["sim.locale.name.es"]({});
      case "de":
        return m["sim.locale.name.de"]({});
      case "it":
        return m["sim.locale.name.it"]({});
      case "pt-br":
        return m["sim.locale.name.pt-br"]({});
    }
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

</script>

<Dialog.Root bind:open>
  <Dialog.Portal>
    <Dialog.Overlay class="player-settings-overlay" />
    <Dialog.Content class="player-settings-dialog" showCloseButton={false}>
      <Dialog.Title class="player-settings-title">{m["sim.settings.title"]({})}</Dialog.Title>
      <Dialog.Description class="player-settings-description">
        {m["sim.settings.description"]({})}
      </Dialog.Description>

      <div class="player-settings-form">
        <label class="player-settings-label" for="player-language-select">
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

      <div class="player-settings-form">
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

      <div class="player-settings-form">
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

      <div class="player-settings-actions">
        <Dialog.Close class="player-settings-close" aria-label={m["sim.settings.closeAria"]({})}>
          {m["sim.settings.close"]({})}
        </Dialog.Close>
      </div>
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
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 51;
    width: min(92vw, 420px);
    transform: translate(-50%, -50%);
    border-radius: 0.95rem;
    border: 1px solid rgba(108, 145, 192, 0.35);
    background: rgba(9, 16, 28, 0.96);
    box-shadow: 0 18px 48px rgba(2, 8, 18, 0.5);
    padding: 1rem;
    color: #e5edf7;
  }

  :global(.player-settings-title) {
    margin: 0;
    font-size: 1rem;
    line-height: 1.2;
    letter-spacing: 0.01em;
  }

  :global(.player-settings-description) {
    margin: 0.45rem 0 0;
    font-size: 0.85rem;
    color: #9fb2c9;
  }

  :global(.player-settings-form) {
    margin-top: 1rem;
    display: grid;
    gap: 0.45rem;
  }

  :global(.player-settings-label) {
    font-size: 0.78rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #c9daee;
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

  :global(.player-settings-actions) {
    margin-top: 0.9rem;
    display: flex;
    justify-content: flex-end;
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

</style>
