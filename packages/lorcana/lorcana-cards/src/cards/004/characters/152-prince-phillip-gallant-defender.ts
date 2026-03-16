import type { CharacterCard } from "@tcg/lorcana-types";

export const princePhillipGallantDefender: CharacterCard = {
  id: "kbT",
  canonicalId: "ci_kbT",
  reprints: ["set4-152"],
  cardType: "character",
  name: "Prince Phillip",
  version: "Gallant Defender",
  i18n: {
    en: {
      name: "Prince Phillip",
      version: "Gallant Defender",
      text: [
        {
          title: "Support",
        },
        {
          title: "BEST DEFENSE",
          description:
            "Whenever one of your characters is chosen for Support, they gain Resist +1 this turn.",
        },
      ],
    },
    de: {
      name: "Prinz Phillip",
      version: "Galanter Verteidiger",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.) BESTE VERTEIDIGUNG Jedes Mal, wenn einer deiner Charaktere mit Unterstützen ausgewählt wird, erhält er in diesem Zug Robust +1. (Reduziere jeglichen Schaden, der dem Charakter zugefügt wird, um 1.)",
    },
    fr: {
      name: "Prince Philippe",
      version: "Galant défenseur",
      text: "Soutien MEILLEURE DÉFENSE Chaque fois qu'un de vos personnages est choisi par la capacité Soutien, il gagne Résistance +1 pour le reste de ce tour.",
    },
    it: {
      name: "Principe Filippo",
      version: "Difensore Valoroso",
      text: "Aiutante LA MIGLIOR DIFESA Ogni volta che uno dei tuoi personaggi viene scelto da un Aiutante, ottiene Resistere +1 per questo turno.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Sleeping Beauty",
  set: "004",
  cardNumber: 152,
  rarity: "rare",
  cost: 3,
  strength: 1,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_02bb98b56ae0427abdd944699f1bda1c",
    tcgPlayer: 549517,
  },
  text: [
    {
      title: "Support",
    },
    {
      title: "BEST DEFENSE",
      description:
        "Whenever one of your characters is chosen for Support, they gain Resist +1 this turn.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Prince"],
  abilities: [
    {
      id: "1f7-1",
      keyword: "Support",
      text: "Support",
      type: "keyword",
    },
    {
      effect: {
        duration: "this-turn",
        keyword: "Resist",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
        value: 1,
      },
      id: "1f7-2",
      name: "BEST DEFENSE",
      text: "BEST DEFENSE Whenever one of your characters is chosen for Support, they gain Resist +1 this turn.",
      trigger: {
        event: "banish",
        on: "YOUR_OTHER_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
