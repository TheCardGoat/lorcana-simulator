import type { CharacterCard } from "@tcg/lorcana-types";
import { clarabelleLightOnHerHoovesEnchantedI18n } from "./211-clarabelle-light-on-her-hooves-enchanted.i18n";

export const clarabelleLightOnHerHoovesEnchanted: CharacterCard = {
  id: "QGJ",
  canonicalId: "ci_fF6",
  reprints: ["set5-084"],
  cardType: "character",
  name: "Clarabelle",
  version: "Light on Her Hooves",
  inkType: ["emerald"],
  set: "005",
  cardNumber: 211,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 7,
  strength: 5,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_8dbe711cfb4541309eb32cf37fe48997",
    tcgPlayer: 561991,
  },
  text: [
    {
      title: "Shift 5",
    },
    {
      title: "KEEP IN STEP",
      description:
        "At the end of your turn, if chosen opponent has more cards in their hand than you, you may draw cards until you have the same number.",
    },
  ],
  classifications: ["Floodborn", "Ally"],
  abilities: [],
  i18n: clarabelleLightOnHerHoovesEnchantedI18n,
};
