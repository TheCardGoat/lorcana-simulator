import { error } from "@sveltejs/kit";

import type { PageLoad } from "./$types";

const WILDS_UNKNOWN_SLUG = "wilds-unknown";

export const load: PageLoad = ({ params }) => {
  if (params.seasonSlug !== WILDS_UNKNOWN_SLUG) {
    error(404, "Season not found");
  }
};
