import type { ItemCard } from "@tcg/lorcana-types";

export const iceSpikes: ItemCard = {
  id: "zHC",
  canonicalId: "ci_zHC",
  reprints: ["set8-084"],
  cardType: "item",
  name: "Ice Spikes",
  i18n: {
    en: {
      name: "Ice Spikes",
      text: [
        {
          title: "HOLD STILL",
          description: "When you play this item, exert chosen opposing character.",
        },
        {
          title: "IT'S STUCK",
          description:
            "{E}, 1 {I} — Exert chosen opposing item. It can't ready at the start of its next turn.",
        },
      ],
    },
    de: {
      name: "Eisstacheln",
      text: [
        {
          title: "HALT STILL",
          description:
            "Wenn du diesen Gegenstand ausspielst, erschöpfe einen gegnerischen Charakter deiner Wahl. ES KLEMMT, 1 — Erschöpfe einen gegnerischen Gegenstand deiner Wahl. Er wird zu Beginn seines nächsten Zuges nicht bereit gemacht.",
        },
      ],
    },
    fr: {
      name: "Pics de glace",
      text: [
        {
          title: "NE BOUGEZ PLUS",
          description:
            "Lorsque vous jouez cet objet, choisissez un personnage adverse et épuisez-le. C'EST COINCÉ, 1 — Choisissez un objet adverse et épuisez-le. Il ne se redresse pas au début du prochain tour de son propriétaire.",
        },
      ],
    },
    it: {
      name: "Spuntoni di Ghiaccio",
      text: [
        {
          title: "STAI FERMO",
          description:
            "Quando giochi questo oggetto, impegna un personaggio avversario a tua scelta. È BLOCCATO, 1 — Impegna un oggetto avversario a tua scelta. Non si può preparare all'inizio del suo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["amethyst", "sapphire"],
  franchise: "Frozen",
  set: "008",
  cardNumber: 84,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_f045d7f21ccd4cbe8ffb41e436759221",
    tcgPlayer: 631405,
  },
  text: [
    {
      title: "HOLD STILL",
      description: "When you play this item, exert chosen opposing character.",
    },
    {
      title: "IT'S STUCK",
      description:
        "{E}, 1 {I} — Exert chosen opposing item. It can't ready at the start of its next turn.",
    },
  ],
  abilities: [
    {
      id: "1w9-1",
      name: "HOLD STILL",
      text: "HOLD STILL When you play this item, exert chosen opposing character.",
      type: "triggered",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      effect: {
        type: "exert",
        target: {
          selector: "chosen",
          count: 1,
          owner: "opponent",
          zones: ["play"],
          cardTypes: ["character"],
        },
      },
    },
    {
      id: "1w9-2",
      name: "IT'S STUCK",
      text: "IT'S STUCK {E}, 1 {I} — Exert chosen opposing item. It can't ready at the start of its next turn.",
      type: "activated",
      cost: {
        exert: true,
        ink: 1,
      },
      effect: {
        type: "sequence",
        steps: [
          {
            type: "exert",
            target: {
              selector: "chosen",
              count: 1,
              owner: "opponent",
              zones: ["play"],
              cardTypes: ["item"],
            },
          },
          {
            type: "restriction",
            restriction: "cant-ready",
            duration: "until-start-of-next-turn",
            target: {
              ref: "previous-target",
            },
          },
        ],
      },
    },
  ],
};
