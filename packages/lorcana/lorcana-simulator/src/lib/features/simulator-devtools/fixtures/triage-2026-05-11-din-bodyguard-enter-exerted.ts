import { downInNewOrleans } from "@tcg/lorcana-cards/cards/008";
import { thunderboltWonderDog } from "@tcg/lorcana-cards/cards/007";
import { dragonFire, reflection } from "@tcg/lorcana-cards/cards/001";
import { createFixture } from "./fixture-factory";

/**
 * Triage 2026-05-11 — Down in New Orleans + Bodyguard "may enter exerted".
 *
 * Source replay: gameId mgIkWFaJZPQEZ1EMb5iWXsK, turn 11. Player cast Down in
 * New Orleans which revealed Thunderbolt — Wonder Dog (Bodyguard). The scry
 * resolution let them play Thunderbolt for free, but the engine never honored
 * Bodyguard's "may enter exerted" option — the character always landed ready.
 *
 * How to validate:
 *   1. Cast Down in New Orleans (sapphire, cost 6 — already in inkwell).
 *   2. The scry overlay opens with three revealed cards.
 *   3. Assign Thunderbolt — Wonder Dog to "play".
 *      Assign Dragon Fire and Reflection to "bottom of deck".
 *   4. Confirm.
 *   5. Engine path: Thunderbolt should enter play exerted **only when** the
 *      simulator UI surfaces a Bodyguard "may enter exerted" choice and the
 *      player opts in.
 *
 * Current state (post engine fix, pre simulator UI control):
 *   - Engine: accepts `params.enterPlayExerted: true` on the playCard move
 *     and applies it when the played card has Bodyguard. Verified by the
 *     bun test at
 *     packages/lorcana/lorcana-cards/src/cards/008/actions/177-din-bodyguard-enter-exerted.test.ts
 *   - Simulator UI: the scry-confirm path in `confirmResolutionSelection`
 *     (game-context.svelte.ts ~8355) does **not** yet send
 *     `enterPlayExerted`, and the ScryResolutionOverlay does not yet render
 *     a checkbox. So in this fixture today, Thunderbolt will still enter
 *     play **ready** (the visible bug). Use this fixture to validate the
 *     UI fix once the toggle is wired up.
 */
export const triage20260511DinBodyguardEnterExertedFixture = createFixture({
  id: "triage-2026-05-11-din-bodyguard-enter-exerted",
  name: "Triage 2026-05-11 — DiNO + Bodyguard enter exerted",
  description:
    "Player report: Down in New Orleans played Thunderbolt — Wonder Dog (Bodyguard) into play, but the 'may enter exerted' choice was never offered. Cast DiNO from hand, assign Thunderbolt to play in the scry overlay, confirm. After the fix the simulator should prompt for enter-exerted; engine accepts the param and lands Thunderbolt exerted if chosen.",
  skipPreGame: true,
  playerOne: {
    inkwell: downInNewOrleans.cost,
    hand: [downInNewOrleans],
    // Top of deck = scry window for DiNO (look at top 3).
    // Order is bottom → top, so Thunderbolt is on top.
    deck: [reflection, dragonFire, thunderboltWonderDog],
  },
  playerTwo: {
    inkwell: 0,
    hand: [],
    deck: 5,
  },
});
