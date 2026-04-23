import type { CharacterCard } from "@tcg/lorcana-types";
import { isabelaMadrigalSuchALovelyVoiceEpicI18n } from "./207-isabela-madrigal-such-a-lovely-voice-epic.i18n";
import { singer } from "../../../helpers/abilities/singer";

export const isabelaMadrigalSuchALovelyVoiceEpic: CharacterCard = {
  id: "SIy",
  canonicalId: "ci_SIy",
  cardType: "character",
  name: "Isabela Madrigal",
  version: "Such a Lovely Voice",
  inkType: ["amber"],
  franchise: "Encanto",
  set: "012",
  cardNumber: 207,
  rarity: "common",
  specialRarity: "epic",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_80d82e7c2bda4d8da137d7a85a19d78f",
  },
  text: [
    {
      title: "<Singer> 5",
    },
    {
      title: "New Motif",
      description:
        "When you play this character, if you removed 1 or more damage from one of your characters this turn, gain 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Madrigal"],
  abilities: [
    singer(5),
    {
      id: "SIy-1",
      name: "New Motif",
      type: "triggered",
      text: "New Motif When you play this character, if you removed 1 or more damage from one of your characters this turn, gain 1 lore.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      condition: {
        type: "turn-metric",
        metric: "damage-removed-by-player",
        comparison: {
          operator: "gte",
          value: 1,
        },
      },
      effect: {
        amount: 1,
        type: "gain-lore",
      },
    },
  ],
  i18n: isabelaMadrigalSuchALovelyVoiceEpicI18n,
};
