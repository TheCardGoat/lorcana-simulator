import type { CharacterCard } from "@tcg/lorcana-types";

export const liloEscapeArtist: CharacterCard = {
  id: "ZCd",
  canonicalId: "ci_ZCd",
  reprints: ["set6-002"],
  cardType: "character",
  name: "Lilo",
  version: "Escape Artist",
  i18n: {
    en: {
      name: "Lilo",
      version: "Escape Artist",
      text: [
        {
          title: "NO PLACE I'D RATHER BE",
          description:
            "At the start of your turn, if this card is in your discard, you may play her and she enters play exerted.",
        },
      ],
    },
    de: {
      name: "Lilo",
      version: "Entfesslungskünstlerin",
      text: [
        {
          title: "KEIN ORT, AN DEM ICH LIEBER BIN",
          description:
            "Zu Beginn deines Zuges, wenn diese Karte in deinem Ablagestapel ist, darfst du sie erschöpft ausspielen.",
        },
      ],
    },
    fr: {
      name: "Lilo",
      version: "Reine de l’évasion",
      text: [
        {
          title: "PAS D'AUTRE ENDROIT OÙ JE PRÉFÉRERAIS ÊTRE",
          description:
            "Au début de votre tour, si cette carte est dans votre défausse, vous pouvez la jouer et elle entre en jeu épuisée.",
        },
      ],
    },
    it: {
      name: "Lilo",
      version: "Artista della Fuga",
      text: [
        {
          title: "NON C'È POSTO MIGLIORE",
          description:
            "All'inizio del tuo turno, se questa carta si trova nei tuoi scarti, puoi giocarla ed entra in gioco impegnata.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Lilo and Stitch",
  set: "006",
  cardNumber: 2,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_f17c60d077554d25b50fd934061b2e32",
    tcgPlayer: 592015,
  },
  text: [
    {
      title: "NO PLACE I'D RATHER BE",
      description:
        "At the start of your turn, if this card is in your discard, you may play her and she enters play exerted.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          entersExerted: true,
          filter: {
            cardType: "character",
            sameInstanceAsSource: true,
          },
          from: "discard",
          type: "play-card",
        },
        type: "optional",
      },
      sourceZones: ["discard"],
      trigger: {
        event: "start-turn",
        on: "YOU",
        timing: "at",
      },
      type: "triggered",
    },
  ],
};
