import type { CharacterCard } from "@tcg/lorcana-types";

export const marshmallowCrankyClimber: CharacterCard = {
  id: "oie",
  canonicalId: "ci_oie",
  reprints: ["set11-053"],
  cardType: "character",
  name: "Marshmallow",
  version: "Cranky Climber",
  i18n: {
    en: {
      name: "Marshmallow",
      version: "Cranky Climber",
      text: [
        {
          title: "ICY BLAST",
          description:
            "Whenever this character quests, each opponent can't ready more than 1 of their characters at the start of their next turn.",
        },
      ],
    },
    de: {
      name: "Marshmallow",
      version: "Griesgrämiger Kletterer",
      text: [
        {
          title: "EISIGE EXPLOSION",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, können alle gegnerischen Mitspielenden zu Beginn ihres nächsten Zuges nur 1 ihrer Charaktere bereit machen.",
        },
      ],
    },
    fr: {
      name: "Guimauve",
      version: "Grimpeur irritable",
      text: [
        {
          title: "SOUFFLE GLACÉ",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, aucun adversaire ne peut redresser plus de 1 personnage au début de son prochain tour.",
        },
      ],
    },
    it: {
      name: "Marshmallow",
      version: "Arrampicatore Irascibile",
      text: [
        {
          title: "COLPO GHIACCIATO",
          description:
            "Ogni volta che questo personaggio va all'avventura, ogni avversario non può preparare più di 1 dei suoi personaggi all'inizio del suo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Frozen",
  set: "011",
  cardNumber: 53,
  rarity: "rare",
  cost: 5,
  strength: 5,
  willpower: 5,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_f000a1651ff54227806f5da0c5d89c42",
    tcgPlayer: 675281,
  },
  text: [
    {
      title: "ICY BLAST",
      description:
        "Whenever this character quests, each opponent can't ready more than 1 of their characters at the start of their next turn.",
    },
  ],
  classifications: ["Dreamborn", "Ally"],
  abilities: [
    {
      id: "1su-1",
      effect: {
        restriction: "cant-ready",
        target: "SELF",
        type: "restriction",
        duration: "their-next-turn",
      },
      name: "ICY BLAST",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
      text: "ICY BLAST Whenever this character quests, each opponent can't ready more than 1 of their characters at the start of their next turn.",
    },
  ],
};
