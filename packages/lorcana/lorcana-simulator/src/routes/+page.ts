import { dev } from "$app/environment";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const ssr = false;

type RouteLink = {
  href: string;
  label: string;
  description: string;
};

type RoutePattern = {
  pattern: string;
  description: string;
};

const routeLinks: RouteLink[] = [
  {
    href: "/test",
    label: "Browser Harness",
    description: "Open the previous root harness page for fixture and view-based testing.",
  },
  {
    href: "/matchmaking",
    label: "Matchmaking",
    description: "Create or join a live match and navigate into active game sessions.",
  },
  {
    href: "/matchmaking/archetype",
    label: "Archetype Matchmaking",
    description: "Browse player-created matches and create a new archetype-based room.",
  },
  {
    href: "/sandbox/simulator",
    label: "Sandbox Simulator",
    description: "Open the local simulator harness with fixture-driven tabletop state.",
  },
  {
    href: "/sandbox/simulator/ai-match",
    label: "AI vs AI Match Setup",
    description: "Configure and launch an automated AI versus AI simulation.",
  },
  {
    href: "/sandbox/simulator/vs-ai",
    label: "Human vs AI Match Setup",
    description: "Prepare a playable local match against the AI opponent.",
  },
  {
    href: "/tests/pre-game",
    label: "Pre-Game Test",
    description: "Exercise pre-game simulator states and setup behavior.",
  },
  {
    href: "/tests/look-at-the-top",
    label: "Look At The Top Test",
    description: "Validate top-of-deck inspection flows in the simulator.",
  },
  {
    href: "/tests/name-a-card",
    label: "Name A Card Test",
    description: "Exercise card-naming interactions and related prompts.",
  },
  {
    href: "/tests/multi-target",
    label: "Multi-Target Test",
    description: "Validate simulator flows that target multiple cards or players.",
  },
  {
    href: "/tests/daisy-duck-donald-date",
    label: "Daisy Duck Donald's Date Test",
    description: "Test interactions with Daisy Duck Donald's Date card.",
  },
  {
    href: "/tests/shift",
    label: "Shift Test",
    description: "Exercise shift mechanic and character transformations.",
  },
];

const routePatterns: RoutePattern[] = [
  {
    pattern: "/match/[gameId]",
    description: "Player match route that requires a real game id.",
  },
  {
    pattern: "/spectate/[gameId]",
    description: "Spectator route that requires a live game id.",
  },
];

export const load: PageLoad = () => {
  if (!dev) {
    throw error(404, "Not found");
  }

  return {
    routeLinks,
    routePatterns,
  };
};
