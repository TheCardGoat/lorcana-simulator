import type { CharacterCard } from "@tcg/lorcana-types";
import { splatterPhoenixRejectedArtistI18n } from "./153-splatter-phoenix-rejected-artist.i18n";

export const splatterPhoenixRejectedArtist: CharacterCard = {
  id: "q39",
  canonicalId: "ci_q39",
  reprints: ["set11-153"],
  cardType: "character",
  name: "Splatter Phoenix",
  version: "Rejected Artist",
  inkType: ["sapphire"],
  franchise: "Darkwing Duck",
  set: "011",
  cardNumber: 153,
  rarity: "uncommon",
  cost: 2,
  strength: 1,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_dd7610ea1502422199f68ea86fce5b19",
    tcgPlayer: 676224,
  },
  text: [
    {
      title: "UNDERDOG",
      description:
        "If this is your first turn and you're not the first player, you pay 1 {I} less to play this character.",
    },
    {
      title: "Ward",
    },
  ],
  classifications: ["Storyborn", "Super", "Villain"],
  abilities: [
    {
      id: "k08-1",
      name: "UNDERDOG",
      type: "static",
      condition: {
        type: "first-turn-non-otp",
      },
      effect: {
        type: "cost-reduction",
        amount: 1,
        cardType: "character",
      },
      sourceZones: ["hand"],
      text: "UNDERDOG If this is your first turn and you're not the first player, you pay 1 {I} less to play this character.",
    },
    {
      id: "k08-2",
      keyword: "Ward",
      type: "keyword",
      text: "Ward",
    },
  ],
  i18n: splatterPhoenixRejectedArtistI18n,
};
