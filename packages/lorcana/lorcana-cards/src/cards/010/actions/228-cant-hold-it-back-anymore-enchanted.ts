import type { ActionCard } from "@tcg/lorcana-types";

export const cantHoldItBackAnymoreEnchanted: ActionCard = {
  id: "wkz",
  canonicalId: "ci_s2u",
  reprints: ["set10-062"],
  cardType: "action",
  name: "Can't Hold it Back Anymore",
  i18n: {
    en: {
      name: "Can't Hold it Back Anymore",
      text: "Exert chosen opposing character. Move all damage counters from all other characters to that character.",
    },
    de: {
      name: "Die Kraft, sie ist grenzenlos",
      text: "Erschöpfe einen gegnerischen Charakter deiner Wahl. Verschiebe alle Schadensmarker von allen anderen Charakteren zu dem gewählten Charakter.",
    },
    fr: {
      name: "Je ne mentirai plus jamais",
      text: "Choisissez un personnage adverse et épuisez-le. Déplacez tous les dommages de tous les autres personnages sur le personnage ainsi choisi.",
    },
    it: {
      name: "Che Il Cuore Mi Guidi un Po'",
      text: "Impegna un personaggio avversario a tua scelta. Sposta tutti i segnalini danno da tutti gli altri personaggi a quel personaggio.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Frozen",
  set: "010",
  cardNumber: 228,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 4,
  inkable: false,
  externalIds: {
    lorcast: "crd_715c77fe8d9b410d8194beea91b7163d",
    tcgPlayer: 660041,
  },
  text: "Exert chosen opposing character. Move all damage counters from all other characters to that character.",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        steps: [
          {
            target: {
              cardTypes: ["character"],
              count: 1,
              owner: "opponent",
              selector: "chosen",
              zones: ["play"],
            },
            type: "exert",
          },
          {
            from: "ALL_CHARACTERS",
            to: {
              cardTypes: ["character"],
              count: 1,
              owner: "opponent",
              selector: "chosen",
              zones: ["play"],
            },
            type: "move-damage",
          },
        ],
        type: "sequence",
      },
      type: "action",
    },
  ],
};
