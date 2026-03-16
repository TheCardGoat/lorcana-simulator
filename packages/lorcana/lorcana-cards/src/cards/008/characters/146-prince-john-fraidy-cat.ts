import type { CharacterCard } from "@tcg/lorcana-types";

export const princeJohnFraidycat: CharacterCard = {
  id: "460",
  canonicalId: "ci_460",
  reprints: ["set8-146"],
  cardType: "character",
  name: "Prince John",
  version: "Fraidy-Cat",
  i18n: {
    en: {
      name: "Prince John",
      version: "Fraidy-Cat",
      text: [
        {
          title: "HELP!",
        },
        {
          title: "HELP!",
          description: "Whenever an opponent plays a character, deal 1 damage to this character.",
        },
      ],
    },
    de: {
      name: "Prinz John",
      version: "Angstkatze",
      text: [
        {
          title: "HILFE!",
        },
        {
          title: "HILFE!",
          description:
            "Jedes Mal, wenn eine gegnerische Person einen Charakter ausspielt, füge diesem Charakter 1 Schaden zu.",
        },
      ],
    },
    fr: {
      name: "Prince Jean",
      version: "Poule mouillée",
      text: [
        {
          title: "À MOI!",
        },
        {
          title: "À MOI!",
          description:
            "Chaque fois que votre adversaire joue un personnage, infligez 1 dommage à ce personnage-ci.",
        },
      ],
    },
    it: {
      name: "Principe Giovanni",
      version: "Pavido",
      text: [
        {
          title: "AIUTO!",
        },
        {
          title: "AIUTO!",
          description:
            "Ogni volta che un avversario gioca un personaggio, infliggi 1 danno a questo personaggio.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Robin Hood",
  set: "008",
  cardNumber: 146,
  rarity: "rare",
  cost: 3,
  strength: 5,
  willpower: 5,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_e55251bd10c24f90a388f5dc18a2867f",
    tcgPlayer: 631446,
  },
  text: [
    {
      title: "HELP!",
    },
    {
      title: "HELP!",
      description: "Whenever an opponent plays a character, deal 1 damage to this character.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Prince"],
  abilities: [
    {
      effect: {
        amount: 1,
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "self",
          zones: ["play"],
        },
        type: "deal-damage",
      },
      id: "fa9-1",
      name: "HELP! HELP!",
      text: "HELP! HELP! Whenever an opponent plays a character, deal 1 damage to this character.",
      trigger: {
        event: "play",
        on: {
          cardType: "character",
          controller: "opponent",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
