import type { CharacterCard } from "@tcg/lorcana-types";

export const wreckitRalphBigLugEnchanted: CharacterCard = {
  id: "hHD",
  canonicalId: "ci_rXj",
  reprints: ["set8-024"],
  cardType: "character",
  name: "Wreck-It Ralph",
  version: "Big Lug",
  i18n: {
    en: {
      name: "Wreck-It Ralph",
      version: "Big Lug",
      text: [
        {
          title: "Shift 5",
        },
        {
          title: "BACK ON TRACK",
          description:
            "When you play this character and whenever he quests, you may return a Racer character card with cost 6 or less from your discard to your hand. If you do, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Randale Ralph",
      version: "Großer Gauner",
      text: "Gestaltwandel 5 WIEDER AUF KURS Wenn du diesen Charakter ausspielst, und jedes Mal, wenn er erkundet, darfst du eine Rennfahrer-Charakterkarte, die 6 oder weniger kostet, aus deinem Ablagestapel zurück auf deine Hand nehmen. Wenn du dies tust, sammelst du 1 Legende.",
    },
    fr: {
      name: "Ralph la Casse",
      version: "Gros bêta",
      text: "Alter 5 DE NOUVEAU DANS LA COURSE Lorsque vous jouez ce personnage et chaque fois qu'il est envoyé à l'aventure, vous pouvez renvoyer dans votre main une carte Personnage Pilote de votre défausse coûtant 6 ou moins. Si vous le faites, gagnez 1 éclat de Lore.",
    },
    it: {
      name: "Ralph Spaccatutto",
      version: "Omaccione",
      text: "Trasformazione 5 DI NUOVO IN PISTA Quando giochi questo personaggio e ogni volta che va all'avventura, puoi riprendere in mano una carta personaggio Pilota con costo 6 o inferiore dai tuoi scarti. Se lo fai, ottieni 1 leggenda.",
    },
  },
  inkType: ["amber", "ruby"],
  franchise: "Wreck It Ralph",
  set: "008",
  cardNumber: 206,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 7,
  strength: 7,
  willpower: 5,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_5615e8aef96941acb0e5cf1cfc8988c0",
    tcgPlayer: 632252,
  },
  text: [
    {
      title: "Shift 5",
    },
    {
      title: "BACK ON TRACK",
      description:
        "When you play this character and whenever he quests, you may return a Racer character card with cost 6 or less from your discard to your hand. If you do, gain 1 lore.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Racer"],
  abilities: [
    {
      cost: {
        ink: 5,
      },
      id: "1ic-1",
      keyword: "Shift",
      text: "Shift 5",
      type: "keyword",
    },
    {
      effect: {
        steps: [
          {
            chooser: "CONTROLLER",
            effect: {
              type: "return-to-hand",
              target: {
                selector: "chosen",
                count: 1,
                owner: "any",
                zones: ["play"],
                cardTypes: ["character"],
              },
            },
            type: "optional",
          },
          {
            amount: 1,
            type: "gain-lore",
          },
        ],
        type: "sequence",
      },
      id: "1ic-2",
      name: "BACK ON TRACK When you play this character and",
      text: "BACK ON TRACK When you play this character and whenever he quests, you may return a Racer character card with cost 6 or less from your discard to your hand. If you do, gain 1 lore.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
