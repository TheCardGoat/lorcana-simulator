import type { CharacterCard } from "@tcg/lorcana-types";

export const flotsamUrsulasBaby: CharacterCard = {
  id: "8TS",
  canonicalId: "ci_8TS",
  reprints: ["set4-043"],
  cardType: "character",
  name: "Flotsam",
  version: 'Ursula\'s "Baby"',
  i18n: {
    en: {
      name: "Flotsam",
      version: 'Ursula\'s "Baby"',
      text: [
        {
          title: "QUICK ESCAPE",
          description:
            "When this character is banished in a challenge, return this card to your hand.",
        },
        {
          title: "OMINOUS PAIR",
          description:
            'Your characters named Jetsam gain "When this character is banished in a challenge, return this card to your hand."',
        },
      ],
    },
    de: {
      name: "Abschaum",
      version: 'Ursulas "Baby"',
      text: [
        {
          title: "SCHNELLE FLUCHT",
          description:
            "Wenn dieser Charakter durch eine Herausforderung verbannt wird, nimm ihn zurück auf deine Hand.",
        },
        {
          title: "UNHEIMLICHES DUO",
          description:
            'Deine Meerschaum-Charaktere erhalten "Wenn dieser Charakter durch eine Herausforderung verbannt wird, nimm ihn zurück auf deine Hand".',
        },
      ],
    },
    fr: {
      name: "Flotsam",
      version: '"Bébé" d\'Ursula',
      text: [
        {
          title: "FUITE RAPIDE",
          description: "Lorsque ce personnage est banni via un défi, renvoyez-le dans votre main.",
        },
        {
          title: "DUO INQUIÉTANT",
          description:
            'Vos personnages Jetsam gagnent "Lorsque ce personnage est banni via un défi, renvoyez cette carte dans votre main".',
        },
      ],
    },
    it: {
      name: "Flotsam",
      version: "“Piccino” di Ursula",
      text: [
        {
          title: "FUGA RAPIDA",
          description:
            "Quando questo personaggio viene esiliato in una sfida, riprendi in mano questa carta.",
        },
        {
          title: "COPPIA SINISTRA I",
          description:
            'tuoi personaggi chiamati Jetsam ottengono "Quando questo personaggio viene esiliato in una sfida, riprendi in mano questa carta."',
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Little Mermaid",
  set: "004",
  cardNumber: 43,
  rarity: "uncommon",
  cost: 3,
  strength: 4,
  willpower: 2,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_5fb77165fcbc43e99fc15c3d64426b65",
    tcgPlayer: 549467,
  },
  text: [
    {
      title: "QUICK ESCAPE",
      description: "When this character is banished in a challenge, return this card to your hand.",
    },
    {
      title: "OMINOUS PAIR",
      description:
        'Your characters named Jetsam gain "When this character is banished in a challenge, return this card to your hand."',
    },
  ],
  classifications: ["Dreamborn", "Ally"],
  abilities: [
    {
      effect: {
        target: "SELF",
        type: "return-to-hand",
      },
      id: "1e2-1",
      name: "QUICK ESCAPE",
      text: "QUICK ESCAPE When this character is banished in a challenge, return this card to your hand.",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
    {
      effect: {
        target: "SELF",
        type: "return-to-hand",
      },
      id: "1e2-2",
      text: "OMINOUS PAIR Your characters named Jetsam gain “When this character is banished in a challenge, return this card to your hand.”",
      type: "action",
    },
  ],
};
