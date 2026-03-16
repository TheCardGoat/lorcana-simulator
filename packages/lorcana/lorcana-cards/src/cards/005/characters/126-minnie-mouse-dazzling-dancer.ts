import type { CharacterCard } from "@tcg/lorcana-types";

export const minnieMouseDazzlingDancer: CharacterCard = {
  id: "dg4",
  canonicalId: "ci_dg4",
  reprints: ["set5-126"],
  cardType: "character",
  name: "Minnie Mouse",
  version: "Dazzling Dancer",
  i18n: {
    en: {
      name: "Minnie Mouse",
      version: "Dazzling Dancer",
      text: [
        {
          title: "DANCE-OFF",
          description:
            "Whenever this character or one of your characters named Mickey Mouse challenges another character, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Minnie Maus",
      version: "Strahlende Tänzerin",
      text: [
        {
          title: "TANZWETTBEWERB",
          description:
            "Jedes Mal, wenn dieser Charakter oder einer deiner Micky-Maus-Charaktere einen anderen Charakter herausfordert, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Minnie",
      version: "Danseuse époustouflante",
      text: [
        {
          title: "CONCOURS DE DANSE",
          description:
            "Chaque fois que ce personnage ou l'un de vos personnages Mickey Mouse défie un autre personnage, gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Minni",
      version: "Ballerina Sfavillante",
      text: [
        {
          title: "SFIDA DI BALLO",
          description:
            "Ogni volta che questo personaggio o uno dei tuoi personaggi chiamato Topolino sfida un altro personaggio, ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  set: "005",
  cardNumber: 126,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_534dcd9a655747bfbcb0c52c605e9220",
    tcgPlayer: 557294,
  },
  text: [
    {
      title: "DANCE-OFF",
      description:
        "Whenever this character or one of your characters named Mickey Mouse challenges another character, gain 1 lore.",
    },
  ],
  classifications: ["Dreamborn", "Hero"],
  abilities: [
    {
      effect: {
        amount: 1,
        type: "gain-lore",
      },
      id: "git-1",
      name: "DANCE-OFF",
      text: "DANCE-OFF Whenever this character or one of your characters named Mickey Mouse challenges another character, gain 1 lore.",
      trigger: {
        event: "banish",
        on: "YOUR_OTHER_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
