import type { CharacterCard } from "@tcg/lorcana-types";

export const monsieurDarqueDespicableProprietor: CharacterCard = {
  id: "TnS",
  canonicalId: "ci_TnS",
  reprints: ["set7-157"],
  cardType: "character",
  name: "Monsieur D'Arque",
  version: "Despicable Proprietor",
  i18n: {
    en: {
      name: "Monsieur D'Arque",
      version: "Despicable Proprietor",
      text: [
        {
          title: "I'VE COME TO COLLECT",
          description:
            "Whenever this character quests, you may banish chosen item of yours to draw a card.",
        },
      ],
    },
    de: {
      name: "Monsieur D'Arque",
      version: "Verachtenswerter Inhaber",
      text: [
        {
          title: "ICH KOMME ZUR ABHOLUNG",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, darfst du einen deiner Gegenstände wählen und verbannen, um 1 Karte zu ziehen.",
        },
      ],
    },
    fr: {
      name: "Monsieur D'Arque",
      version: "Propriétaire méprisable",
      text: [
        {
          title: "JE VIENS RÉCUPÉRER MON DÛ",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez choisir l'un de vos objets et le bannir pour piocher une carte.",
        },
      ],
    },
    it: {
      name: "Monsieur D'Arque",
      version: "Proprietario Spregevole",
      text: [
        {
          title: "SONO VENUTO A PORTAR VIA",
          description:
            "Ogni volta che questo personaggio va all'avventura, puoi esiliare un tuo oggetto a tua scelta per pescare una carta.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Beauty and the Beast",
  set: "007",
  cardNumber: 157,
  rarity: "common",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_986ba61b527b4e5f822c0c8e2d675b7d",
    tcgPlayer: 619495,
  },
  text: [
    {
      title: "I'VE COME TO COLLECT",
      description:
        "Whenever this character quests, you may banish chosen item of yours to draw a card.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["item"],
          },
          type: "banish",
        },
        type: "optional",
      },
      id: "116-1",
      name: "I'VE COME TO COLLECT",
      text: "I'VE COME TO COLLECT Whenever this character quests, you may banish chosen item of yours to draw a card.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
