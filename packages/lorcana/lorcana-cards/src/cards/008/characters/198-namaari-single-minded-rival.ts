import type { CharacterCard } from "@tcg/lorcana-types";

export const namaariSinglemindedRival: CharacterCard = {
  id: "Gsh",
  canonicalId: "ci_Gsh",
  reprints: ["set8-198"],
  cardType: "character",
  name: "Namaari",
  version: "Single-Minded Rival",
  i18n: {
    en: {
      name: "Namaari",
      version: "Single-Minded Rival",
      text: [
        {
          title: "STRATEGIC EDGE",
          description:
            "When you play this character and at the start of your turn, you may draw a card, then choose and discard a card.",
        },
        {
          title: "EXTREME FOCUS",
          description: "This character gets +1 {S} for each card in your discard.",
        },
      ],
    },
    de: {
      name: "Namaari",
      version: "Zielstrebige Rivalin",
      text: [
        {
          title: "STRATEGISCHER VORTEIL",
          description:
            "Wenn du diesen Charakter ausspielst, und zu Beginn deines Zuges, darfst du 1 Karte ziehen. Wähle danach 1 Karte aus deiner Hand und wirf sie ab.",
        },
        {
          title: "EXTREMER FOKUS",
          description: "Dieser Charakter erhält +1 für jede Karte in deinem Ablagestapel.",
        },
      ],
    },
    fr: {
      name: "Namaari",
      version: "Rivale obstinée",
      text: [
        {
          title: "AVANTAGE STRATÉGIQUE",
          description:
            "Lorsque vous jouez ce personnage et au début de votre tour, vous pouvez piocher une carte puis défausser une carte.",
        },
        {
          title: "CONCENTRATION EXTRÊME",
          description: "Ce personnage a +1 pour chaque carte dans votre défausse.",
        },
      ],
    },
    it: {
      name: "Namaari",
      version: "Rivale Ostinata",
      text: [
        {
          title: "SUPERIORITÀ STRATEGICA",
          description:
            "Quando giochi questo personaggio e all'inizio del tuo turno, puoi pescare una carta, poi scegli e scarta una carta.",
        },
        {
          title: "CONCENTRAZIONE ESTREMA",
          description: "Questo personaggio riceve +1 per ogni carta nei tuoi scarti.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Raya and the Last Dragon",
  set: "008",
  cardNumber: 198,
  rarity: "legendary",
  cost: 5,
  strength: 0,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_444715c10be04c9f875a24424adb9fb4",
    tcgPlayer: 631849,
  },
  text: [
    {
      title: "STRATEGIC EDGE",
      description:
        "When you play this character and at the start of your turn, you may draw a card, then choose and discard a card.",
    },
    {
      title: "EXTREME FOCUS",
      description: "This character gets +1 {S} for each card in your discard.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Princess"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          chosen: true,
          target: "CONTROLLER",
          type: "discard",
        },
        type: "optional",
      },
      id: "xx2-1",
      name: "STRATEGIC EDGE",
      text: "STRATEGIC EDGE When you play this character and at the start of your turn, you may draw a card, then choose and discard a card.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
    {
      effect: {
        modifier: 1,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "xx2-2",
      text: "EXTREME FOCUS This character gets +1 {S} for each card in your discard.",
      type: "static",
    },
  ],
};
