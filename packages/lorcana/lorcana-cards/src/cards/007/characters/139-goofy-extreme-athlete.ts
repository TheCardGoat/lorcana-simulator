import type { CharacterCard } from "@tcg/lorcana-types";

export const goofyExtremeAthlete: CharacterCard = {
  id: "3Ct",
  canonicalId: "ci_3Ct",
  reprints: ["set7-139"],
  cardType: "character",
  name: "Goofy",
  version: "Extreme Athlete",
  i18n: {
    en: {
      name: "Goofy",
      version: "Extreme Athlete",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "STAR POWER",
          description:
            "Whenever this character challenges another character, your other characters get +1 {L} this turn.",
        },
      ],
    },
    de: {
      name: "Goofy",
      version: "Extremsportler",
      text: "Wendig MACHT DER BERÜHMTHEIT Jedes Mal, wenn dieser Charakter einen anderen Charakter herausfordert, erhalten deine anderen Charaktere in diesem Zug +1.",
    },
    fr: {
      name: "Dingo",
      version: "Athlète de l'extrême",
      text: "Insaisissable POUVOIR DE STAR Chaque fois que ce personnage en défie un autre, vos autres personnages gagnent +1 pour le reste de ce tour.",
    },
    it: {
      name: "Pippo",
      version: "Atleta Estremo",
      text: "Sfuggente TALENTO DA STAR Ogni volta che questo personaggio sfida un altro personaggio, i tuoi altri personaggi ricevono +1 per questo turno.",
    },
  },
  inkType: ["ruby"],
  set: "007",
  cardNumber: 139,
  rarity: "common",
  cost: 7,
  strength: 7,
  willpower: 6,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_f51072d030ba4e7b892f9ae48175f4cb",
    tcgPlayer: 619484,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "STAR POWER",
      description:
        "Whenever this character challenges another character, your other characters get +1 {L} this turn.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "15u-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        duration: "this-turn",
        modifier: 1,
        stat: "lore",
        target: "YOUR_CHARACTERS",
        type: "modify-stat",
      },
      id: "15u-2",
      name: "STAR POWER",
      text: "STAR POWER Whenever this character challenges another character, your other characters get +1 {L} this turn.",
      trigger: {
        event: "challenge",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
