import type { CharacterCard } from "@tcg/lorcana-types";

export const geneNicelandResident: CharacterCard = {
  id: "DbU",
  canonicalId: "ci_DbU",
  reprints: ["set8-013"],
  cardType: "character",
  name: "Gene",
  version: "Niceland Resident",
  i18n: {
    en: {
      name: "Gene",
      version: "Niceland Resident",
      text: [
        {
          title: "I GUESS YOU EARNED THIS",
          description:
            "Whenever this character quests, you may remove up to 2 damage from chosen character.",
        },
      ],
    },
    de: {
      name: "Gene",
      version: "Bewohner von Niceland",
      text: [
        {
          title: "ICH SCHÄTZE, DU HAST SIE DIR VERDIENT",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, darfst du bis zu 2 Schaden von einem Charakter deiner Wahl entfernen.",
        },
      ],
    },
    fr: {
      name: "Gene",
      version: "Résident de Niceland",
      text: [
        {
          title: "J'IMAGINE QUE TU L'AS MÉRITÉE",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez choisir un personnage et lui retirer jusqu'à 2 dommages.",
        },
      ],
    },
    it: {
      name: "Gene",
      version: "Abitante di Belposto",
      text: [
        {
          title: "IMMAGINO TU L'ABBIA GUADAGNATA",
          description:
            "Ogni volta che questo personaggio va all'avventura, puoi rimuovere fino a 2 danni da un personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Wreck It Ralph",
  set: "008",
  cardNumber: 13,
  rarity: "common",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_c4cc9368ba4d4f488b35ac8f8b0b07a1",
    tcgPlayer: 631357,
  },
  text: [
    {
      title: "I GUESS YOU EARNED THIS",
      description:
        "Whenever this character quests, you may remove up to 2 damage from chosen character.",
    },
  ],
  classifications: ["Storyborn"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 2,
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "remove-damage",
          upTo: true,
        },
        type: "optional",
      },
      id: "mcz-1",
      name: "I GUESS YOU EARNED THIS",
      text: "I GUESS YOU EARNED THIS Whenever this character quests, you may remove up to 2 damage from chosen character.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
