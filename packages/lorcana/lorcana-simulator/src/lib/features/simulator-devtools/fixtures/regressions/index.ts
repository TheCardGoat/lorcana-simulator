import type { LorcanaSimulatorFixture } from "@/features/simulator/model/contracts.js";
import { createFixtureRegistry } from "../registry.js";
import { wardHiddenZoneSelectionRegressionFixture } from "./ward-hidden-zone-selection.js";
import { shiftingThenSingingUnderTheSea } from "@/features/simulator-devtools/fixtures/regressions/shifting-then-singing-under-the-sea";
import { moanaBlackCauldron } from "@/features/simulator-devtools/fixtures/regressions/moana-black-cauldron";
import { retroEvolutionDeviceGenie } from "@/features/simulator-devtools/fixtures/regressions/retro-evolution-device-genie";
import { bug01MadamMimSneakyMove } from "./2026-04-22/bug-01-madam-mim-sneaky-move.js";
import { bug02DinkyHasTheBrains } from "./2026-04-22/bug-02-dinky-has-the-brains.js";
import { bug03CheshireCatInexplicable } from "./2026-04-22/bug-03-cheshire-cat-inexplicable.js";
import { bug04BeKingUndisputed } from "./2026-04-22/bug-04-be-king-undisputed.js";
import { bug05MulanEliteArcher } from "./2026-04-22/bug-05-mulan-elite-archer.js";
import { bug06BlackCauldron } from "./2026-04-22/bug-06-black-cauldron.js";
import { bug07DonaldDuckPerfectGentleman } from "./2026-04-22/bug-07-donald-duck-perfect-gentleman.js";
import { bug08HerculesSpectralDemigod } from "./2026-04-22/bug-08-hercules-spectral-demigod.js";
import { bug09CinderellaDreamComeTrue } from "./2026-04-22/bug-09-cinderella-dream-come-true.js";
import { bug11OhanaMeansFamily } from "./2026-04-22/bug-11-ohana-means-family.js";
import { bug12ScroogeReformedEbenezer } from "./2026-04-22/bug-12-scrooge-reformed-ebenezer.js";
import { bug13MeekoSkittishScrounger } from "./2026-04-22/bug-13-meeko-skittish-scrounger.js";
import { bug15EmeraldChromicon } from "./2026-04-22/bug-15-emerald-chromicon.js";
import { bug16AnastasiaBossyStepsister } from "./2026-04-22/bug-16-anastasia-bossy-stepsister.js";
import { bug17AuroraDreamingGuardian } from "./2026-04-22/bug-17-aurora-dreaming-guardian.js";
import { bug18PowerlineMusicalSuperstar } from "./2026-04-22/bug-18-powerline-musical-superstar.js";
import { bug19MaxGoofChartTopper } from "./2026-04-22/bug-19-max-goof-chart-topper.js";
import { bug20FaZhouWarHero } from "./2026-04-22/bug-20-fa-zhou-war-hero.js";
import { bug21MulanReadyForBattle } from "./2026-04-22/bug-21-mulan-ready-for-battle.js";
import { bug22JafarAspiringRuler } from "./2026-04-22/bug-22-jafar-aspiring-ruler.js";
import { bug23SimbaPrideProtector } from "./2026-04-22/bug-23-simba-pride-protector.js";
import { bug24MauiHalfShark } from "./2026-04-22/bug-24-maui-half-shark.js";
import { bug25AnnaSoothingSisterShiftZero } from "./2026-04-22/bug-25-anna-soothing-sister-shift-zero.js";
import { bug26TodKnowsAllTheTricks } from "./2026-04-22/bug-26-tod-knows-all-the-tricks.js";
import { bug27BasilDisguisedDetective } from "./2026-04-22/bug-27-basil-disguised-detective.js";
import { bug28HiroHamadaArmorDesigner } from "./2026-04-22/bug-28-hiro-hamada-armor-designer.js";
import { bug29DemonaRoyalGuard } from "./2026-04-22/bug-29-demona-royal-guard.js";
import { bug30PullTheLeverVsIagoVanish } from "./2026-04-22/bug-30-pull-the-lever-vs-iago-vanish.js";
import { bug31PeteGhostOfChristmasFuture } from "./2026-04-22/bug-31-pete-ghost-of-christmas-future.js";
import { bug32GoofyEmeraldChampion } from "./2026-04-22/bug-32-goofy-emerald-champion.js";
import { bug33VincenzoSantorini } from "./2026-04-22/bug-33-vincenzo-santorini.js";
import { bug34RobinHoodSharpshooterFixture } from "./2026-04-22/bug-34-robin-hood-sharpshooter.js";
import { bug35MobSongFixture } from "./2026-04-22/bug-35-mob-song.js";
import { bug36BelleAccomplishedMysticFixture } from "./2026-04-22/bug-36-belle-accomplished-mystic.js";
import { bug37TinkerBellGiantFairyFixture } from "./2026-04-22/bug-37-tinker-bell-giant-fairy.js";
import { bug38ElsaSpiritOfWinterFixture } from "./2026-04-22/bug-38-elsa-spirit-of-winter.js";
import { bug39OlafHelpingHandFixture } from "./2026-04-22/bug-39-olaf-helping-hand.js";
import { bug40ResistCardsUnderFixture } from "./2026-04-22/bug-40-resist-cards-under.js";
import { bug41DonaldFlusteredLoreWinFixture } from "./2026-04-22/bug-41-donald-flustered-lore-win.js";
import { bug42DemonaMatchLogFixture } from "./2026-04-22/bug-42-demona-match-log.js";
import { bug43KristoffIcyExplorerFixture } from "./2026-04-22/bug-43-kristoff-icy-explorer.js";
import { bug43TianaRestaurantOwnerFixture } from "./2026-04-22/bug-43-tiana-restaurant-owner.js";
import { bug44BroadwayBodyguardLocationFixture } from "./2026-04-22/bug-44-broadway-bodyguard-location.js";

const regressionFixtureRegistry = createFixtureRegistry(
  [
    wardHiddenZoneSelectionRegressionFixture,
    shiftingThenSingingUnderTheSea,
    moanaBlackCauldron,
    retroEvolutionDeviceGenie,
    // --- 2026-04-22 QA validation batch ---
    bug01MadamMimSneakyMove,
    bug02DinkyHasTheBrains,
    bug03CheshireCatInexplicable,
    bug04BeKingUndisputed,
    bug05MulanEliteArcher,
    bug06BlackCauldron,
    bug07DonaldDuckPerfectGentleman,
    bug08HerculesSpectralDemigod,
    bug09CinderellaDreamComeTrue,
    bug11OhanaMeansFamily,
    bug12ScroogeReformedEbenezer,
    bug13MeekoSkittishScrounger,
    bug15EmeraldChromicon,
    bug16AnastasiaBossyStepsister,
    bug17AuroraDreamingGuardian,
    bug18PowerlineMusicalSuperstar,
    bug19MaxGoofChartTopper,
    bug20FaZhouWarHero,
    bug21MulanReadyForBattle,
    bug22JafarAspiringRuler,
    bug23SimbaPrideProtector,
    bug24MauiHalfShark,
    bug25AnnaSoothingSisterShiftZero,
    bug26TodKnowsAllTheTricks,
    bug27BasilDisguisedDetective,
    bug28HiroHamadaArmorDesigner,
    bug29DemonaRoyalGuard,
    bug30PullTheLeverVsIagoVanish,
    bug31PeteGhostOfChristmasFuture,
    bug32GoofyEmeraldChampion,
    bug33VincenzoSantorini,
    bug34RobinHoodSharpshooterFixture,
    bug35MobSongFixture,
    bug36BelleAccomplishedMysticFixture,
    bug37TinkerBellGiantFairyFixture,
    bug38ElsaSpiritOfWinterFixture,
    bug39OlafHelpingHandFixture,
    bug40ResistCardsUnderFixture,
    bug41DonaldFlusteredLoreWinFixture,
    bug42DemonaMatchLogFixture,
    bug43KristoffIcyExplorerFixture,
    bug43TianaRestaurantOwnerFixture,
    bug44BroadwayBodyguardLocationFixture,
  ] satisfies LorcanaSimulatorFixture[],
  "simulator regression fixtures",
);

export const LORCANA_REGRESSION_FIXTURE_LIST = regressionFixtureRegistry.list;
export const LORCANA_REGRESSION_FIXTURE_MAP = regressionFixtureRegistry.byId;
export const LORCANA_REGRESSION_FIXTURES = regressionFixtureRegistry.record;

export function getLorcanaRegressionFixture(fixtureId: string): LorcanaSimulatorFixture {
  const fixture = LORCANA_REGRESSION_FIXTURES[fixtureId];
  if (!fixture) {
    throw new Error(`Regression fixture "${fixtureId}" not found`);
  }

  return fixture;
}
