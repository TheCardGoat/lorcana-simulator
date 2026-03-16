import type { CharacterCard } from "@tcg/lorcana-types";

export const pinocchioOnTheRun: CharacterCard = {
  id: "e9v",
  canonicalId: "ci_e9v",
  reprints: ["set2-057"],
  cardType: "character",
  name: "Pinocchio",
  version: "On the Run",
  i18n: {
    en: {
      name: "Pinocchio",
      version: "On the Run",
      text: [
        {
          title: "Shift 3",
        },
        {
          title: "LISTEN TO YOUR CONSCIENCE",
          description:
            "When you play this character, you may return chosen character or item with cost 3 or less to their player's hand.",
        },
      ],
    },
    de: {
      name: "Pinocchio",
      version: "Auf der Flucht",
      text: "Gestaltwandel 3 HÖR AUF DEIN GEWISSEN Wenn du diesen Charakter ausspielst, darfst du einen Charakter oder Gegenstand deiner Wahl, der 3 oder weniger kostet, zurück auf die zugehörige Hand schicken.",
    },
    fr: {
      name: "Pinocchio",
      version: "Livré à lui-même",
      text: "Alter 3 ÉCOUTE TA CONSCIENCE Lorsque vous jouez ce personnage, vous pouvez choisir soit un personnage soit un objet coûtant 3 ou moins et le renvoyer dans la main de son propriétaire.",
    },
    it: {
      name: "Pinocchio",
      version: "On the Run",
      text: [
        {
          title: "Shift 3",
          description:
            "(You may pay 3 to play this on top of one of your characters named Pinocchio.) LISTEN TO YOUR CONSCIENCE When you play this character, you may return chosen character or item with cost 3 or less to their player's hand.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Pinocchio",
  set: "002",
  cardNumber: 57,
  rarity: "uncommon",
  cost: 5,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_a3bfa4a999c04a9ea29d4877f877474e",
    tcgPlayer: 527626,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "LISTEN TO YOUR CONSCIENCE",
      description:
        "When you play this character, you may return chosen character or item with cost 3 or less to their player's hand.",
    },
  ],
  classifications: ["Floodborn", "Hero"],
  missingTests: true,
  abilities: [
    {
      cost: {
        ink: 3,
      },
      id: "186-1",
      keyword: "Shift",
      text: "Shift 3",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "return-to-hand",
        },
        type: "optional",
      },
      id: "186-2",
      name: "LISTEN TO YOUR CONSCIENCE",
      text: "LISTEN TO YOUR CONSCIENCE When you play this character, you may return chosen character or item with cost 3 or less to their player's hand.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
