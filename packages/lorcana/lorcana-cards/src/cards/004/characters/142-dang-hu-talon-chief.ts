import type { CharacterCard } from "@tcg/lorcana-types";

export const dangHuTalonChief: CharacterCard = {
  id: "52U",
  canonicalId: "ci_52U",
  reprints: ["set4-142"],
  cardType: "character",
  name: "Dang Hu",
  version: "Talon Chief",
  i18n: {
    en: {
      name: "Dang Hu",
      version: "Talon Chief",
      text: [
        {
          title: "YOU BETTER TALK FAST",
          description:
            "Your other Villain characters gain Support. (Whenever they quest, you may add their {S} to another chosen character's {S} this turn.)",
        },
      ],
    },
    de: {
      name: "Dang Hu",
      version: "Oberhaupt von Klaue",
      text: [
        {
          title: "BEEIL DICH BEIM SPRECHEN",
          description:
            "Deine anderen Schurkinnen und Schurken erhalten Unterstützen. (Jedes Mal, wenn die Charaktere erkunden, darfst du ihre in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
        },
      ],
    },
    fr: {
      name: "Dang Hu",
      version: "Cheffe de Griffes du Dragon",
      text: [
        {
          title: "DÉCIDEZ-VOUS VITE",
          description:
            "Vos autres personnages Méchant gagnent Soutien. (Lorsqu'ils sont envoyés à l'aventure, vous pouvez ajouter leur à celle d'un autre personnage au choix pour le reste de ce tour.)",
        },
      ],
    },
    it: {
      name: "Dang Hu",
      version: "Capo di Artiglio",
      text: [
        {
          title: "È MEGLIO SE FAI IN FRETTA I",
          description:
            "tuoi altri personaggi Cattivo ottengono Aiutante. (Ogni volta che vanno all'avventura, puoi aggiungere la loro alla di un altro personaggio a tua scelta per questo turno.)",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Raya and the Last Dragon",
  set: "004",
  cardNumber: 142,
  rarity: "rare",
  cost: 5,
  strength: 3,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_0e74340fa12045cb9bdb4824d72f2ad3",
    tcgPlayer: 549247,
  },
  text: [
    {
      title: "YOU BETTER TALK FAST",
      description:
        "Your other Villain characters gain Support. (Whenever they quest, you may add their {S} to another chosen character's {S} this turn.)",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      effect: {
        keyword: "Support",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
      },
      id: "tq9-1",
      name: "YOU BETTER TALK FAST Your other Villain",
      text: "YOU BETTER TALK FAST Your other Villain characters gain Support.",
      type: "static",
    },
  ],
};
