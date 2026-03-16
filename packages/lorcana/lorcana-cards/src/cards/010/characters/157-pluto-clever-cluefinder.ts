import type { CharacterCard } from "@tcg/lorcana-types";

export const plutoCleverCluefinder: CharacterCard = {
  id: "6GN",
  canonicalId: "ci_6GN",
  reprints: ["set10-157"],
  cardType: "character",
  name: "Pluto",
  version: "Clever Cluefinder",
  i18n: {
    en: {
      name: "Pluto",
      version: "Clever Cluefinder",
      text: [
        {
          title: "ON THE TRAIL",
          description:
            "{E} — If you have a Detective character in play, return an item card from your discard to your hand. Otherwise, put it on the top of your deck.",
        },
      ],
    },
    de: {
      name: "Pluto",
      version: "Schlauer Spurensucher",
      text: [
        {
          title: "AUF DER SPUR",
          description:
            "— Falls du mindestens einen Detektiv im Spiel hast, nimm 1 Gegenstandskarte aus deinem Ablagestapel zurück auf deine Hand. Falls nicht, lege sie auf dein Deck.",
        },
      ],
    },
    fr: {
      name: "Pluto",
      version: "Fin dénicheur d'indices",
      text: [
        {
          title: "SUR LA PISTE",
          description:
            "— Si vous avez un personnage Détective en jeu, renvoyez dans votre main une carte Objet de votre défausse. Sinon, placez-la sur votre pioche.",
        },
      ],
    },
    it: {
      name: "Pluto",
      version: "Brillante Fiutaindizi",
      text: [
        {
          title: "SULLA PISTA",
          description:
            "— Se hai in gioco un personaggio Detective, riprendi in mano una carta oggetto dai tuoi scarti. Altrimenti, mettila in cima al tuo mazzo.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  set: "010",
  cardNumber: 157,
  rarity: "uncommon",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_bfdd0f1b2c564334afb8ee438ebd677e",
    tcgPlayer: 659385,
  },
  text: [
    {
      title: "ON THE TRAIL",
      description:
        "{E} — If you have a Detective character in play, return an item card from your discard to your hand. Otherwise, put it on the top of your deck.",
    },
  ],
  classifications: ["Dreamborn", "Ally"],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        condition: {
          expression: "you have a Detective character in play",
          type: "if",
        },
        then: {
          cardType: "item",
          target: "CONTROLLER",
          type: "return-from-discard",
        },
        type: "conditional",
      },
      id: "cpr-1",
      text: "ON THE TRAIL {E} — If you have a Detective character in play, return an item card from your discard to your hand. Otherwise, put it on the top of your deck.",
      type: "activated",
    },
  ],
};
