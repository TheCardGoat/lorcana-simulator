<script lang="ts">
  import LorcanaBrowserHarnessView from "@/features/simulator-devtools/harness/LorcanaBrowserHarnessView.svelte";
  import {createFixture} from "@/features/simulator-devtools/fixtures/fixture-factory";
  import {_99Puppies, divebomb, lastditchEffort} from "@tcg/lorcana-cards/cards/003";
  import {loseTheWay} from "@tcg/lorcana-cards/cards/006";
  import {
      hakunaMatata,
      mauiHeroToAll,
      mickeyMouseTrueFriend,
      minnieMouseAlwaysClassy, reflection
  } from "@tcg/lorcana-cards/cards/001";
  import {madamMimRivalOfMerlin, theQueenCommandingPresence} from "@tcg/lorcana-cards/cards/002";
  import {darkwingDuckCoolUnderPressure, donaldDuckAlongForTheRide} from "@tcg/lorcana-cards/cards/011";
  import {
      aurelianGyrosensor,
      julietaMadrigalExcellentCook,
      powerlineWorldsGreatestRockStar
  } from "@tcg/lorcana-cards/cards/009";
  import {theFamilyMadrigal, waterHasMemory} from "@tcg/lorcana-cards/cards/007";
  import {
      merlinBackFromBermuda,
      merlinIntellectualVisionary, moanaDeterminedExplorer,
      robinHoodSharpshooter
  } from "@tcg/lorcana-cards/cards/005";
  import {daisyDuckSapphireChampion} from "@tcg/lorcana-cards/cards/010";
  import {brunoMadrigalOutOfTheShadows, theQueenDiviner} from "@tcg/lorcana-cards/cards/004";
  import {televisionSet} from "@tcg/lorcana-cards/cards/008";

  const fixture = createFixture({
      id: "scry-test",
      name: "Look at the top",
      description: "Testing varios scenarios in which the player is prompted to look at the top cards",
      skipPreGame: true,
      playerOne: {
          inkwell: 20,
          hand: [theFamilyMadrigal, merlinIntellectualVisionary,waterHasMemory,theQueenDiviner],
          play: [aurelianGyrosensor, daisyDuckSapphireChampion, robinHoodSharpshooter, powerlineWorldsGreatestRockStar, merlinBackFromBermuda,televisionSet],
          deck: [loseTheWay,reflection, brunoMadrigalOutOfTheShadows,hakunaMatata, moanaDeterminedExplorer, julietaMadrigalExcellentCook ,_99Puppies]
      },
      playerTwo: {
          hand: [mickeyMouseTrueFriend,divebomb,lastditchEffort],
          play: [
              madamMimRivalOfMerlin,
              darkwingDuckCoolUnderPressure,
              powerlineWorldsGreatestRockStar,
              minnieMouseAlwaysClassy,
              theQueenCommandingPresence,
              mauiHeroToAll,
              { card: donaldDuckAlongForTheRide, exerted: true },
          ],
      },
  });
</script>

<LorcanaBrowserHarnessView {fixture} view="playerOne" />
