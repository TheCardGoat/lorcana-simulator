import type { CharacterCard } from "@tcg/lorcana-types";

export const witchesOfMorvaOrdduOrwenAndOrgoch: CharacterCard = {
  id: "JTw",
  canonicalId: "ci_JTw",
  reprints: ["set11-057"],
  cardType: "character",
  name: "Witches of Morva",
  version: "Orddu, Orwen, and Orgoch",
  i18n: {
    en: {
      name: "Witches of Morva",
      version: "Orddu, Orwen, and Orgoch",
      text: [
        {
          title: "QUITE A BARGAIN",
          description:
            "When you play this character, you may return another chosen character of yours to your hand. If you do, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Die Hexen von Morva",
      version: "Orddu, Orwen und Orgoch",
      text: [
        {
          title: "EIN GUTER TAUSCH",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einen deiner anderen Charaktere wählen und zurück auf deine Hand nehmen. Wenn du dies tust, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Les sorcières de Morva",
      version: "Grièche, Griotte et Goulue",
      text: [
        {
          title: "QUELLE BONNE AFFAIRE",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir l'un de vos autres personnages et le renvoyer dans votre main. Si vous le faites, gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Streghe di Morva",
      version: "Orchina, Orcona e Orvina",
      text: [
        {
          title: "UN VERO AFFARE",
          description:
            "Quando giochi questo personaggio, puoi riprendere in mano un tuo altro personaggio a tua scelta. Se lo fai, ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Black Cauldron",
  set: "011",
  cardNumber: 57,
  rarity: "rare",
  cost: 5,
  strength: 4,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_5c24d2a781524b8fa28b72a0dddd91c5",
    tcgPlayer: 675295,
  },
  text: [
    {
      title: "QUITE A BARGAIN",
      description:
        "When you play this character, you may return another chosen character of yours to your hand. If you do, gain 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Sorcerer"],
  abilities: [
    {
      id: "11p-1",
      effect: {
        steps: [
          {
            chooser: "CONTROLLER",
            effect: {
              target: {
                cardTypes: ["character"],
                count: 1,
                owner: "any",
                selector: "chosen",
                zones: ["play"],
              },
              type: "return-to-hand",
            },
            type: "optional",
          },
          {
            amount: 1,
            type: "gain-lore",
          },
        ],
        type: "sequence",
      },
      name: "QUITE A BARGAIN",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "QUITE A BARGAIN When you play this character, you may return another chosen character of yours to your hand. If you do, gain 1 lore.",
    },
  ],
};
