import type { CharacterCard } from "@tcg/lorcana-types";

export const minnieMouseCompassionateFriend: CharacterCard = {
  id: "pv2",
  canonicalId: "ci_pv2",
  reprints: ["set5-024"],
  cardType: "character",
  name: "Minnie Mouse",
  version: "Compassionate Friend",
  i18n: {
    en: {
      name: "Minnie Mouse",
      version: "Compassionate Friend",
      text: [
        {
          title: "PATCH THEM UP",
          description:
            "Whenever this character quests, you may remove up to 2 damage from chosen character.",
        },
      ],
    },
    de: {
      name: "Minnie Maus",
      version: "Mitfühlende Freundin",
      text: [
        {
          title: "FLICKT SIE WIEDER ZUSAMMEN",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, darfst du bis zu 2 Schaden von einem Charakter deiner Wahl entfernen.",
        },
      ],
    },
    fr: {
      name: "Minnie",
      version: "Amie compatissante",
      text: [
        {
          title: "UN PETIT REMÈDE!",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez choisir un personnage et lui retirer jusqu'à 2 dommages.",
        },
      ],
    },
    it: {
      name: "Minni",
      version: "Amica Caritatevole",
      text: [
        {
          title: "RATTOPPARLI",
          description:
            "Ogni volta che questo personaggio va all'avventura, puoi rimuovere fino a 2 danni da un personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["amber"],
  set: "005",
  cardNumber: 24,
  rarity: "common",
  cost: 4,
  strength: 1,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_edb33beb5360472080df4b6d2a6878a2",
    tcgPlayer: 561949,
  },
  text: [
    {
      title: "PATCH THEM UP",
      description:
        "Whenever this character quests, you may remove up to 2 damage from chosen character.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
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
      id: "g8h-1",
      name: "PATCH THEM UP",
      text: "PATCH THEM UP Whenever this character quests, you may remove up to 2 damage from chosen character.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
