import type { CharacterCard } from "@tcg/lorcana-types";

export const princeJohnOpportunisticBriber: CharacterCard = {
  id: "wvs",
  canonicalId: "ci_wvs",
  reprints: ["set5-141"],
  cardType: "character",
  name: "Prince John",
  version: "Opportunistic Briber",
  i18n: {
    en: {
      name: "Prince John",
      version: "Opportunistic Briber",
      text: [
        {
          title: "TAXES NEVER FAIL ME",
          description: "Whenever you play an item, this character gets +2 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Prinz John",
      version: "Gelegenheitsbetrüger",
      text: [
        {
          title: "STEUERN LASSEN MICH NIEMALS IM STICH",
          description:
            "Jedes Mal, wenn du einen Gegenstand ausspielst, erhält dieser Charakter in diesem Zug +2.",
        },
      ],
    },
    fr: {
      name: "Prince Jean",
      version: "Corrupteur opportuniste",
      text: [
        {
          title: "JE COLLECTE TOUTES LES TAXES",
          description:
            "Chaque fois que vous jouez un objet, ce personnage gagne +2 pour le reste du tour.",
        },
      ],
    },
    it: {
      name: "Principe Giovanni",
      version: "Corruttore Opportunista",
      text: [
        {
          title: "LE TASSE NON DELUDONO MAI",
          description:
            "Ogni volta che giochi un oggetto, questo personaggio riceve +2 per questo turno.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Robin Hood",
  set: "005",
  cardNumber: 141,
  rarity: "common",
  cost: 3,
  strength: 1,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_16dd3d0f11fb4a96a4aa7d7f69468a23",
    tcgPlayer: 561648,
  },
  text: [
    {
      title: "TAXES NEVER FAIL ME",
      description: "Whenever you play an item, this character gets +2 {S} this turn.",
    },
  ],
  classifications: ["Dreamborn", "Villain", "Prince"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: 2,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "qie-1",
      name: "TAXES NEVER FAIL ME",
      text: "TAXES NEVER FAIL ME Whenever you play an item, this character gets +2 {S} this turn.",
      trigger: {
        event: "play",
        on: {
          cardType: "item",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
