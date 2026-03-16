import type { CharacterCard } from "@tcg/lorcana-types";

export const kingOfHeartsMonarchOfWonderland: CharacterCard = {
  id: "350",
  canonicalId: "ci_350",
  reprints: ["set5-057"],
  cardType: "character",
  name: "King of Hearts",
  version: "Monarch of Wonderland",
  i18n: {
    en: {
      name: "King of Hearts",
      version: "Monarch of Wonderland",
      text: [
        {
          title: "PLEASING THE QUEEN",
          description:
            "{E} — Chosen exerted character can't ready at the start of their next turn.",
        },
      ],
    },
    de: {
      name: "Herzkönig",
      version: "Monarch des Wunderlands",
      text: [
        {
          title: "HULDIGT DER",
          description:
            "KÖNIGIN — Wähle einen erschöpften Charakter. Er wird zu Beginn seines nächsten Zuges nicht bereit gemacht.",
        },
      ],
    },
    fr: {
      name: "Le Roi de Cœur",
      version: "Monarque du Pays des Merveilles",
      text: [
        {
          title: "ÉCOUTEZ LA REINE!",
          description:
            "— Choisissez un personnage épuisé qui ne se redresse pas au début de son prochain tour.",
        },
      ],
    },
    it: {
      name: "Re di Cuori",
      version: "Monarca del Paese delle Meraviglie",
      text: [
        {
          title: "COMPIACERE LA REGINA",
          description:
            "— Un personaggio impegnato a tua scelta non si può preparare all'inizio del suo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Alice in Wonderland",
  set: "005",
  cardNumber: 57,
  rarity: "uncommon",
  cost: 4,
  strength: 1,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_19a1d88c22204acf9412f49437e0eb00",
    tcgPlayer: 561490,
  },
  text: [
    {
      title: "PLEASING THE QUEEN",
      description: "{E} — Chosen exerted character can't ready at the start of their next turn.",
    },
  ],
  classifications: ["Storyborn", "Ally", "King"],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        duration: "until-start-of-next-turn",
        restriction: "cant-ready",
        target: "SELF",
        type: "restriction",
      },
      id: "3sp-1",
      text: "PLEASING THE QUEEN {E} — Chosen exerted character can't ready at the start of their next turn.",
      type: "activated",
    },
  ],
};
