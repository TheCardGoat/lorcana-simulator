import type { CharacterCard } from "@tcg/lorcana-types";

export const wreckitRalphHamHandsEnchanted: CharacterCard = {
  id: "x21",
  canonicalId: "ci_IDQ",
  reprints: ["set6-190"],
  cardType: "character",
  name: "Wreck-It Ralph",
  version: "Ham Hands",
  i18n: {
    en: {
      name: "Wreck-It Ralph",
      version: "Ham Hands",
      text: [
        {
          title: "I WRECK THINGS",
          description:
            "Whenever this character quests, you may banish chosen item or location to gain 2 lore.",
        },
      ],
    },
    de: {
      name: "Randale Ralph",
      version: "Riesenpranke",
      text: [
        {
          title: "ICH MACH SACHEN KAPUTT",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, darfst du einen Gegenstand oder Ort deiner Wahl verbannen, um 2 Legenden zu sammeln.",
        },
      ],
    },
    fr: {
      name: "Ralph la Casse",
      version: "ce vieux Ralph La Casse",
      text: [
        {
          title: "JE CASSE LES CHOSES",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez choisir un lieu ou un objet et le bannir pour gagner 2 éclats de Lore.",
        },
      ],
    },
    it: {
      name: "Ralph Spaccatutto",
      version: "Spaccone",
      text: [
        {
          title: "SPACCO LE COSE",
          description:
            "Ogni volta che questo personaggio va all'avventura, puoi esiliare un oggetto o un luogo a tua scelta per ottenere 2 leggenda.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Wreck It Ralph",
  set: "006",
  cardNumber: 220,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 6,
  strength: 4,
  willpower: 4,
  lore: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_98e2f67c2ee14092be9f89b31f20db4e",
    tcgPlayer: 590822,
  },
  text: [
    {
      title: "I WRECK THINGS",
      description:
        "Whenever this character quests, you may banish chosen item or location to gain 2 lore.",
    },
  ],
  classifications: ["Dreamborn", "Hero"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 2,
          type: "gain-lore",
        },
        type: "optional",
      },
      id: "1h8-1",
      name: "I WRECK THINGS",
      text: "I WRECK THINGS Whenever this character quests, you may banish chosen item or location to gain 2 lore.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
