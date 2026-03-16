import type { CharacterCard } from "@tcg/lorcana-types";

export const naniStageManager: CharacterCard = {
  id: "dBq",
  canonicalId: "ci_dBq",
  reprints: ["set11-020"],
  cardType: "character",
  name: "Nani",
  version: "Stage Manager",
  i18n: {
    en: {
      name: "Nani",
      version: "Stage Manager",
      text: [
        {
          title: "THAT'S YOUR CUE",
          description:
            "When you play this character, look at the top 4 cards of your deck. You may reveal a character card with cost 2 or less and put it into your hand. Put the rest on the bottom of your deck in any order.",
        },
      ],
    },
    de: {
      name: "Nani",
      version: "Bühnenmanagerin",
      text: [
        {
          title: "DAS IST DEIN STICHWORT",
          description:
            "Wenn du diesen Charakter ausspielst, schaue dir die obersten 4 Karten deines Decks an. Du darfst 1 Charakterkarte mit Kosten von 2 oder weniger daraus aufdecken und auf deine Hand nehmen. Lege die restlichen Karten in beliebiger Reihenfolge unter dein Deck.",
        },
      ],
    },
    fr: {
      name: "Nani",
      version: "Régisseuse",
      text: [
        {
          title: "C'EST VOTRE TOUR",
          description:
            "Lorsque vous jouez ce personnage, regardez les 4 cartes du dessus de votre pioche. Vous pouvez révéler une carte Personnage coûtant 2 ou moins parmi elles et l'ajouter à votre main. Placez les autres cartes sous votre pioche, dans l'ordre de votre choix.",
        },
      ],
    },
    it: {
      name: "Nani",
      version: "Stage Manager",
      text: [
        {
          title: "TOCCA A TE",
          description:
            "Quando giochi questo personaggio, guarda le prime 4 carte del tuo mazzo. Puoi rivelare una carta personaggio con costo 2 o inferiore e aggiungerla alla tua mano. Metti il resto in fondo al tuo mazzo in qualsiasi ordine.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Lilo and Stitch",
  set: "011",
  cardNumber: 20,
  rarity: "uncommon",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_20232422b3314d02b054a923d610d81d",
    tcgPlayer: 674829,
  },
  text: [
    {
      title: "THAT'S YOUR CUE",
      description:
        "When you play this character, look at the top 4 cards of your deck. You may reveal a character card with cost 2 or less and put it into your hand. Put the rest on the bottom of your deck in any order.",
    },
  ],
  classifications: ["Dreamborn", "Hero"],
  abilities: [
    {
      id: "4fq-1",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: "CHOSEN_CHARACTER",
          type: "put-on-bottom",
        },
        type: "optional",
      },
      name: "THAT'S YOUR CUE",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "THAT'S YOUR CUE When you play this character, look at the top 4 cards of your deck. You may reveal a character card with cost 2 or less and put it into your hand. Put the rest on the bottom of your deck in any order.",
    },
  ],
};
