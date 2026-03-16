import type { CharacterCard } from "@tcg/lorcana-types";

export const rapunzelHighClimber: CharacterCard = {
  id: "RZ1",
  canonicalId: "ci_jRy",
  reprints: ["set8-101"],
  cardType: "character",
  name: "Rapunzel",
  version: "High Climber",
  i18n: {
    en: {
      name: "Rapunzel",
      version: "High Climber",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "WRAPPED UP",
          description:
            "Whenever this character quests, chosen opposing character can't quest during their next turn.",
        },
      ],
    },
    de: {
      name: "Rapunzel",
      version: "Kletterin",
      text: "Wendig EINGEWICKELT Jedes Mal, wenn dieser Charakter erkundet, wähle einen gegnerischen Charakter. Jener kann in seinem nächsten Zug nicht erkunden.",
    },
    fr: {
      name: "Raiponce",
      version: "Grimpeuse en haute altitude",
      text: "Insaisissable ENROULÉ Chaque fois que ce personnage est envoyé à l'aventure, choisissez un personnage adverse qui ne peut pas être envoyé à l'aventure durant son prochain tour.",
    },
    it: {
      name: "Rapunzel",
      version: "Scalatrice d'Alta Quota",
      text: "Sfuggente AVVOLTO Ogni volta che questo personaggio va all'avventura, un personaggio avversario a tua scelta non può andare all'avventura durante il suo prossimo turno.",
    },
  },
  inkType: ["emerald"],
  franchise: "Tangled",
  set: "008",
  cardNumber: 101,
  rarity: "legendary",
  cost: 5,
  strength: 2,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_cf079ada81bd48cdb9290647f227982c",
    tcgPlayer: 633103,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "WRAPPED UP",
      description:
        "Whenever this character quests, chosen opposing character can't quest during their next turn.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Princess"],
  abilities: [
    {
      id: "1ob-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        duration: "until-start-of-next-turn",
        restriction: "cant-quest",
        target: "SELF",
        type: "restriction",
      },
      id: "1ob-2",
      name: "WRAPPED UP",
      text: "WRAPPED UP Whenever this character quests, chosen opposing character can't quest during their next turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
