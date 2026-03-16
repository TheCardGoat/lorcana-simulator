import type { CharacterCard } from "@tcg/lorcana-types";

export const baymaxGiantRobot: CharacterCard = {
  id: "PVC",
  canonicalId: "ci_PVC",
  reprints: ["set7-104"],
  cardType: "character",
  name: "Baymax",
  version: "Giant Robot",
  i18n: {
    en: {
      name: "Baymax",
      version: "Giant Robot",
      text: [
        {
          title: "Universal Shift 4",
          description: "(You may pay 4 {I} to play this on top of any one of your characters.)",
        },
        {
          title: "FUNCTIONALITY IMPROVED",
          description:
            "When you play this character, if you used Shift to play him, remove all damage from him.",
        },
      ],
    },
    de: {
      name: "Baymax",
      version: "Riesiger Roboter",
      text: [
        {
          title: "Universal-Gestaltwandel 4",
          description:
            "(Du kannst 4 zahlen, um diesen Charakter auf irgendeinen deiner Charaktere auszuspielen.) FUNKTIONALITÄT VERBESSERT Wenn du diesen Charakter mithilfe von Gestaltwandel ausspielst, entferne jeglichen Schaden von ihm.",
        },
      ],
    },
    fr: {
      name: "Baymax",
      version: "Robot géant",
      text: "Alter universel 4 (Vous pouvez payer 4 pour jouer ce personnage sur n'importe lequel de vos personnages.) FONCTIONNALITÉ AMÉLIORÉE Si vous jouez ce personnage en utilisant sa capacité Alter, retirez tous les dommages présents sur lui.",
    },
    it: {
      name: "Baymax",
      version: "Robot Gigante",
      text: [
        {
          title: "Trasformazione Universale 4",
          description:
            "(Puoi pagare 4 per giocare questa carta sopra a uno qualsiasi dei tuoi personaggi.) FUNZIONALITÀ POTENZIATA Quando giochi questo personaggio, se hai usato Trasformazione per giocarlo, rimuovi tutti i danni da esso.",
        },
      ],
    },
  },
  inkType: ["emerald", "sapphire"],
  franchise: "Big Hero 6",
  set: "007",
  cardNumber: 104,
  rarity: "uncommon",
  cost: 6,
  strength: 5,
  willpower: 5,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_98c983fba498470ba2ff0518902e8cc5",
    tcgPlayer: 619462,
  },
  text: [
    {
      title: "Universal Shift 4",
      description: "(You may pay 4 {I} to play this on top of any one of your characters.)",
    },
    {
      title: "FUNCTIONALITY IMPROVED",
      description:
        "When you play this character, if you used Shift to play him, remove all damage from him.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Robot"],
  abilities: [
    {
      cost: {
        ink: 4,
      },
      id: "1c2-1",
      keyword: "Shift",
      text: "Universal Shift 4",
      type: "keyword",
    },
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "1c2-2",
      name: "FUNCTIONALITY IMPROVED",
      text: "FUNCTIONALITY IMPROVED When you play this character, if you used Shift to play him, remove all damage from him.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
