import type { CharacterCard } from "@tcg/lorcana-types";

export const winnieThePoohHungryBear: CharacterCard = {
  id: "h5D",
  canonicalId: "ci_mZ8",
  reprints: ["set11-151"],
  cardType: "character",
  name: "Winnie the Pooh",
  version: "Hungry Bear",
  i18n: {
    en: {
      name: "Winnie the Pooh",
      version: "Hungry Bear",
      text: [
        {
          title: "LOOKING FOR A MORSEL",
          description:
            "When you play this character, you may return an item card from your discard to your hand.",
        },
      ],
    },
    de: {
      name: "Winnie Puuh",
      version: "Hungriger Bär",
      text: [
        {
          title: "AUF DER SUCHE NACH EINEM HÄPPCHEN",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du 1 Gegenstandskarte aus deinem Ablagestapel zurück auf deine Hand nehmen.",
        },
      ],
    },
    fr: {
      name: "Winnie l'ourson",
      version: "Ours affamé",
      text: [
        {
          title: "CHERCHER DE QUOI GRIGNOTER",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez renvoyer dans votre main une carte Objet de votre défausse.",
        },
      ],
    },
    it: {
      name: "Winnie the Pooh",
      version: "Orso Affamato",
      text: [
        {
          title: "IN CERCA DI UNA GOCCIA",
          description:
            "Quando giochi questo personaggio, puoi riprendere in mano una carta oggetto dai tuoi scarti.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Winnie the Pooh",
  set: "011",
  cardNumber: 151,
  rarity: "common",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_5da5944a7e9240aab2d30466337643c3",
    tcgPlayer: 677152,
  },
  text: [
    {
      title: "LOOKING FOR A MORSEL",
      description:
        "When you play this character, you may return an item card from your discard to your hand.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "14x-1",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: "CONTROLLER",
          type: "return-from-discard",
          cardType: "item",
        },
        type: "optional",
      },
      name: "LOOKING FOR A MORSEL",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "LOOKING FOR A MORSEL When you play this character, you may return an item card from your discard to your hand.",
    },
  ],
};
