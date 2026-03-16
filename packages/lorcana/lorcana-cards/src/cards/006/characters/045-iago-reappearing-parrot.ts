import type { CharacterCard } from "@tcg/lorcana-types";

export const iagoReappearingParrot: CharacterCard = {
  id: "Swd",
  canonicalId: "ci_Swd",
  reprints: ["set6-045"],
  cardType: "character",
  name: "Iago",
  version: "Reappearing Parrot",
  i18n: {
    en: {
      name: "Iago",
      version: "Reappearing Parrot",
      text: [
        {
          title: "GUESS WHO",
          description:
            "When this character is banished in a challenge, return this card to your hand.",
        },
      ],
    },
    de: {
      name: "Jago",
      version: "Wiederauftauchender Papagei",
      text: [
        {
          title: "RATE MAL",
          description:
            "Wenn dieser Charakter durch eine Herausforderung verbannt wird, nimm ihn zurück auf deine Hand.",
        },
      ],
    },
    fr: {
      name: "Iago",
      version: "Perroquet tenace",
      text: [
        {
          title: "DEVINE QUI C'EST",
          description: "Lorsque ce personnage est banni via un défi, renvoyez-le dans votre main.",
        },
      ],
    },
    it: {
      name: "Iago",
      version: "Pappagallo Ricomparso",
      text: [
        {
          title: "INDOVINA CHI C'È",
          description:
            "Quando questo personaggio viene esiliato in una sfida, riprendi in mano questa carta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Aladdin",
  set: "006",
  cardNumber: 45,
  rarity: "common",
  cost: 4,
  strength: 4,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_92d831ee2e5b430a9bbbcf7d684bbd57",
    tcgPlayer: 592020,
  },
  text: [
    {
      title: "GUESS WHO",
      description: "When this character is banished in a challenge, return this card to your hand.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        target: "SELF",
        type: "return-to-hand",
      },
      id: "tre-1",
      name: "GUESS WHO",
      text: "GUESS WHO When this character is banished in a challenge, return this card to your hand.",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
