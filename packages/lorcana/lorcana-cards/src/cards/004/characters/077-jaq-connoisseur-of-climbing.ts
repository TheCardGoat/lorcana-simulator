import type { CharacterCard } from "@tcg/lorcana-types";

export const jaqConnoisseurOfClimbing: CharacterCard = {
  id: "Ck0",
  canonicalId: "ci_Ck0",
  reprints: ["set4-077"],
  cardType: "character",
  name: "Jaq",
  version: "Connoisseur of Climbing",
  i18n: {
    en: {
      name: "Jaq",
      version: "Connoisseur of Climbing",
      text: [
        {
          title: "SNEAKY IDEA",
          description:
            "When you play this character, chosen opposing character gains Reckless during their next turn. (They can't quest and must challenge if able.)",
        },
      ],
    },
    de: {
      name: "Jaq",
      version: "Kletter-Liebhaber",
      text: [
        {
          title: "PFIFFIGE IDEE",
          description:
            "Wenn du diesen Charakter ausspielst, erhält ein gegnerischer Charakter deiner Wahl in seinem nächsten Zug Impulsiv. (Der Charakter kann nicht erkunden und muss herausfordern, wenn möglich.)",
        },
      ],
    },
    fr: {
      name: "Jac",
      version: "Connaisseur en escalade",
      text: [
        {
          title: "IDÉE RUSÉE",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage adverse qui gagne Combattant durant son prochain tour.",
        },
      ],
    },
    it: {
      name: "Giac",
      version: "Esperto di Arrampicata",
      text: [
        {
          title: "IDEA SUBDOLA",
          description:
            "Quando giochi questo personaggio, un personaggio avversario a tua scelta ottiene Attaccabrighe durante il suo prossimo turno. (Non può andare all'avventura e deve sfidare, se possibile.)",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Cinderella",
  set: "004",
  cardNumber: 77,
  rarity: "common",
  cost: 3,
  strength: 1,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_b0d75ae5da0646e797f1563c8811e629",
    tcgPlayer: 547781,
  },
  text: [
    {
      title: "SNEAKY IDEA",
      description:
        "When you play this character, chosen opposing character gains Reckless during their next turn. (They can't quest and must challenge if able.)",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        keyword: "Reckless",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
      },
      id: "1u5-1",
      name: "SNEAKY IDEA",
      text: "SNEAKY IDEA When you play this character, chosen opposing character gains Reckless during their next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
