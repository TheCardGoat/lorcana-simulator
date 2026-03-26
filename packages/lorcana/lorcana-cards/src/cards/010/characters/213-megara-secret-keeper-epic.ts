import type { CharacterCard } from "@tcg/lorcana-types";
import { boost } from "../../../helpers/abilities/boost";
import { megaraSecretKeeperEpicI18n } from "./213-megara-secret-keeper-epic.i18n";

export const megaraSecretKeeperEpic: CharacterCard = {
  id: "Sa5",
  canonicalId: "ci_uSJ",
  reprints: ["set10-086"],
  cardType: "character",
  name: "Megara",
  version: "Secret Keeper",
  inkType: ["emerald"],
  franchise: "Hercules",
  set: "010",
  cardNumber: 213,
  rarity: "common",
  specialRarity: "epic",
  cost: 3,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_78c11305e1674d348fe8839940f029a5",
    tcgPlayer: 658217,
  },
  text: [
    {
      title: "Boost 1 {I}",
    },
    {
      title: "I'LL BE FINE",
      description:
        'While there\'s a card under this character, she gets +1 {L} and gains "Whenever this character is challenged, each opponent chooses and discards a card."',
    },
  ],
  classifications: ["Storyborn", "Ally", "Whisper"],
  abilities: [
    boost(1),
    {
      effect: {
        modifier: 1,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1af-2",
      text: "I'LL BE FINE While there's a card under this character, she gets +1 {L} and gains \"Whenever this character is challenged, each opponent chooses and discards a card.\"",
      type: "static",
    },
  ],
  i18n: megaraSecretKeeperEpicI18n,
};
