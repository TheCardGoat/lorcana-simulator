import type { CharacterCard } from "@tcg/lorcana-types";

export const patchPlayfulPup: CharacterCard = {
  id: "vSi",
  canonicalId: "ci_vSi",
  reprints: ["set8-025"],
  cardType: "character",
  name: "Patch",
  version: "Playful Pup",
  i18n: {
    en: {
      name: "Patch",
      version: "Playful Pup",
      text: [
        {
          title: "Ward",
        },
        {
          title: "PUPPY BARKING",
          description:
            "While you have another Puppy character in play, this character gets +1 {L}.",
        },
      ],
    },
    de: {
      name: "Patch",
      version: "Verspielter Welpe",
      text: "Behütet WELPENBELLEN Solange du mindestens einen weiteren Welpen im Spiel hast, erhält dieser Charakter +1.",
    },
    fr: {
      name: "Patch",
      version: "Chiot joueur",
      text: "Hors d'atteinte ABOIEMENTS DE CHIOT Tant que vous avez un autre personnage Chiot en jeu, ce personnage-ci gagne +1.",
    },
    it: {
      name: "Macchia",
      version: "Cucciolo Giocherellone",
      text: "Protetto LATRATO DEI CUCCIOLI Mentre hai in gioco un altro personaggio Cucciolo, questo personaggio riceve +1.",
    },
  },
  inkType: ["amber", "sapphire"],
  franchise: "101 Dalmatians",
  set: "008",
  cardNumber: 25,
  rarity: "uncommon",
  cost: 1,
  strength: 0,
  willpower: 2,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_1df8d47cd5c3400293a2fa3d060bd425",
    tcgPlayer: 631368,
  },
  text: [
    {
      title: "Ward",
    },
    {
      title: "PUPPY BARKING",
      description: "While you have another Puppy character in play, this character gets +1 {L}.",
    },
  ],
  classifications: ["Storyborn", "Puppy"],
  abilities: [
    {
      id: "1x2-1",
      keyword: "Ward",
      text: "Ward",
      type: "keyword",
    },
    {
      effect: {
        modifier: 1,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1x2-2",
      text: "PUPPY BARKING While you have another Puppy character in play, this character gets +1 {L}.",
      type: "action",
    },
  ],
};
