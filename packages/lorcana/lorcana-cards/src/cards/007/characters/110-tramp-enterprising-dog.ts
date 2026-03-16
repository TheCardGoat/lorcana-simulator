import type { CharacterCard } from "@tcg/lorcana-types";

export const trampEnterprisingDog: CharacterCard = {
  id: "XWF",
  canonicalId: "ci_DSV",
  reprints: ["set7-110"],
  cardType: "character",
  name: "Tramp",
  version: "Enterprising Dog",
  i18n: {
    en: {
      name: "Tramp",
      version: "Enterprising Dog",
      text: [
        {
          title: "HEY, PIDGE",
          description:
            "If you have a character named Lady in play, you pay 1 {I} less to play this character.",
        },
        {
          title: "NO TIME FOR WISECRACKS",
          description:
            "When you play this character, chosen character of yours gets +1 {S} this turn for each other character you have in play.",
        },
      ],
    },
    de: {
      name: "Strolch",
      version: "Unternehmungslustiger Hund",
      text: [
        {
          title: "HEY, TÄUBCHEN",
          description:
            "Wenn du einen Susi-Charakter im Spiel hast, zahlst du 1 weniger, um diesen Charakter auszuspielen.",
        },
        {
          title: "LASST DIE ALBERNEN SPÄSSCHEN",
          description:
            "Wenn du diesen Charakter ausspielst, wähle einen deiner Charaktere und gib ihm in diesem Zug +1 für jeden deiner anderen Charaktere im Spiel.",
        },
      ],
    },
    fr: {
      name: "Clochard",
      version: "Chien entreprenant",
      text: [
        {
          title: "HÉ, BEAUTÉ",
          description:
            "Jouer ce personnage vous coûte 1 de moins si vous avez un personnage Lady en jeu.",
        },
        {
          title: "ON FERA DE L'HUMOUR UN AUTRE JOUR",
          description:
            "Lorsque vous jouez ce personnage, choisissez un de vos personnages qui gagne +1 ce tour-ci pour chaque autre personnage que vous avez en jeu.",
        },
      ],
    },
    it: {
      name: "Biagio",
      version: "Cane Intraprendente",
      text: [
        {
          title: "EHI, BIMBA",
          description:
            "Se hai in gioco un personaggio chiamato Lilli, paga 1 in meno per giocare questo personaggio.",
        },
        {
          title: "NON È IL MOMENTO DI FARE DELLO SPIRITO",
          description:
            "Quando giochi questo personaggio, un tuo personaggio a tua scelta riceve +1 per ogni altro personaggio che hai in gioco per questo turno.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Lady and the Tramp",
  set: "007",
  cardNumber: 110,
  rarity: "rare",
  cost: 2,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_07d1ea2923ad44b9b2dddf78993e103b",
    tcgPlayer: 619740,
  },
  text: [
    {
      title: "HEY, PIDGE",
      description:
        "If you have a character named Lady in play, you pay 1 {I} less to play this character.",
    },
    {
      title: "NO TIME FOR WISECRACKS",
      description:
        "When you play this character, chosen character of yours gets +1 {S} this turn for each other character you have in play.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        condition: {
          type: "target-query",
          query: {
            selector: "all",
            owner: "you",
            zones: ["play"],
            cardType: "character",
            filters: [
              {
                type: "name",
                equals: "Lady",
              },
            ],
          },
          comparison: {
            operator: "gte",
            value: 1,
          },
        },
        then: {
          from: "hand",
          type: "play-card",
        },
        type: "conditional",
      },
      id: "dfs-1",
      text: "HEY, PIDGE If you have a character named Lady in play, you pay 1 {I} less to play this character.",
      type: "action",
    },
    {
      effect: {
        duration: "this-turn",
        modifier: 1,
        stat: "strength",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "modify-stat",
      },
      id: "dfs-2",
      name: "NO TIME FOR WISECRACKS",
      text: "NO TIME FOR WISECRACKS When you play this character, chosen character of yours gets +1 {S} this turn for each other character you have in play.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
