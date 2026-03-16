import type { CharacterCard } from "@tcg/lorcana-types";

export const isabelaMadrigalGoldenChild: CharacterCard = {
  id: "Kq0",
  canonicalId: "ci_Kq0",
  reprints: ["set4-045"],
  cardType: "character",
  name: "Isabela Madrigal",
  version: "Golden Child",
  i18n: {
    en: {
      name: "Isabela Madrigal",
      version: "Golden Child",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "LADIES FIRST",
          description:
            "During your turn, if no other character has quested this turn, this character gets +3 {L}.",
        },
        {
          title: "LEAVE IT TO ME",
          description:
            "Whenever this character quests, your other characters can't quest for the rest of this turn.",
        },
      ],
    },
    de: {
      name: "Isabela Madrigal",
      version: "Perfekt, nicht ohne Grund",
      text: "Wendig LADIES FIRST Solange in deinem Zug noch keiner deiner anderen Charaktere erkundet hat, erhält dieser Charakter +3. ÜBERLASST DAS MIR Jedes Mal, wenn dieser Charakter erkundet, können deine anderen Charakere in diesem Zug nicht mehr erkunden.",
    },
    fr: {
      name: "Isabela Madrigal",
      version: "Enfant chérie",
      text: "Insaisissable LES FEMMES D'ABORD Tant qu'aucun autre personnage n'a été envoyé à l'aventure durant ce tour, ce personnage gagne +3. LAISSEZ-MOI FAIRE Chaque fois que ce personnage est envoyé à l'aventure, vos autres personnages ne peuvent pas être envoyés à l'aventure pour le reste de ce tour.",
    },
    it: {
      name: "Isabela Madrigal",
      version: "Il Più Bel Fiore",
      text: "Sfuggente PRIMA LE SIGNORE Durante il tuo turno, se nessun altro personaggio è andato all'avventura in questo turno, questo personaggio riceve +3. LASCIA FARE A ME Ogni volta che questo personaggio va all'avventura, i tuoi altri personaggi non possono andare all'avventura per il resto di questo turno.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Encanto",
  set: "004",
  cardNumber: 45,
  rarity: "rare",
  cost: 5,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_21cddbd22cb445fbb3b810abe4ecbaf6",
    tcgPlayer: 548204,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "LADIES FIRST",
      description:
        "During your turn, if no other character has quested this turn, this character gets +3 {L}.",
    },
    {
      title: "LEAVE IT TO ME",
      description:
        "Whenever this character quests, your other characters can't quest for the rest of this turn.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Madrigal"],
  abilities: [
    {
      id: "qop-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        condition: {
          type: "turn-metric",
          metric: "quested-characters",
          comparison: {
            operator: "eq",
            value: 0,
          },
          playerScope: "you",
          excludeSource: true,
        },
        then: {
          modifier: 3,
          stat: "lore",
          target: "SELF",
          type: "modify-stat",
        },
        type: "conditional",
      },
      id: "qop-2",
      text: "LADIES FIRST During your turn, if no other character has quested this turn, this character gets +3 {L}.",
      type: "action",
    },
    {
      effect: {
        duration: "this-turn",
        restriction: "cant-quest",
        target: "SELF",
        type: "restriction",
      },
      id: "qop-3",
      name: "LEAVE IT TO ME",
      text: "LEAVE IT TO ME Whenever this character quests, your other characters can't quest for the rest of this turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
