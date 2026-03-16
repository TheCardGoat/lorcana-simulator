import type { CharacterCard } from "@tcg/lorcana-types";

export const baymaxUpgradedRobot: CharacterCard = {
  id: "ibv",
  canonicalId: "ci_ibv",
  reprints: ["set7-175"],
  cardType: "character",
  name: "Baymax",
  version: "Upgraded Robot",
  i18n: {
    en: {
      name: "Baymax",
      version: "Upgraded Robot",
      text: [
        {
          title: "Support",
        },
        {
          title: "ADVANCED SCANNER",
          description:
            "When you play this character, look at the top 4 cards of your deck. You may reveal a Floodborn character card and put it into your hand. Put the rest on the bottom of your deck in any order.",
        },
      ],
    },
    de: {
      name: "Baymax",
      version: "Aufgerüsteter Roboter",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.) ERWEITERTER SCANNER Wenn du diesen Charakter ausspielst, schaue dir die obersten 4 Karten deines Decks an. Du darfst 1 Flutgestalt-Charakterkarte daraus aufdecken und auf deine Hand nehmen. Lege die restlichen Karten in beliebiger Reihenfolge unter dein Deck.",
    },
    fr: {
      name: "Baymax",
      version: "Robot amélioré",
      text: "Soutien SUPER CAPTEUR Lorsque vous jouez ce personnage, regardez les 4 cartes du dessus de votre pioche. Vous pouvez révéler un personnage Floodborn parmi elles et le placer dans votre main. Placez les autres cartes sous votre pioche, dans l'ordre de votre choix.",
    },
    it: {
      name: "Baymax",
      version: "Robot Potenziato",
      text: "Aiutante SCANNER AVANZATO Quando giochi questo personaggio, guarda le prime 4 carte del tuo mazzo. Puoi rivelare una carta personaggio Imbevuto e aggiungerla alla tua mano. Metti il resto in fondo al tuo mazzo in qualsiasi ordine.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Big Hero 6",
  set: "007",
  cardNumber: 175,
  rarity: "rare",
  cost: 5,
  strength: 3,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_4b7cdb55b647410f85f60e74a4a4b619",
    tcgPlayer: 619507,
  },
  text: [
    {
      title: "Support",
    },
    {
      title: "ADVANCED SCANNER",
      description:
        "When you play this character, look at the top 4 cards of your deck. You may reveal a Floodborn character card and put it into your hand. Put the rest on the bottom of your deck in any order.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Robot"],
  abilities: [
    {
      id: "10n-1",
      keyword: "Support",
      text: "Support",
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
      id: "10n-2",
      name: "ADVANCED SCANNER",
      text: "ADVANCED SCANNER When you play this character, look at the top 4 cards of your deck. You may reveal a Floodborn character card and put it into your hand. Put the rest on the bottom of your deck in any order.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
