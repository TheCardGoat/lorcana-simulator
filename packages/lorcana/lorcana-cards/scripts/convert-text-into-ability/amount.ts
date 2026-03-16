import type { Amount } from "@tcg/lorcana-types";
import type { AmountMatch } from "./shared";

function toSingleOrPluralAmountMatch(
  normalized: string,
  singularWord: string,
  pluralWord: string,
): AmountMatch | null {
  if (new RegExp(`^(?:a|an) ${singularWord}$`, "i").test(normalized)) {
    return { amount: 1, consumed: normalized };
  }

  const numberMatch = normalized.match(new RegExp(`^(\\d+)\\s+${pluralWord}$`, "i"));
  if (!numberMatch) {
    return null;
  }

  return {
    amount: Number.parseInt(numberMatch[1], 10),
    consumed: numberMatch[0],
  };
}

export function parseCardAmount(fragment: string): AmountMatch | null {
  const normalized = fragment.trim().replace(/\s+instead$/i, "");
  return (
    toSingleOrPluralAmountMatch(normalized, "card", "cards?") ??
    (/^their hand$/i.test(normalized)
      ? {
          amount: "all" satisfies Amount,
          consumed: normalized,
        }
      : null) ??
    (/^that many cards?$/i.test(normalized)
      ? {
          amount: { type: "trigger-amount" } satisfies Amount,
          consumed: normalized,
        }
      : null)
  );
}

export function parseLoreAmount(fragment: string): AmountMatch | null {
  const normalized = fragment.trim().replace(/\s+instead$/i, "");
  return (
    toSingleOrPluralAmountMatch(normalized, "lore", "lore") ??
    (/^that many lore$/i.test(normalized)
      ? {
          amount: { type: "trigger-amount" } satisfies Amount,
          consumed: normalized,
        }
      : null)
  );
}

export function parseForEachAmount(fragment: string): AmountMatch | null {
  const normalized = fragment.trim();
  const upToMatch = normalized.match(/^up to (\d+)$/i);
  if (upToMatch) {
    return {
      amount: Number.parseInt(upToMatch[1], 10),
      consumed: normalized,
    };
  }

  if (/^for each 1 damage removed this way$/i.test(normalized)) {
    return {
      amount: {
        type: "for-each",
        counter: {
          type: "damage-removed",
        },
      },
      consumed: normalized,
    };
  }

  if (/^that many$/i.test(normalized)) {
    return {
      amount: { type: "trigger-amount" },
      consumed: normalized,
    };
  }

  if (
    /^for each different ink (?:type|symbol) (?:of|on) cards revealed this way$/i.test(normalized)
  ) {
    return {
      amount: { type: "trigger-amount" },
      consumed: normalized,
    };
  }

  return null;
}
