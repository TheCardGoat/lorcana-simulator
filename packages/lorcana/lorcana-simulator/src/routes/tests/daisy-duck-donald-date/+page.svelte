<script lang="ts">
    import { createFixture } from "@/features/simulator-devtools/fixtures/fixture-factory";
    import LorcanaBrowserHarnessView from "@/features/simulator-devtools/harness/LorcanaBrowserHarnessView.svelte";

    import {
        donaldDuckBoisterousFowl,
        mickeyMouseTrueFriend, suddenChill,
    } from "@tcg/lorcana-cards/cards/001";
    import { divebomb, lastditchEffort } from "@tcg/lorcana-cards/cards/003";
    import { loseTheWay } from "@tcg/lorcana-cards/cards/006";
    import {
        donaldDuckAlongForTheRide,
    } from "@tcg/lorcana-cards/cards/011";
    import {daisyDuckDonaldsDate} from "@tcg/lorcana-cards/cards/005";
    import {donaldDuckCoinCollector} from "@tcg/lorcana-cards/cards/008";
    import {donaldDuckBuccaneer} from "@tcg/lorcana-cards/cards/004";

    const fixture = createFixture({
        id: "multi-target",
        name: "Multi Target",
        description: "Exercises multi-target simulator interactions.",
        playerOne: {
            inkwell: 3,
            deck: [donaldDuckAlongForTheRide, divebomb, loseTheWay, lastditchEffort, mickeyMouseTrueFriend],
        },
        playerTwo: {
            play: [
                daisyDuckDonaldsDate,
                daisyDuckDonaldsDate,
                daisyDuckDonaldsDate,
            ],
            hand: [donaldDuckBoisterousFowl],
            deck: [donaldDuckCoinCollector, suddenChill, donaldDuckBuccaneer]
        },
        skipPreGame: true,
    });
</script>

<LorcanaBrowserHarnessView {fixture} view="playerOne" />
