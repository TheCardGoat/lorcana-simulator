import type { CharacterCard } from "@tcg/lorcana-types";

export const judyHoppsUncoveringClues: CharacterCard = {
  id: "Imt",
  canonicalId: "ci_Imt",
  reprints: ["set10-156"],
  cardType: "character",
  name: "Judy Hopps",
  version: "Uncovering Clues",
  i18n: {
    en: {
      name: "Judy Hopps",
      version: "Uncovering Clues",
      text: [
        {
          title: "THOROUGH INVESTIGATION",
          description:
            "When you play this character and whenever she quests, look at the top 3 cards of your deck. You may reveal a Detective character card and put it into your hand. Put the rest on the bottom of your deck in any order.",
        },
      ],
    },
    de: {
      name: "Judy Hopps",
      version: "Auf der Suche nach Hinweisen",
      text: [
        {
          title: "GRÜNDLICHE ERMITTLUNG",
          description:
            "Wenn du diesen Charakter ausspielst und jedes Mal, wenn er erkundet, schaue dir die obersten 3 Karten deines Decks an. Du darfst 1 Detektiv daraus aufdecken und auf deine Hand nehmen. Lege die restlichen Karten in beliebiger Reihenfolge unter dein Deck.",
        },
      ],
    },
    fr: {
      name: "Judy Hopps",
      version: "Découvrant des indices",
      text: [
        {
          title: "ENQUÊTE APPROFONDIE",
          description:
            "Lorsque vous jouez ce personnage et chaque fois qu'il est envoyé à l'aventure, regardez les 3 cartes du dessus de votre pioche. Vous pouvez révéler une carte Détective parmi elles et la placer dans votre main. Placez les autres cartes sous votre pioche, dans l'ordre de votre choix.",
        },
      ],
    },
    it: {
      name: "Judy Hopps",
      version: "Alla Scoperta di Indizi",
      text: [
        {
          title: "INDAGINE METICOLOSA",
          description:
            "Quando giochi questo personaggio e ogni volta che va all'avventura, guarda le prime 3 carte del tuo mazzo. Puoi rivelare una carta personaggio Detective e aggiungerla alla tua mano. Metti il resto in fondo al tuo mazzo in qualsiasi ordine.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Zootropolis",
  set: "010",
  cardNumber: 156,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_977a785a450a4621b0dcff4404592877",
    tcgPlayer: 653916,
  },
  text: [
    {
      title: "THOROUGH INVESTIGATION",
      description:
        "When you play this character and whenever she quests, look at the top 3 cards of your deck. You may reveal a Detective character card and put it into your hand. Put the rest on the bottom of your deck in any order.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Detective"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: "CHOSEN_CHARACTER",
          type: "put-on-bottom",
        },
        type: "optional",
      },
      id: "1mf-1",
      name: "THOROUGH INVESTIGATION When you play this character and",
      text: "THOROUGH INVESTIGATION When you play this character and whenever she quests, look at the top 3 cards of your deck. You may reveal a Detective character card and put it into your hand. Put the rest on the bottom of your deck in any order.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
