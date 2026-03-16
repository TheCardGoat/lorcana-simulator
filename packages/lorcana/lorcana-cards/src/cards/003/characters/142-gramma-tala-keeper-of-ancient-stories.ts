import type { CharacterCard } from "@tcg/lorcana-types";

export const grammaTalaKeeperOfAncientStories: CharacterCard = {
  id: "1sm",
  canonicalId: "ci_1sm",
  reprints: ["set3-142"],
  cardType: "character",
  name: "Gramma Tala",
  version: "Keeper of Ancient Stories",
  i18n: {
    en: {
      name: "Gramma Tala",
      version: "Keeper of Ancient Stories",
      text: [
        {
          title: "THERE WAS ONLY OCEAN",
          description:
            "When you play this character, look at the top 2 cards of your deck. You may put one into your hand. Put the rest on the bottom of your deck in any order.",
        },
      ],
    },
    de: {
      name: "Gramma Tala",
      version: "Bewahrerin der alten Geschichten",
      text: [
        {
          title: "ES GAB NICHTS ALS DEN OZEAN",
          description:
            "Wenn du diesen Charakter ausspielst, schaue dir die obersten 2 Karten deines Decks an. Du darfst 1 davon auf deine Hand nehmen. Lege die restlichen Karten in beliebiger Reihenfolge unter dein Deck.",
        },
      ],
    },
    fr: {
      name: "Grand-mère Tala",
      version: "Gardienne des histoires ancestrales",
      text: [
        {
          title: "IL N'Y AVAIT QUE L'OCÉAN",
          description:
            "Lorsque vous jouez ce personnage, regardez les 2 premières cartes de votre pioche. Vous pouvez en ajouter 1 à votre main. Remettez le reste sous votre pioche.",
        },
      ],
    },
    it: {
      name: "Nonna Tala",
      version: "Custode delle Antiche Storie",
      text: [
        {
          title: "C'ERA SOLO L'OCEANO",
          description:
            "Quando giochi questo personaggio, guarda le prime 2 carte del tuo mazzo. Puoi aggiungerne una alla tua mano. Metti il resto in fondo al tuo mazzo in qualsiasi ordine.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Moana",
  set: "003",
  cardNumber: 142,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_2b3c2bc74af94a07ae07634fb74f237b",
    tcgPlayer: 538361,
  },
  text: [
    {
      title: "THERE WAS ONLY OCEAN",
      description:
        "When you play this character, look at the top 2 cards of your deck. You may put one into your hand. Put the rest on the bottom of your deck in any order.",
    },
  ],
  classifications: ["Storyborn", "Mentor"],
  missingTests: true,
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
      id: "1ga-1",
      name: "THERE WAS ONLY OCEAN",
      text: "THERE WAS ONLY OCEAN When you play this character, look at the top 2 cards of your deck. You may put one into your hand. Put the rest on the bottom of your deck in any order.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
