import { type ActionCard, type CharacterCard, type InkType } from "../types";
import { type CardCatalog, createRecordCardCatalog } from "#core";
import type { LorcanaCard } from "@tcg/lorcana-types";
import { createCardI18n } from "../card-i18n";

export type CreateMockCharacterParams = {
  id: string;
  name: string;
  cost: number;
  strength?: number;
  willpower?: number;
  lore?: number;
  classifications?: CharacterCard["classifications"];
  abilities?: CharacterCard["abilities"];
};

export type CreateMockSongParams = {
  id: string;
  name: string;
  cost: number;
  text: string;
  abilities?: ActionCard["abilities"];
};

export function createMockCharacter(params: CreateMockCharacterParams): CharacterCard {
  return {
    id: params.id,
    canonicalId: `ci_${params.id}`,
    cardType: "character",
    name: params.name,
    cost: params.cost,
    strength: params.strength ?? 2,
    willpower: params.willpower ?? 5,
    lore: params.lore ?? 1,
    classifications: params.classifications ?? ["Storyborn", "Hero"],
    inkType: ["amber"] as InkType[],
    inkable: true,
    set: "TST",
    rarity: "common",
    abilities: params.abilities ?? [],
    i18n: createCardI18n(params.name),
    cardNumber: 666,
  };
}

export function createMockSong(params: CreateMockSongParams): ActionCard {
  return {
    id: params.id,
    canonicalId: `ci_${params.id}`,
    cardType: "action",
    actionSubtype: "song",
    name: params.name,
    cost: params.cost,
    inkType: ["amber"] as InkType[],
    inkable: true,
    set: "TST",
    rarity: "common",
    text: params.text,
    abilities: params.abilities ?? [],
    i18n: createCardI18n(params.name, {
      en: {
        name: params.name,
        text: params.text,
      },
    }),
    cardNumber: 666,
  };
}

// Create a minimal test card for testing
export function createTestCard(id: string, name: string): CharacterCard {
  return {
    id,
    canonicalId: `ci_${id}`,
    name,
    fullName: name,
    version: "Test",
    cardType: "character",
    subtypes: ["Storyborn", "Hero"],
    classification: "Dreamborn",
    cost: 1,
    inkType: ["amber"] as InkType[],
    inkable: true,
    strength: 1,
    willpower: 1,
    lore: 1,
    set: "001",
    number: parseInt(id.replace(/\D/g, "").slice(-3) || "001", 10),
    rarity: "common",
    abilities: [],
    i18n: createCardI18n(name),
    cardNumber: 666,
  } as CharacterCard;
}

export function createTestCardCatalog(
  cards: Record<string, LorcanaCard>,
): CardCatalog<LorcanaCard> {
  return createRecordCardCatalog("test:cards", cards);
}

// Helper to build cardsMaps from player decks
export function buildCardsMaps(
  playersInfo: Array<{
    player: { id: string };
    deck: Array<{ cardId: string; qty: number }>;
  }>,
): { cardInstances: Record<string, string>; owners: Record<string, string[]> } {
  const cardInstances: Record<string, string> = {};
  const owners: Record<string, string[]> = {};

  for (const { player, deck } of playersInfo) {
    owners[player.id] = [];
    for (const { cardId, qty } of deck) {
      for (let i = 0; i < qty; i++) {
        const instanceId = `${player.id}-${cardId}-${i}`;
        cardInstances[instanceId] = cardId;
        owners[player.id].push(instanceId);
      }
    }
  }

  return { cardInstances, owners };
}
