#!/usr/bin/env bun

import fs from "node:fs";
import path from "node:path";
import type { CardText, I18nProperties, Languages } from "@tcg/lorcana-types";
import { generateCardFiles } from "./generators/file-generator";
import { splitCardText } from "./utils/structured-card-text";
import type {
  CanonicalCard,
  CardPrinting,
  CardsAuxKv,
  LocalizationData,
  LocalizedCardData,
  SetDefinition,
} from "./types";

const DATA_DIR = path.resolve(import.meta.dir, "../src/data");
const CARDS_DIR = path.resolve(import.meta.dir, "../src/cards");
const CANONICAL_CARDS_PATH = path.join(DATA_DIR, "canonical-cards.json");
const AUX_KV_PATH = path.join(DATA_DIR, "cards.aux.kv.json");
const SETS_PATH = path.join(DATA_DIR, "sets.json");
const PRINTING_METADATA_PATH = path.join(DATA_DIR, "cards.aux.printing-metadata.json");
const NON_ENGLISH_LANGUAGES = ["de", "fr", "it"] as const;

type NonEnglishLanguage = (typeof NON_ENGLISH_LANGUAGES)[number];
type LocalizationByLanguage = Record<NonEnglishLanguage, LocalizationData>;

function loadJsonFile<T>(filePath: string): T {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Required file not found: ${filePath}`);
  }

  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

function writeJsonFile(filePath: string, data: unknown): void {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf-8");
}

export function buildEnglishI18nProperties(
  card: Pick<CanonicalCard, "name" | "version" | "rulesText">,
): I18nProperties {
  return {
    name: card.name,
    ...(card.version ? { version: card.version } : {}),
    ...(card.rulesText ? { text: splitCardText(card.rulesText) } : {}),
  };
}

export function buildLocalizedI18nProperties(
  localized: Pick<LocalizedCardData, "name" | "version" | "text">,
): I18nProperties {
  return {
    name: localized.name,
    ...(localized.version ? { version: localized.version } : {}),
    ...(localized.text ? { text: localized.text } : {}),
  };
}

export function cardTextToRulesText(text?: CardText): string | undefined {
  if (!text) {
    return undefined;
  }

  if (typeof text === "string") {
    return text;
  }

  const serialized = text
    .map((entry) =>
      (entry.description ? `${entry.title} ${entry.description}` : entry.title).trim(),
    )
    .filter(Boolean)
    .join(" ")
    .trim();

  return serialized || undefined;
}

export function resolveLocalizedEntry(
  card: Pick<CanonicalCard, "id" | "canonicalId" | "name" | "version">,
  auxKv: Pick<CardsAuxKv, "representativeShortIdByCanonicalId">,
  localizationData: LocalizationData,
  locale: NonEnglishLanguage,
): LocalizedCardData {
  const directEntry = localizationData[card.id];
  if (directEntry) {
    return directEntry;
  }

  const representativeShortId = auxKv.representativeShortIdByCanonicalId[card.canonicalId];
  if (representativeShortId) {
    const representativeEntry = localizationData[representativeShortId];
    if (representativeEntry) {
      return representativeEntry;
    }
  }

  const cardLabel = card.version ? `${card.name} - ${card.version}` : card.name;
  throw new Error(
    `Missing ${locale} localization for card ${card.id} (${card.canonicalId}, ${cardLabel})`,
  );
}

export function embedI18nInCanonicalCards(
  canonicalCards: Record<string, CanonicalCard>,
  auxKv: Pick<CardsAuxKv, "representativeShortIdByCanonicalId">,
  localizationByLanguage: LocalizationByLanguage,
): Record<string, CanonicalCard> {
  const cardsWithI18n: Record<string, CanonicalCard> = {};

  for (const [printingId, card] of Object.entries(canonicalCards)) {
    cardsWithI18n[printingId] = {
      ...card,
      i18n: {
        en: buildEnglishI18nProperties(card),
        de: buildLocalizedI18nProperties(
          resolveLocalizedEntry(card, auxKv, localizationByLanguage.de, "de"),
        ),
        fr: buildLocalizedI18nProperties(
          resolveLocalizedEntry(card, auxKv, localizationByLanguage.fr, "fr"),
        ),
        it: buildLocalizedI18nProperties(
          resolveLocalizedEntry(card, auxKv, localizationByLanguage.it, "it"),
        ),
      } satisfies Record<Languages, I18nProperties>,
    };
  }

  return cardsWithI18n;
}

function loadLocalizationByLanguage(): LocalizationByLanguage {
  return {
    de: loadJsonFile<LocalizationData>(path.join(DATA_DIR, "localization-de.json")),
    fr: loadJsonFile<LocalizationData>(path.join(DATA_DIR, "localization-fr.json")),
    it: loadJsonFile<LocalizationData>(path.join(DATA_DIR, "localization-it.json")),
  };
}

function main(): void {
  console.log("🌐 Embedding card i18n metadata...");

  const canonicalCards = loadJsonFile<Record<string, CanonicalCard>>(CANONICAL_CARDS_PATH);
  const auxKv = loadJsonFile<CardsAuxKv>(AUX_KV_PATH);
  const sets = loadJsonFile<Record<string, SetDefinition>>(SETS_PATH);
  const printingMetadata = loadJsonFile<Record<string, CardPrinting>>(PRINTING_METADATA_PATH);
  const localizationByLanguage = loadLocalizationByLanguage();

  const cardsWithI18n = embedI18nInCanonicalCards(canonicalCards, auxKv, localizationByLanguage);

  writeJsonFile(CANONICAL_CARDS_PATH, cardsWithI18n);
  console.log(`  ✅ Updated ${path.basename(CANONICAL_CARDS_PATH)}`);

  generateCardFiles(CARDS_DIR, cardsWithI18n, sets, printingMetadata);
}

if (import.meta.main) {
  main();
}
