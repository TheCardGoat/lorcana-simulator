import type { CharacterCard } from "@tcg/lorcana-types";
import { mulanResourcefulRecruitEnchantedI18n } from "./229-mulan-resourceful-recruit-enchanted.i18n";

export const mulanResourcefulRecruitEnchanted: CharacterCard = {
  id: "7Ks",
  canonicalId: "ci_qCB",
  reprints: ["set11-069"],
  cardType: "character",
  name: "Mulan",
  version: "Resourceful Recruit",
  inkType: ["emerald"],
  franchise: "Mulan",
  set: "011",
  cardNumber: 229,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 2,
  strength: 1,
  willpower: 4,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_5eb205c36e0b4038a8a46aa47dd50b0f",
    tcgPlayer: 677162,
  },
  text: [
    {
      title: "RIGOROUS TRAINING",
      description:
        "Whenever this character quests, gain lore equal to her {S}, to a maximum of 6 lore.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [],
  i18n: mulanResourcefulRecruitEnchantedI18n,
};
