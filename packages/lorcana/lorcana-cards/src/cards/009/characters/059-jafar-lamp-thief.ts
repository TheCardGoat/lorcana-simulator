import type { CharacterCard } from "@tcg/lorcana-types";

export const jafarLampThief: CharacterCard = {
  id: "LWg",
  canonicalId: "ci_oLk",
  reprints: ["set3-041", "set9-059"],
  cardType: "character",
  name: "Jafar",
  version: "Lamp Thief",
  i18n: {
    en: {
      name: "Jafar",
      version: "Lamp Thief",
      text: [
        {
          title: "I AM YOUR MASTER NOW",
          description:
            "When you play this character, look at the top 2 cards of your deck. Put one on the top of your deck and the other on the bottom.",
        },
      ],
    },
    de: {
      name: "Dschafar",
      version: "Lampendieb",
      text: [
        {
          title: "ICH BIN JETZT DEIN MEISTER",
          description:
            "Wenn du diesen Charakter ausspielst, schaue dir die obersten 2 Karten deines Decks an. Lege 1 davon auf dein Deck und die andere darunter.",
        },
      ],
    },
    fr: {
      name: "Jafar",
      version: "Voleur de lampe",
      text: [
        {
          title: "JE SUIS TON MAÎTRE, À PRÉSENT",
          description:
            "Lorsque vous jouez ce personnage, regardez les 2 premières cartes de votre pioche. Remettez l'une d'elles sur le dessus de votre pioche et l'autre en dessous.",
        },
      ],
    },
    it: {
      name: "Jafar",
      version: "Ladro della Lampada",
      text: [
        {
          title: "SONO IO IL TUO PADRONE ADESSO",
          description:
            "Quando giochi questo personaggio, guarda le prime 2 carte del tuo mazzo. Mettine una in cima al tuo mazzo e l'altra in fondo.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Aladdin",
  set: "009",
  cardNumber: 59,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_fb78447abbd740c3a3509fa91e338b4f",
    tcgPlayer: 650003,
  },
  text: [
    {
      title: "I AM YOUR MASTER NOW",
      description:
        "When you play this character, look at the top 2 cards of your deck. Put one on the top of your deck and the other on the bottom.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Sorcerer"],
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
      id: "eye-1",
      name: "I AM YOUR MASTER NOW",
      text: "I AM YOUR MASTER NOW When you play this character, look at the top 2 cards of your deck. Put one on the top of your deck and the other on the bottom.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
