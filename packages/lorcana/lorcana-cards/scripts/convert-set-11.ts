#!/usr/bin/env bun
/**
 * Conversion script to copy set 11 cards from lorcanito format to @tcg/lorcana-types format.
 * This version uses dynamic imports to load the source modules directly.
 *
 * Usage: bun run packages/lorcana-cards/scripts/convert-set-11.ts
 */

import * as fs from "fs";
import * as path from "path";

// Paths
const SOURCE_BASE = path.resolve("../lorcanito/packages/lorcana-engine/src/cards/011");
const DEST_BASE = path.resolve("packages/lorcana-cards/src/cards/011");

const CARD_TYPES = ["actions", "characters", "items", "locations"] as const;
type CardType = (typeof CARD_TYPES)[number];

// Type mapping
const TYPE_MAP: Record<string, string> = {
  character: "CharacterCard",
  action: "ActionCard",
  item: "ItemCard",
  location: "LocationCard",
};

// Properties to omit from source
const OMIT_PROPS = new Set([
  "illustrator",
  "rarity",
  "notImplemented",
  "missingTestCase",
  "reprints",
]);

// Properties to rename
const RENAME_MAP: Record<string, string> = {
  type: "cardType",
  title: "version",
  inkwell: "inkable",
  colors: "inkType",
  characteristics: "classifications",
  number: "cardNumber",
};

// Properties that should be title-cased arrays
const TITLE_CASE_ARRAYS = new Set(["classifications"]);

/**
 * Convert a string to title case (first letter uppercase, rest lowercase)
 */
function toTitleCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Convert array values to title case
 */
function titleCaseArray(arr: string[]): string[] {
  return arr.map(toTitleCase);
}

/**
 * Transform a source card object to destination format
 */
function transformCard(sourceCard: Record<string, unknown>): Record<string, unknown> {
  const destCard: Record<string, unknown> = {};

  // Copy and rename properties
  for (const [key, value] of Object.entries(sourceCard)) {
    if (OMIT_PROPS.has(key)) continue;

    const destKey = RENAME_MAP[key] || key;

    // Skip classifications for non-character cards
    if (destKey === "classifications" && sourceCard.type !== "character") {
      continue;
    }

    // Skip willpower for non-character cards (locations don't have willpower)
    if (destKey === "willpower" && sourceCard.type !== "character") {
      continue;
    }

    // Handle title-case arrays
    if (TITLE_CASE_ARRAYS.has(destKey) && Array.isArray(value)) {
      destCard[destKey] = titleCaseArray(value as string[]);
    } else {
      destCard[destKey] = value;
    }
  }

  // Set abilities to empty array
  destCard.abilities = [];

  // Add fullName for characters and locations
  if (
    (destCard.cardType === "character" || destCard.cardType === "location") &&
    destCard.name &&
    destCard.version
  ) {
    destCard.fullName = `${destCard.name} - ${destCard.version}`;
  }

  // Add actionSubtype for songs
  if (destCard.cardType === "action") {
    const characteristics = sourceCard.characteristics as string[] | undefined;
    if (characteristics?.includes("song")) {
      destCard.actionSubtype = "song";
    }
  }

  // Add missingTests flag
  destCard.missingTests = true;

  return destCard;
}

/**
 * Format an object as a TypeScript literal with proper indentation
 */
function formatObject(obj: unknown, indent: number): string {
  const spaces = "  ".repeat(indent);
  const innerSpaces = "  ".repeat(indent + 1);

  if (obj === null) return "null";
  if (obj === undefined) return "undefined";
  if (typeof obj !== "object") return JSON.stringify(obj);

  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]";
    const items = obj.map((item) => formatObject(item, indent + 1));
    return `[\n${innerSpaces}${items.join(`,\n${innerSpaces}`)}\n${spaces}]`;
  }

  const entries = Object.entries(obj);
  if (entries.length === 0) return "{}";

  const props = entries.map(([key, value]) => {
    const formattedValue = formatObject(value, indent + 1);
    // Quote keys that need it (hyphens, etc.)
    const keyStr = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
    return `${keyStr}: ${formattedValue}`;
  });

  return `{\n${innerSpaces}${props.join(`,\n${innerSpaces}`)}\n${spaces}}`;
}

/**
 * Generate the destination file content
 */
function generateDestFile(
  exportName: string,
  card: Record<string, unknown>,
  cardType: string,
): string {
  const typeName = TYPE_MAP[cardType];
  const formattedCard = formatObject(card, 1);

  return `import type { ${typeName} } from "@tcg/lorcana-types";

export const ${exportName}: ${typeName} = ${formattedCard};
`;
}

/**
 * Convert a name to kebab-case for the filename
 */
function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Extract card data from source file content using regex
 * This extracts only the literal values at the top level of the object
 */
function extractCardData(content: string): Record<string, unknown> | null {
  // Match the export const and extract the object body
  const exportMatch = content.match(/export\s+const\s+(\w+):\s*\w+\s*=\s*(\{[\s\S]*?\n\});?\s*$/m);
  if (!exportMatch) return null;

  const objBody = exportMatch[2];
  const data: Record<string, unknown> = {};

  // Split by lines and process only top-level properties
  // A top-level property starts with 2 spaces (one level of indentation)
  const lines = objBody.split("\n");

  for (const line of lines) {
    // Match properties with exactly 2 spaces of indentation (top-level in the object)
    // String properties: name: "value"
    const stringMatch = line.match(/^  (\w+):\s*"([^"]*)",?\s*$/);
    if (stringMatch) {
      data[stringMatch[1]] = stringMatch[2];
      continue;
    }

    // Number properties: cost: 5
    const numberMatch = line.match(/^  (\w+):\s*(\d+),?\s*$/);
    if (numberMatch) {
      data[numberMatch[1]] = parseInt(numberMatch[2], 10);
      continue;
    }

    // Boolean properties: inkwell: true
    const boolMatch = line.match(/^  (\w+):\s*(true|false),?\s*$/);
    if (boolMatch) {
      data[boolMatch[1]] = boolMatch[2] === "true";
      continue;
    }

    // Array properties (simple strings): colors: ["amber", "steel"]
    const arrayMatch = line.match(/^  (\w+):\s*\[([^\]]*)\],?\s*$/);
    if (arrayMatch) {
      const key = arrayMatch[1];
      const arrayContent = arrayMatch[2];
      // Extract string values from array
      const stringValues = [...arrayContent.matchAll(/"([^"]*)"/g)].map((m) => m[1]);
      if (stringValues.length > 0) {
        data[key] = stringValues;
      }
      continue;
    }
  }

  // External IDs object - extract with a more careful pattern
  const externalIdsMatch = objBody.match(/  externalIds:\s*\{\s*\n([\s\S]*?)\s*\},?\s*\n/);
  if (externalIdsMatch) {
    const externalIds: Record<string, unknown> = {};
    const idContent = externalIdsMatch[1];

    // String IDs
    const stringIds = idContent.matchAll(/^\s*(\w+):\s*"([^"]*)"/gm);
    for (const match of stringIds) {
      externalIds[match[1]] = match[2];
    }

    // Number IDs (tcgPlayer)
    const numberIds = idContent.matchAll(/^\s*(\w+):\s*(\d+)/gm);
    for (const match of numberIds) {
      externalIds[match[1]] = parseInt(match[2], 10);
    }

    if (Object.keys(externalIds).length > 0) {
      data.externalIds = externalIds;
    }
  }

  return data;
}

/**
 * Process a single source file
 */
function processFile(
  sourcePath: string,
  destDir: string,
  cardType: string,
): { exportName: string; fileName: string; cardNumber: number } | null {
  const content = fs.readFileSync(sourcePath, "utf-8");

  // Skip test files and barrel exports
  if (sourcePath.endsWith(".test.ts") || sourcePath.endsWith(".spec.ts")) {
    return null;
  }

  // Skip reprint files (they use spread operator to import from other sets)
  if (content.includes("...og") || content.includes("...original")) {
    console.log(`  Skipping (reprint): ${path.basename(sourcePath)}`);
    return null;
  }

  // Get export name
  const exportMatch = content.match(/export\s+const\s+(\w+):/);
  if (!exportMatch) {
    console.log(`  Skipping (no export): ${path.basename(sourcePath)}`);
    return null;
  }
  const exportName = exportMatch[1];

  // Extract card data
  const sourceCard = extractCardData(content);
  if (!sourceCard || !sourceCard.id) {
    console.log(`  Skipping (no data): ${path.basename(sourcePath)}`);
    return null;
  }

  const destCard = transformCard(sourceCard);
  const destContent = generateDestFile(exportName, destCard, cardType);

  // Generate filename from card number and name
  const cardNumber = (destCard.cardNumber as number) || sourceCard.number || 0;
  const cardName = (destCard.name as string) || "Unknown";
  const kebabName = toKebabCase(cardName);
  const paddedNumber = String(cardNumber).padStart(3, "0");
  const fileName = `${paddedNumber}-${kebabName}.ts`;
  const destPath = path.join(destDir, fileName);

  fs.writeFileSync(destPath, destContent);
  console.log(`  Created: ${fileName}`);

  return { exportName, fileName, cardNumber };
}

/**
 * Generate index.ts for a card type directory
 */
function generateTypeIndex(
  destDir: string,
  exports: Array<{ exportName: string; fileName: string; cardNumber: number }>,
): void {
  const sorted = [...exports].sort((a, b) => a.cardNumber - b.cardNumber);

  const lines = sorted.map(
    ({ exportName, fileName }) =>
      `export { ${exportName} } from "./${fileName.replace(".ts", "")}";`,
  );

  const content = lines.join("\n") + "\n";
  fs.writeFileSync(path.join(destDir, "index.ts"), content);
  console.log(`  Created index.ts with ${exports.length} exports`);
}

/**
 * Process all cards of a given type
 */
function processCardType(
  cardType: CardType,
): Array<{ exportName: string; fileName: string; cardNumber: number }> {
  const sourceDir = path.join(SOURCE_BASE, cardType);
  const destDir = path.join(DEST_BASE, cardType);

  if (!fs.existsSync(sourceDir)) {
    console.log(`Source directory not found: ${sourceDir}`);
    return [];
  }

  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const exports: Array<{ exportName: string; fileName: string; cardNumber: number }> = [];
  const files = fs.readdirSync(sourceDir).filter((f) => f.endsWith(".ts"));

  console.log(`  Processing ${files.length} files...`);

  for (const file of files) {
    // Skip barrel exports and test files
    if (file === `${cardType}.ts` || file.includes(".test.") || file.includes(".spec.")) {
      continue;
    }

    const result = processFile(path.join(sourceDir, file), destDir, cardType.slice(0, -1));
    if (result) {
      exports.push(result);
    }
  }

  if (exports.length > 0) {
    generateTypeIndex(destDir, exports);
  }

  return exports;
}

/**
 * Generate main set index.ts
 */
function generateSetIndex(
  allExports: Record<CardType, Array<{ exportName: string; fileName: string; cardNumber: number }>>,
): void {
  const imports: string[] = [];
  const cardList: string[] = [];

  for (const cardType of CARD_TYPES) {
    const exports = allExports[cardType];
    if (exports.length === 0) continue;

    // Import statement
    imports.push(`import * as ${cardType} from "./${cardType}";`);

    // Sort by card number and add to card list
    const sorted = [...exports].sort((a, b) => a.cardNumber - b.cardNumber);
    for (const { exportName } of sorted) {
      cardList.push(`${cardType}.${exportName}`);
    }
  }

  const typeImports = `import type { ActionCard, CharacterCard, ItemCard, LocationCard } from "@tcg/lorcana-types";`;

  const content = `${typeImports}
${imports.join("\n")}

export const all011Cards: (CharacterCard | ActionCard | ItemCard | LocationCard)[] = [
  ${cardList.join(",\n  ")},
];

export const all011CardsById: Record<string, CharacterCard | ActionCard | ItemCard | LocationCard> = {};
for (const card of all011Cards) {
  all011CardsById[card.id] = card;
}

export * from "./actions";
export * from "./characters";
export * from "./items";
export * from "./locations";
`;

  fs.writeFileSync(path.join(DEST_BASE, "index.ts"), content);
  console.log(`Created set index.ts`);
}

/**
 * Main function
 */
function main(): void {
  console.log("Converting set 11 cards from lorcanito to @tcg/lorcana-types format...\n");

  const allExports: Record<
    CardType,
    Array<{ exportName: string; fileName: string; cardNumber: number }>
  > = {
    actions: [],
    characters: [],
    items: [],
    locations: [],
  };

  for (const cardType of CARD_TYPES) {
    console.log(`\nProcessing ${cardType}...`);
    allExports[cardType] = processCardType(cardType);
    console.log(`  Total: ${allExports[cardType].length} ${cardType}`);
  }

  console.log("\nGenerating set index...");
  generateSetIndex(allExports);

  // Summary
  const total = Object.values(allExports).reduce((sum, arr) => sum + arr.length, 0);
  console.log(`\n✅ Conversion complete! Converted ${total} cards.`);
}

main();
