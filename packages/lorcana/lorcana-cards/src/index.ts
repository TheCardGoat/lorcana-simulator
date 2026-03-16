/**
 * @tcg/lorcana-cards
 *
 * Card definitions, parser, and tooling for Lorcana TCG.
 *
 * Types and builders are provided by @tcg/lorcana-engine package.
 * This package provides:
 * - Parser for converting card text to ability objects
 * - Card data definitions
 *
 * @example Basic usage
 * ```typescript
 * import { parseAbilityText, getLorcanaCardCatalog } from "@tcg/lorcana-cards";
 *
 * const result = parseAbilityText("Rush");
 * if (result.success) {
 *   console.log(result.ability);
 * }
 * ```
 *
 * @example Import from parser subpath
 * ```typescript
 * import { parseAbilityText } from "@tcg/lorcana-cards/parser";
 * ```
 *
 * @example Get all cards
 * ```typescript
 * import { allCards, allCardsById, getLorcanaCardCatalog } from "@tcg/lorcana-cards";
 *
 * // Get catalog for engine
 * const catalog = getLorcanaCardCatalog();
 * ```
 */

// Re-export parser
export * from "./parser";

export { fromDeckToCardInstances } from "./utils/fromDeckToCardInstances";
export * from "./utils/deck-list-resolver";

// Re-export card catalog
export { getAllCards, getAllCardsById, getLorcanaCardCatalog } from "./cards";
