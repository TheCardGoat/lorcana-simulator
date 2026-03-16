import type { CharacterCard } from "@tcg/lorcana-types";

export const captainHookUnderhanded: CharacterCard = {
  id: "2U6",
  canonicalId: "ci_2U6",
  reprints: ["set6-071"],
  cardType: "character",
  name: "Captain Hook",
  version: "Underhanded",
  i18n: {
    en: {
      name: "Captain Hook",
      version: "Underhanded",
      text: [
        {
          title: "INSPIRES DREAD",
          description: "While this character is exerted, opposing Pirate characters can't quest.",
        },
        {
          title: "UPPER HAND",
          description: "Whenever this character is challenged, draw a card.",
        },
      ],
    },
    de: {
      name: "Käpt'n Hook",
      version: "Heimtückisch",
      text: [
        {
          title: "ANGSTEINFLÖSSEND",
          description:
            "Solange dieser Charakter erschöpft ist, können gegnerische Piraten nicht erkunden.",
        },
        {
          title: "OBERHAND",
          description: "Jedes Mal, wenn dieser Charakter herausgefordert wird, ziehe 1 Karte.",
        },
      ],
    },
    fr: {
      name: "Capitaine Crochet",
      version: "En sous-main",
      text: [
        {
          title: "INSPIRER LA CRAINTE",
          description:
            "Tant que ce personnage est épuisé, les personnages Pirate adverses ne peuvent pas être envoyés à l'aventure.",
        },
        {
          title: "MAINMISE",
          description: "Chaque fois que ce personnage est défié, piochez une carte.",
        },
      ],
    },
    it: {
      name: "Capitan Uncino",
      version: "Subdolo",
      text: [
        {
          title: "SUSCITARE TERRORE",
          description:
            "Mentre questo personaggio è impegnato, i personaggi Pirata avversari non possono andare all'avventura.",
        },
        {
          title: "VANTAGGIO",
          description: "Ogni volta che questo personaggio viene sfidato, pesca una carta.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Peter Pan",
  set: "006",
  cardNumber: 71,
  rarity: "rare",
  cost: 3,
  strength: 1,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_44fceab89d3a4b40bd343c2c84a5cca3",
    tcgPlayer: 583852,
  },
  text: [
    {
      title: "INSPIRES DREAD",
      description: "While this character is exerted, opposing Pirate characters can't quest.",
    },
    {
      title: "UPPER HAND",
      description: "Whenever this character is challenged, draw a card.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Pirate", "Captain"],
  abilities: [
    {
      effect: {
        restriction: "cant-quest",
        target: "SELF",
        type: "restriction",
      },
      id: "i7x-1",
      text: "INSPIRES DREAD While this character is exerted, opposing Pirate characters can't quest.",
      type: "static",
    },
    {
      effect: {
        amount: 1,
        target: "CONTROLLER",
        type: "draw",
      },
      id: "i7x-2",
      name: "UPPER HAND",
      text: "UPPER HAND Whenever this character is challenged, draw a card.",
      trigger: {
        event: "challenged",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
