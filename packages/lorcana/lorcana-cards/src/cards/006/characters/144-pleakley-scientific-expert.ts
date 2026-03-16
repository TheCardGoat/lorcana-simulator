import type { CharacterCard } from "@tcg/lorcana-types";

export const pleakleyScientificExpert: CharacterCard = {
  id: "ron",
  canonicalId: "ci_ron",
  reprints: ["set6-144"],
  cardType: "character",
  name: "Pleakley",
  version: "Scientific Expert",
  i18n: {
    en: {
      name: "Pleakley",
      version: "Scientific Expert",
      text: [
        {
          title: "REPORTING FOR DUTY",
          description:
            "When you play this character, put chosen character of yours into your inkwell facedown and exerted.",
        },
      ],
    },
    de: {
      name: "Pliiklii",
      version: "Wissenschaftlicher Experte",
      text: [
        {
          title: "MELDUNG ZUM DIENST",
          description:
            "Wenn du diesen Charakter ausspielst, wähle einen deiner Charaktere und lege ihn verdeckt und erschöpft in deinen Tintenvorrat.",
        },
      ],
    },
    fr: {
      name: "Pikly",
      version: "Expert scientifique",
      text: [
        {
          title: "AU RAPPORT",
          description:
            "Lorsque vous jouez ce personnage, choisissez l'un de vos personnages et placez-le dans votre réserve d'encre, face cachée et épuisé.",
        },
      ],
    },
    it: {
      name: "Pleakley",
      version: "Esperto Scientifico",
      text: [
        {
          title: "A RAPPORTO, SIGNORE",
          description:
            "Quando giochi questo personaggio, aggiungi un tuo personaggio a tua scelta al tuo calamaio, a faccia in giù e impegnato.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Lilo and Stitch",
  set: "006",
  cardNumber: 144,
  rarity: "uncommon",
  cost: 3,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_b513512cb8c04917ae7d0cbe7e1aa355",
    tcgPlayer: 588341,
  },
  text: [
    {
      title: "REPORTING FOR DUTY",
      description:
        "When you play this character, put chosen character of yours into your inkwell facedown and exerted.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Alien"],
  abilities: [
    {
      effect: {
        exerted: true,
        facedown: true,
        source: "chosen-card-in-play",
        target: {
          selector: "chosen",
          count: 1,
          owner: "you",
          zones: ["play"],
          cardTypes: ["character"],
        },
        type: "put-into-inkwell",
      },
      id: "159-1",
      name: "REPORTING FOR DUTY",
      text: "REPORTING FOR DUTY When you play this character, put chosen character of yours into your inkwell facedown and exerted.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
