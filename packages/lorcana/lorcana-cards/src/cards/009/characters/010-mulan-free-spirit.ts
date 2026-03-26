import type { CharacterCard } from "@tcg/lorcana-types";
import { mulanFreeSpiritI18n } from "./010-mulan-free-spirit.i18n";
import { support } from "../../../helpers/abilities/support";

export const mulanFreeSpirit: CharacterCard = {
  id: "E5z",
  canonicalId: "ci_Dqt",
  reprints: ["set2-015", "set9-010"],
  cardType: "character",
  name: "Mulan",
  version: "Free Spirit",
  inkType: ["amber"],
  franchise: "Mulan",
  set: "009",
  cardNumber: 10,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_a931864a0b0e42c7852e9609ea84914f",
    tcgPlayer: 649959,
  },
  text: "Support",
  classifications: ["Dreamborn", "Hero", "Princess"],
  abilities: [support],
  i18n: mulanFreeSpiritI18n,
};
