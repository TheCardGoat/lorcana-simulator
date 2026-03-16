import type { CharacterCard } from "@tcg/lorcana-types";

export const goofyGhostOfJacobMarley: CharacterCard = {
  id: "r4K",
  canonicalId: "ci_r4K",
  reprints: ["set11-083"],
  cardType: "character",
  name: "Goofy",
  version: "Ghost of Jacob Marley",
  i18n: {
    en: {
      name: "Goofy",
      version: "Ghost of Jacob Marley",
      text: [
        {
          title: "Boost 2 {I}",
        },
        {
          title: "GRAVE OUTCOME",
          description:
            "When this character is banished, each opponent chooses and discards a card for each card that was under him.",
        },
      ],
    },
    de: {
      name: "Goofy",
      version: "Geist von Jacob Marley",
      text: "Stärken 2 GRAVIERENDES ENDE Wenn dieser Charakter verbannt wird, wählen alle gegnerischen Mitspielenden für jede Karte, die unter diesem Charakter lag, je 1 Karte aus ihrer Hand und werfen sie ab.",
    },
    fr: {
      name: "Dingo",
      version: "Fantôme de Jacob Marley",
      text: "Boost 2 CONSÉQUENCE SÉPULCRALE Lorsque ce personnage est banni, chaque adversaire défausse une carte pour chaque carte sous ce personnage.",
    },
    it: {
      name: "Pippo",
      version: "Fantasma di Jacob Marley",
      text: [
        {
          title: "Potenziamento 2",
          description:
            "(Una volta durante il tuo turno, puoi pagare 2 per mettere la prima carta del tuo mazzo a faccia in giù sotto a questo personaggio.) CONSEGUENZA FUNEREA Quando questo personaggio viene esiliato, ogni avversario sceglie e scarta una carta per ogni carta che era sotto di esso.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Mickey's Christmas Carol",
  set: "011",
  cardNumber: 83,
  rarity: "common",
  cost: 4,
  strength: 4,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_6a38f391cffc44ce8c818845eec37f01",
    tcgPlayer: 673328,
  },
  text: [
    {
      title: "Boost 2 {I}",
    },
    {
      title: "GRAVE OUTCOME",
      description:
        "When this character is banished, each opponent chooses and discards a card for each card that was under him.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Ghost"],
  abilities: [
    {
      id: "p4g-1",
      keyword: "Boost",
      type: "keyword",
      value: 2,
      text: "Boost 2 {I}",
    },
    {
      id: "p4g-2",
      effect: {
        amount: 1,
        chosen: true,
        target: "EACH_OPPONENT",
        type: "discard",
      },
      name: "GRAVE OUTCOME",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "GRAVE OUTCOME When this character is banished, each opponent chooses and discards a card for each card that was under him.",
    },
  ],
};
