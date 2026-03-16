import type { CharacterCard } from "@tcg/lorcana-types";

export const madameMedusaDiamondLover: CharacterCard = {
  id: "75X",
  canonicalId: "ci_75X",
  reprints: ["set7-053"],
  cardType: "character",
  name: "Madame Medusa",
  version: "Diamond Lover",
  i18n: {
    en: {
      name: "Madame Medusa",
      version: "Diamond Lover",
      text: [
        {
          title: "SEARCH THE SWAMP",
          description:
            "Whenever this character quests, you may deal 2 damage to another chosen character of yours to put the top 3 cards of chosen player's deck into their discard.",
        },
      ],
    },
    de: {
      name: "Madam Medusa",
      version: "Diamantenliebhaberin",
      text: [
        {
          title: "SUCHE IM SUMPF",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, darfst du einen deiner Charaktere wählen und ihm 2 Schaden zufügen, um eine mitspielende Person zu wählen. Diese legt die obersten 3 Karten ihres Decks auf ihren Ablagestapel.",
        },
      ],
    },
    fr: {
      name: "Madame Médusa",
      version: "Amoureuse des diamants",
      text: [
        {
          title: "RECHERCHE DANS LE MARÉCAGE",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez choisir un autre de vos personnages et lui infliger 2 dommages. Si vous le faites, choisissez un joueur, il place les 3 premières cartes de sa pioche dans sa défausse.",
        },
      ],
    },
    it: {
      name: "Madame Medusa",
      version: "Amante dei Diamanti",
      text: [
        {
          title: "SETACCIARE LA PALUDE",
          description:
            "Ogni volta che questo personaggio va all'avventura, puoi infliggere 2 danni a un tuo altro personaggio a tua scelta per mettere le prime 3 carte del mazzo di un giocatore a tua scelta nei suoi scarti.",
        },
      ],
    },
  },
  inkType: ["amethyst", "ruby"],
  franchise: "Rescuers",
  set: "007",
  cardNumber: 53,
  rarity: "uncommon",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_2f6408a754bf40a7a71655da8edc5223",
    tcgPlayer: 618696,
  },
  text: [
    {
      title: "SEARCH THE SWAMP",
      description:
        "Whenever this character quests, you may deal 2 damage to another chosen character of yours to put the top 3 cards of chosen player's deck into their discard.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
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
          type: "deal-damage",
        },
        type: "optional",
      },
      id: "13m-1",
      name: "SEARCH THE SWAMP",
      text: "SEARCH THE SWAMP Whenever this character quests, you may deal 2 damage to another chosen character of yours to put the top 3 cards of chosen player's deck into their discard.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
