import type { CharacterCard } from "@tcg/lorcana-types";

export const olafSnowmanOfAction: CharacterCard = {
  id: "G4S",
  canonicalId: "ci_G4S",
  reprints: ["set11-122"],
  cardType: "character",
  name: "Olaf",
  version: "Snowman of Action",
  i18n: {
    en: {
      name: "Olaf",
      version: "Snowman of Action",
      text: [
        {
          title: "ABOUT TIME!",
          description:
            "For each action card in your discard, you pay 1 {I} less to play this character.",
        },
        {
          title: "CHAOTIC COLLISION",
          description: "When you play this character, each opponent loses 2 lore.",
        },
      ],
    },
    de: {
      name: "Olaf",
      version: "Schneemann der Tat",
      text: [
        {
          title: "ES WIRD ZEIT!",
          description:
            "Für jede Aktionskarte in deinem Ablagestapel zahlst du 1 weniger, um diesen Charakter auszuspielen.",
        },
        {
          title: "CHAOTISCHE KOLLISION",
          description:
            "Wenn du diesen Charakter ausspielst, verlieren alle gegnerischen Mitspielenden je 2 Legenden.",
        },
      ],
    },
    fr: {
      name: "Olaf",
      version: "Bonhomme d'action",
      text: [
        {
          title: "IL ÉTAIT TEMPS!",
          description:
            "Jouer ce personnage vous coûte 1 de moins pour chaque carte Action dans votre défausse.",
        },
        {
          title: "COLLISION CHAOTIQUE",
          description: "Lorsque vous jouez ce personnage, chaque adversaire perd 2 éclats de Lore.",
        },
      ],
    },
    it: {
      name: "Olaf",
      version: "Pupazzo di Neve in Azione",
      text: [
        {
          title: "ERA ORA!",
          description:
            "Per ogni carta azione nei tuoi scarti, paga 1 in meno per giocare questo personaggio.",
        },
        {
          title: "COLLISIONE CAOTICA",
          description: "Quando giochi questo personaggio, ogni avversario perde 2 leggenda.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Frozen",
  set: "011",
  cardNumber: 122,
  rarity: "rare",
  cost: 9,
  strength: 4,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_22e26220f81745b394485c0cb6ef2c2d",
    tcgPlayer: 676213,
  },
  text: [
    {
      title: "ABOUT TIME!",
      description:
        "For each action card in your discard, you pay 1 {I} less to play this character.",
    },
    {
      title: "CHAOTIC COLLISION",
      description: "When you play this character, each opponent loses 2 lore.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "g8u-1",
      effect: {
        from: "hand",
        type: "play-card",
      },
      type: "action",
      text: "ABOUT TIME! For each action card in your discard, you pay 1 {I} less to play this character.",
    },
    {
      id: "g8u-2",
      effect: {
        amount: 2,
        target: "EACH_OPPONENT",
        type: "lose-lore",
      },
      name: "CHAOTIC COLLISION",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "CHAOTIC COLLISION When you play this character, each opponent loses 2 lore.",
    },
  ],
};
