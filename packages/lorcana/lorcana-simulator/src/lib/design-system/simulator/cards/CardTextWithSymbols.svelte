<script lang="ts">
import { buildSimulatorAssetUrl } from "$lib/config/public-url-config.js";

interface Props {
  text: string;
}

const { text }: Props = $props();

const SYMBOL_BASE_URL = buildSimulatorAssetUrl("symbols");
const SYMBOLS: Record<string, string> = {
  E: "exert.svg",
  W: "willpower-2.svg",
  L: "lore-2.svg",
  S: "strength-simple-2.svg",
  I: "ink-simple-2.svg",
};
const SYMBOL_PATTERN = /\{([EWLSI])\}/gi;

type Token = { type: "text"; value: string } | { type: "symbol"; file: string; code: string };

function tokenize(raw: string): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;

  for (const match of raw.matchAll(SYMBOL_PATTERN)) {
    const [fullMatch, code] = match;
    const start = match.index ?? 0;
    const file = SYMBOLS[code.toUpperCase()];

    if (start > lastIndex) {
      tokens.push({ type: "text", value: raw.slice(lastIndex, start) });
    }

    if (file) {
      tokens.push({ type: "symbol", file, code: code.toUpperCase() });
    } else {
      tokens.push({ type: "text", value: fullMatch });
    }

    lastIndex = start + fullMatch.length;
  }

  if (lastIndex < raw.length) {
    tokens.push({ type: "text", value: raw.slice(lastIndex) });
  }

  return tokens;
}

const tokens = $derived(tokenize(text));
</script>

{#each tokens as token, i (i)}
  {#if token.type === "symbol"}
    <img
      src={`${SYMBOL_BASE_URL}/${token.file}`}
      alt={token.code}
      class="inline-symbol"
    />
  {:else}
    {token.value}
  {/if}
{/each}

<style>
  .inline-symbol {
    display: inline-block;
    width: 0.9em;
    height: 0.9em;
    margin: 0 0.06em;
    vertical-align: -0.1em;
    object-fit: contain;
  }
</style>
