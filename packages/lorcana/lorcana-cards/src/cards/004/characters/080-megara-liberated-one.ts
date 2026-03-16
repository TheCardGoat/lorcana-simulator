import type { CharacterCard } from "@tcg/lorcana-types";

export const megaraLiberatedOne: CharacterCard = {
  id: "q5j",
  canonicalId: "ci_q5j",
  reprints: ["set4-080"],
  cardType: "character",
  name: "Megara",
  version: "Liberated One",
  i18n: {
    en: {
      name: "Megara",
      version: "Liberated One",
      text: [
        {
          title: "Ward",
        },
        {
          title: "PEOPLE ALWAYS DO CRAZY THINGS",
          description:
            "Whenever you play a character named Hercules, you may ready this character.",
        },
      ],
    },
    de: {
      name: "Meg",
      version: "Die Befreite",
      text: "Behütet SCHON VERRÜCKT, WAS MENSCHEN ALLES MACHEN Jedes Mal, wenn du einen Hercules-Charakter ausspielst, darfst du diesen Charakter bereit machen.",
    },
    fr: {
      name: "Mégara",
      version: "Libérée",
      text: "Hors d'atteinte LES GENS FONT PARFOIS DE DRÔLES DE CHOSES Chaque fois que vous jouez un personnage Hercule, vous pouvez redresser ce personnage.",
    },
    it: {
      name: "Megara",
      version: "Liberata",
      text: "Protetto LE PERSONE FANNO SEMPRE COSE PAZZE Ogni volta che giochi un personaggio chiamato Ercole, puoi preparare questo personaggio.",
    },
  },
  inkType: ["emerald"],
  franchise: "Hercules",
  set: "004",
  cardNumber: 80,
  rarity: "uncommon",
  cost: 5,
  strength: 4,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_6cb1a1b4a1e447b19a2a22c63e15dec9",
    tcgPlayer: 549622,
  },
  text: [
    {
      title: "Ward",
    },
    {
      title: "PEOPLE ALWAYS DO CRAZY THINGS",
      description: "Whenever you play a character named Hercules, you may ready this character.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1qr-1",
      keyword: "Ward",
      text: "Ward",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "self",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "ready",
        },
        type: "optional",
      },
      id: "1qr-2",
      name: "PEOPLE ALWAYS DO CRAZY THINGS",
      text: "PEOPLE ALWAYS DO CRAZY THINGS Whenever you play a character named Hercules, you may ready this character.",
      trigger: {
        event: "play",
        on: {
          cardType: "character",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
