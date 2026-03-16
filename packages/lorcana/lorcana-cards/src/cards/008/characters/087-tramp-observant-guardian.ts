import type { CharacterCard } from "@tcg/lorcana-types";

export const trampObservantGuardian: CharacterCard = {
  id: "I98",
  canonicalId: "ci_I98",
  reprints: ["set8-087"],
  cardType: "character",
  name: "Tramp",
  version: "Observant Guardian",
  i18n: {
    en: {
      name: "Tramp",
      version: "Observant Guardian",
      text: [
        {
          title: "HOW DO I GET IN?",
          description:
            "When you play this character, chosen character gains Ward until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Strolch",
      version: "Aufmerksamer Wächter",
      text: [
        {
          title: "WIE KOMME ICH DA REIN?",
          description:
            "Wenn du diesen Charakter ausspielst, erhält ein Charakter deiner Wahl bis zu Beginn deines nächsten Zuges Behütet. (Gegnerische Mitspielende können den Charakter nicht auswählen, außer um ihn herauszufordern.)",
        },
      ],
    },
    fr: {
      name: "Clochard",
      version: "Gardien observateur",
      text: [
        {
          title: "COMMENT ON Y VA?",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage qui gagne Hors d'atteinte jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Biagio",
      version: "Guardiano Attento",
      text: [
        {
          title: "COME POSSO ENTRARE?",
          description:
            "Quando giochi questo personaggio, un personaggio a tua scelta ottiene Protetto fino all'inizio del tuo prossimo turno. (Gli avversari non possono sceglierlo se non per sfidarlo.)",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Lady and the Tramp",
  set: "008",
  cardNumber: 87,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_adb73493071d4f3a909f089ae63cc0c8",
    tcgPlayer: 631408,
  },
  text: [
    {
      title: "HOW DO I GET IN?",
      description:
        "When you play this character, chosen character gains Ward until the start of your next turn.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        keyword: "Ward",
        target: "SELF",
        type: "gain-keyword",
      },
      id: "fnz-1",
      name: "HOW DO I GET IN?",
      text: "HOW DO I GET IN? When you play this character, chosen character gains Ward until the start of your next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
