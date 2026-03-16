import type { CharacterCard } from "@tcg/lorcana-types";

export const razoulMenacingGuard: CharacterCard = {
  id: "ez3",
  canonicalId: "ci_ez3",
  reprints: ["set7-189"],
  cardType: "character",
  name: "Razoul",
  version: "Menacing Guard",
  i18n: {
    en: {
      name: "Razoul",
      version: "Menacing Guard",
      text: [
        {
          title: "MY ORDERS COME FROM JAFAR",
          description:
            "When you play this character, if you have a character named Jafar in play, you may banish chosen item.",
        },
      ],
    },
    de: {
      name: "Rasul",
      version: "Bedrohliche Wache",
      text: [
        {
          title: "ICH HABE STRIKTE ANWEISUNGEN VON DSCHAFAR",
          description:
            "Wenn du diesen Charakter ausspielst, falls du einen Dschafar-Charakter im Spiel hast, darfst du einen Gegenstand deiner Wahl verbannen.",
        },
      ],
    },
    fr: {
      name: "Razoul",
      version: "Garde menaçant",
      text: [
        {
          title: "JE NE REÇOIS MES ORDRES QUE DE JAFAR",
          description:
            "Lorsque vous jouez ce personnage, si vous avez un personnage Jafar en jeu, vous pouvez choisir un objet et le bannir.",
        },
      ],
    },
    it: {
      name: "Razoul",
      version: "Guardia Minacciosa",
      text: [
        {
          title: "L'ORDINE MI È STATO DATO DA JAFAR",
          description:
            "Quando giochi questo personaggio, se hai in gioco un personaggio chiamato Jafar, puoi esiliare un oggetto a tua scelta.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Aladdin",
  set: "007",
  cardNumber: 189,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_96a1de9a610e4a3e9dd061cc349d5870",
    tcgPlayer: 619516,
  },
  text: [
    {
      title: "MY ORDERS COME FROM JAFAR",
      description:
        "When you play this character, if you have a character named Jafar in play, you may banish chosen item.",
    },
  ],
  classifications: ["Dreamborn", "Ally", "Captain"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["item"],
          },
          type: "banish",
        },
        type: "optional",
      },
      id: "1gi-1",
      name: "MY ORDERS COME FROM JAFAR",
      text: "MY ORDERS COME FROM JAFAR When you play this character, if you have a character named Jafar in play, you may banish chosen item.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
