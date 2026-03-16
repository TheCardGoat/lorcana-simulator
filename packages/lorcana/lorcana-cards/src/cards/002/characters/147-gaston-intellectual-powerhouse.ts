import type { CharacterCard } from "@tcg/lorcana-types";

export const gastonIntellectualPowerhouse: CharacterCard = {
  id: "E5w",
  canonicalId: "ci_E5w",
  reprints: ["set2-147"],
  cardType: "character",
  name: "Gaston",
  version: "Intellectual Powerhouse",
  i18n: {
    en: {
      name: "Gaston",
      version: "Intellectual Powerhouse",
      text: [
        {
          title: "Shift 4",
        },
        {
          title: "DEVELOPED BRAIN",
          description:
            "When you play this character, look at the top 3 cards of your deck. You may put one into your hand. Put the rest on the bottom of your deck in any order.",
        },
      ],
    },
    de: {
      name: "Gaston",
      version: "Intellektuelles Kraftpaket",
      text: "Gestaltwandel 4 ENTWICKELTES GEHIRN Wenn du diesen Charakter ausspielst, darfst du dir die obersten 3 Karten deines Decks anschauen. Du darfst 1 davon auf deine Hand nehmen. Lege den Rest in beliebiger Reihenfolge unter dein Deck.",
    },
    fr: {
      name: "Gaston",
      version: "Fort du cerveau",
      text: "Alter 4 ESPRIT DÉVELOPPÉ Lorsque vous jouez ce personnage, regardez les 3 premières cartes de votre pioche, vous pouvez ajouter l'une d'elles à votre main. Remettez le reste sous votre pioche, dans l'ordre de votre choix.",
    },
    it: {
      name: "Gaston",
      version: "Concentrato di Intelligenza",
      text: "Trasformazione 4 CERVELLO SVILUPPATO Quando giochi questo personaggio, guarda le prime 3 carte del tuo mazzo. Puoi aggiungerne una alla tua mano. Metti il resto in fondo al tuo mazzo in qualsiasi ordine.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Beauty and the Beast",
  set: "002",
  cardNumber: 147,
  rarity: "rare",
  cost: 6,
  strength: 4,
  willpower: 4,
  lore: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_f3d2d4123acd473da89b7358ae6dc5e4",
    tcgPlayer: 516406,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "DEVELOPED BRAIN",
      description:
        "When you play this character, look at the top 3 cards of your deck. You may put one into your hand. Put the rest on the bottom of your deck in any order.",
    },
  ],
  classifications: ["Floodborn", "Villain"],
  missingTests: true,
  abilities: [
    {
      cost: {
        ink: 4,
      },
      id: "14c-1",
      keyword: "Shift",
      text: "Shift 4",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: "CHOSEN_CHARACTER",
          type: "put-on-bottom",
        },
        type: "optional",
      },
      id: "14c-2",
      name: "DEVELOPED BRAIN",
      text: "DEVELOPED BRAIN When you play this character, look at the top 3 cards of your deck. You may put one into your hand. Put the rest on the bottom of your deck in any order.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
