import type { ItemCard } from "@tcg/lorcana-types";

export const blueSmoke: ItemCard = {
  id: "IFf",
  canonicalId: "ci_IFf",
  reprints: ["set11-166"],
  cardType: "item",
  name: "Blue Smoke",
  i18n: {
    en: {
      name: "Blue Smoke",
      text: [
        {
          title: "THEATRICAL ENTRANCE",
          description:
            "If you have a character named Darkwing Duck in play, you pay 1 {I} less to play this item.",
        },
        {
          title: "CLOUD OF MYSTERY",
          description:
            "{E}, 1 {I}, Banish this item — Chosen character gains Ward until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Blauer Rauch",
      text: [
        {
          title: "THEATRALISCHER EINGANG",
          description:
            "Falls du einen Darkwing-Duck-Charakter im Spiel hast, zahlst du 1 weniger, um diesen Gegenstand auszuspielen. MYSTERIÖSE WOLKE, 1, Verbanne diesen Gegenstand — Ein Charakter deiner Wahl erhält bis zu Beginn deines nächsten Zuges Behütet. (Gegnerische Mitspielende können den Charakter nicht auswählen, außer um ihn herauszufordern.)",
        },
      ],
    },
    fr: {
      name: "Fumée bleue",
      text: [
        {
          title: "ENTRÉE THÉÂTRALE",
          description:
            "Jouer cet objet vous coûte 1 de moins si vous avez un personnage Myster Mask en jeu. NUAGE DE MYSTÈRE, 1, Bannissez cet objet — Choisissez un personnage qui gagne Hors d'atteinte jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Fumo Blu",
      text: [
        {
          title: "ENTRATA TEATRALE",
          description:
            "Se hai in gioco un personaggio chiamato Darkwing Duck, paga 1 in meno per giocare questo oggetto. NUVOLA DI MISTERO, 1, esilia questo oggetto — Un personaggio a tua scelta ottiene Protetto fino all'inizio del tuo prossimo turno. (Gli avversari non possono sceglierlo se non per sfidarlo.)",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Darkwing Duck",
  set: "011",
  cardNumber: 166,
  rarity: "common",
  cost: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_9d937b1e551d47c18d97a54494378368",
    tcgPlayer: 676230,
  },
  text: [
    {
      title: "THEATRICAL ENTRANCE",
      description:
        "If you have a character named Darkwing Duck in play, you pay 1 {I} less to play this item.",
    },
    {
      title: "CLOUD OF MYSTERY",
      description:
        "{E}, 1 {I}, Banish this item — Chosen character gains Ward until the start of your next turn.",
    },
  ],
  abilities: [
    {
      id: "1pq-1",
      name: "THEATRICAL ENTRANCE",
      type: "static",
      condition: {
        type: "has-named-character",
        controller: "you",
        name: "Darkwing Duck",
      },
      effect: {
        type: "cost-reduction",
        amount: 1,
        cardType: "item",
      },
      text: "THEATRICAL ENTRANCE If you have a character named Darkwing Duck in play, you pay 1 {I} less to play this item.",
    },
    {
      id: "1pq-2",
      name: "CLOUD OF MYSTERY",
      type: "activated",
      cost: {
        exert: true,
        ink: 1,
        banishSelf: true,
      },
      effect: {
        type: "gain-keyword",
        keyword: "Ward",
        duration: "until-start-of-next-turn",
        target: {
          selector: "chosen",
          count: 1,
          owner: "any",
          zones: ["play"],
          cardTypes: ["character"],
        },
      },
      text: "CLOUD OF MYSTERY {E}, 1 {I}, Banish this item — Chosen character gains Ward until the start of your next turn.",
    },
  ],
};
