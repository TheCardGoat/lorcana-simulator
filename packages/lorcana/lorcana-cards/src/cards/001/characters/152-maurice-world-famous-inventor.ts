import type { CharacterCard } from "@tcg/lorcana-types";

export const mauriceWorldfamousInventor: CharacterCard = {
  id: "Yw4",
  canonicalId: "ci_Yw4",
  reprints: ["set1-152"],
  cardType: "character",
  name: "Maurice",
  version: "World-Famous Inventor",
  i18n: {
    en: {
      name: "Maurice",
      version: "World-Famous Inventor",
      text: [
        {
          title: "GIVE IT A TRY",
          description:
            "Whenever this character quests, you pay 2 {I} less for the next item you play this turn.",
        },
        {
          title: "IT WORKS!",
          description: "Whenever you play an item, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Maurice",
      version: "Weltberühmter Erfinder",
      text: [
        {
          title: "VERSUCH'S DOCH MAL",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, zahlst du 2 weniger für den nächsten Gegenstand, den du in diesem Zug ausspielst.ES FUNKTIONIERT! Jedes Mal, wenn du einen Gegenstand ausspielst, darfst du 1 Karte ziehen.",
        },
      ],
    },
    fr: {
      name: "MAURICE",
      version: "Le plus célèbre des inventeurs",
      text: [
        {
          title: "VOYONS VOIR SI ÇA MARCHE",
          description:
            "Lorsque ce personnage est envoyé à l'aventure, le prochain objet que vous jouez durant ce tour coûte 2 de moins.",
        },
        {
          title: "ÇA MARCHE!",
          description: "Lorsque vous jouez un objet, vous pouvez piocher une carte.",
        },
      ],
    },
    it: {
      name: "Maurice",
      version: "World-Famous Inventor",
      text: [
        {
          title: "GIVE IT A TRY",
          description:
            "Whenever this character quests, you pay 2 less for the next item you play this turn.",
        },
        {
          title: "IT WORKS!",
          description: "Whenever you play an item, you may draw a card.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Beauty and the Beast",
  set: "001",
  cardNumber: 152,
  rarity: "rare",
  cost: 6,
  strength: 2,
  willpower: 7,
  lore: 2,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_de24a04b1d83417594730a5036cfc2a4",
    tcgPlayer: 492126,
  },
  text: [
    {
      title: "GIVE IT A TRY",
      description:
        "Whenever this character quests, you pay 2 {I} less for the next item you play this turn.",
    },
    {
      title: "IT WORKS!",
      description: "Whenever you play an item, you may draw a card.",
    },
  ],
  classifications: ["Dreamborn", "Mentor", "Inventor"],
  abilities: [
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "x5f-1",
      name: "GIVE IT A TRY",
      text: "GIVE IT A TRY Whenever this character quests, you pay 2 {I} less for the next item you play this turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      id: "x5f-2",
      name: "IT WORKS!",
      text: "IT WORKS! Whenever you play an item, you may draw a card.",
      trigger: {
        event: "play",
        on: {
          cardType: "item",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
