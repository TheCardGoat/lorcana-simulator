import type { CharacterCard } from "@tcg/lorcana-types";

export const beastAggressiveLord: CharacterCard = {
  id: "xQ9",
  canonicalId: "ci_xQ9",
  reprints: ["set10-113"],
  cardType: "character",
  name: "Beast",
  version: "Aggressive Lord",
  i18n: {
    en: {
      name: "Beast",
      version: "Aggressive Lord",
      text: [
        {
          title: "Boost 2 {I}",
        },
        {
          title: "THAT'S MINE",
          description:
            "Whenever he challenges another character, if there's a card under this character, each opponent loses 1 lore and you gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Biest",
      version: "Wütender Gebieter",
      text: "Stärken 2 DAS IST MEINS Jedes Mal, wenn dieser Charakter einen anderen Charakter herausfordert, falls dieser Charakter mindestens eine Karte unter sich hat, verlieren alle gegnerischen Mitspielenden je 1 Legende und du sammelst 1 Legende.",
    },
    fr: {
      name: "La Bête",
      version: "Noble agressif",
      text: "Boost 2 C'EST À MOI! Chaque fois qu'il défie un autre personnage, s'il y a une carte sous ce personnage-ci, chaque adversaire perd 1 éclat de Lore et vous gagnez 1 éclat de Lore.",
    },
    it: {
      name: "La Bestia",
      version: "Signore Aggressivo",
      text: [
        {
          title: "Potenziamento 2",
          description:
            "(Una volta durante il tuo turno, puoi pagare 2 per mettere la prima carta del tuo mazzo a faccia in giù sotto a questo personaggio.) È MIA Ogni volta che sfida un altro personaggio, se c'è una carta sotto a questo personaggio, ogni avversario perde 1 leggenda e tu ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Beauty and the Beast",
  set: "010",
  cardNumber: 113,
  rarity: "uncommon",
  cost: 2,
  strength: 3,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_4686c4ed63c846719806ece46f1cc106",
    tcgPlayer: 658324,
  },
  text: [
    {
      title: "Boost 2 {I}",
    },
    {
      title: "THAT'S MINE",
      description:
        "Whenever he challenges another character, if there's a card under this character, each opponent loses 1 lore and you gain 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Prince", "Whisper"],
  abilities: [
    {
      id: "6u1-1",
      keyword: "Boost",
      text: "Boost 2 {I}",
      type: "keyword",
      value: 2,
    },
    {
      effect: {
        condition: {
          expression: "there's a card under this character",
          type: "if",
        },
        then: {
          amount: 1,
          type: "gain-lore",
        },
        type: "conditional",
      },
      id: "6u1-2",
      name: "THAT'S MINE",
      text: "THAT'S MINE Whenever he challenges another character, if there's a card under this character, each opponent loses 1 lore and you gain 1 lore.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
