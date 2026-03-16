import type { CharacterCard } from "@tcg/lorcana-types";

export const peteSteamboatRival: CharacterCard = {
  id: "c2L",
  canonicalId: "ci_c2L",
  reprints: ["set5-116"],
  cardType: "character",
  name: "Pete",
  version: "Steamboat Rival",
  i18n: {
    en: {
      name: "Pete",
      version: "Steamboat Rival",
      text: [
        {
          title: "SCRAM!",
          description:
            "When you play this character, if you have another character named Pete in play, you may banish chosen opposing character.",
        },
      ],
    },
    de: {
      name: "Kater Karlo",
      version: "Dampfschiff-Rivale",
      text: [
        {
          title: "VERSCHWINDE!",
          description:
            "Wenn du diesen Charakter ausspielst und mindestens einen weiteren Kater-Karlo-Charakter im Spiel hast, darfst du einen gegnerischen Charakter deiner Wahl verbannen.",
        },
      ],
    },
    fr: {
      name: "Pat",
      version: "Rival du bateau à vapeur",
      text: [
        {
          title: "FICHE LE CAMP!",
          description:
            "Lorsque vous jouez ce personnage, si vous avez un autre personnage Pat en jeu, vous pouvez choisir un personnage adverse et le bannir.",
        },
      ],
    },
    it: {
      name: "Gambadilegno",
      version: "Rivale del Battello a Vapore",
      text: [
        {
          title: "SPARISCI!",
          description:
            "Quando giochi questo personaggio, se hai in gioco un altro personaggio chiamato Gambadilegno, puoi esiliare un personaggio avversario a tua scelta.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  set: "005",
  cardNumber: 116,
  rarity: "common",
  cost: 7,
  strength: 6,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_3c2769ada879468487b74479a921bc27",
    tcgPlayer: 561963,
  },
  text: [
    {
      title: "SCRAM!",
      description:
        "When you play this character, if you have another character named Pete in play, you may banish chosen opposing character.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "opponent",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "banish",
        },
        type: "optional",
      },
      id: "nvb-1",
      name: "SCRAM!",
      text: "SCRAM! When you play this character, if you have another character named Pete in play, you may banish chosen opposing character.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
