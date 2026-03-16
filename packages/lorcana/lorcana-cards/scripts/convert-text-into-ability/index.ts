import { AbilityDefinition, ActionCard, Effect } from "@tcg/lorcana-types";
import { normalizeLorcanaAbilitiesTargets } from "@tcg/lorcana-types/targeting";
import { allCards } from "../../src/cards/cards";
import { parseEffect } from "./effect";

interface CliOptions {
  dryRun: boolean;
  unparsedOnly: boolean;
  summarizeUnparsed: boolean;
  count: number;
  input: string;
}

export interface SafeParseActionEffectResult {
  success: boolean;
  effect?: Effect;
  error?: string;
}

export interface SafeParseActionAbilityResult {
  success: boolean;
  abilities?: AbilityDefinition[];
  error?: string;
}

export function parseActionEffect(text: string): Effect {
  return parseEffect(text);
}

export function safeParseActionEffect(text: string): SafeParseActionEffectResult {
  try {
    return {
      success: true,
      effect: parseActionEffect(text),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      error: message,
    };
  }
}

export function safeParseActionAbilities(text?: string): SafeParseActionAbilityResult {
  if (!text) {
    return {
      success: true,
      abilities: undefined,
    };
  }

  const effect: SafeParseActionEffectResult = safeParseActionEffect(text);

  if (!effect.effect) {
    return {
      success: false,
      error: effect.error || "Unexpected effect",
    };
  }

  try {
    return {
      success: true,
      abilities: normalizeLorcanaAbilitiesTargets([
        {
          type: "action",
          effect: effect.effect,
        },
      ]),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      error: message,
    };
  }
}

function parseCliArgs(args: string[]): CliOptions {
  let dryRun = false;
  let unparsedOnly = false;
  let summarizeUnparsed = false;
  let count = 10;
  const inputParts: string[] = [];

  for (let index = 0; index < args.length; index++) {
    const arg = args[index];

    if (arg === "--dry-run") {
      dryRun = true;
      continue;
    }

    if (arg === "--unparsed-only" || arg === "--report-unparsed") {
      unparsedOnly = true;
      continue;
    }

    if (arg === "--summarize-unparsed") {
      summarizeUnparsed = true;
      continue;
    }

    if (arg === "--count") {
      const next = args[index + 1];
      if (!next || !/^\d+$/.test(next)) {
        throw new Error("Expected a numeric value after --count");
      }
      count = Number.parseInt(next, 10);
      index++;
      continue;
    }

    inputParts.push(arg);
  }

  return {
    dryRun,
    unparsedOnly,
    summarizeUnparsed,
    count,
    input: inputParts.join(" ").trim(),
  };
}

function shuffleCards<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const current = copy[index];
    copy[index] = copy[swapIndex];
    copy[swapIndex] = current;
  }
  return copy;
}

function getEligibleActionCards(): ActionCard[] {
  return allCards.filter((card): card is ActionCard => {
    return (
      card.cardType === "action" &&
      typeof card.text === "string" &&
      card.text.trim().length > 0 &&
      Array.isArray(card.abilities) &&
      card.abilities.length > 0
    );
  });
}

function printDryRunComparison(card: ActionCard): void {
  const actual = card.abilities.map((ability) => ({
    id: ability.id,
    text: ability.text,
    effect: ability.effect,
  }));
  const converted = safeParseActionEffect(card.text);

  console.log(`\n=== ${card.name} [${card.set}-${card.cardNumber}] (${card.id}) ===`);
  console.log(`Text: ${card.text}`);

  if (!converted.success) {
    console.log("Status: parse-failed");
    console.log(`Error: ${converted.error}`);
  } else {
    const matchesActual = JSON.stringify(converted.effect) === JSON.stringify(actual[0]?.effect);
    console.log(`Status: ${matchesActual ? "match" : "diff"}`);
    console.log("Converted:");
    console.log(JSON.stringify(converted.effect, null, 2));
  }

  console.log("Actual:");
  console.log(JSON.stringify(actual, null, 2));
}

function runDryMode(count: number): void {
  const eligibleCards = getEligibleActionCards();
  const selected = shuffleCards(eligibleCards).slice(0, Math.max(1, count));

  console.log(
    `Dry run on ${selected.length} random action cards (${eligibleCards.length} eligible total)`,
  );

  for (const card of selected) {
    printDryRunComparison(card);
  }
}

function runUnparsedReport(count: number): void {
  const eligibleCards = getEligibleActionCards();
  const failures = eligibleCards
    .map((card) => ({
      card,
      converted: safeParseActionEffect(card.text),
    }))
    .filter(
      (entry): entry is { card: ActionCard; converted: { success: false; error?: string } } =>
        !entry.converted.success,
    );

  const selected = failures.slice(0, Math.max(1, count));

  console.log(
    `Unparsed report: showing ${selected.length} of ${failures.length} unparsed action cards (${eligibleCards.length} eligible total)`,
  );

  for (const { card, converted } of selected) {
    const actual = card.abilities?.map((ability) => ({
      id: ability.id,
      text: ability.text,
      effect: ability.effect,
    }));

    console.log(`\n=== ${card.name} [${card.set}-${card.cardNumber}] (${card.id}) ===`);
    console.log(`Text: ${card.text}`);
    console.log("Status: parse-failed");
    console.log(`Error: ${converted.error}`);
    console.log("Actual:");
    console.log(JSON.stringify(actual, null, 2));
  }
}

function categorizeError(error: string): string {
  if (error.startsWith("Unsupported atomic effect:")) {
    return "unsupported-atomic-effect";
  }

  if (error.startsWith("Unsupported banish target:")) {
    return "unsupported-banish-target";
  }

  if (error.startsWith("Unsupported remove-damage target:")) {
    return "unsupported-remove-damage-target";
  }

  if (error.startsWith("Unsupported restriction target:")) {
    return "unsupported-restriction-target";
  }

  if (error.startsWith("Unsupported reveal-top-card target:")) {
    return "unsupported-reveal-top-card-target";
  }

  if (error.startsWith("Unsupported discard amount:")) {
    return "unsupported-discard-amount";
  }

  if (error.startsWith("Unsupported draw amount:")) {
    return "unsupported-draw-amount";
  }

  if (error.startsWith("Unsupported lore gain amount:")) {
    return "unsupported-gain-lore-amount";
  }

  if (error.startsWith("Unsupported lore loss amount:")) {
    return "unsupported-lose-lore-amount";
  }

  if (error.startsWith("Unsupported keyword gain:")) {
    return "unsupported-keyword-gain";
  }

  if (error.startsWith("Unsupported for-each counter:")) {
    return "unsupported-for-each-counter";
  }

  if (error.startsWith("Unsupported condition:")) {
    return "unsupported-condition";
  }

  if (error.includes("Ambiguous")) {
    return "ambiguous-match";
  }

  return "other";
}

function runUnparsedSummary(maxExamplesPerCategory: number): void {
  const eligibleCards = getEligibleActionCards();
  const failures = eligibleCards
    .map((card) => ({
      card,
      converted: safeParseActionEffect(card.text),
    }))
    .filter(
      (entry): entry is { card: ActionCard; converted: { success: false; error?: string } } =>
        !entry.converted.success,
    );

  const grouped = new Map<
    string,
    { count: number; examples: Array<{ card: ActionCard; error: string }> }
  >();

  for (const { card, converted } of failures) {
    const error = converted.error ?? "Unknown error";
    const category = categorizeError(error);
    const entry = grouped.get(category) ?? { count: 0, examples: [] };
    entry.count += 1;
    if (entry.examples.length < maxExamplesPerCategory) {
      entry.examples.push({ card, error });
    }
    grouped.set(category, entry);
  }

  const sorted = [...grouped.entries()].sort(([, left], [, right]) => right.count - left.count);

  console.log(
    `Unparsed summary: ${failures.length} failed of ${eligibleCards.length} eligible action cards across ${sorted.length} categories`,
  );

  for (const [category, entry] of sorted) {
    console.log(`\n## ${category} (${entry.count})`);
    for (const example of entry.examples) {
      console.log(
        `- ${example.card.name} [${example.card.set}-${example.card.cardNumber}] (${example.card.id})`,
      );
      console.log(`  Text: ${example.card.text}`);
      console.log(`  Error: ${example.error}`);
    }
  }
}

if (import.meta.main) {
  try {
    const options = parseCliArgs(process.argv.slice(2));

    if (options.summarizeUnparsed) {
      runUnparsedSummary(options.count);
      process.exit(0);
    }

    if (options.unparsedOnly) {
      runUnparsedReport(options.count);
      process.exit(0);
    }

    if (options.dryRun) {
      runDryMode(options.count);
      process.exit(0);
    }

    if (!options.input) {
      console.error(
        "Usage: bun scripts/convert-text-into-ability/index.ts '<card text>'\n       bun scripts/convert-text-into-ability/index.ts --dry-run [--count 10]\n       bun scripts/convert-text-into-ability/index.ts --report-unparsed [--count 10]\n       bun scripts/convert-text-into-ability/index.ts --summarize-unparsed [--count 10]",
      );
      process.exit(1);
    }

    const result = safeParseActionEffect(options.input);
    if (!result.success) {
      console.error(result.error);
      process.exit(1);
    }

    console.log(JSON.stringify(result.effect, null, 2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}
