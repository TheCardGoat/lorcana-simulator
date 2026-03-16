import type { CharacterCard } from "@tcg/lorcana-types";

export const madameMedusaDeceivingPartner: CharacterCard = {
  id: "9f8",
  canonicalId: "ci_9f8",
  reprints: ["set8-047"],
  cardType: "character",
  name: "Madame Medusa",
  version: "Deceiving Partner",
  i18n: {
    en: {
      name: "Madame Medusa",
      version: "Deceiving Partner",
      text: [
        {
          title: "DOUBLE-CROSS",
          description:
            "When you play this character, you may deal 2 damage to another chosen character of yours to return chosen character with cost 2 or less to their player's hand.",
        },
      ],
    },
    de: {
      name: "Madam Medusa",
      version: "Betrügerische Partnerin",
      text: [
        {
          title: "FALSCHES SPIEL",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einen deiner anderen Charaktere wählen und ihm 2 Schaden zufügen, um einen Charakter deiner Wahl, der 2 oder weniger kostet, auf die zugehörige Hand zurückzuschicken.",
        },
      ],
    },
    fr: {
      name: "Madame Médusa",
      version: "Partenaire perfide",
      text: [
        {
          title: "DUPLICITÉ",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un autre de vos personnages et lui infliger 2 dommages. Si vous le faites, choisissez un personnage coûtant 2 ou moins et renvoyez-le dans la main de son propriétaire.",
        },
      ],
    },
    it: {
      name: "Madame Medusa",
      version: "Partner Ingannevole",
      text: [
        {
          title: "DOPPIO GIOCO",
          description:
            "Quando giochi questo personaggio, puoi infliggere 2 danni a un tuo altro personaggio a tua scelta per far riprendere in mano al suo giocatore un personaggio a tua scelta con costo 2 o inferiore.",
        },
      ],
    },
  },
  inkType: ["amethyst", "ruby"],
  franchise: "Rescuers",
  set: "008",
  cardNumber: 47,
  rarity: "uncommon",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_c25b03f0800041229325ec211c5e132c",
    tcgPlayer: 631382,
  },
  text: [
    {
      title: "DOUBLE-CROSS",
      description:
        "When you play this character, you may deal 2 damage to another chosen character of yours to return chosen character with cost 2 or less to their player's hand.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 2,
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "deal-damage",
        },
        type: "optional",
      },
      id: "dvp-1",
      name: "DOUBLE-CROSS",
      text: "DOUBLE-CROSS When you play this character, you may deal 2 damage to another chosen character of yours to return chosen character with cost 2 or less to their player’s hand.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
