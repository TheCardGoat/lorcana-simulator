import type { CharacterCard } from "@tcg/lorcana-types";

export const jebidiahFarnsworthExpeditionCook: CharacterCard = {
  id: "FOI",
  canonicalId: "ci_FOI",
  reprints: ["set7-174"],
  cardType: "character",
  name: "Jebidiah Farnsworth",
  version: "Expedition Cook",
  i18n: {
    en: {
      name: "Jebidiah Farnsworth",
      version: "Expedition Cook",
      text: [
        {
          title: "Support",
        },
        {
          title: "I GOT YOUR FOUR BASIC FOOD GROUPS",
          description:
            "When you play this character, chosen character gains Resist +1 until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Jebidiah Farnsworth",
      version: "Expeditionskoch",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.) ICH HAB DIE VIER HAUPTNAHRUNGSGRUPPEN Wenn du diesen Charakter ausspielst, erhält ein Charakter deiner Wahl bis zu Beginn deines nächsten Zuges Robust +1. (Reduziere jeglichen Schaden, der dem Charakter zugefügt wird, um 1.)",
    },
    fr: {
      name: "Jebidiah Farnsworth",
      version: "Cuisinier de l'expédition",
      text: "Soutien J'AI MIS VOS QUATRE GRANDS GROUPES ALIMENTAIRES Lorsque vous jouez ce personnage, choisissez un personnage qui gagne Résistance +1 jusqu'au début de votre prochain tour.",
    },
    it: {
      name: "Jebidiah Farnsworth",
      version: "Cuoco della Spedizione",
      text: "Aiutante CE LI HO I QUATTRO PRINCIPALI GRUPPI ALIMENTARI Quando giochi questo personaggio, un personaggio a tua scelta ottiene Resistere +1 fino all'inizio del tuo prossimo turno.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Atlantis",
  set: "007",
  cardNumber: 174,
  rarity: "uncommon",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_2c68909051f6499f8a6cab0f663e7bba",
    tcgPlayer: 619506,
  },
  text: [
    {
      title: "Support",
    },
    {
      title: "I GOT YOUR FOUR BASIC FOOD GROUPS",
      description:
        "When you play this character, chosen character gains Resist +1 until the start of your next turn.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1z1-1",
      keyword: "Support",
      text: "Support",
      type: "keyword",
    },
    {
      effect: {
        keyword: "Resist",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "gain-keyword",
        value: 1,
      },
      id: "1z1-2",
      name: "I GOT YOUR FOUR BASIC FOOD GROUPS",
      text: "I GOT YOUR FOUR BASIC FOOD GROUPS When you play this character, chosen character gains Resist +1 until the start of your next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
