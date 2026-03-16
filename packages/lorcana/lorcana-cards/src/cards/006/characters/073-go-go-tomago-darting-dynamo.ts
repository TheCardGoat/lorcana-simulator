import type { CharacterCard } from "@tcg/lorcana-types";

export const goGoTomagoDartingDynamo: CharacterCard = {
  id: "4JN",
  canonicalId: "ci_4JN",
  reprints: ["set6-073"],
  cardType: "character",
  name: "Go Go Tomago",
  version: "Darting Dynamo",
  i18n: {
    en: {
      name: "Go Go Tomago",
      version: "Darting Dynamo",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "STOP WHINING, WOMAN UP",
          description:
            "When you play this character, you may pay 2 {I} to gain lore equal to the damage on chosen opposing character.",
        },
      ],
    },
    de: {
      name: "Go Go Tomago",
      version: "Flitzender Dynamo",
      text: "Wendig HÖR AUF ZU FLENNEN Wenn du diesen Charakter ausspielst, darfst du 2 bezahlen. Wenn du dies tust, wähle einen gegnerischen Charakter und zähle den Schaden auf ihm. Sammle diese Anzahl an Legenden.",
    },
    fr: {
      name: "Go Go Tomago",
      version: "Pile survoltée",
      text: "Insaisissable ARRÊTE DE PLEURNICHER. SOIS UNE FEMME Lorsque vous jouez ce personnage, vous pouvez payer 2 pour choisir un personnage adverse et gagnez autant d'éclats de Lore qu'il y a de dommages sur lui.",
    },
    it: {
      name: "Go Go Tomago",
      version: "Energica e Sfrecciante",
      text: "Sfuggente BASTA FRIGNARE, FAI LA DONNA Quando giochi questo personaggio, puoi pagare 2 per ottenere leggenda pari al danno presente su un personaggio avversario a tua scelta.",
    },
  },
  inkType: ["emerald"],
  franchise: "Big Hero 6",
  set: "006",
  cardNumber: 73,
  rarity: "rare",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_2331f6d883e04464ba99cfff895683e2",
    tcgPlayer: 578177,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "STOP WHINING, WOMAN UP",
      description:
        "When you play this character, you may pay 2 {I} to gain lore equal to the damage on chosen opposing character.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Inventor"],
  abilities: [
    {
      id: "1b9-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "1b9-2",
      text: "STOP WHINING, WOMAN UP When you play this character, you may pay 2 {I} to gain lore equal to the damage on chosen opposing character.",
      type: "action",
    },
  ],
};
