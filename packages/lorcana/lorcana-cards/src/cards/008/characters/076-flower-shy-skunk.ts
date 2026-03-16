import type { CharacterCard } from "@tcg/lorcana-types";

export const flowerShySkunk: CharacterCard = {
  id: "1FG",
  canonicalId: "ci_1FG",
  reprints: ["set8-076"],
  cardType: "character",
  name: "Flower",
  version: "Shy Skunk",
  i18n: {
    en: {
      name: "Flower",
      version: "Shy Skunk",
      text: [
        {
          title: "LOOKING FOR FRIENDS",
          description:
            "Whenever you play another character, look at the top card of your deck. Put it on either the top or the bottom of your deck.",
        },
      ],
    },
    de: {
      name: "Blume",
      version: "Schüchternes Stinktier",
      text: [
        {
          title: "AUF DER SUCHE NACH FREUNDEN",
          description:
            "Jedes Mal, wenn du einen anderen Charakter ausspielst, darfst du dir die oberste Karte deines Decks anschauen. Lege sie anschließend entweder auf dein Deck oder darunter.",
        },
      ],
    },
    fr: {
      name: "Fleur",
      version: "Mouffette timide",
      text: [
        {
          title: "À LA RECHERCHE D'AMIS",
          description:
            "Chaque fois que vous jouez un autre personnage, regardez la carte du dessus de votre pioche. Placez-la sur ou sous votre pioche.",
        },
      ],
    },
    it: {
      name: "Fiore",
      version: "Puzzola Timida",
      text: [
        {
          title: "IN CERCA DI AMICI",
          description:
            "Ogni volta che giochi un altro personaggio, guarda la prima carta del tuo mazzo. Mettila in cima o in fondo al tuo mazzo.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Bambi",
  set: "008",
  cardNumber: 76,
  rarity: "rare",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_36e404bad05f458dad8ab8a894d0118f",
    tcgPlayer: 631342,
  },
  text: [
    {
      title: "LOOKING FOR FRIENDS",
      description:
        "Whenever you play another character, look at the top card of your deck. Put it on either the top or the bottom of your deck.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        target: "CHOSEN_CHARACTER",
        type: "put-on-bottom",
      },
      id: "ry8-1",
      name: "LOOKING FOR FRIENDS",
      text: "LOOKING FOR FRIENDS Whenever you play another character, look at the top card of your deck. Put it on either the top or the bottom of your deck.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
