import { arielOnHumanLegs, simbaProtectiveCub } from "@tcg/lorcana-cards/cards/001";
import {
  rexProtectiveDinosaur,
  sidPhillipsToySurgeon,
  woodyWaitingForAFriend,
} from "@tcg/lorcana-cards/cards/012";
import { createFixture } from "./fixture-factory";

export const sidPhillipsToySurgeonFixture = createFixture({
  id: "sid-phillips-toy-surgeon",
  name: "Sid Phillips - Toy Surgeon — PLAYTIME'S OVER + DOUBLE PRIZES!",
  description:
    "Validate Sid Phillips' two abilities. PLAYTIME'S OVER: when you play Sid, optionally banish another chosen character of yours; if you do, each opponent banishes one of theirs (opponent chooses, must be their own — regression check for BUG-15 where opponent could target P1's remaining characters). DOUBLE PRIZES!: during your turn, whenever a Toy character is banished, gain 2 lore — banishing the Toy ally Woody (Waiting for a Friend) via Sid's optional banish should award 2 lore to P1.",
  skipPreGame: true,
  playerOne: {
    inkwell: sidPhillipsToySurgeon.cost,
    hand: [sidPhillipsToySurgeon],
    play: [
      { card: woodyWaitingForAFriend, isDrying: false },
      { card: rexProtectiveDinosaur, isDrying: false },
    ],
    deck: 5,
  },
  playerTwo: {
    inkwell: 5,
    hand: [],
    play: [
      { card: simbaProtectiveCub, isDrying: false },
      { card: arielOnHumanLegs, isDrying: false },
    ],
    deck: 5,
  },
});
