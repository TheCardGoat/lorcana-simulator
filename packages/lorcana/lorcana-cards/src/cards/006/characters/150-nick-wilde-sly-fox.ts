import type { CharacterCard } from "@tcg/lorcana-types";

export const nickWildeSlyFox: CharacterCard = {
  id: "2oi",
  canonicalId: "ci_2oi",
  reprints: ["set6-150"],
  cardType: "character",
  name: "Nick Wilde",
  version: "Sly Fox",
  i18n: {
    en: {
      name: "Nick Wilde",
      version: "Sly Fox",
      text: [
        {
          title: "Shift 1",
        },
        {
          title: "CAN'T TOUCH ME",
          description: "While you have an item in play, this character can't be challenged.",
        },
      ],
    },
    de: {
      name: "Nick Wilde",
      version: "Schlitzohr",
      text: "Gestaltwandel 1 DU KANNST MIR NICHTS ANHABEN Solange du mindestens einen Gegenstand im Spiel hast, kann dieser Charakter nicht herausgefordert werden.",
    },
    fr: {
      name: "Nick Wilde",
      version: "Renard narquois",
      text: "Alter 1 TU M'AURAS PAS Tant que vous avez un objet en jeu, ce personnage ne peut pas être défié.",
    },
    it: {
      name: "Nick Wilde",
      version: "Volpe Acuta",
      text: "Trasformazione 1 NON PUOI TOCCARMI Mentre hai in gioco un oggetto, questo personaggio non può essere sfidato.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Zootropolis",
  set: "006",
  cardNumber: 150,
  rarity: "uncommon",
  cost: 3,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_48304fa82c024098bf755ea123884358",
    tcgPlayer: 591133,
  },
  text: [
    {
      title: "Shift 1",
    },
    {
      title: "CAN'T TOUCH ME",
      description: "While you have an item in play, this character can't be challenged.",
    },
  ],
  classifications: ["Floodborn", "Ally"],
  abilities: [
    {
      cost: {
        ink: 1,
      },
      id: "jsd-1",
      keyword: "Shift",
      text: "Shift 1",
      type: "keyword",
    },
    {
      effect: {
        restriction: "cant-be-challenged",
        target: "SELF",
        type: "restriction",
      },
      id: "jsd-2",
      text: "CAN'T TOUCH ME While you have an item in play, this character can't be challenged.",
      type: "action",
    },
  ],
};
