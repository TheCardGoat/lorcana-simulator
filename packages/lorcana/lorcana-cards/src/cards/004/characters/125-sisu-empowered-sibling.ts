import type { CharacterCard } from "@tcg/lorcana-types";

export const sisuEmpoweredSibling: CharacterCard = {
  id: "A15",
  canonicalId: "ci_bdj",
  reprints: ["set4-125"],
  cardType: "character",
  name: "Sisu",
  version: "Empowered Sibling",
  i18n: {
    en: {
      name: "Sisu",
      version: "Empowered Sibling",
      text: [
        {
          title: "Shift 6",
        },
        {
          title: "I GOT THIS!",
          description:
            "When you play this character, banish all opposing characters with 2 {S} or less.",
        },
      ],
    },
    de: {
      name: "Sisu",
      version: "Starkes Familienmitglied",
      text: "Gestaltwandel 6 ICH MACH DAS SCHON! Wenn du diesen Charakter ausspielst, verbanne alle gegnerischen Charaktere mit 2 oder weniger.",
    },
    fr: {
      name: "Sisu",
      version: "Sœur responsable",
      text: "Alter 6 LAISSE-MOI GÉRER ÇA! Lorsque vous jouez ce personnage, bannissez tous les personnages adverses ayant 2 ou moins.",
    },
    it: {
      name: "Sisu",
      version: "Sorella Potenziata",
      text: "Trasformazione 6 LASCIA FARE A ME Quando giochi questo personaggio, esilia tutti i personaggi avversari con 2 o inferiore.",
    },
  },
  inkType: ["ruby"],
  franchise: "Raya and the Last Dragon",
  set: "004",
  cardNumber: 125,
  rarity: "legendary",
  cost: 8,
  strength: 5,
  willpower: 4,
  lore: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_d0714091b2a14f478e2d7704c8eb50d8",
    tcgPlayer: 550839,
  },
  text: [
    {
      title: "Shift 6",
    },
    {
      title: "I GOT THIS!",
      description:
        "When you play this character, banish all opposing characters with 2 {S} or less.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Deity", "Dragon"],
  abilities: [
    {
      cost: {
        ink: 6,
      },
      id: "1q9-1",
      keyword: "Shift",
      text: "Shift 6",
      type: "keyword",
    },
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "1q9-2",
      name: "I GOT THIS!",
      text: "I GOT THIS! When you play this character, banish all opposing characters with 2 {S} or less.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
