import type { CharacterCard } from "@tcg/lorcana-types";

export const shereKhanFearsomeTiger: CharacterCard = {
  id: "oaJ",
  canonicalId: "ci_oaJ",
  reprints: ["set10-088"],
  cardType: "character",
  name: "Shere Khan",
  version: "Fearsome Tiger",
  i18n: {
    en: {
      name: "Shere Khan",
      version: "Fearsome Tiger",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "ON THE HUNT",
          description:
            "Whenever this character quests, banish chosen opposing damaged character. Then, you may put 1 damage counter on another chosen character.",
        },
      ],
    },
    de: {
      name: "Shir Khan",
      version: "Furchterregender Tiger",
      text: "Wendig AUF DER JAGD Jedes Mal, wenn dieser Charakter erkundet, verbanne einen gegnerischen beschädigten Charakter deiner Wahl. Danach darfst du 1 Schadensmarker auf einen anderen Charakter deiner Wahl legen.",
    },
    fr: {
      name: "Shere Khan",
      version: "Tigre redoutable",
      text: "Insaisissable EN CHASSE Chaque fois que ce personnage est envoyé à l'aventure, choisissez un personnage adverse avec au moins un dommage et bannissez-le. Ensuite, vous pouvez choisir un autre personnage et placer 1 dommage sur lui.",
    },
    it: {
      name: "Shere Khan",
      version: "Tigre Spaventosa",
      text: "Sfuggente A CACCIA Ogni volta che questo personaggio va all'avventura, esilia un personaggio avversario danneggiato a tua scelta. Poi, puoi mettere 1 segnalino danno su un altro personaggio a tua scelta.",
    },
  },
  inkType: ["emerald"],
  franchise: "Jungle Book",
  set: "010",
  cardNumber: 88,
  rarity: "legendary",
  cost: 6,
  strength: 5,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_3a25fa761fb34e3d96aacc65d82eb2af",
    tcgPlayer: 659623,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "ON THE HUNT",
      description:
        "Whenever this character quests, banish chosen opposing damaged character. Then, you may put 1 damage counter on another chosen character.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      id: "1gj-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "put-damage",
        },
        type: "optional",
      },
      id: "1gj-2",
      name: "ON THE HUNT",
      text: "ON THE HUNT Whenever this character quests, banish chosen opposing damaged character. Then, you may put 1 damage counter on another chosen character.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
