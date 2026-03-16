import type { ActionCard } from "@tcg/lorcana-types";

export const prepareYourBot: ActionCard = {
  id: "o3v",
  canonicalId: "ci_o3v",
  reprints: ["set6-165"],
  cardType: "action",
  name: "Prepare Your Bot",
  i18n: {
    en: {
      name: "Prepare Your Bot",
      text: [
        {
          title: "Choose one:",
        },
        {
          title: "* Ready chosen item.",
        },
        {
          title: "* Ready chosen Robot character. They can't quest for the rest of this turn.",
        },
      ],
    },
    de: {
      name: "Mach deinen Robo bereit",
      text: "Wähle eine Möglichkeit aus: • Mache einen Gegenstand deiner Wahl bereit. • Mache einen Roboter deiner Wahl bereit. Er kann in diesem Zug nicht mehr erkunden.",
    },
    fr: {
      name: "Prépare ton robot",
      text: "Choisissez entre: • Choississez un objet et redressez-le. • Choississez un personnage Robot et redressez-le. Ce personnage ne peut pas être envoyé à l'aventure pour le reste de ce tour.",
    },
    it: {
      name: "Prepara il tuo Robot",
      text: "Scegli uno: • Prepara un oggetto a tua scelta. • Prepara un personaggio Robot a tua scelta. Non può andare all'avventura per il resto di questo turno.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Big Hero 6",
  set: "006",
  cardNumber: 165,
  rarity: "uncommon",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_21d32224cf9f452ab94f70d9a2b40d79",
    tcgPlayer: 587504,
  },
  text: [
    {
      title: "Choose one:",
    },
    {
      title: "* Ready chosen item.",
    },
    {
      title: "* Ready chosen Robot character. They can't quest for the rest of this turn.",
    },
  ],
  abilities: [
    {
      type: "action",
      effect: {
        type: "choice",
        options: [
          {
            type: "ready",
            target: "CHOSEN_ITEM",
          },
          {
            type: "sequence",
            steps: [
              {
                type: "ready",
                target: {
                  selector: "chosen",
                  count: 1,
                  owner: "you",
                  zones: ["play"],
                  cardTypes: ["character"],
                  filter: [
                    {
                      type: "has-classification",
                      classification: "Robot",
                    },
                  ],
                },
              },
              {
                type: "restriction",
                restriction: "cant-quest",
                duration: "this-turn",
                target: {
                  ref: "previous-target",
                },
              },
            ],
          },
        ],
      },
    },
  ],
};
