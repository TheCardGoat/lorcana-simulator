import type { CharacterCard } from "@tcg/lorcana-types";

export const mauiWhale: CharacterCard = {
  id: "hjF",
  canonicalId: "ci_8fJ",
  reprints: ["set3-114", "set9-106"],
  cardType: "character",
  name: "Maui",
  version: "Whale",
  i18n: {
    en: {
      name: "Maui",
      version: "Whale",
      text: [
        {
          title: "THIS MISSION IS CURSED",
          description: "This character can't ready at the start of your turn.",
        },
        {
          title: "I GOT YOUR BACK 2",
          description: "{I} — Ready this character. He can't quest for the rest of this turn.",
        },
      ],
    },
    de: {
      name: "Maui",
      version: "Wal",
      text: [
        {
          title: "DIESE MISSION IST VERFLUCHT",
          description:
            "Dieser Charakter wird zu Beginn deines Zuges nicht bereit gemacht. ICH GEB DIR DECKUNG 2 — Mache diesen Charakter bereit. Er kann in diesem Zug nicht mehr erkunden.",
        },
      ],
    },
    fr: {
      name: "Maui",
      version: "Baleine",
      text: [
        {
          title: "CETTE MISSION EST FICHUE",
          description:
            "Ce personnage ne se redresse pas au début de votre tour. NE T'INQUIÈTE PAS, JE SUIS LÀ 2 — Redressez ce personnage, il ne peut pas être envoyé à l'aventure pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Maui",
      version: "Balena",
      text: [
        {
          title: "LA MISSIONE",
          description:
            "È MALEDETTA Questo personaggio non si può preparare all'inizio del tuo turno. TI GUARDO LE SPALLE 2 — Prepara questo personaggio. Non può andare all'avventura per il resto di questo turno.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Moana",
  set: "003",
  cardNumber: 114,
  rarity: "rare",
  cost: 7,
  strength: 8,
  willpower: 8,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_eca6a044a1a24319948f3c2698344fad",
    tcgPlayer: 650044,
  },
  text: [
    {
      title: "THIS MISSION IS CURSED",
      description: "This character can't ready at the start of your turn.",
    },
    {
      title: "I GOT YOUR BACK 2",
      description: "{I} — Ready this character. He can't quest for the rest of this turn.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Deity"],
  missingImplementation: true,
  missingTests: true,
  abilities: [
    {
      effect: {
        restriction: "cant-ready",
        target: "SELF",
        type: "restriction",
      },
      id: "4dw-1",
      name: "THIS MISSION IS CURSED",
      text: "THIS MISSION IS CURSED This character can't ready at the start of your turn.",
      type: "static",
    },
    {
      effect: {
        duration: "this-turn",
        restriction: "cant-quest",
        target: "SELF",
        type: "restriction",
      },
      id: "4dw-2",
      text: "I GOT YOUR BACK 2 {I} – Ready this character. He can't quest for the rest of this turn.",
      type: "action",
    },
  ],
};
