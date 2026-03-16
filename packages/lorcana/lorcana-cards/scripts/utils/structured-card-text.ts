import type { CardText, CardTextEntry } from "@tcg/lorcana-types";

const EFFECT_WORDS = [
  "When",
  "Whenever",
  "At",
  "During",
  "While",
  "If",
  "Your",
  "This",
  "Each",
  "Chosen",
  "Choose",
  "Deal",
  "Draw",
  "Banish",
  "Return",
  "Put",
  "Ready",
  "Move",
  "Gain",
  "Pay",
  "Look",
  "Reveal",
  "Shuffle",
  "Remove",
  "Play",
  "You",
];

const EFFECT_WORD_PATTERN = new RegExp(`\\b(?:${EFFECT_WORDS.join("|")})\\b`, "g");
const ACTIVATED_SEPARATOR_PATTERN =
  /^(?<title>[A-Z0-9][A-Z0-9'",.!?&/:;+-]*(?: [A-Z0-9][A-Z0-9'",.!?&/:;+-]*)*)(?<description> .*(?:—|–| - ).+)$/;
const SINGLE_QUOTE_VARIANTS = /[’‘‛ʼ]/g;
const DOUBLE_QUOTE_VARIANTS = /[“”„‟]/g;
const DASH_SEPARATOR_VARIANTS = /[ \t]+(?:—|–|―|−|-)[ \t]+/g;
const ELLIPSIS_VARIANTS = /…/g;
const NON_BREAKING_SPACES = /\u00a0/g;

export function normalizeCardTextContent(text: string): string {
  return text
    .replace(NON_BREAKING_SPACES, " ")
    .replace(SINGLE_QUOTE_VARIANTS, "'")
    .replace(DOUBLE_QUOTE_VARIANTS, '"')
    .replace(DASH_SEPARATOR_VARIANTS, " — ")
    .replace(ELLIPSIS_VARIANTS, "...");
}

export function normalizeCardTextEntries(entries: CardTextEntry[]): CardTextEntry[] {
  return entries.map((entry) => ({
    title: normalizeCardTextContent(entry.title),
    ...(entry.description ? { description: normalizeCardTextContent(entry.description) } : {}),
  }));
}

export function shouldUsePlainStringCardText(entries: CardTextEntry[]): boolean {
  return entries.length === 1 && !entries[0]?.description;
}

export function cardTextEntriesToCardText(entries: CardTextEntry[]): CardText {
  if (entries.length === 0) return "";
  if (shouldUsePlainStringCardText(entries)) {
    return entries[0]!.title;
  }
  return entries;
}

function buildLogicalSegments(text: string): string[] {
  const lines = text
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) return [];

  const segments: string[] = [];
  let currentSegment = "";

  for (const line of lines) {
    if (line.startsWith("- ") && currentSegment) {
      currentSegment = `${currentSegment}\n${line}`;
      continue;
    }

    if (currentSegment) {
      segments.push(currentSegment);
    }

    currentSegment = line;
  }

  if (currentSegment) {
    segments.push(currentSegment);
  }

  return segments;
}

function isLikelyAllCapsTitle(prefix: string): boolean {
  return (
    /[A-Z]/.test(prefix) &&
    !/[a-z]/.test(prefix) &&
    !/[{}]/.test(prefix) &&
    !prefix.includes("—") &&
    !prefix.includes("–") &&
    !prefix.includes(" - ")
  );
}

function isLikelyStandaloneTitlePrefix(prefix: string): boolean {
  return (
    /^[A-Z][A-Za-z0-9+{}'/-]*(?: [A-Z0-9{][A-Za-z0-9+{}'/-]*)*$/.test(prefix) &&
    !/[,:;.!?]/.test(prefix)
  );
}

function isLikelyAllCapsWord(token: string): boolean {
  const lettersOnly = token.trim().replace(/[^\p{L}]/gu, "");

  if (!lettersOnly) return false;

  return /\p{Lu}/u.test(lettersOnly) && !/\p{Ll}/u.test(lettersOnly);
}

function startsSentenceBoundary(previousToken: string | undefined): boolean {
  if (!previousToken) return true;

  return /[.!?]["')\]]*$/.test(previousToken);
}

function splitNamedAbilitySegments(segment: string): string[] {
  const parts = segment.split(/(\s+)/);
  const words = parts
    .map((part, index) => ({ part, index }))
    .filter(({ part }) => part.trim().length > 0);
  const startIndexes: number[] = [];

  for (let cursor = 0; cursor < words.length; cursor++) {
    const currentWord = words[cursor]!;
    const previousWord = cursor > 0 ? words[cursor - 1]!.part : undefined;

    if (!isLikelyAllCapsWord(currentWord.part) || !startsSentenceBoundary(previousWord)) {
      continue;
    }

    let titleEnd = cursor;
    while (titleEnd < words.length && isLikelyAllCapsWord(words[titleEnd]!.part)) {
      titleEnd++;
    }

    if (titleEnd >= words.length) {
      continue;
    }

    if (!/\p{Ll}/u.test(words[titleEnd]!.part)) {
      continue;
    }

    startIndexes.push(currentWord.index);
  }

  if (startIndexes.length <= 1 || startIndexes[0] !== 0) {
    return [segment];
  }

  return startIndexes.map((start, index) => {
    const end = index + 1 < startIndexes.length ? startIndexes[index + 1]! : parts.length;
    return parts.slice(start, end).join("").trim();
  });
}

function splitAtUppercaseRun(segment: string): CardTextEntry | null {
  const words = segment.split(/\s+/).filter(Boolean);

  if (words.length < 2 || !isLikelyAllCapsWord(words[0]!)) {
    return null;
  }

  let titleEnd = 0;
  while (titleEnd < words.length && isLikelyAllCapsWord(words[titleEnd]!)) {
    titleEnd++;
  }

  if (titleEnd <= 0 || titleEnd >= words.length) {
    return null;
  }

  const description = words.slice(titleEnd).join(" ").trim();

  if (!description || !/\p{Ll}/u.test(description)) {
    return null;
  }

  return {
    title: words.slice(0, titleEnd).join(" "),
    description,
  };
}

function splitAtParenthetical(segment: string): CardTextEntry | null {
  const firstParenthetical = segment.indexOf("(");
  if (firstParenthetical <= 0) return null;

  const title = segment.slice(0, firstParenthetical).trimEnd();
  const description = segment.slice(firstParenthetical).trimStart();

  if (!title || !description || !isLikelyStandaloneTitlePrefix(title)) return null;

  return { title, description };
}

function splitAtEffectWord(segment: string): CardTextEntry | null {
  for (const match of segment.matchAll(EFFECT_WORD_PATTERN)) {
    const index = match.index ?? -1;

    if (index <= 0) continue;

    const title = segment.slice(0, index).trimEnd();
    const description = segment.slice(index).trimStart();

    if (!title || !description || !isLikelyAllCapsTitle(title)) {
      continue;
    }

    return { title, description };
  }

  return null;
}

function splitAtActivatedSeparator(segment: string): CardTextEntry | null {
  const match = segment.match(ACTIVATED_SEPARATOR_PATTERN);

  if (!match?.groups) return null;

  const title = match.groups.title.trim();
  const description = match.groups.description.trimStart();

  if (!title || !description || !isLikelyAllCapsTitle(title)) {
    return null;
  }

  return { title, description };
}

function splitSegment(segment: string): CardTextEntry {
  if (segment.includes("\n")) {
    return { title: segment };
  }

  return (
    splitAtParenthetical(segment) ??
    splitAtActivatedSeparator(segment) ??
    splitAtUppercaseRun(segment) ??
    splitAtEffectWord(segment) ?? { title: segment }
  );
}

export function splitCardTextToEntries(text: string): CardTextEntry[] {
  const normalizedText = text.replace(/\r\n?/g, "\n").trim();

  if (!normalizedText) return [];

  return buildLogicalSegments(normalizedText).flatMap(splitNamedAbilitySegments).map(splitSegment);
}

export function splitCardText(text: string): CardText {
  const normalizedText = normalizeCardTextContent(text).trim();

  if (!normalizedText) {
    return "";
  }

  const entries = normalizeCardTextEntries(splitCardTextToEntries(normalizedText));
  return cardTextEntriesToCardText(entries);
}
