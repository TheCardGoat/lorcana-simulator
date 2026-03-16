import type { CharacterCard } from "@tcg/lorcana-types";

export const diabloFaithfulPet: CharacterCard = {
  id: "6Jh",
  canonicalId: "ci_6Jh",
  reprints: ["set3-037"],
  cardType: "character",
  name: "Diablo",
  version: "Faithful Pet",
  i18n: {
    en: {
      name: "Diablo",
      version: "Faithful Pet",
      text: [
        {
          title: "LOOKING FOR AURORA",
          description:
            "Whenever you play a character named Maleficent, you may look at the top card of your deck. Put it on either the top or the bottom of your deck.",
        },
      ],
    },
    de: {
      name: "Diablo",
      version: "Treues Haustier",
      text: [
        {
          title: "SUCHE NACH AURORA",
          description:
            "Jedes Mal, wenn du einen Malefiz-Charakter ausspielst, darfst du dir die oberste Karte deines Decks anschauen. Lege sie anschließend entweder auf dein Deck oder darunter.",
        },
      ],
    },
    fr: {
      name: "Diablo",
      version: "Animal de compagnie fidèle",
      text: [
        {
          title: "À LA RECHERCHE D'AURORE",
          description:
            "Chaque fois que vous jouez un personnage Maléfique, vous pouvez regarder la première carte de votre pioche. Remettez-la soit sur le dessus de votre pioche, soit en dessous.",
        },
      ],
    },
    it: {
      name: "Diablo",
      version: "Famiglio Fedele",
      text: [
        {
          title: "IN CERCA DI AURORA",
          description:
            "Ogni volta che giochi un personaggio chiamato Malefica, puoi guardare la prima carta del tuo mazzo. Mettila in cima o in fondo al tuo mazzo.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Sleeping Beauty",
  set: "003",
  cardNumber: 37,
  rarity: "common",
  cost: 1,
  strength: 2,
  willpower: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_96b06169bec644898473633766c5e534",
    tcgPlayer: 539068,
  },
  text: [
    {
      title: "LOOKING FOR AURORA",
      description:
        "Whenever you play a character named Maleficent, you may look at the top card of your deck. Put it on either the top or the bottom of your deck.",
    },
  ],
  classifications: ["Dreamborn", "Ally"],
  missingTests: true,
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: "CHOSEN_CHARACTER",
          type: "put-on-bottom",
        },
        type: "optional",
      },
      id: "1tx-1",
      name: "LOOKING FOR AURORA",
      text: "LOOKING FOR AURORA Whenever you play a character named Maleficent, you may look at the top card of your deck. Put it on either the top or the bottom of your deck.",
      trigger: {
        event: "play",
        on: {
          cardType: "character",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
