import type { CharacterCard } from "@tcg/lorcana-types";

export const rapunzelReadyForAdventure: CharacterCard = {
  id: "8hR",
  canonicalId: "ci_8hR",
  reprints: ["set10-003"],
  cardType: "character",
  name: "Rapunzel",
  version: "Ready for Adventure",
  i18n: {
    en: {
      name: "Rapunzel",
      version: "Ready for Adventure",
      text: [
        {
          title: "Support",
        },
        {
          title: "ACT OF KINDNESS",
          description:
            "Whenever one of your characters is chosen for Support, until the start of your next turn, the next time they would be dealt damage they take no damage instead.",
        },
      ],
    },
    de: {
      name: "Rapunzel",
      version: "Bereit für Abenteuer",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.) AKT DER FREUNDLICHKEIT Jedes Mal, wenn einer deiner Charaktere für Unterstützen ausgewählt wird, erhält er bis zu Beginn deines nächsten Zuges das nächste Mal, wenn er Schaden erhalten würde, stattdessen keinen Schaden.",
    },
    fr: {
      name: "Raiponce",
      version: "Parée pour l'aventure",
      text: "Soutien GESTE ALTRUISTE Chaque fois que l'un de vos personnages est choisi par la capacité Soutien, jusqu'au début de votre prochain tour, la prochaine fois que ce personnage-là devrait subir des dommages, il n'en subit aucun à la place.",
    },
    it: {
      name: "Rapunzel",
      version: "Pronta per l'Avventura",
      text: "Aiutante GESTO DI BONTÀ Ogni volta che uno dei tuoi personaggi viene scelto per Aiutante, fino all'inizio del tuo prossimo turno, la prossima volta che subirebbe danni invece non subisce danni.",
    },
  },
  inkType: ["amber"],
  franchise: "Tangled",
  set: "010",
  cardNumber: 3,
  rarity: "legendary",
  cost: 2,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_70ae5f21fa1347b49ee910683e34d90e",
    tcgPlayer: 660274,
  },
  text: [
    {
      title: "Support",
    },
    {
      title: "ACT OF KINDNESS",
      description:
        "Whenever one of your characters is chosen for Support, until the start of your next turn, the next time they would be dealt damage they take no damage instead.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Princess"],
  abilities: [
    {
      id: "8hR-1",
      keyword: "Support",
      text: "Support",
      type: "keyword",
    },
    {
      effect: {
        duration: "until-start-of-next-turn",
        replacement: {
          consumeOnApply: true,
          eventKinds: ["deal-damage", "challenge-damage"],
          targetRef: "trigger-subject",
          type: "prevent-damage",
        },
        type: "create-replacement-effect",
      },
      id: "8hR-2",
      name: "ACT OF KINDNESS",
      text: "ACT OF KINDNESS Whenever one of your characters is chosen for Support, until the start of your next turn, the next time they would be dealt damage they take no damage instead.",
      trigger: {
        event: "support",
        on: "YOUR_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
