import type { CharacterCard } from "@tcg/lorcana-types";

export const camiloMadrigalFamilyCopycat: CharacterCard = {
  id: "LZo",
  canonicalId: "ci_LZo",
  reprints: ["set5-058"],
  cardType: "character",
  name: "Camilo Madrigal",
  version: "Family Copycat",
  i18n: {
    en: {
      name: "Camilo Madrigal",
      version: "Family Copycat",
      text: [
        {
          title: "IMITATE",
          description:
            "Whenever this character quests, you may gain lore equal to the {L} of chosen other character of yours. Return that character to your hand.",
        },
      ],
    },
    de: {
      name: "Camilo Madrigal",
      version: "Verwandlungskünstler",
      text: [
        {
          title: "IMITIEREN",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, darfst du einen deiner anderen Charaktere auswählen. Sammle so viele Legenden, wie sein Legendenwert beträgt. Nimm jenen danach zurück auf deine Hand.",
        },
      ],
    },
    fr: {
      name: "Camilo Madrigal",
      version: "Changeforme de la famille",
      text: [
        {
          title: "MIMÉTISME",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez choisir un autre de vos personnages et gagner autant d'éclats de Lore que son, puis le renvoyer dans votre main.",
        },
      ],
    },
    it: {
      name: "Camilo Madrigal",
      version: "Copione di Famiglia",
      text: [
        {
          title: "IMITARE",
          description:
            "Ogni volta che questo personaggio va all'avventura, puoi ottenere leggenda pari al di un tuo altro personaggio a tua scelta. Riprendi in mano quel personaggio.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Encanto",
  set: "005",
  cardNumber: 58,
  rarity: "legendary",
  cost: 6,
  strength: 3,
  willpower: 7,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_7fd5d0e0a462464dbc04f11a37718f4a",
    tcgPlayer: 561300,
  },
  text: [
    {
      title: "IMITATE",
      description:
        "Whenever this character quests, you may gain lore equal to the {L} of chosen other character of yours. Return that character to your hand.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Madrigal"],
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
      id: "1ra-1",
      name: "IMITATE",
      text: "IMITATE Whenever this character quests, you may gain lore equal to the {L} of chosen other character of yours. Return that character to your hand.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
