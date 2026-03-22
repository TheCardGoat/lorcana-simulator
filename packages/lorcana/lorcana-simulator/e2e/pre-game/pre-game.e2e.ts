import {
  expect,
  test,
  PLAYER_ONE,
  PLAYER_TWO,
  LorcanaSimulatorPom,
} from "../support/lorcana-test.js";

test("chooseFirstPlayer keeps pregame browser state aligned with the Lorcana test engine", async ({
  page,
}) => {
  const pom = new LorcanaSimulatorPom(page);
  await pom.goto({ fixtureId: "pre-game", view: "playerOne" });

  await pom.asBottomPlayer().chooseFirstPlayer(PLAYER_ONE);

  await expect(pom.asBottomPlayer()).toHaveOpeningTurnPlayer(PLAYER_ONE);
  await expect(pom.asBottomPlayer()).toHavePendingMulligan([PLAYER_ONE, PLAYER_TWO]);
  await expect(pom.asBottomPlayer()).toHavePriorityPlayer(PLAYER_ONE);
  await expect(pom.asBottomPlayer()).toHaveChoosingFirstPlayer(PLAYER_ONE);
  await expect(pom.asBottomPlayer()).toBeInPhase("mulligan");
  await expect(pom.asBottomPlayer()).toHaveCardCountInZone({
    zone: "hand",
    player: PLAYER_ONE,
    count: 7,
  });
  await expect(pom.asTopPlayer()).toHaveCardCountInZone({
    zone: "hand",
    player: PLAYER_TWO,
    count: 7,
  });

  // Select 3 Cards to mulligan and confirm the move
  const p1HandCards = await pom.asBottomPlayer().getHandCardIds(PLAYER_ONE);
  const p1CardsToMulligan = p1HandCards.slice(0, 3);
  await pom.asBottomPlayer().mulligan(p1CardsToMulligan);

  await expect(pom.asBottomPlayer()).toHavePendingMulligan([PLAYER_TWO]);
  await expect(pom.asBottomPlayer()).toHavePriorityPlayer(PLAYER_TWO);

  // Swap Players, using the debug bubble
  await pom.swapPlayers();

  // Select 4 cards from hand and mulligan as player two
  const p2HandCards = await pom.asBottomPlayer().getHandCardIds(PLAYER_TWO);
  const p2CardsToMulligan = p2HandCards.slice(0, 4);
  await pom.asBottomPlayer().mulligan(p2CardsToMulligan);

  // Assert that player one has the turn and the priority
  await expect(pom.asBottomPlayer()).toBeInGameSegment("mainGame");
  await expect(pom.asBottomPlayer()).toBeInPhase("main");
  await expect(pom.asBottomPlayer()).toHavePriorityPlayer(PLAYER_ONE);

  // Swap player again
  await pom.swapPlayers();

  await expect(pom.asBottomPlayer()).toHaveCardCountInZone({
    zone: "hand",
    player: PLAYER_ONE,
    count: 7,
  });
  await expect(pom.asTopPlayer()).toHaveCardCountInZone({
    zone: "hand",
    player: PLAYER_TWO,
    count: 7,
  });

  // After asserting both players still have 7 cards in hand, ink any card and pass turn.
  const p1HandAfterMulligan = await pom.asBottomPlayer().getHandCardIds(PLAYER_ONE);
  await pom.asBottomPlayer().inkCard(p1HandAfterMulligan[0]);
  await pom.asBottomPlayer().passTurn();

  // Verify player two has the priority
  await expect(pom.asBottomPlayer()).toHavePriorityPlayer(PLAYER_TWO);
});
