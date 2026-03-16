import type { CharacterCard } from "@tcg/lorcana-types";

export const helgaSinclairVengefulPartner: CharacterCard = {
  id: "1i7",
  canonicalId: "ci_1i7",
  reprints: ["set3-075"],
  cardType: "character",
  name: "Helga Sinclair",
  version: "Vengeful Partner",
  i18n: {
    en: {
      name: "Helga Sinclair",
      version: "Vengeful Partner",
      text: [
        {
          title: "NOTHING PERSONAL",
          description:
            "When this character is challenged and banished, banish the challenging character.",
        },
      ],
    },
    de: {
      name: "Helga Sinclair",
      version: "Rachsüchtige Partnerin",
      text: [
        {
          title: "NIMM'S NICHT PERSÖNLICH",
          description:
            "Wenn dieser Charakter herausgefordert und verbannt wird, verbanne den herausfordernden Charakter.",
        },
      ],
    },
    fr: {
      name: "Helga Sinclair",
      version: "Partenaire vengeresse",
      text: [
        {
          title: "JE VOUS AI JAMAIS AIMÉ",
          description:
            "Lorsque ce personnage est défié et banni, bannissez le personnage qui l'a défié.",
        },
      ],
    },
    it: {
      name: "Helga Sinclair",
      version: "Socia Vendicativa",
      text: [
        {
          title: "NIENTE DI PERSONALE",
          description:
            "Quando questo personaggio viene sfidato ed esiliato, esilia il personaggio che lo ha sfidato.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Atlantis",
  set: "003",
  cardNumber: 75,
  rarity: "rare",
  cost: 2,
  strength: 2,
  willpower: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_43db4d680b1c4ea7a375334266b28294",
    tcgPlayer: 537761,
  },
  text: [
    {
      title: "NOTHING PERSONAL",
      description:
        "When this character is challenged and banished, banish the challenging character.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  missingTests: true,
  abilities: [
    {
      effect: {
        target: {
          ref: "attacker",
        },
        type: "banish",
      },
      id: "1eg-1",
      name: "NOTHING PERSONAL",
      sourceZones: ["play", "discard"],
      text: "NOTHING PERSONAL When this character is challenged and banished, banish the challenging character.",
      trigger: {
        event: "challenged-and-banished",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
