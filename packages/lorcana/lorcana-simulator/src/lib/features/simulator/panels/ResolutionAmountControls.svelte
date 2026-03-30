<script lang="ts">
  import type { ResolutionAmountSelectionState } from "@/features/simulator/model/contracts.js";

  interface ResolutionAmountControlsProps {
    selection: ResolutionAmountSelectionState;
    onChange?: (value: number) => void;
  }

  let { selection, onChange }: ResolutionAmountControlsProps = $props();

  function updateFromInput(rawValue: string): void {
    const parsedValue = Number.parseInt(rawValue, 10);
    if (Number.isNaN(parsedValue)) {
      return;
    }

    onChange?.(parsedValue);
  }
</script>

<section class="resolution-amount-controls">
  <div class="resolution-amount-controls__header">
    <p class="resolution-amount-controls__label">{selection.label}</p>
    <p class="resolution-amount-controls__value">{selection.value}</p>
  </div>

  <input
    class="resolution-amount-controls__range"
    type="range"
    min={selection.min}
    max={selection.max}
    step="1"
    value={selection.value}
    oninput={(event) => updateFromInput((event.currentTarget as HTMLInputElement).value)}
  />

  <div class="resolution-amount-controls__footer">
    <span class="resolution-amount-controls__bound">{selection.min}</span>
    <input
      class="resolution-amount-controls__input"
      type="number"
      min={selection.min}
      max={selection.max}
      step="1"
      value={selection.value}
      oninput={(event) => updateFromInput((event.currentTarget as HTMLInputElement).value)}
    />
    <span class="resolution-amount-controls__bound">{selection.max}</span>
  </div>
</section>

<style>
  .resolution-amount-controls {
    display: grid;
    gap: 0.65rem;
    padding: 0.85rem 0.95rem;
    border-radius: 1rem;
    border: 1px solid rgba(125, 211, 252, 0.2);
    background: rgba(8, 47, 73, 0.2);
  }

  .resolution-amount-controls__header,
  .resolution-amount-controls__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .resolution-amount-controls__label,
  .resolution-amount-controls__value,
  .resolution-amount-controls__bound {
    margin: 0;
    color: rgba(226, 232, 240, 0.92);
    font-size: 0.82rem;
    font-weight: 700;
  }

  .resolution-amount-controls__value {
    color: #f0f9ff;
    font-size: 0.95rem;
  }

  .resolution-amount-controls__range {
    width: 100%;
    accent-color: #38bdf8;
  }

  .resolution-amount-controls__input {
    width: 4.5rem;
    min-width: 4.5rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(125, 211, 252, 0.2);
    padding: 0.45rem 0.65rem;
    text-align: center;
    background: rgba(15, 23, 42, 0.72);
    color: #f8fafc;
  }
</style>
