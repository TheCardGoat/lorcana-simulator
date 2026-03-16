import type { CharacterCard } from "@tcg/lorcana-types";

export const magicaDeSpellShadowForm: CharacterCard = {
  id: "dre",
  canonicalId: "ci_dre",
  reprints: ["set8-066"],
  cardType: "character",
  name: "Magica De Spell",
  version: "Shadow Form",
  i18n: {
    en: {
      name: "Magica De Spell",
      version: "Shadow Form",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "DANCE OF DARKNESS",
          description:
            "When you play this character, you may return one of your other characters to your hand to draw a card.",
        },
      ],
    },
    de: {
      name: "Gundel Gaukeley",
      version: "Schattenform",
      text: "Wendig TANZ DER DUNKELHEIT Wenn du diesen Charakter ausspielst, darfst du einen deiner anderen Charaktere wählen und zurück auf deine Hand nehmen, um eine Karte zu ziehen.",
    },
    fr: {
      name: "Miss Tick",
      version: "Sous forme d’ombre",
      text: "Insaisissable DANSE DES TÉNÈBRES Lorsque vous jouez ce personnage, vous pouvez choisir et renvoyer l'un de vos personnages dans votre main pour piocher une carte.",
    },
    it: {
      name: "Amelia",
      version: "In Forma d'Ombra",
      text: "Sfuggente DANZA DELLE OMBRE Quando giochi questo personaggio, puoi riprendere in mano un tuo altro personaggio a tua scelta per pescare una carta.",
    },
  },
  inkType: ["amethyst", "emerald"],
  franchise: "Ducktales",
  set: "008",
  cardNumber: 66,
  rarity: "uncommon",
  cost: 5,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_67e61d2f97084cb69e58b70c2a5d90d4",
    tcgPlayer: 632709,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "DANCE OF DARKNESS",
      description:
        "When you play this character, you may return one of your other characters to your hand to draw a card.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Sorcerer"],
  abilities: [
    {
      id: "sma-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "all",
            count: "all",
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "return-to-hand",
        },
        type: "optional",
      },
      id: "sma-2",
      name: "DANCE OF DARKNESS",
      text: "DANCE OF DARKNESS When you play this character, you may return one of your other characters to your hand to draw a card.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
