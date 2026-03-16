import type { CharacterCard } from "@tcg/lorcana-types";

export const fangmeyerIcyOfficer: CharacterCard = {
  id: "pOQ",
  canonicalId: "ci_pOQ",
  reprints: ["set11-010"],
  cardType: "character",
  name: "Fangmeyer",
  version: "Icy Officer",
  i18n: {
    en: {
      name: "Fangmeyer",
      version: "Icy Officer",
      text: [
        {
          title: "REQUEST REINFORCEMENTS",
          description:
            "When you play this character, you may return a Detective character card from your discard to your hand.",
        },
      ],
    },
    de: {
      name: "Fangmeyer",
      version: "Eisiger Offizier",
      text: [
        {
          title: "VERSTÄRKUNG ANFORDERN",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du 1 Detektiv-Charakterkarte aus deinem Ablagestapel zurück auf deine Hand nehmen.",
        },
      ],
    },
    fr: {
      name: "Cromeyer",
      version: "Policier froid",
      text: [
        {
          title: "DEMANDE DE RENFORTS",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez renvoyer dans votre main une carte Personnage Détective de votre défausse.",
        },
      ],
    },
    it: {
      name: "Fangmeyer",
      version: "Agente Glaciale",
      text: [
        {
          title: "RICHIESTA DI RINFORZI",
          description:
            "Quando giochi questo personaggio, puoi riprendere in mano una carta personaggio Detective dai tuoi scarti.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Zootropolis",
  set: "011",
  cardNumber: 10,
  rarity: "common",
  cost: 5,
  strength: 4,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_f3392db6475445bbb5ad6f608dc86c4b",
    tcgPlayer: 674827,
  },
  text: [
    {
      title: "REQUEST REINFORCEMENTS",
      description:
        "When you play this character, you may return a Detective character card from your discard to your hand.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Detective"],
  abilities: [
    {
      id: "119-1",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: "CONTROLLER",
          type: "return-from-discard",
        },
        type: "optional",
      },
      name: "REQUEST REINFORCEMENTS",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "REQUEST REINFORCEMENTS When you play this character, you may return a Detective character card from your discard to your hand.",
    },
  ],
};
