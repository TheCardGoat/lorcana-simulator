import type { CharacterCard } from "@tcg/lorcana-types";

export const aladdinVigilantGuard: CharacterCard = {
  id: "728",
  canonicalId: "ci_728",
  reprints: ["set8-170"],
  cardType: "character",
  name: "Aladdin",
  version: "Vigilant Guard",
  i18n: {
    en: {
      name: "Aladdin",
      version: "Vigilant Guard",
      text: [
        {
          title: "Bodyguard",
        },
        {
          title: "SAFE PASSAGE",
          description:
            "Whenever one of your Ally characters quests, you may remove up to 2 damage from this character.",
        },
      ],
    },
    de: {
      name: "Aladdin",
      version: "Wachsamer Gardist",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.) SICHERER DURCHGANG Jedes Mal, wenn einer deiner Verbündeten erkundet, darfst du bis zu 2 Schaden von diesem Charakter entfernen.",
    },
    fr: {
      name: "Aladdin",
      version: "Protecteur vigilant",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il défie l'un de vos personnages, un personnage adverse doit, s'il le peut, choisir l'un de vos personnages avec Rempart.) PASSAGE SÛR Chaque fois que l'un de vos personnages Allié est envoyé à l'aventure, vous pouvez retirer jusqu'à 2 dommages de ce personnage-ci.",
        },
      ],
    },
    it: {
      name: "Aladdin",
      version: "Guardia Vigile",
      text: "Guardiano PASSAGGIO SICURO Ogni volta che uno dei tui personaggi Alleato va all'avventura, puoi rimuovere fino a 2 danni da questo personaggio.",
    },
  },
  inkType: ["sapphire", "steel"],
  franchise: "Aladdin",
  set: "008",
  cardNumber: 170,
  rarity: "rare",
  cost: 6,
  strength: 1,
  willpower: 9,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_809fee72df7a4e4e837973d452e858f6",
    tcgPlayer: 631466,
  },
  text: [
    {
      title: "Bodyguard",
    },
    {
      title: "SAFE PASSAGE",
      description:
        "Whenever one of your Ally characters quests, you may remove up to 2 damage from this character.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Prince"],
  abilities: [
    {
      id: "fh8-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 2,
          target: {
            selector: "self",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "remove-damage",
          upTo: true,
        },
        type: "optional",
      },
      id: "fh8-2",
      name: "SAFE PASSAGE",
      text: "SAFE PASSAGE Whenever one of your Ally characters quests, you may remove up to 2 damage from this character.",
      trigger: {
        event: "banish",
        on: "YOUR_OTHER_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
