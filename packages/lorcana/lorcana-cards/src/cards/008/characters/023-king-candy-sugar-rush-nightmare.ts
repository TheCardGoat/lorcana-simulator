import type { CharacterCard } from "@tcg/lorcana-types";

export const kingCandySugarRushNightmare: CharacterCard = {
  id: "ABb",
  canonicalId: "ci_ABb",
  reprints: ["set8-023"],
  cardType: "character",
  name: "King Candy",
  version: "Sugar Rush Nightmare",
  i18n: {
    en: {
      name: "King Candy",
      version: "Sugar Rush Nightmare",
      text: [
        {
          title: "A NEW ROSTER",
          description:
            "When this character is banished, you may return another Racer character card from your discard to your hand.",
        },
      ],
    },
    de: {
      name: "King Candy",
      version: "Sugar-Rush-Albtraum",
      text: [
        {
          title: "EIN NEUER FAHRER",
          description:
            "Wenn dieser Charakter verbannt wird, darfst du eine andere Rennfahrer-Charakterkarte aus deinem Ablagestapel zurück auf deine Hand nehmen.",
        },
      ],
    },
    fr: {
      name: "Sa Sucrerie",
      version: "Cauchemar de Sugar Rush",
      text: [
        {
          title: "UNE NOUVELLE ÉQUIPE",
          description:
            "Lorsque ce personnage est banni, vous pouvez renvoyer dans votre main une autre carte Pilote de votre défausse.",
        },
      ],
    },
    it: {
      name: "Re Candito",
      version: "Incubo di Sugar Rush",
      text: [
        {
          title: "NUOVI CONCORRENTI",
          description:
            "Quando questo personaggio viene esiliato, puoi riprendere in mano un'altra carta personaggio Pilota dai tuoi scarti.",
        },
      ],
    },
  },
  inkType: ["amber", "ruby"],
  franchise: "Wreck It Ralph",
  set: "008",
  cardNumber: 23,
  rarity: "uncommon",
  cost: 3,
  strength: 3,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_c7f64e55e7234c46bc9ed7d742e22265",
    tcgPlayer: 631367,
  },
  text: [
    {
      title: "A NEW ROSTER",
      description:
        "When this character is banished, you may return another Racer character card from your discard to your hand.",
    },
  ],
  classifications: ["Storyborn", "Villain", "King", "Racer"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "return-to-hand",
        },
        type: "optional",
      },
      id: "1mh-1",
      name: "A NEW ROSTER",
      text: "A NEW ROSTER When this character is banished, you may return another Racer character card from your discard to your hand.",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
