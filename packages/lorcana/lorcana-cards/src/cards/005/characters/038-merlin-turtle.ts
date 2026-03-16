import type { CharacterCard } from "@tcg/lorcana-types";

export const merlinTurtle: CharacterCard = {
  id: "Xwi",
  canonicalId: "ci_Xwi",
  reprints: ["set5-038"],
  cardType: "character",
  name: "Merlin",
  version: "Turtle",
  i18n: {
    en: {
      name: "Merlin",
      version: "Turtle",
      text: [
        {
          title: "GIVE ME TIME TO THINK",
          description:
            "When you play this character and when he leaves play, look at the top 2 cards of your deck. Put one on the top of your deck and the other on the bottom.",
        },
      ],
    },
    de: {
      name: "Merlin",
      version: "Schildkröte",
      text: [
        {
          title: "GIB MIR ZEIT ZUM DENKEN",
          description:
            "Wenn du diesen Charakter ausspielst und wenn er das Spiel verlässt, schaue dir die obersten 2 Karten deines Decks an. Lege 1 davon auf dein Deck und die andere darunter.",
        },
      ],
    },
    fr: {
      name: "Merlin",
      version: "En tortue",
      text: [
        {
          title: "LAISSEZ-MOI Y RÉFLÉCHIR",
          description:
            "Lorsque vous jouez ce personnage, et lorsqu'il quitte le jeu, regardez les 2 cartes du dessus de votre pioche. Remettez-en une sur le dessus de votre pioche et l'autre en dessous.",
        },
      ],
    },
    it: {
      name: "Merlino",
      version: "Tartaruga",
      text: [
        {
          title: "DAMMI TEMPO DI PENSARE",
          description:
            "Quando giochi questo personaggio e quando lascia il gioco, guarda le prime 2 carte del tuo mazzo. Mettine una in cima e l'altra in fondo al tuo mazzo.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Sword in the Stone",
  set: "005",
  cardNumber: 38,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_830fee590a4e49c1a54622779b4380c3",
    tcgPlayer: 561951,
  },
  text: [
    {
      title: "GIVE ME TIME TO THINK",
      description:
        "When you play this character and when he leaves play, look at the top 2 cards of your deck. Put one on the top of your deck and the other on the bottom.",
    },
  ],
  classifications: ["Storyborn", "Mentor", "Sorcerer"],
  abilities: [
    {
      effect: {
        steps: [
          {
            amount: 2,
            destinations: [
              {
                zone: "deck-bottom",
                remainder: true,
                ordering: "player-choice",
              },
            ],
            target: "CONTROLLER",
            type: "scry",
          },
          {
            target: "CHOSEN_CHARACTER",
            type: "put-on-bottom",
          },
        ],
        type: "sequence",
      },
      id: "1ed-1",
      name: "GIVE ME TIME TO THINK When you play this character and",
      text: "GIVE ME TIME TO THINK When you play this character and when he leaves play, look at the top 2 cards of your deck. Put one on the top of your deck and the other on the bottom.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
