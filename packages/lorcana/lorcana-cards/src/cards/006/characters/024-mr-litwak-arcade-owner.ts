import type { CharacterCard } from "@tcg/lorcana-types";

export const mrLitwakArcadeOwner: CharacterCard = {
  id: "WCV",
  canonicalId: "ci_WCV",
  reprints: ["set6-024"],
  cardType: "character",
  name: "Mr. Litwak",
  version: "Arcade Owner",
  i18n: {
    en: {
      name: "Mr. Litwak",
      version: "Arcade Owner",
      text: [
        {
          title: "THE GANG'S ALL HERE",
          description:
            "Once during your turn, whenever you play another character, you may ready this character. He can't quest or challenge for the rest of this turn.",
        },
      ],
    },
    de: {
      name: "Mr. Litwak",
      version: "Spielhallenbesitzer",
      text: [
        {
          title: "DIE GANZE BANDE IST HIER",
          description:
            "Einmal während deines Zuges, wenn du einen anderen Charakter ausspielst, darfst du diesen Charakter bereit machen. Er kann in diesem Zug nicht mehr erkunden oder herausfordern.",
        },
      ],
    },
    fr: {
      name: "M. Litwak",
      version: "Propriétaire de salle d'arcade",
      text: [
        {
          title: "TOUTE LA BANDE EST LÀ",
          description:
            "Une fois durant votre tour, lorsque vous jouez un autre personnage, vous pouvez redresser ce personnage-ci. Il ne peut ni partir à l'aventure ni défier pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Signor Litwak",
      version: "Proprietario dell'Arcade",
      text: [
        {
          title: "LA GANG È TUTTA QUI",
          description:
            "Una volta durante il tuo turno, ogni volta che giochi un altro personaggio, puoi preparare questo personaggio. Non può andare all'avventura o sfidare per il resto di questo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Wreck It Ralph",
  set: "006",
  cardNumber: 24,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_19217586b3924276aa8996d318f83139",
    tcgPlayer: 593030,
  },
  text: [
    {
      title: "THE GANG'S ALL HERE",
      description:
        "Once during your turn, whenever you play another character, you may ready this character. He can't quest or challenge for the rest of this turn.",
    },
  ],
  classifications: ["Storyborn"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "self",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "ready",
        },
        type: "optional",
      },
      id: "byt-1",
      name: "THE GANG'S ALL HERE Once",
      text: "THE GANG'S ALL HERE Once during your turn, whenever you play another character, you may ready this character. He can’t quest or challenge for the rest of this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
