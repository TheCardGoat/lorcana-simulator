import type { CharacterCard } from "@tcg/lorcana-types";

export const princePhillipSwordsmanOfTheRealm: CharacterCard = {
  id: "kzz",
  canonicalId: "ci_kzz",
  reprints: ["set5-083"],
  cardType: "character",
  name: "Prince Phillip",
  version: "Swordsman of the Realm",
  i18n: {
    en: {
      name: "Prince Phillip",
      version: "Swordsman of the Realm",
      text: [
        {
          title: "SLAYER OF DRAGONS",
          description: "When you play this character, banish chosen opposing Dragon character.",
        },
        {
          title: "PRESSING THE ADVANTAGE",
          description:
            "Whenever he challenges a damaged character, ready this character after the challenge.",
        },
      ],
    },
    de: {
      name: "Prinz Phillip",
      version: "Schwertkämpfer des Königreichs",
      text: [
        {
          title: "DRACHENBEZWINGER",
          description:
            "Wenn du diesen Charakter ausspielst, verbanne einen gegnerischen Drachen deiner Wahl.",
        },
        {
          title: "DEN VORTEIL AUSNUTZEN",
          description:
            "Jedes Mal, wenn dieser Charakter einen beschädigten Charakter herausfordert, mache diesen Charakter nach der Herausforderung bereit.",
        },
      ],
    },
    fr: {
      name: "Prince Philippe",
      version: "Épéiste du royaume",
      text: [
        {
          title: "POURFENDEUR DE DRAGONS",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage Dragon adverse et bannissez-le.",
        },
        {
          title: "PROFITER DE L'AVANTAGE",
          description:
            "Chaque fois que ce personnage défie un personnage ayant au moins un dommage sur lui, redressez ce personnage-ci après le défi.",
        },
      ],
    },
    it: {
      name: "Principe Filippo",
      version: "Spadaccino del Regno",
      text: [
        {
          title: "UCCISORE DI DRAGHI",
          description:
            "Quando giochi questo personaggio, esilia un personaggio Drago avversario a tua scelta.",
        },
        {
          title: "SFRUTTARE IL VANTAGGIO",
          description:
            "Ogni volta che sfida un personaggio danneggiato, prepara questo personaggio dopo la sfida.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Sleeping Beauty",
  set: "005",
  cardNumber: 83,
  rarity: "common",
  cost: 7,
  strength: 3,
  willpower: 9,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_ab1aec84c58d45afb0773657b0990323",
    tcgPlayer: 561958,
  },
  text: [
    {
      title: "SLAYER OF DRAGONS",
      description: "When you play this character, banish chosen opposing Dragon character.",
    },
    {
      title: "PRESSING THE ADVANTAGE",
      description:
        "Whenever he challenges a damaged character, ready this character after the challenge.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Prince"],
  abilities: [
    {
      effect: {
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "banish",
      },
      id: "1ov-1",
      name: "SLAYER OF DRAGONS",
      text: "SLAYER OF DRAGONS When you play this character, banish chosen opposing Dragon character.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
    {
      effect: {
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "self",
          zones: ["play"],
        },
        type: "ready",
      },
      id: "1ov-2",
      name: "PRESSING THE ADVANTAGE",
      text: "PRESSING THE ADVANTAGE Whenever he challenges a damaged character, ready this character after the challenge.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
