import type { CharacterCard } from "@tcg/lorcana-types";

export const kronkHeadOfSecurity: CharacterCard = {
  id: "qAr",
  canonicalId: "ci_qAr",
  reprints: ["set5-185"],
  cardType: "character",
  name: "Kronk",
  version: "Head of Security",
  i18n: {
    en: {
      name: "Kronk",
      version: "Head of Security",
      text: [
        {
          title: "Shift 5",
        },
        {
          title: "ARE YOU ON THE LIST?",
          description:
            "During your turn, whenever this character banishes another character in a challenge, you may play a character with cost 5 or less for free.",
        },
      ],
    },
    de: {
      name: "Kronk",
      version: "Sicherheitschef",
      text: "Gestaltwandel 5 STEHST DU AUF DER LISTE? Jedes Mal, wenn dieser Charakter in deinem Zug durch eine Herausforderung einen anderen Charakter verbannt, darfst du einen Charakter, der 5 oder weniger kostet, kostenlos ausspielen.",
    },
    fr: {
      name: "Kronk",
      version: "Chef de la sécurité",
      text: "Alter 5 ÊTES-VOUS SUR LA LISTE? Durant votre tour, chaque fois que ce personnage bannit un autre personnage via un défi, vous pouvez jouer gratuitement un personnage de votre main avec un coût de 5 ou moins.",
    },
    it: {
      name: "Kronk",
      version: "Capo della Sicurezza",
      text: "Trasformazione 5 SEI IN LISTA? Durante il tuo turno, ogni volta che questo personaggio esilia un altro personaggio in una sfida, puoi giocare un personaggio con costo 5 o inferiore gratis.",
    },
  },
  inkType: ["steel"],
  franchise: "Emperors New Groove",
  set: "005",
  cardNumber: 185,
  rarity: "common",
  cost: 7,
  strength: 6,
  willpower: 6,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_a1439f505f594dcfb80bb8aa6d495e20",
    tcgPlayer: 555273,
  },
  text: [
    {
      title: "Shift 5",
    },
    {
      title: "ARE YOU ON THE LIST?",
      description:
        "During your turn, whenever this character banishes another character in a challenge, you may play a character with cost 5 or less for free.",
    },
  ],
  classifications: ["Floodborn", "Ally", "Captain"],
  abilities: [
    {
      cost: {
        ink: 5,
      },
      id: "156-1",
      keyword: "Shift",
      text: "Shift 5",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          cost: "free",
          costRestriction: {
            comparison: "less-or-equal",
            value: 5,
          },
          from: "hand",
          type: "play-card",
        },
        type: "optional",
      },
      id: "156-2",
      name: "ARE YOU ON THE LIST?",
      text: "ARE YOU ON THE LIST? During your turn, whenever this character banishes another character in a challenge, you may play a character with cost 5 or less for free.",
      trigger: {
        event: "banish",
        on: "OPPONENT_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
