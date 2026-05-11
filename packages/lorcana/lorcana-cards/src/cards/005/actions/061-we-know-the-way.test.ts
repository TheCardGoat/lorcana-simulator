import { describe, expect, it } from "bun:test";
import { PLAYER_ONE, LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { simbaProtectiveCub } from "../../001";
import { monstroInfamousWhale } from "../../008/characters/064-monstro-infamous-whale";
import { weKnowTheWay } from "./061-we-know-the-way";

describe("We Know the Way", () => {
  it("shuffles the chosen discard card back and may play a revealed card with the same name for free", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [weKnowTheWay],
      inkwell: weKnowTheWay.cost,
      discard: [simbaProtectiveCub],
      deck: [simbaProtectiveCub],
    });

    expect(
      testEngine.asPlayerOne().playCard(weKnowTheWay, {
        targets: [simbaProtectiveCub],
      }),
    ).toBeSuccessfulCommand();
    expect(
      testEngine.asPlayerOne().resolveNextPending({ resolveOptional: true }),
    ).toBeSuccessfulCommand();

    expect(testEngine.getCardDefinitionIdsInZone("play", PLAYER_ONE)).toContain(
      simbaProtectiveCub.id,
    );
    expect(testEngine.getCardDefinitionIdsInZone("deck", PLAYER_ONE)).toEqual([
      simbaProtectiveCub.id,
    ]);
    expect(testEngine.asPlayerOne()).toHaveZoneCounts({ hand: 0, discard: 1, play: 1, deck: 1 });
  });

  it("regression: card stays in limbo (not discard) while the optional is pending, then finalises", () => {
    // When the optional "play for free" suspends for player input, We Know the Way must be in
    // limbo — NOT already in discard. After the decision is resolved the card finalises to discard.
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [weKnowTheWay],
      inkwell: weKnowTheWay.cost,
      discard: [simbaProtectiveCub],
      deck: [simbaProtectiveCub],
    });

    expect(
      testEngine.asPlayerOne().playCard(weKnowTheWay, {
        targets: [simbaProtectiveCub],
      }),
    ).toBeSuccessfulCommand();

    // While waiting for the optional, the card is in limbo (pending), not yet in discard
    expect(testEngine.asPlayerOne().getCardZone(weKnowTheWay)).toEqual("limbo");
    expect(testEngine.asPlayerOne()).toHaveZoneCounts({ hand: 0, discard: 0 });

    // After declining, We Know the Way finalises to discard.
    // The revealed card (name matched) stays on deck-top — it only goes to hand when no route matches.
    expect(
      testEngine.asPlayerOne().resolveNextPending({ resolveOptional: false }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(weKnowTheWay)).toEqual("discard");
    expect(testEngine.asPlayerOne()).toHaveZoneCounts({ discard: 1 });
  });

  it("regression: cycling combo — outer card goes to discard once the free play is accepted so the inner card can target it", () => {
    // Two copies: A in hand, B in discard, empty deck.
    // After A's optional is accepted and B starts resolving its own effects, A must already
    // be in discard so B's shuffle step can choose it.
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [weKnowTheWay],
      inkwell: weKnowTheWay.cost,
      discard: [weKnowTheWay],
      deck: [],
    });

    const discardCopyId = testEngine.asPlayerOne().getCardsInZone("discard", PLAYER_ONE)
      .cards[0]!.id;

    // Play A; shuffle B (the discard copy) into deck
    expect(
      testEngine.asPlayerOne().playCard(weKnowTheWay, {
        targets: [discardCopyId],
      }),
    ).toBeSuccessfulCommand();

    // A is in limbo while awaiting the optional decision
    expect(testEngine.getCardDefinitionIdsInZone("limbo", PLAYER_ONE)).toHaveLength(1);

    // Accept: play B for free. A's effect is now done — A should go to discard.
    // B then runs its own shuffle step and needs A as a target from discard.
    expect(
      testEngine.asPlayerOne().resolveNextPending({ resolveOptional: true }),
    ).toBeSuccessfulCommand();

    // A is in discard; B is in limbo pending its own target selection
    expect(testEngine.asPlayerOne()).toHaveZoneCounts({ hand: 0, discard: 1 });
    expect(testEngine.getCardDefinitionIdsInZone("limbo", PLAYER_ONE)).toHaveLength(1);
    expect(testEngine.getCardDefinitionIdsInZone("discard", PLAYER_ONE)).toContain(weKnowTheWay.id);
  });

  it("regression (Bug #9, prod replay mgUZQdmZMdWBS5p5pT1gDqI): when extra copies of We Know the Way sit in hand, the optional free-play candidates must be the revealed card, not the hand copies", () => {
    // Replay context: player had multiple We Know the Way copies in hand and sang one via Monstro.
    // After shuffle+reveal, the optional offered hand copies (wrong) instead of the revealed card.
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [weKnowTheWay, weKnowTheWay, weKnowTheWay],
      play: [{ card: monstroInfamousWhale, isDrying: false }],
      discard: [simbaProtectiveCub],
      deck: [],
    });

    // Pick the specific hand copy we will sing (first one) and a target to shuffle.
    expect(
      testEngine.asPlayerOne().singSong(weKnowTheWay, monstroInfamousWhale),
    ).toBeSuccessfulCommand();

    // First pending: shuffle-into-deck target selection — pick simba.
    expect(
      testEngine.asPlayerOne().resolveNextPending({ targets: [simbaProtectiveCub] }),
    ).toBeSuccessfulCommand();

    // Second pending: optional free-play of the revealed card.
    // The candidate list MUST be the revealed card (simba), not the other We Know the Way copies in hand.
    // Accepting the optional should put simba into play.
    expect(
      testEngine.asPlayerOne().resolveNextPending({ resolveOptional: true }),
    ).toBeSuccessfulCommand();

    expect(testEngine.getCardDefinitionIdsInZone("play", PLAYER_ONE)).toContain(
      simbaProtectiveCub.id,
    );
  });

  it("regression: empty deck + sung via singer — shuffled card reveals itself and offers free play", () => {
    // Bug #9 (replay mgUZQdmZMdWBS5p5pT1gDqI turn 18): player sang We Know the Way with Monstro
    // (combo cleared the deck), then expected to play the just-shuffled revealed card for free.
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [weKnowTheWay],
      play: [{ card: monstroInfamousWhale, isDrying: false }],
      discard: [simbaProtectiveCub],
      deck: [],
    });

    expect(
      testEngine.asPlayerOne().singSong(weKnowTheWay, monstroInfamousWhale),
    ).toBeSuccessfulCommand();

    // First pending: choose the discard target for shuffle-into-deck
    expect(
      testEngine.asPlayerOne().resolveNextPending({ targets: [simbaProtectiveCub] }),
    ).toBeSuccessfulCommand();

    // Second pending: optional free-play of the revealed card (which is the just-shuffled card)
    expect(
      testEngine.asPlayerOne().resolveNextPending({ resolveOptional: true }),
    ).toBeSuccessfulCommand();

    expect(testEngine.getCardDefinitionIdsInZone("play", PLAYER_ONE)).toContain(
      simbaProtectiveCub.id,
    );
  });

  it("regression: empty deck — shuffled card is its own top reveal and can be played for free", () => {
    // Bug #9 (replay mgUZQdmZMdWBS5p5pT1gDqI turn 18): empty deck means the just-shuffled
    // discard card IS the revealed top card. Name self-matches → free play should be offered
    // for the revealed card.
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [weKnowTheWay],
      inkwell: weKnowTheWay.cost,
      discard: [simbaProtectiveCub],
      deck: [],
    });

    expect(
      testEngine.asPlayerOne().playCard(weKnowTheWay, {
        targets: [simbaProtectiveCub],
      }),
    ).toBeSuccessfulCommand();

    expect(
      testEngine.asPlayerOne().resolveNextPending({ resolveOptional: true }),
    ).toBeSuccessfulCommand();

    expect(testEngine.getCardDefinitionIdsInZone("play", PLAYER_ONE)).toContain(
      simbaProtectiveCub.id,
    );
    expect(testEngine.asPlayerOne()).toHaveZoneCounts({ hand: 0, discard: 1, play: 1, deck: 0 });
  });

  it("regression: puts revealed card into hand when name does not match chosen card", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [weKnowTheWay],
      inkwell: weKnowTheWay.cost,
      discard: [simbaProtectiveCub],
      // Top card of deck is different from chosen discard card
      deck: [weKnowTheWay],
    });

    expect(
      testEngine.asPlayerOne().playCard(weKnowTheWay, {
        targets: [simbaProtectiveCub],
      }),
    ).toBeSuccessfulCommand();

    // Name doesn't match, so revealed card goes to hand
    expect(testEngine.asPlayerOne()).toHaveZoneCounts({ hand: 1, discard: 1, play: 0 });
  });
});
