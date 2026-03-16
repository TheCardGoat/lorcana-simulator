import type { CharacterCard } from "@tcg/lorcana-types";

export const sheriffOfNottinghamCorruptOfficial: CharacterCard = {
  id: "0k3",
  canonicalId: "ci_0k3",
  reprints: ["set3-191"],
  cardType: "character",
  name: "Sheriff of Nottingham",
  version: "Corrupt Official",
  i18n: {
    en: {
      name: "Sheriff of Nottingham",
      version: "Corrupt Official",
      text: [
        {
          title: "TAXES SHOULD HURT",
          description:
            "Whenever you discard a card, you may deal 1 damage to chosen opposing character.",
        },
      ],
    },
    de: {
      name: "Sheriff von Nottingham",
      version: "Korrupter Beamter",
      text: [
        {
          title: "STEUERN MÜSSEN WEH TUN",
          description:
            "Jedes Mal, wenn du eine Karte abwirfst, darfst du einem gegnerischen Charakter deiner Wahl 1 Schaden zufügen.",
        },
      ],
    },
    fr: {
      name: "Shérif de Nottingham",
      version: "Officiellement corrompu",
      text: [
        {
          title: "LES TAXES C'EST DOULOUREUX",
          description:
            "Chaque fois que vous défaussez une carte, vous pouvez choisir un personnage adverse et lui infliger 1 dommage.",
        },
      ],
    },
    it: {
      name: "Sceriffo di Nottingham",
      version: "Funzionario Corrotto",
      text: [
        {
          title: "È GIUSTO CHE SIA COSÌ",
          description:
            "Ogni volta che scarti una carta, puoi infliggere 1 danno a un personaggio avversario a tua scelta.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Robin Hood",
  set: "003",
  cardNumber: 191,
  rarity: "common",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_989b5642c80e4a999f54f75e02a2fb13",
    tcgPlayer: 537942,
  },
  text: [
    {
      title: "TAXES SHOULD HURT",
      description:
        "Whenever you discard a card, you may deal 1 damage to chosen opposing character.",
    },
  ],
  classifications: ["Dreamborn", "Villain"],
  missingTests: true,
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: {
            selector: "chosen",
            count: 1,
            owner: "opponent",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "deal-damage",
        },
        type: "optional",
      },
      id: "1mi-1",
      name: "TAXES SHOULD HURT",
      text: "TAXES SHOULD HURT Whenever you discard a card, you may deal 1 damage to chosen opposing character.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
