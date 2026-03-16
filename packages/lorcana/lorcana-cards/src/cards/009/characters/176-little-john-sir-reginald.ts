import type { CharacterCard } from "@tcg/lorcana-types";

export const littleJohnSirReginald: CharacterCard = {
  id: "2JD",
  canonicalId: "ci_2JD",
  reprints: ["set9-176"],
  cardType: "character",
  name: "Little John",
  version: "Sir Reginald",
  i18n: {
    en: {
      name: "Little John",
      version: "Sir Reginald",
      text: "WHAT A BEAUTIFUL BRAWL! When you play this character, choose one:\n- Chosen Hero character gains Resist +2 this turn.\n- Deal 2 damage to chosen Villain character.",
    },
    de: {
      name: "Little John",
      version: "Sir Reginald",
      text: [
        {
          title: "DAS MACHT UNERHÖRT SPASS!",
          description:
            "Wenn du diesen Charakter ausspielst, wähle eine Möglichkeit aus: • Ein Held deiner Wahl erhält in diesem Zug Robust +2. (Reduziere jeglichen Schaden, der dem Charakter zugefügt wird, um 2.) • Füge einem Schurken deiner Wahl 2 Schaden zu.",
        },
      ],
    },
    fr: {
      name: "Petit Jean",
      version: "Sir Reginald",
      text: [
        {
          title: "ÇA VA CHAUFFER!",
          description:
            "Lorsque vous jouez ce personnage, choisissez entre: • Choisissez un personnage Héros qui gagne Résistance +2 pour le reste de ce tour. • Choisissez un personnage Méchant et infligez-lui 2 dommages.",
        },
      ],
    },
    it: {
      name: "Little John",
      version: "Ser Reginald",
      text: [
        {
          title: "ME LA VOGLIO GODERE TUTTA!",
          description:
            "Quando giochi questo personaggio, scegli uno: • Un personaggio Eroe a tua scelta ottiene Resistere +2 per questo turno. • Infliggi 2 danni a un personaggio Cattivo a tua scelta.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Robin Hood",
  set: "009",
  cardNumber: 176,
  rarity: "uncommon",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_4d7bf56fb70e41289a010677c1ebea27",
    tcgPlayer: 650109,
  },
  text: "WHAT A BEAUTIFUL BRAWL! When you play this character, choose one:\n- Chosen Hero character gains Resist +2 this turn.\n- Deal 2 damage to chosen Villain character.",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "1mt-1",
      name: "WHAT A BEAUTIFUL BRAWL!",
      text: "WHAT A BEAUTIFUL BRAWL! When you play this character, choose one:",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
    {
      effect: {
        duration: "this-turn",
        keyword: "Resist",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
        value: 2,
      },
      id: "1mt-2",
      text: "- Chosen Hero character gains Resist +2 this turn.",
      type: "action",
    },
    {
      effect: {
        amount: 2,
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "deal-damage",
      },
      id: "1mt-3",
      text: "- Deal 2 damage to chosen Villain character.",
      type: "action",
    },
  ],
};
