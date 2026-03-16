import type { CharacterCard } from "@tcg/lorcana-types";

export const iagoFakeFlamingo: CharacterCard = {
  id: "Lbm",
  canonicalId: "ci_Lbm",
  reprints: ["set5-079"],
  cardType: "character",
  name: "Iago",
  version: "Fake Flamingo",
  i18n: {
    en: {
      name: "Iago",
      version: "Fake Flamingo",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "IN DISGUISE",
          description:
            "Whenever this character quests, you pay 2 {I} less for the next action you play this turn.",
        },
      ],
    },
    de: {
      name: "Jago",
      version: "Falscher Flamingo",
      text: "Wendig GETARNT Jedes Mal, wenn dieser Charakter erkundet, zahlst du 2 weniger für die nächste Aktion, die du in diesem Zug ausspielst.",
    },
    fr: {
      name: "Iago",
      version: "Faux flamant rose",
      text: "Insaisissable DÉGUISÉ Chaque fois que ce personnage est envoyé à l'aventure, la prochaine action que vous jouez ce tour-ci vous coûte 2 de moins.",
    },
    it: {
      name: "Iago",
      version: "Finto Fenicottero",
      text: "Sfuggente IN INCOGNITO Ogni volta che questo personaggio va all'avventura, paga 2 in meno per giocare la tua prossima azione per questo turno.",
    },
  },
  inkType: ["emerald"],
  franchise: "Aladdin",
  set: "005",
  cardNumber: 79,
  rarity: "rare",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_a7aa78d2d3044e7ea94529cb078fced2",
    tcgPlayer: 559625,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "IN DISGUISE",
      description:
        "Whenever this character quests, you pay 2 {I} less for the next action you play this turn.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1y2-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "1y2-2",
      name: "IN DISGUISE",
      text: "IN DISGUISE Whenever this character quests, you pay 2 {I} less for the next action you play this turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
