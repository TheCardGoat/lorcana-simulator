import type { CharacterCard } from "@tcg/lorcana-types";

export const scarHeartlessHunter: CharacterCard = {
  id: "YvX",
  canonicalId: "ci_YvX",
  reprints: ["set6-127"],
  cardType: "character",
  name: "Scar",
  version: "Heartless Hunter",
  i18n: {
    en: {
      name: "Scar",
      version: "Heartless Hunter",
      text: [
        {
          title: "BARED TEETH",
          description:
            "When you play this character, deal 2 damage to chosen character of yours to deal 2 damage to chosen character.",
        },
      ],
    },
    de: {
      name: "Scar",
      version: "Herzloser Jäger",
      text: [
        {
          title: "ZÄHNE BLANK WIE NEID",
          description:
            "Wenn du diesen Charakter ausspielst, wähle einen deiner Charaktere und füge ihm 2 Schaden zu, um einem anderen Charakter deiner Wahl 2 Schaden zuzufügen.",
        },
      ],
    },
    fr: {
      name: "Scar",
      version: "Chasseur sans cœur",
      text: [
        {
          title: "VOTRE ROI VOUS INVITE À LA FÊTE",
          description:
            "Lorsque vous jouez ce personnage, choisissez l'un de vos personnages et infligez-lui 2 dommages pour infliger 2 dommages à un autre personnage au choix.",
        },
      ],
    },
    it: {
      name: "Scar",
      version: "Cacciatore Spietato",
      text: [
        {
          title: "AFFILIAMO LE ZANNE",
          description:
            "Quando giochi questo personaggio, infliggi 2 danni a un tuo personaggio a tua scelta per infliggere 2 danni a un altro personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Lion King",
  set: "006",
  cardNumber: 127,
  rarity: "common",
  cost: 5,
  strength: 4,
  willpower: 2,
  lore: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_eea9acebbeb6449a8cc03786f5bca24d",
    tcgPlayer: 591122,
  },
  text: [
    {
      title: "BARED TEETH",
      description:
        "When you play this character, deal 2 damage to chosen character of yours to deal 2 damage to chosen character.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      effect: {
        amount: 2,
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "deal-damage",
      },
      id: "mp6-1",
      name: "BARED TEETH",
      text: "BARED TEETH When you play this character, deal 2 damage to chosen character of yours to deal 2 damage to chosen character.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
