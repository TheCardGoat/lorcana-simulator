import type { CharacterCard } from "@tcg/lorcana-types";

export const pascalInquisitivePet: CharacterCard = {
  id: "5d3",
  canonicalId: "ci_5d3",
  reprints: ["set4-151"],
  cardType: "character",
  name: "Pascal",
  version: "Inquisitive Pet",
  i18n: {
    en: {
      name: "Pascal",
      version: "Inquisitive Pet",
      text: [
        {
          title: "COLORFUL TACTICS",
          description:
            "When you play this character, look at the top 3 cards of your deck and put them back in any order.",
        },
      ],
    },
    de: {
      name: "Pascal",
      version: "Neugieriges Haustier",
      text: [
        {
          title: "FARBENFROHE TAKTIK",
          description:
            "Wenn du diesen Charakter ausspielst, schaue dir die obersten 3 Karten deines Decks an und lege sie in beliebiger Reihenfolge zurück.",
        },
      ],
    },
    fr: {
      name: "Pascal",
      version: "Animal de compagnie curieux",
      text: [
        {
          title: "TACTIQUE COLORÉE",
          description:
            "Lorsque vous jouez ce personnage, regardez les 3 premières carte de votre pioche. Remettez-les sur le dessus de votre pioche dans l'ordre de votre choix.",
        },
      ],
    },
    it: {
      name: "Pascal",
      version: "Animaletto Curioso",
      text: [
        {
          title: "TATTICHE COLORATE",
          description:
            "Quando giochi questo personaggio, guarda le prime 3 carte del tuo mazzo e rimettile in cima al mazzo in qualsiasi ordine.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Tangled",
  set: "004",
  cardNumber: 151,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_551090cbc3134b44b9736a0fd5320b3a",
    tcgPlayer: 550520,
  },
  text: [
    {
      title: "COLORFUL TACTICS",
      description:
        "When you play this character, look at the top 3 cards of your deck and put them back in any order.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        amount: 3,
        destinations: [
          {
            ordering: "player-choice",
            remainder: true,
            zone: "deck-top",
          },
        ],
        target: "CONTROLLER",
        type: "scry",
      },
      id: "f7s-1",
      name: "COLORFUL TACTICS",
      text: "COLORFUL TACTICS When you play this character, look at the top 3 cards of your deck and put them back in any order.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
