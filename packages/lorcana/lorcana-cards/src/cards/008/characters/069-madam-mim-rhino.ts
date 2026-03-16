import type { CharacterCard } from "@tcg/lorcana-types";

export const madamMimRhino: CharacterCard = {
  id: "buu",
  canonicalId: "ci_buu",
  reprints: ["set8-069"],
  cardType: "character",
  name: "Madam Mim",
  version: "Rhino",
  i18n: {
    en: {
      name: "Madam Mim",
      version: "Rhino",
      text: [
        {
          title: "Shift 2",
        },
        {
          title: "MAKE WAY, COMING THROUGH!",
          description:
            "When you play this character, banish her or return another chosen character of yours to your hand.",
        },
      ],
    },
    de: {
      name: "Madame Mim",
      version: "Nashorn",
      text: "Gestaltwandel 2 AUS DEM WEG, ICH KOMME! Wenn du diesen Charakter ausspielst, musst du ihn verbannen oder einen deiner anderen Charaktere wählen und zurück auf deine Hand nehmen.",
    },
    fr: {
      name: "Madame Mime",
      version: "En rhinocéros",
      text: "Alter 2 FAITES PLACE, JE PASSE! Lorsque vous jouez ce personnage, bannissez-le ou renvoyez l'un de vos autres personnages en jeu dans votre main.",
    },
    it: {
      name: "Maga Magò",
      version: "Rinoceronte",
      text: "Trasformazione 2 FATE LARGO, ARRIVO! Quando giochi questo personaggio, esilialo o riprendi in mano un tuo altro personaggio a tua scelta.",
    },
  },
  inkType: ["amethyst", "ruby"],
  franchise: "Sword in the Stone",
  set: "008",
  cardNumber: 69,
  rarity: "uncommon",
  cost: 6,
  strength: 6,
  willpower: 5,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_5af1ae1121a447af9a275e5b2c6cf71f",
    tcgPlayer: 631396,
  },
  text: [
    {
      title: "Shift 2",
    },
    {
      title: "MAKE WAY, COMING THROUGH!",
      description:
        "When you play this character, banish her or return another chosen character of yours to your hand.",
    },
  ],
  classifications: ["Floodborn", "Villain", "Sorcerer"],
  abilities: [
    {
      cost: {
        ink: 2,
      },
      id: "1jr-1",
      keyword: "Shift",
      text: "Shift 2",
      type: "keyword",
    },
    {
      effect: {
        type: "or",
        optionLabels: ["banish her", "return another chosen character of yours to your hand"],
        options: [
          {
            target: "SELF",
            type: "banish",
          },
          {
            target: {
              excludeSelf: true,
              selector: "chosen",
              count: 1,
              owner: "you",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "return-to-hand",
          },
        ],
      },
      id: "1jr-2",
      name: "MAKE WAY, COMING THROUGH!",
      text: "MAKE WAY, COMING THROUGH! When you play this character, banish her or return another chosen character of yours to your hand.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
