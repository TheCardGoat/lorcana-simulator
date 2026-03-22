import type { CharacterCard } from "@tcg/lorcana-types";
import { morganaMacawberReformedSpellcasterI18n } from "./047-morgana-macawber-reformed-spellcaster.i18n";

export const morganaMacawberReformedSpellcaster: CharacterCard = {
  id: "5kx",
  canonicalId: "ci_5kx",
  reprints: ["set11-047"],
  cardType: "character",
  name: "Morgana Macawber",
  version: "Reformed Spellcaster",
  inkType: ["amethyst"],
  franchise: "Darkwing Duck",
  set: "011",
  cardNumber: 47,
  rarity: "rare",
  cost: 6,
  strength: 6,
  willpower: 6,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_1d1f7c6cafbd497292467de4c883cf0c",
    tcgPlayer: 676193,
  },
  text: [
    {
      title: "Shift 4 {I}",
    },
    {
      title: "JUST FOR YOU",
      description:
        "When you play this character, you may choose an opposing character and move 1 damage from each other character to them.",
    },
  ],
  classifications: ["Floodborn", "Super", "Hero", "Sorcerer"],
  abilities: [],
  i18n: morganaMacawberReformedSpellcasterI18n,
};
