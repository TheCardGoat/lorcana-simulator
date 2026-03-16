import type { CharacterCard } from "@tcg/lorcana-types";

export const geppettoSkilledCraftsman: CharacterCard = {
  id: "4JO",
  canonicalId: "ci_4JO",
  reprints: ["set8-174"],
  cardType: "character",
  name: "Geppetto",
  version: "Skilled Craftsman",
  i18n: {
    en: {
      name: "Geppetto",
      version: "Skilled Craftsman",
      text: [
        {
          title: "SEEKING INSPIRATION",
          description:
            "Whenever this character quests, you may choose and discard any number of item cards to gain 1 lore for each item card discarded this way.",
        },
      ],
    },
    de: {
      name: "Geppetto",
      version: "Geschickter Handwerker",
      text: [
        {
          title: "DIE SUCHE NACH INSPIRATION",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, darfst du beliebig viele Gegenstandskarten von deiner Hand auswählen und abwerfen, um für jede so abgeworfene Karte 1 Legende zu sammeln.",
        },
      ],
    },
    fr: {
      name: "Geppetto",
      version: "Artisan chevronné",
      text: [
        {
          title: "À LA RECHERCHE D'INSPIRATION",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez défausser autant de cartes Objet que vous le souhaitez. Gagnez 1 éclat de Lore pour chaque carte Objet défaussée de cette façon.",
        },
      ],
    },
    it: {
      name: "Geppetto",
      version: "Abile Artigiano",
      text: [
        {
          title: "IN CERCA DI ISPIRAZIONE",
          description:
            "Ogni volta che questo personaggio va all'avventura, puoi scegliere e scartare un qualsiasi numero di carte oggetto per ottenere 1 leggenda per ogni carta oggetto scartata in questo modo.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Pinocchio",
  set: "008",
  cardNumber: 174,
  rarity: "rare",
  cost: 5,
  strength: 4,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_f19b9d58f8d44e60b66d72d64c16ab09",
    tcgPlayer: 633102,
  },
  text: [
    {
      title: "SEEKING INSPIRATION",
      description:
        "Whenever this character quests, you may choose and discard any number of item cards to gain 1 lore for each item card discarded this way.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Inventor"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          type: "gain-lore",
        },
        type: "optional",
      },
      id: "1ae-1",
      name: "SEEKING INSPIRATION",
      text: "SEEKING INSPIRATION Whenever this character quests, you may choose and discard any number of item cards to gain 1 lore for each item card discarded this way.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
