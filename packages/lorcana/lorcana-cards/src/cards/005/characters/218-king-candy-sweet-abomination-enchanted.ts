import type { CharacterCard } from "@tcg/lorcana-types";

export const kingCandySweetAbominationEnchanted: CharacterCard = {
  id: "0cp",
  canonicalId: "ci_KFt",
  reprints: ["set5-154"],
  cardType: "character",
  name: "King Candy",
  version: "Sweet Abomination",
  i18n: {
    en: {
      name: "King Candy",
      version: "Sweet Abomination",
      text: [
        {
          title: "Shift 3",
        },
        {
          title: "CHANGING THE CODE",
          description:
            "When you play this character, you may draw 2 cards, then put a card from your hand on the bottom of your deck.",
        },
      ],
    },
    de: {
      name: "King Candy",
      version: "Süße Abscheulichkeit",
      text: "Gestaltwandel 3 DEN CODE VERÄNDERN Wenn du diesen Charakter ausspielst, darfst du 2 Karten ziehen, lege dann eine Karte von deiner Hand unter dein Deck.",
    },
    fr: {
      name: "Sa Sucrerie",
      version: "Douce abomination",
      text: "Alter 3 CHANGER LE CODE Lorsque vous jouez ce personnage, vous pouvez piocher 2 cartes. Si vous le faites, remettez 1 carte de votre main en-dessous de votre pioche.",
    },
    it: {
      name: "Re Candito",
      version: "Dolce Abominio",
      text: "Trasformazione 3 MODIFICARE IL CODICE Quando giochi questo personaggio, puoi pescare 2 carte, poi metti una carta dalla tua mano in fondo al tuo mazzo.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Wreck It Ralph",
  set: "005",
  cardNumber: 218,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 5,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_9c2a04a39aee4b989bf2b1f18bf923ba",
    tcgPlayer: 561995,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "CHANGING THE CODE",
      description:
        "When you play this character, you may draw 2 cards, then put a card from your hand on the bottom of your deck.",
    },
  ],
  classifications: ["Floodborn", "Villain", "King", "Racer"],
  abilities: [
    {
      cost: {
        ink: 3,
      },
      id: "q61-1",
      keyword: "Shift",
      text: "Shift 3",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["card"],
          },
          type: "put-on-bottom",
        },
        type: "optional",
      },
      id: "q61-2",
      name: "CHANGING THE CODE",
      text: "CHANGING THE CODE When you play this character, you may draw 2 cards, then put a card from your hand on the bottom of your deck.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
