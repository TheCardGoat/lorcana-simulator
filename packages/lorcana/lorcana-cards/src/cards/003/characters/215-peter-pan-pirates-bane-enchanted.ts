import type { CharacterCard } from "@tcg/lorcana-types";
import { peterPanPiratesBaneEnchantedI18n } from "./215-peter-pan-pirates-bane-enchanted.i18n";

export const peterPanPiratesBaneEnchanted: CharacterCard = {
  id: "lkh",
  canonicalId: "ci_rxb",
  reprints: ["set3-120"],
  cardType: "character",
  name: "Peter Pan",
  version: "Pirate's Bane",
  inkType: ["ruby"],
  franchise: "Peter Pan",
  set: "003",
  cardNumber: 215,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 6,
  strength: 4,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_b5e74b533270492982dff9472aee8664",
    tcgPlayer: 539274,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "Evasive",
    },
    {
      title: "YOU'RE NEXT!",
      description:
        "Whenever he challenges a Pirate character, this character takes no damage from the challenge.",
    },
  ],
  classifications: ["Floodborn", "Hero"],
  abilities: [],
  i18n: peterPanPiratesBaneEnchantedI18n,
};
