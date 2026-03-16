/**
 * Lorcana deck list fixtures (name + newline-separated card lines).
 * Each JSON file has: { name: string; cards: string }
 */

import steelSapphireMidrange from "./steel-sapphire-midrange.json";
import steelSapphireAggressive from "./steel-sapphire-aggressive.json";
import amberSteelGoofyLilo from "./amber-steel-goofy-lilo.json";
import amberSteelLiloRapunzel from "./amber-steel-lilo-rapunzel.json";
import amberAmethystControl from "./amber-amethyst-control.json";
import amberAmethystAggressive from "./amber-amethyst-aggressive.json";
import steelAmethystBasilGenie from "./steel-amethyst-basil-genie.json";
import emeraldAmethystInk from "./emerald-amethyst-ink.json";

export interface DeckFixture {
  name: string;
  cards: string;
}

export const DECK_FIXTURES: DeckFixture[] = [
  steelSapphireMidrange,
  steelSapphireAggressive,
  amberSteelGoofyLilo,
  amberSteelLiloRapunzel,
  amberAmethystControl,
  amberAmethystAggressive,
  steelAmethystBasilGenie,
  emeraldAmethystInk,
];

export {
  steelSapphireMidrange,
  steelSapphireAggressive,
  amberSteelGoofyLilo,
  amberSteelLiloRapunzel,
  amberAmethystControl,
  amberAmethystAggressive,
  steelAmethystBasilGenie,
  emeraldAmethystInk,
};
