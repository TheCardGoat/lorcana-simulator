import type { CharacterCard } from "@tcg/lorcana-types";

export const flynnRiderBreakingAndEntering: CharacterCard = {
  id: "gxV",
  canonicalId: "ci_gxV",
  reprints: ["set8-102"],
  cardType: "character",
  name: "Flynn Rider",
  version: "Breaking and Entering",
  i18n: {
    en: {
      name: "Flynn Rider",
      version: "Breaking and Entering",
      text: [
        {
          title: "THIS IS A VERY BIG DAY",
          description:
            "Whenever this character is challenged, the challenging player may choose and discard a card. If they don't, you gain 2 lore.",
        },
      ],
    },
    de: {
      name: "Flynn Rider",
      version: "Einbrecher",
      text: [
        {
          title: "HEUTE IST EIN GANZ BESONDERER TAG",
          description:
            "Jedes Mal, wenn dieser Charakter herausgefordert wird, darf die herausfordernde Person 1 Karte aus ihrer Hand auswählen und abwerfen. Falls sie keine Karte abwirft, sammelst du 2 Legenden.",
        },
      ],
    },
    fr: {
      name: "Flynn Rider",
      version: "Entrant par effraction",
      text: [
        {
          title: "AUJOURD'HUI EST UN GRAND JOUR",
          description:
            "Chaque fois que ce personnage est défié, le joueur qui a lancé le défi peut défausser une carte. S'il ne le fait pas, vous gagnez 2 éclats de Lore.",
        },
      ],
    },
    it: {
      name: "Flynn Rider",
      version: "Entrato di Soppiatto",
      text: [
        {
          title: "QUESTO È DAVVERO UN GRANDE GIORNO",
          description:
            "Ogni volta che questo personaggio viene sfidato, il giocatore sfidante può scegliere e scartare una carta. Se non lo fa, ottieni 2 leggenda.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Tangled",
  set: "008",
  cardNumber: 102,
  rarity: "common",
  cost: 4,
  strength: 1,
  willpower: 4,
  lore: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_b41f273d5c6b4abe99a596fd14435de1",
    tcgPlayer: 631415,
  },
  text: [
    {
      title: "THIS IS A VERY BIG DAY",
      description:
        "Whenever this character is challenged, the challenging player may choose and discard a card. If they don't, you gain 2 lore.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Prince"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "they don't",
          type: "if",
        },
        then: {
          amount: 2,
          type: "gain-lore",
        },
        type: "conditional",
      },
      id: "o9w-1",
      name: "THIS IS A VERY BIG DAY",
      text: "THIS IS A VERY BIG DAY Whenever this character is challenged, the challenging player may choose and discard a card. If they don't, you gain 2 lore.",
      trigger: {
        event: "challenged",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
