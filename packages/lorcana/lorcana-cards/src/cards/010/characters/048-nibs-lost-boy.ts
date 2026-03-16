import type { CharacterCard } from "@tcg/lorcana-types";

export const nibsLostBoy: CharacterCard = {
  id: "Jxb",
  canonicalId: "ci_Jxb",
  reprints: ["set10-048"],
  cardType: "character",
  name: "Nibs",
  version: "Lost Boy",
  i18n: {
    en: {
      name: "Nibs",
      version: "Lost Boy",
      text: [
        {
          title: "LOOK WHO'S BACK",
          description:
            "When this character is banished in a challenge, return this card to your hand.",
        },
      ],
    },
    de: {
      name: "Nibs",
      version: "Verwunschenes Kind",
      text: [
        {
          title: "SIEH AN, WER ZURÜCK IST",
          description:
            "Wenn dieser Charakter durch eine Herausforderung verbannt wird, nimm ihn zurück auf deine Hand.",
        },
      ],
    },
    fr: {
      name: "Bon Zigue",
      version: "Enfant perdu",
      text: [
        {
          title: "DEVINE QUI EST DE RETOUR",
          description:
            "Lorsque ce personnage est banni via un défi, renvoyez cette carte dans votre main.",
        },
      ],
    },
    it: {
      name: "Nibs",
      version: "Bimbo Sperduto",
      text: [
        {
          title: "GUARDA CHI È TORNATO",
          description:
            "Quando questo personaggio viene esiliato in una sfida, riprendi in mano questa carta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Peter Pan",
  set: "010",
  cardNumber: 48,
  rarity: "uncommon",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_c7e80f6c5dbe488380403f55cd22784a",
    tcgPlayer: 658335,
  },
  text: [
    {
      title: "LOOK WHO'S BACK",
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
      id: "1ar-1",
      name: "LOOK WHO'S BACK",
      text: "LOOK WHO'S BACK When this character is banished in a challenge, return this card to your hand.",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
