import type { ActionCard } from "@tcg/lorcana-types";

export const doYouWantToBuildASnowman: ActionCard = {
  id: "tmK",
  canonicalId: "ci_tmK",
  reprints: ["set11-061"],
  cardType: "action",
  name: "Do You Want to Build A Snowman?",
  i18n: {
    en: {
      name: "Do You Want to Build A Snowman?",
      text: [
        {
          title: "Chosen opponent chooses YES! or NO!:",
        },
        {
          title: "* YES!",
          description: "You gain 3 lore.",
        },
        {
          title:
            "* NO! They choose a character of theirs and put that card on the bottom of their deck.",
        },
      ],
    },
    de: {
      name: "Willst du einen Schneemann bauen?",
      text: "Eine gegnerische Person deiner Wahl sagt JA! oder NEIN!: • JA! Du sammelst 3 Legenden. • NEIN! Die Person wählt einen ihrer Charaktere und legt diesen unter ihr Deck.",
    },
    fr: {
      name: "Je voudrais un bonhomme de neige",
      text: "Choisissez un adversaire qui choisit D'ACCORD! ou NON!: • D'ACCORD!: vous gagnez 3 éclats de Lore. • NON!: il choisit l'un de ses personnages et le place sous sa pioche.",
    },
    it: {
      name: "Sei Già in Piedi Oppure Dormi?",
      text: "(Un personaggio con costo 3 o superiore può per cantare questa canzone gratis.) Un avversario a tua scelta sceglie tra SÌ! o NO!: • SÌ! Ottieni 3 leggenda. • NO! Quell'avversario sceglie un suo personaggio e mette quella carta in fondo al suo mazzo.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Frozen",
  set: "011",
  cardNumber: 61,
  rarity: "rare",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_adb608b3667f4c769a3bab709840dad1",
    tcgPlayer: 668577,
  },
  text: [
    {
      title: "Chosen opponent chooses YES! or NO!:",
    },
    {
      title: "* YES!",
      description: "You gain 3 lore.",
    },
    {
      title:
        "* NO! They choose a character of theirs and put that card on the bottom of their deck.",
    },
  ],
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      text: "Chosen opponent chooses YES! or NO!: YES! You gain 3 lore. NO! They choose a character of theirs and put that card on the bottom of their deck.",
      effect: {
        type: "choice",
        chooser: "CHOSEN_PLAYER",
        options: [
          {
            type: "gain-lore",
            amount: 3,
            target: "CONTROLLER",
          },
          {
            type: "put-on-bottom",
            target: {
              selector: "chosen",
              count: 1,
              owner: "opponent",
              zones: ["play"],
              cardTypes: ["character"],
            },
          },
        ],
      },
    },
  ],
};
