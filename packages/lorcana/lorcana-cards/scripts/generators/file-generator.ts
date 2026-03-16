/**
 * File Generator
 *
 * Generates individual TypeScript files for each card, organized by set and card type.
 * Also generates index files for aggregation at each level.
 *
 * ID FORMAT (DO NOT CHANGE): Card `id` must always be a 3-character short id (e.g. "wrC"),
 * from the alphabet 0-9, a-z, A-Z. It must NOT be a printing id (e.g. "set1-104"). The
 * 3-char format is required by the runtime and must not be changed.
 */

import fs from "node:fs";
import path from "node:path";
import type {
  AbilityDefinition,
  ActionCard,
  CardType,
  CharacterCard,
  ItemCard,
  LocationCard,
} from "@tcg/lorcana-types";
import { splitCardText } from "../utils/structured-card-text";
import type { CanonicalCard, CardPrinting, SetDefinition } from "../types";

const CARD_TYPES: CardType[] = ["character", "action", "item", "location"];

/** Derive display name from name + version (for file naming and labels only; not stored on card) */
function getDisplayName(card: { name: string; version?: string }): string {
  return card.version ? `${card.name} - ${card.version}` : card.name;
}

/** Replace backtick with apostrophe in names (e.g. "Ghostly`s Tale" → "Ghostly's Tale"). */
function normalizeNameForConversion(str: string): string {
  return (str || "").replace(/`/g, "'");
}

/**
 * Convert a string to kebab-case for file names
 */
function toKebabCase(str: string): string {
  const normalized = normalizeNameForConversion(str);
  return normalized
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special chars except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Reserved words in JavaScript/TypeScript that cannot be used as identifiers
 */
const RESERVED_WORDS = new Set([
  "break",
  "case",
  "catch",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "finally",
  "for",
  "function",
  "if",
  "in",
  "instanceof",
  "new",
  "return",
  "switch",
  "this",
  "throw",
  "try",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "class",
  "const",
  "enum",
  "export",
  "extends",
  "import",
  "super",
  "implements",
  "interface",
  "let",
  "package",
  "private",
  "protected",
  "public",
  "static",
  "yield",
]);

/**
 * Convert a string to camelCase for export names
 * Handles reserved words and identifiers starting with numbers
 * Strips " - undefined" suffix which indicates missing version data
 */
function toCamelCase(str: string): string {
  // Replace backtick with apostrophe, then remove " - undefined" suffix before converting
  const withApostrophe = normalizeNameForConversion(str);
  const cleanStr = withApostrophe.endsWith(" - undefined")
    ? withApostrophe.slice(0, -11)
    : withApostrophe;

  let result = cleanStr
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // Remove special chars except spaces
    .split(/\s+/)
    .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join("");

  // If starts with a number, prefix with underscore
  if (/^\d/.test(result)) {
    result = `_${result}`;
  }

  // If it's a reserved word, prefix with underscore
  if (RESERVED_WORDS.has(result)) {
    result = `${result}Card`;
  }

  return result;
}

/**
 * Generate file name for a card
 * Format: {cardNumber}-{kebab-case-name}.ts
 */
export function generateCardFileName(cardNumber: number, fullName: string): string {
  const paddedNumber = cardNumber.toString().padStart(3, "0");
  const kebabName = toKebabCase(fullName);
  return `${paddedNumber}-${kebabName}.ts`;
}

/**
 * Generate export name for a card
 * Format: camelCaseName
 */
export function generateExportName(fullName: string): string {
  return toCamelCase(fullName);
}

/**
 * Extract set number from set ID and convert to padded folder name
 * e.g., "set1" -> "001", "set10" -> "010"
 */
export function getSetFolderName(setId: string): string {
  const match = setId.match(/\d+/);
  const num = match ? Number.parseInt(match[0], 10) : 0;
  return num.toString().padStart(3, "0");
}

/**
 * Get plural folder name for card type
 */
function getCardTypeFolderName(cardType: CardType): string {
  const folderNames: Record<CardType, string> = {
    character: "characters",
    action: "actions",
    item: "items",
    location: "locations",
  };
  return folderNames[cardType];
}

/**
 * Calculate relative path depth for imports
 */
function getRelativeTypesImport(depth: number): string {
  const ups = "../".repeat(depth);
  return `${ups}types`;
}

/**
 * Get the type-specific interface name for a card type
 */
function getCanonicalTypeName(cardType: CardType): string {
  const typeNames: Record<CardType, string> = {
    character: "CharacterCard",
    action: "ActionCard",
    item: "ItemCard",
    location: "LocationCard",
  };
  return typeNames[cardType];
}

/**
 * Extract the abilities array from existing card file content so we can preserve it (do not touch).
 * Returns undefined if no abilities key or parse fails.
 */
function extractAbilitiesFromExistingFile(content: string): unknown[] | undefined {
  const abilitiesKey = "abilities:";
  const idx = content.indexOf(abilitiesKey);
  if (idx === -1) return undefined;
  const bracketStart = content.indexOf("[", idx + abilitiesKey.length);
  if (bracketStart === -1) return undefined;
  let depth = 0;
  for (let i = bracketStart; i < content.length; i++) {
    const c = content[i];
    if (c === "[") depth++;
    else if (c === "]") {
      depth--;
      if (depth === 0) {
        const slice = content.slice(bracketStart, i + 1);
        try {
          const parsed = new Function("return " + slice)() as unknown;
          return Array.isArray(parsed) ? parsed : undefined;
        } catch {
          return undefined;
        }
      }
    }
  }
  return undefined;
}

/**
 * Property order for generated card objects.
 * id first, canonicalId second, reprints third, then rest; abilities last.
 * Exported for tests that assert output order.
 */
export const CARD_PROPERTY_ORDER = [
  "id",
  "canonicalId",
  "reprints",
  "cardType",
  "name",
  "version",
  "i18n",
  "inkType",
  "franchise",
  "set",
  "cardNumber",
  "rarity",
  "specialRarity",
  "cost",
  "strength",
  "willpower",
  "moveCost",
  "lore",
  "inkable",
  "vanilla",
  "missingImplementation",
  "missingTests",
  "externalIds",
  "text",
  "classifications",
  "actionSubtype",
  "abilities",
] as const;

/**
 * Convert canonical card to LorcanaCard format with deterministic property order.
 * Order: id, canonicalId, reprints, then rest; abilities last.
 * Uses setFolderName (e.g. "001") for the set field so cards under 001/ get set "001" not raw id like "gateway1".
 * Exported for tests that assert property order.
 */
export function convertToLorcanaCard(
  card: CanonicalCard,
  firstPrinting?: CardPrinting,
  setFolderName?: string,
  existingAbilities?: unknown[],
  reprintIds?: string[],
): Record<string, unknown> {
  const set = setFolderName ?? firstPrinting?.set;
  const cardNumber = firstPrinting?.cardNumber;

  // IMPORTANT: card.id MUST remain a 3-character short id (e.g. "wrC"). Do NOT change to printing-id
  // format (e.g. "set1-104"). The 3-char id format is required by the runtime and must not change.
  // canonicalId (ci_xxx) groups printings of the same card.
  const CANONICAL_ID_PREFIX = "ci_";
  const compliantCanonicalId = card.canonicalId?.startsWith(CANONICAL_ID_PREFIX)
    ? card.canonicalId
    : firstPrinting?.gameCardId
      ? `${CANONICAL_ID_PREFIX}${firstPrinting.gameCardId}`
      : card.canonicalId;

  if (!compliantCanonicalId) {
    throw new Error(
      `Card ${card.id} (${getDisplayName(card)}) is missing canonicalId. Generation requires canonicalId on every card.`,
    );
  }

  const values: Record<string, unknown> = {};
  values.id = card.id;
  values.canonicalId = compliantCanonicalId;
  if (reprintIds !== undefined && reprintIds.length > 0) {
    values.reprints = reprintIds;
  }
  values.cardType = card.cardType;
  values.name = card.name;
  if (card.version && card.version !== "undefined") {
    values.version = card.version;
  }
  values.i18n = card.i18n;
  values.inkType = card.inkType;
  if (card.franchise) values.franchise = card.franchise;
  if (set) values.set = set;
  if (cardNumber !== undefined) values.cardNumber = cardNumber;
  if (firstPrinting) {
    values.rarity = firstPrinting.rarity;
    if (firstPrinting.specialRarity) values.specialRarity = firstPrinting.specialRarity;
  }
  values.cost = card.cost;
  if ("strength" in card) values.strength = card.strength;
  if ("willpower" in card) values.willpower = card.willpower;
  if ("moveCost" in card) values.moveCost = card.moveCost;
  if ("lore" in card) values.lore = card.lore;
  values.inkable = card.inkable;
  if (card.vanilla) values.vanilla = true;
  if (card.missingImplementation) values.missingImplementation = true;
  if (card.missingTests) values.missingTests = true;
  if (card.externalIds) values.externalIds = card.externalIds;
  if (card.rulesText) values.text = splitCardText(card.rulesText);
  if ("classifications" in card && card.classifications?.length) {
    values.classifications = card.classifications;
  }
  if ("actionSubtype" in card && card.actionSubtype) {
    values.actionSubtype = card.actionSubtype;
  }
  if (existingAbilities !== undefined) {
    values.abilities = existingAbilities;
  } else if (card.rulesText && !card.vanilla) {
    values.missingImplementation = true;
    values.missingTests = true;
  }

  const result: Record<string, unknown> = {};
  for (const key of CARD_PROPERTY_ORDER) {
    if (key in values && values[key] !== undefined) {
      result[key] = values[key];
    }
  }
  return result;
}

/**
 * Generate content for an individual card file.
 * When existingAbilities is provided (e.g. from existing file), it is preserved and not overwritten.
 */
export function generateCardFileContent(
  card: CanonicalCard,
  exportName: string,
  depth: number,
  firstPrinting?: CardPrinting,
  setFolderName?: string,
  existingAbilities?: unknown[],
  reprintIds?: string[],
): string {
  const typeName = getCanonicalTypeName(card.cardType);
  const lorcanaCard = convertToLorcanaCard(
    card,
    firstPrinting,
    setFolderName,
    existingAbilities,
    reprintIds,
  );

  // Serialize the card object to TypeScript
  const cardJson = JSON.stringify(lorcanaCard, null, 2)
    .replace(/"([^"]+)":/g, "$1:") // Remove quotes from keys
    .replace(/"/g, '"'); // Use double quotes for strings

  return `import type { ${typeName} } from "@tcg/lorcana-types";

export const ${exportName}: ${typeName} = ${cardJson};
`;
}

/**
 * Generate content for a card type index file (e.g., characters/index.ts)
 */
export function generateCardTypeIndexContent(
  cards: Array<{ fileName: string; exportName: string }>,
): string {
  if (cards.length === 0) {
    return "// No cards in this category\n";
  }

  const exports = cards
    .map(
      ({ fileName, exportName }) =>
        `export { ${exportName} } from "./${fileName.replace(".ts", "")}";`,
    )
    .join("\n");

  return `${exports}\n`;
}

/**
 * Generate content for a set index file (e.g., 001/index.ts)
 */
export function generateSetIndexContent(setFolderName: string, cardTypes: CardType[]): string {
  const imports = cardTypes
    .map((type) => {
      const folder = getCardTypeFolderName(type);
      return `import * as ${folder} from "./${folder}";`;
    })
    .join("\n");

  const typeUnion = cardTypes
    .map((type) => {
      const typeName = getCanonicalTypeName(type);
      return typeName;
    })
    .join(" | ");

  const spreadValues = cardTypes
    .map((type) => `  ...Object.values(${getCardTypeFolderName(type)}),`)
    .join("\n");

  const reExports = cardTypes
    .map((type) => `export * from "./${getCardTypeFolderName(type)}";`)
    .join("\n");

  const importedTypes = typeUnion.split(" | ").join(", ");
  return `import type { ${importedTypes} } from "@tcg/lorcana-types";
${imports}

export const all${setFolderName}Cards: (${typeUnion})[] = [
${spreadValues}
];

export const all${setFolderName}CardsById: Record<string, ${typeUnion}> = {};
for (const card of all${setFolderName}Cards) {
  all${setFolderName}CardsById[card.id] = card;
}

${reExports}
`;
}

/**
 * Generate content for main cards.ts aggregator
 */
export function generateMainCardsContent(setFolderNames: string[]): string {
  const imports = setFolderNames
    .map((name) => `import { all${name}Cards, all${name}CardsById } from "./${name}";`)
    .join("\n");

  const cardsSpreads = setFolderNames.map((name) => `  ...all${name}Cards,`).join("\n");

  const byIdSpreads = setFolderNames.map((name) => `  ...all${name}CardsById,`).join("\n");

  return `import type { CharacterCard, ActionCard, ItemCard, LocationCard } from "@tcg/lorcana-types";
${imports}

export const allCards: (CharacterCard | ActionCard | ItemCard | LocationCard)[] = [
${cardsSpreads}
];

export const allCardsById: Record<string, CharacterCard | ActionCard | ItemCard | LocationCard> = {
${byIdSpreads}
};
`;
}

/**
 * Generate content for index.ts entry point
 */
export function generateEntryPointContent(): string {
  return `import { createRecordCardCatalog, type CardCatalog } from "@tcg/core";
import type { CharacterCard, ActionCard, ItemCard, LocationCard } from "@tcg/lorcana-types";

let allCardsCache: (CharacterCard | ActionCard | ItemCard | LocationCard)[] | null = null;
let allCardsByIdCache: Record<string, CharacterCard | ActionCard | ItemCard | LocationCard> | null = null;
let cardCatalogCache: CardCatalog<CharacterCard | ActionCard | ItemCard | LocationCard> | null = null;

export async function getAllCards(): Promise<(CharacterCard | ActionCard | ItemCard | LocationCard)[]> {
  if (allCardsCache) return allCardsCache;
  const { allCards } = await import("./cards");
  allCardsCache = allCards;
  return allCardsCache;
}

export async function getAllCardsById(): Promise<Record<string, CharacterCard | ActionCard | ItemCard | LocationCard>> {
  if (allCardsByIdCache) return allCardsByIdCache;
  const { allCardsById } = await import("./cards");
  allCardsByIdCache = allCardsById;
  return allCardsByIdCache;
}

export async function getLorcanaCardCatalog(): Promise<
  CardCatalog<CharacterCard | ActionCard | ItemCard | LocationCard>
> {
  if (cardCatalogCache) return cardCatalogCache;
  cardCatalogCache = createRecordCardCatalog("lorcana:cards", await getAllCardsById());
  return cardCatalogCache;
}

// Export all types
export type {
  AbilityDefinition,
  CanonicalActionCard,
  CanonicalCard,
  CanonicalCardMetadata,
  CanonicalCharacterCard,
  CanonicalItemCard,
  CanonicalLocationCard,
  CardType,
  ExternalIds,
  InkType,
} from "./types";

// Export type guards
export {
  isCanonicalAction,
  isCanonicalCharacter,
  isCanonicalItem,
  isCanonicalLocation,
} from "./types";
`;
}

/**
 * Generate content for types.ts
 */
export function generateTypesContent(): string {
  return `/**
 * Canonical Card Types - Discriminated Union
 *
 * Type-safe card definitions for generated Lorcana cards.
 * Uses discriminated unions to provide type-safe access to card-type-specific properties.
 */

export type CardType = "character" | "action" | "item" | "location";

export type InkType =
  | "amber"
  | "amethyst"
  | "emerald"
  | "ruby"
  | "sapphire"
  | "steel";

export type Languages = "en" | "de" | "fr" | "it";

export interface AbilityDefinition {
  id?: string;
  name?: string | null;
  text?: string;
  type: "triggered" | "activated" | "static" | "keyword" | "action";
  keyword?: string;
  value?: number;
  cost?: unknown;
  shiftTarget?: string;
}

export interface ExternalIds {
  tcgPlayer?: number;
  lorcast?: string;
}

export interface I18nProperties {
  name: string;
  version?: string;
  text?: string | { title: string; description?: string }[];
}

/**
 * Base properties for all canonical cards
 */
export interface CanonicalCardMetadata {
  id: string;
  name: string;
  version: string;
  i18n: Record<Languages, I18nProperties>;
  inkType: InkType | [InkType, InkType];
  cost: number;
  inkable: boolean;
  rulesText?: string;
  abilities?: AbilityDefinition[];
  vanilla: boolean;
  franchise?: string;
  externalIds?: ExternalIds;
}

/**
 * Character Card - has strength, willpower, lore, and classifications
 */
export interface CanonicalCharacterCard extends CanonicalCardMetadata {
  cardType: "character";
  strength: number;
  willpower: number;
  lore: number;
  classifications?: string[];
}

/**
 * Action Card - has optional actionSubtype for Songs
 */
export interface CanonicalActionCard extends CanonicalCardMetadata {
  cardType: "action";
  actionSubtype?: "song" | null;
}

/**
 * Item Card - permanent cards with ongoing effects
 */
export interface CanonicalItemCard extends CanonicalCardMetadata {
  cardType: "item";
}

/**
 * Location Card - has moveCost and lore
 */
export interface CanonicalLocationCard extends CanonicalCardMetadata {
  cardType: "location";
  willpower: number;
  moveCost: number;
  lore: number;
}

/**
 * Canonical Card - discriminated union of all card types
 */
export type CanonicalCard =
  | CanonicalCharacterCard
  | CanonicalActionCard
  | CanonicalItemCard
  | CanonicalLocationCard;

/**
 * Type guard for character cards
 */
export function isCanonicalCharacter(card: CanonicalCard): card is CanonicalCharacterCard {
  return card.cardType === "character";
}

/**
 * Type guard for action cards
 */
export function isCanonicalAction(card: CanonicalCard): card is CanonicalActionCard {
  return card.cardType === "action";
}

/**
 * Type guard for item cards
 */
export function isCanonicalItem(card: CanonicalCard): card is CanonicalItemCard {
  return card.cardType === "item";
}

/**
 * Type guard for location cards
 */
export function isCanonicalLocation(card: CanonicalCard): card is CanonicalLocationCard {
  return card.cardType === "location";
}
`;
}

/** Card file name pattern: 3-digit number, hyphen, kebab-name, .ts (not .test.ts) */
const CARD_FILE_PATTERN = /^\d{3}-.+\.ts$/;

/**
 * Remove orphan card files in a type directory.
 * Orphans are legacy files (e.g. old title "Devious Conspirator") that are no longer
 * in the canonical data (e.g. current card is "Underhanded Schemer") and would
 * never be imported, causing confusion.
 */
function removeOrphanCardFiles(typeDir: string, currentFileNames: Set<string>): void {
  if (!fs.existsSync(typeDir)) return;
  const entries = fs.readdirSync(typeDir, { withFileTypes: true });
  for (const ent of entries) {
    if (!ent.isFile() || !CARD_FILE_PATTERN.test(ent.name)) continue;
    if (ent.name.endsWith(".test.ts")) continue;
    if (currentFileNames.has(ent.name)) continue;
    const filePath = path.join(typeDir, ent.name);
    fs.unlinkSync(filePath);
    console.log(`  Removed orphan: ${path.relative(path.join(typeDir, "../.."), filePath)}`);
  }
}

/**
 * Card info needed for file generation
 */
export interface CardFileInfo {
  card: CanonicalCard;
  /** Printing id (e.g. set1-104); used to look up printing. card.id is the 3-char short id. */
  printingId: string;
  cardNumber: number;
  setFolderName: string;
  cardType: CardType;
  fileName: string;
  exportName: string;
}

/**
 * Keyword to card model getter mapping
 * Some are methods (called with parentheses), some are properties
 */
const KEYWORD_METHOD_MAP: Record<string, { name: string; isMethod: boolean }> = {
  // Methods (call with parentheses)
  Bodyguard: { name: "hasBodyguard", isMethod: true },
  Singer: { name: "hasSinger", isMethod: true },
  Shift: { name: "hasShift", isMethod: true },
  Reckless: { name: "hasReckless", isMethod: true },
  Ward: { name: "hasWard", isMethod: true },
  Support: { name: "hasSupport", isMethod: true },
  // Properties (no parentheses)
  Vanish: { name: "hasVanish", isMethod: false },
  Evasive: { name: "hasEvasive", isMethod: false },
  Challenger: { name: "hasChallenger", isMethod: false },
  Resist: { name: "hasResist", isMethod: false },
  Rush: { name: "hasRush", isMethod: false },
};

/**
 * Extract keywords from a card's abilities
 * Returns an array of { keyword, value? } objects
 */
function extractKeywordsFromCard(card: CanonicalCard): Array<{ keyword: string; value?: number }> {
  const keywords: Array<{ keyword: string; value?: number }> = [];

  if (!card.parsedAbilities || card.parsedAbilities.length === 0) {
    return keywords;
  }

  for (const ability of card.parsedAbilities) {
    if (ability.type === "keyword" && ability.keyword) {
      keywords.push({
        keyword: ability.keyword,
        value: ability.value,
      });
    }
  }

  return keywords;
}

/**
 * Generate the test file name for a card
 * Format: {cardNumber}-{kebab-case-name}.test.ts
 */
export function generateTestFileName(cardNumber: number, fullName: string): string {
  const paddedNumber = cardNumber.toString().padStart(3, "0");
  const kebabName = toKebabCase(fullName);
  return `${paddedNumber}-${kebabName}.test.ts`;
}

/**
 * Generate test file content for a card with keywords
 * Uses TestEngine to set up a real game board and validate against card model
 */
export function generateTestFileContent(
  card: CanonicalCard,
  exportName: string,
  cardFileName: string,
): string | null {
  // Don't generate tests for vanilla cards or cards explicitly missing tests
  if (card.vanilla || card.missingTests) {
    return null;
  }

  const keywords = extractKeywordsFromCard(card);

  // Don't generate tests if no keywords found
  if (keywords.length === 0) {
    return null;
  }

  // Build the import path (relative from test file to card file)
  const importPath = `./${cardFileName.replace(".ts", "")}`;

  // Generate test cases for each keyword
  const testCases: string[] = [];

  for (const { keyword, value } of keywords) {
    const methodInfo = KEYWORD_METHOD_MAP[keyword];

    if (!methodInfo) {
      // Skip keywords we don't have a mapping for
      continue;
    }

    const { name: methodName, isMethod } = methodInfo;
    const assertion = isMethod ? `cardUnderTest.${methodName}()` : `cardUnderTest.${methodName}`;

    if (value !== undefined) {
      testCases.push(`  it("should have ${keyword} ${value} ability", () => {
    const testEngine = new LorcanaTestEngine({
      play: [${exportName}],
    });

    const cardUnderTest = testEngine.getCardModel(${exportName});
    expect(${assertion}).toBe(true);
  });`);
    } else {
      testCases.push(`  it("should have ${keyword} ability", () => {
    const testEngine = new LorcanaTestEngine({
      play: [${exportName}],
    });

    const cardUnderTest = testEngine.getCardModel(${exportName});
    expect(${assertion}).toBe(true);
  });`);
    }
  }

  // If no valid test cases were generated, return null
  if (testCases.length === 0) {
    return null;
  }

  return `import { describe, expect, it } from "bun:test";
import { LorcanaTestEngine } from "@tcg/lorcana-engine/testing";
import { ${exportName} } from "${importPath}";

describe("${getDisplayName(card)}", () => {
${testCases.join("\n\n")}
});
`;
}

/**
 * Organize cards into file info grouped by set and card type.
 * One file per printing. Canonical cards record is keyed by printingId (e.g. set1-104);
 * card.id is always the 3-char short id (do not change).
 */
export function organizeCardsForFileGeneration(
  canonicalCards: Record<string, CanonicalCard>,
  setMapping: Map<string, string>, // setId -> setFolderName
  printings: Record<string, CardPrinting>,
): Map<string, Map<CardType, CardFileInfo[]>> {
  // Map: setFolderName -> cardType -> CardFileInfo[]
  const organized = new Map<string, Map<CardType, CardFileInfo[]>>();

  for (const [printingId, card] of Object.entries(canonicalCards)) {
    const printing = printings[printingId];
    if (!printing) continue;

    const setFolderName = setMapping.get(getSetFolderName(printing.set));
    const cardNumber = printing.cardNumber;
    if (!setFolderName) continue;

    // Unique file/export names for alternate arts (same set+number, different specialRarity)
    const suffix = printing.specialRarity ?? "";
    const displayName = getDisplayName(card);
    const fileName = suffix
      ? `${generateCardFileName(cardNumber, displayName).replace(".ts", "")}-${suffix}.ts`
      : generateCardFileName(cardNumber, displayName);
    const exportName = suffix
      ? generateExportName(displayName) + suffix.charAt(0).toUpperCase() + suffix.slice(1)
      : generateExportName(displayName);

    const cardInfo: CardFileInfo = {
      card,
      printingId,
      cardNumber,
      setFolderName,
      cardType: card.cardType,
      fileName,
      exportName,
    };

    // Initialize nested maps if needed
    if (!organized.has(setFolderName)) {
      organized.set(setFolderName, new Map());
    }
    const setMap = organized.get(setFolderName)!;

    if (!setMap.has(card.cardType)) {
      setMap.set(card.cardType, []);
    }
    setMap.get(card.cardType)!.push(cardInfo);
  }

  // Sort cards within each type by card number
  for (const setMap of organized.values()) {
    for (const cards of setMap.values()) {
      cards.sort((a, b) => a.cardNumber - b.cardNumber);
    }
  }

  return organized;
}

/**
 * Cache for created directories to avoid repeated filesystem checks
 */
const createdDirs = new Set<string>();

/**
 * Write a file, creating directories as needed
 * Uses caching to reduce filesystem operations
 */
function writeFile(filePath: string, content: string): void {
  const dir = path.dirname(filePath);
  if (!createdDirs.has(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    createdDirs.add(dir);
  }
  fs.writeFileSync(filePath, content, "utf-8");
}

/** Special-rarity suffixes on printing IDs (e.g. set1-098-enchanted). Base printings have none. */
const SPECIAL_RARITY_SUFFIX = /-(enchanted|epic|iconic|promo)$/i;

function isBasePrintingId(printingId: string): boolean {
  return !SPECIAL_RARITY_SUFFIX.test(printingId);
}

/**
 * Build a map from canonicalId to base printing IDs for that card (reprints).
 * Canonical cards record is keyed by printingId. Only base printings are included
 * (no -enchanted, -epic, -iconic, -promo suffix).
 */
export function buildPrintingIdsByCanonicalId(
  canonicalCards: Record<string, CanonicalCard>,
): Map<string, string[]> {
  const setNum = (printingId: string): number => {
    const m = printingId.match(/set(\d+)/i);
    return m ? Number.parseInt(m[1], 10) : 0;
  };
  const cardNum = (printingId: string): number => {
    const m = printingId.match(/-(\d+)(?:-|$)/);
    return m ? Number.parseInt(m[1], 10) : 0;
  };
  const byCanonicalId = new Map<string, string[]>();
  for (const [printingId, card] of Object.entries(canonicalCards)) {
    if (!isBasePrintingId(printingId)) continue;
    const list = byCanonicalId.get(card.canonicalId) ?? [];
    list.push(printingId);
    byCanonicalId.set(card.canonicalId, list);
  }
  for (const list of byCanonicalId.values()) {
    list.sort((a, b) => setNum(a) - setNum(b) || cardNum(a) - cardNum(b));
  }
  return byCanonicalId;
}

/**
 * Generate all card files and index files
 */
export function generateCardFiles(
  outputDir: string,
  canonicalCards: Record<string, CanonicalCard>,
  sets: Record<string, SetDefinition>,
  printings: Record<string, CardPrinting>,
): void {
  // Reset directory cache for fresh run
  createdDirs.clear();

  // Create set number to folder name mapping
  const setMapping = new Map<string, string>();
  for (const set of Object.values(sets)) {
    const setFolderName = getSetFolderName(set.id);
    setMapping.set(setFolderName, setFolderName);
  }

  const printingIdsByCanonicalId = buildPrintingIdsByCanonicalId(canonicalCards);

  // Organize cards for file generation (one file per printing; card.id is 3-char, key is printingId)
  const organized = organizeCardsForFileGeneration(canonicalCards, setMapping, printings);
  const existingAbilitySourcesByCanonicalId = new Map<
    string,
    { abilities: unknown[]; exportName: string; filePath: string }
  >();

  for (const [setFolderName, cardTypeMap] of organized) {
    for (const cardType of CARD_TYPES) {
      const cards = cardTypeMap.get(cardType) || [];
      const typeDir = path.join(outputDir, setFolderName, getCardTypeFolderName(cardType));

      for (const cardInfo of cards) {
        const filePath = path.join(typeDir, cardInfo.fileName);
        if (!fs.existsSync(filePath)) {
          continue;
        }

        const existingContent = fs.readFileSync(filePath, "utf-8");
        const extractedAbilities = extractAbilitiesFromExistingFile(existingContent);
        if (
          extractedAbilities &&
          extractedAbilities.length > 0 &&
          !existingAbilitySourcesByCanonicalId.has(cardInfo.card.canonicalId)
        ) {
          existingAbilitySourcesByCanonicalId.set(cardInfo.card.canonicalId, {
            abilities: extractedAbilities,
            exportName: cardInfo.exportName,
            filePath,
          });
        }
      }
    }
  }

  // Track all set folder names for main aggregator
  const setFolderNames: string[] = [];
  let totalTestFilesGenerated = 0;

  // Generate files for each set
  for (const [setFolderName, cardTypeMap] of organized) {
    setFolderNames.push(setFolderName);
    const setDir = path.join(outputDir, setFolderName);
    const cardTypesWithCards: CardType[] = [];

    // Generate files for each card type
    for (const cardType of CARD_TYPES) {
      const cards = cardTypeMap.get(cardType) || [];
      if (cards.length === 0) continue;

      cardTypesWithCards.push(cardType);
      const typeFolder = getCardTypeFolderName(cardType);
      const typeDir = path.join(setDir, typeFolder);

      // Generate individual card files and test files
      let testFilesGenerated = 0;
      for (const cardInfo of cards) {
        const filePath = path.join(typeDir, cardInfo.fileName);
        const printing = printings[cardInfo.printingId];
        const reprintIds = printingIdsByCanonicalId.get(cardInfo.card.canonicalId);
        let existingAbilities: unknown[] | undefined;
        if (fs.existsSync(filePath)) {
          const existingContent = fs.readFileSync(filePath, "utf-8");
          existingAbilities = extractAbilitiesFromExistingFile(existingContent);
        }
        const sharedAbilitySource = existingAbilitySourcesByCanonicalId.get(
          cardInfo.card.canonicalId,
        );
        existingAbilities ??= sharedAbilitySource?.abilities;
        const content = generateCardFileContent(
          cardInfo.card,
          cardInfo.exportName,
          2, // Depth: set/type/card.ts -> types.ts is 2 levels up
          printing,
          cardInfo.setFolderName,
          existingAbilities,
          reprintIds,
        );
        writeFile(filePath, content);

        // Generate test file for non-vanilla cards with keywords
        const testContent = generateTestFileContent(
          cardInfo.card,
          cardInfo.exportName,
          cardInfo.fileName,
        );
        if (testContent) {
          const testFileName = generateTestFileName(
            cardInfo.cardNumber,
            getDisplayName(cardInfo.card),
          );
          const testFilePath = path.join(typeDir, testFileName);
          writeFile(testFilePath, testContent);
          testFilesGenerated++;
          totalTestFilesGenerated++;
        }
      }

      // Remove orphan card files (legacy files with old names that are no longer in canonical data)
      const currentFileNames = new Set(cards.map((c) => c.fileName));
      removeOrphanCardFiles(typeDir, currentFileNames);

      // Generate card type index file
      const indexContent = generateCardTypeIndexContent(
        cards.map((c) => ({ fileName: c.fileName, exportName: c.exportName })),
      );
      writeFile(path.join(typeDir, "index.ts"), indexContent);
    }

    // Generate set index file
    const setIndexContent = generateSetIndexContent(setFolderName, cardTypesWithCards);
    writeFile(path.join(setDir, "index.ts"), setIndexContent);
  }

  // Sort set folder names numerically
  setFolderNames.sort((a, b) => Number.parseInt(a, 10) - Number.parseInt(b, 10));

  // Generate main cards.ts aggregator
  const mainCardsContent = generateMainCardsContent(setFolderNames);
  writeFile(path.join(outputDir, "cards.ts"), mainCardsContent);

  // Generate entry point index.ts
  const entryPointContent = generateEntryPointContent();
  writeFile(path.join(outputDir, "index.ts"), entryPointContent);

  // Generate types.ts
  const typesContent = generateTypesContent();
  writeFile(path.join(outputDir, "types.ts"), typesContent);

  console.log(`  Generated ${Object.keys(canonicalCards).length} card files`);
  console.log(`  Generated ${totalTestFilesGenerated} test files`);
  console.log(`  Generated ${setFolderNames.length} set index files`);
  console.log("  Generated main cards.ts, index.ts, and types.ts");
}
