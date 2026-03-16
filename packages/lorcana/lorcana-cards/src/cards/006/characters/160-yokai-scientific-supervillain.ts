import type { CharacterCard } from "@tcg/lorcana-types";

export const yokaiScientificSupervillain: CharacterCard = {
  id: "dzp",
  canonicalId: "ci_dzp",
  reprints: ["set6-160"],
  cardType: "character",
  name: "Yokai",
  version: "Scientific Supervillain",
  i18n: {
    en: {
      name: "Yokai",
      version: "Scientific Supervillain",
      text: [
        {
          title: "Shift 6",
        },
        {
          title: "NEUROTRANSMITTER",
          description: "You may play items named Microbots for free.",
        },
        {
          title: "TECHNICAL GAIN",
          description:
            "Whenever this character quests, draw a card for each opposing character with {S}.",
        },
      ],
    },
    de: {
      name: "Yokai",
      version: "Wissenschaftlicher Superschurke",
      text: "Gestaltwandel 6 NEUROTRANSMITTER Du darfst Microbots-Gegenstände kostenlos ausspielen. TECHNISCHER FORTSCHRITT Jedes Mal, wenn dieser Charakter erkundet, ziehe 1 Karte für jeden gegnerischen Charakter mit 0.",
    },
    fr: {
      name: "Yokai",
      version: "Super-méchant scientifique",
      text: "Alter 6 NEUROTRANSMETTEUR Vous pouvez jouer des objets Microrobots gratuitement. PROGRÈS TECHNIQUE Chaque fois que ce personnage est envoyé à l'aventure, piochez une carte pour chaque personnage adverse avec une de 0.",
    },
    it: {
      name: "Yokai",
      version: "Supercattivo Scientifico",
      text: "Trasformazione 6 TRASMETTITORE NEURALE Puoi giocare gratis gli oggetti chiamati Microbot. CONQUISTA TECNICA Ogni volta che questo personaggio va all'avventura, pesca una carta per ogni personaggio avversario con 0.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Big Hero 6",
  set: "006",
  cardNumber: 160,
  rarity: "rare",
  cost: 9,
  strength: 6,
  willpower: 10,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_c2ee125c29104a138b2a26608d6849c1",
    tcgPlayer: 588333,
  },
  text: [
    {
      title: "Shift 6",
    },
    {
      title: "NEUROTRANSMITTER",
      description: "You may play items named Microbots for free.",
    },
    {
      title: "TECHNICAL GAIN",
      description:
        "Whenever this character quests, draw a card for each opposing character with {S}.",
    },
  ],
  classifications: ["Floodborn", "Villain", "Inventor"],
  abilities: [
    {
      cost: {
        ink: 6,
      },
      id: "11l-1",
      keyword: "Shift",
      text: "Shift 6",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          cost: "free",
          from: "hand",
          type: "play-card",
        },
        type: "optional",
      },
      id: "11l-2",
      text: "NEUROTRANSMITTER You may play items named Microbots for free.",
      type: "action",
    },
    {
      effect: {
        amount: {
          type: "filtered-count",
          owner: "opponent",
          zones: ["play"],
          cardType: "character",
          filters: [
            {
              type: "strength-comparison",
              comparison: "equal",
              value: 0,
            },
          ],
        },
        target: "CONTROLLER",
        type: "draw",
      },
      id: "11l-3",
      name: "TECHNICAL GAIN",
      text: "TECHNICAL GAIN Whenever this character quests, draw a card for each opposing character with 0 {S}.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
