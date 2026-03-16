import type { CharacterCard } from "@tcg/lorcana-types";

export const henWenPropheticPig: CharacterCard = {
  id: "nAF",
  canonicalId: "ci_nAF",
  reprints: ["set10-138"],
  cardType: "character",
  name: "Hen Wen",
  version: "Prophetic Pig",
  i18n: {
    en: {
      name: "Hen Wen",
      version: "Prophetic Pig",
      text: [
        {
          title: "FUTURE SIGHT",
          description:
            "Whenever this character quests, look at the top card of your deck. Put it on either the top or the bottom of your deck.",
        },
      ],
    },
    de: {
      name: "Hen Wen",
      version: "Hellseherisches Schwein",
      text: [
        {
          title: "BLICK IN DIE ZUKUNFT",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, schaue dir die oberste Karte deines Decks an. Lege sie anschließend entweder auf dein Deck oder darunter.",
        },
      ],
    },
    fr: {
      name: "Tirelire",
      version: "Cochon oracle",
      text: [
        {
          title: "VISION DU FUTUR",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, regardez la carte du dessus de votre pioche. Remettez-la soit sur le dessus de votre pioche, soit en dessous.",
        },
      ],
    },
    it: {
      name: "Ewy",
      version: "Maialina Profetica",
      text: [
        {
          title: "PREVEGGENZA",
          description:
            "Ogni volta che questo personaggio va all'avventura, guarda la prima carta del tuo mazzo. Mettila o in cima o in fondo al tuo mazzo.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Black Cauldron",
  set: "010",
  cardNumber: 138,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_48058e5daf3b4a409e525f826f96ddb1",
    tcgPlayer: 657890,
  },
  text: [
    {
      title: "FUTURE SIGHT",
      description:
        "Whenever this character quests, look at the top card of your deck. Put it on either the top or the bottom of your deck.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        target: "CHOSEN_CHARACTER",
        type: "put-on-bottom",
      },
      id: "1ms-1",
      name: "FUTURE SIGHT",
      text: "FUTURE SIGHT Whenever this character quests, look at the top card of your deck. Put it on either the top or the bottom of your deck.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
