import type { CharacterCard } from "@tcg/lorcana-types";

export const belleOfTheBall: CharacterCard = {
  id: "rlF",
  canonicalId: "ci_rlF",
  reprints: ["set5-158"],
  cardType: "character",
  name: "Belle",
  version: "Of the Ball",
  i18n: {
    en: {
      name: "Belle",
      version: "Of the Ball",
      text: [
        {
          title: "Ward",
        },
        {
          title: "USHERED INTO THE PARTY",
          description:
            "When you play this character, your other characters gain Ward until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Belle",
      version: "Vom Ball",
      text: "Behütet IN DIE FEIER GELEITET Wenn du diesen Charakter ausspielst, erhalten deine anderen Charaktere bis zu Beginn deines nächsten Zuges Behütet.",
    },
    fr: {
      name: "Belle",
      version: "Du bal",
      text: "Hors d'atteinte INVITÉE À LA FÊTE Lorsque vous jouez ce personnage, vos autres personnages gagnent Hors d'atteinte jusqu'au début de votre prochain tour.",
    },
    it: {
      name: "Belle",
      version: "Reginetta del Ballo",
      text: "Protetto ACCOMPAGNATA ALLA FESTA Quando giochi questo personaggio, i tuoi altri personaggi ottengono Protetto fino all'inizio del tuo prossimo turno.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Beauty and the Beast",
  set: "005",
  cardNumber: 158,
  rarity: "rare",
  cost: 4,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_d5087e3422e74e3585a2a323b4a06ee7",
    tcgPlayer: 561651,
  },
  text: [
    {
      title: "Ward",
    },
    {
      title: "USHERED INTO THE PARTY",
      description:
        "When you play this character, your other characters gain Ward until the start of your next turn.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Princess"],
  abilities: [
    {
      id: "1j3-1",
      keyword: "Ward",
      text: "Ward",
      type: "keyword",
    },
    {
      effect: {
        keyword: "Ward",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
      },
      id: "1j3-2",
      name: "USHERED INTO THE PARTY",
      text: "USHERED INTO THE PARTY When you play this character, your other characters gain Ward until the start of your next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
