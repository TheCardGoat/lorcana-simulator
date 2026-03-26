<script lang="ts">
import HotkeyDisplay from "@/features/simulator/hotkeys/HotkeyDisplay.svelte";

interface HotkeyCardBadgeProps {
	hotkey: string;
}

let { hotkey }: HotkeyCardBadgeProps = $props();
</script>

<div class="absolute top-0 right-0 z-30 pointer-events-none rounded-sm bg-black" aria-hidden="true">
  <HotkeyDisplay
    hotkey={hotkey}
    keyClass="h-5 min-w-5 text-white shadow-none !border-none !bg-black"
  />
</div>
