import type { CharacterCard } from "@tcg/lorcana-types";

export const fergusMcduckScroogesFather: CharacterCard = {
  id: "sKm",
  canonicalId: "ci_sKm",
  reprints: ["set10-144"],
  cardType: "character",
  name: "Fergus McDuck",
  version: "Scrooge's Father",
  i18n: {
    en: {
      name: "Fergus McDuck",
      version: "Scrooge's Father",
      text: [
        {
          title: "TOUGHEN UP",
          description:
            "When you play this character, chosen character of yours gains Ward until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Dietbert Duck",
      version: "Dagoberts Vater",
      text: [
        {
          title: "ABHÄRTEN",
          description:
            "Wenn du diesen Charakter ausspielst, wähle einen deiner Charaktere. Jener erhält bis zu Beginn deines nächsten Zuges Behütet. (Gegnerische Mitspielende können den Charakter nicht auswählen, außer um ihn herauszufordern.)",
        },
      ],
    },
    fr: {
      name: "Fergus Mac Picsou",
      version: "Père de Balthazar",
      text: [
        {
          title: "ENDURCIR",
          description:
            "Lorsque vous jouez ce personnage, choisissez l'un de vos personnages qui gagne Hors d'atteinte jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Fergus de' Paperoni",
      version: "Padre di Paperone",
      text: [
        {
          title: "INDURIRSI",
          description:
            "Quando giochi questo personaggio, un tuo personaggio a tua scelta ottiene Protetto fino all'inizio del tuo prossimo turno. (Gli avversari non possono sceglierlo se non per sfidarlo.)",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Ducktales",
  set: "010",
  cardNumber: 144,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_a6ad0755a1114acca877267acb719f59",
    tcgPlayer: 659601,
  },
  text: [
    {
      title: "TOUGHEN UP",
      description:
        "When you play this character, chosen character of yours gains Ward until the start of your next turn.",
    },
  ],
  classifications: ["Storyborn", "Mentor"],
  abilities: [
    {
      effect: {
        keyword: "Ward",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "gain-keyword",
      },
      id: "xuv-1",
      name: "TOUGHEN UP",
      text: "TOUGHEN UP When you play this character, chosen character of yours gains Ward until the start of your next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
