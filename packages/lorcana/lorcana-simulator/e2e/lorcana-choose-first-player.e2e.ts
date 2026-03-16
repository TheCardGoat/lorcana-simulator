import {
  expect,
  test,
  PLAYER_ONE,
  PLAYER_TWO,
  LorcanaSimulatorPom,
} from "./support/lorcana-test.js";

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
});
