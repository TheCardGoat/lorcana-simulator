import type { CharacterCard } from "@tcg/lorcana-types";

export const chernabogCreatureOfTheNight: CharacterCard = {
  id: "gAZ",
  canonicalId: "ci_gAZ",
  reprints: ["set7-050"],
  cardType: "character",
  name: "Chernabog",
  version: "Creature of the Night",
  i18n: {
    en: {
      name: "Chernabog",
      version: "Creature of the Night",
      text: [
        {
          title: "MIDNIGHT REVEL",
          description:
            "When you play this character, each opponent chooses and exerts one of their ready characters. They can't ready at the start of their next turn.",
        },
      ],
    },
    de: {
      name: "Chernabog",
      version: "Kreatur der Nacht",
      text: [
        {
          title: "MITTERNACHTSTREIBEN",
          description:
            "Wenn du diesen Charakter ausspielst, wählen alle gegnerischen Mitspielenden je einen ihrer bereiten Charaktere und erschöpfen ihn. Sie werden zu Beginn ihres nächsten Zuges nicht bereit gemacht.",
        },
      ],
    },
    fr: {
      name: "Chernabog",
      version: "Créature de la nuit",
      text: [
        {
          title: "FESTIVITÉS DE MINUIT",
          description:
            "Lorsque vous jouez ce personnage, chaque adversaire choisit l'un de ses personnages redressés et l'épuise. Les personnages épuisés de cette manière ne se redressent pas au début de leur prochain tour.",
        },
      ],
    },
    it: {
      name: "Chernabog",
      version: "Creatura della Notte",
      text: [
        {
          title: "ECCESSI DI MEZZANOTTE",
          description:
            "Quando giochi questo personaggio, ogni avversario sceglie e impegna uno dei suoi personaggi preparati. Non si può preparare all'inizio del suo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Fantasia",
  set: "007",
  cardNumber: 50,
  rarity: "rare",
  cost: 5,
  strength: 2,
  willpower: 6,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_557e4cc6a67e4683ab3a48a35fcf6372",
    tcgPlayer: 619433,
  },
  text: [
    {
      title: "MIDNIGHT REVEL",
      description:
        "When you play this character, each opponent chooses and exerts one of their ready characters. They can't ready at the start of their next turn.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      effect: {
        duration: "until-start-of-next-turn",
        restriction: "cant-ready",
        target: "SELF",
        type: "restriction",
      },
      id: "1x1-1",
      name: "MIDNIGHT REVEL",
      text: "MIDNIGHT REVEL When you play this character, each opponent chooses and exerts one of their ready characters. They can't ready at the start of their next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
