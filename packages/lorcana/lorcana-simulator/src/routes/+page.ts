import { dev } from "$app/environment";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import {
  generalFixtureRouteLinks,
  regressionFixtureCount,
  regressionRouteLink,
  routePatterns,
  staticRouteLinks,
} from "@/features/simulator-devtools/routes/dev-routes.js";

export const ssr = false;

export const load: PageLoad = () => {
  if (!dev) {
    throw error(404, "Not found");
  }

  return {
    generalFixtureRouteLinks,
    regressionFixtureCount,
    regressionRouteLink,
    routePatterns,
    staticRouteLinks,
  };
};
