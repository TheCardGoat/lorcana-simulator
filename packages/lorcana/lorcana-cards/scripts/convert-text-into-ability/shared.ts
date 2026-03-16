import type {
  Amount,
  CardTarget,
  CharacterTarget,
  EffectDuration,
  ItemTarget,
  LocationTarget,
  PlayerTarget,
} from "@tcg/lorcana-types";

export const REMOVE_ALL_DAMAGE_AMOUNT = 99;

export type SupportedPlayerTarget = PlayerTarget;
export type SupportedCharacterTarget = CharacterTarget;
export type SupportedLocationTarget = LocationTarget;
export type SupportedItemTarget = ItemTarget;
export type SupportedCardTarget = CardTarget | SupportedPlayerTarget;

export interface Segment {
  text: string;
}

export interface TargetMatch<TTarget extends SupportedCardTarget> {
  consumed: string;
  target: TTarget;
}

export interface AmountMatch {
  amount: Amount;
  consumed: string;
}

const DURATION_PATTERNS: readonly {
  pattern: RegExp;
  duration: EffectDuration;
}[] = [
  { pattern: /during their next turn$/i, duration: "their-next-turn" },
  { pattern: /until the start of your next turn$/i, duration: "until-start-of-next-turn" },
  { pattern: /for the rest of this turn$/i, duration: "this-turn" },
  { pattern: /this turn$/i, duration: "this-turn" },
];

export const KEYWORD_PATTERN = /^(?<keyword>[A-Za-z][A-Za-z ]*?)(?:\s+\+(?<value>\d+))?$/;

export function normalizeText(text: string): string {
  return text
    .replace(/\([^()]*\)/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.])/g, "$1")
    .trim();
}

export function splitComposite(text: string): Segment[] {
  const normalized = normalizeText(text);
  const parts = normalized
    .split(/\.\s+|,\s+then\s+|,\s+and\s+then\s+/i)
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length <= 1) {
    return [{ text: normalized.replace(/\.$/, "") }];
  }

  return parts.map((part) => ({ text: part.replace(/\.$/, "") }));
}

export function parseDuration(text: string): EffectDuration | undefined {
  const found = DURATION_PATTERNS.find(({ pattern }) => pattern.test(text));
  return found?.duration;
}

export function stripDuration(text: string): string {
  let result = text;

  for (const { pattern } of DURATION_PATTERNS) {
    result = result.replace(pattern, "").trim();
  }

  return result;
}
