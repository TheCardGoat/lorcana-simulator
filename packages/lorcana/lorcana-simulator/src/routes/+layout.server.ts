import type { ServerLoadEvent } from "@sveltejs/kit";

export function load({ locals }: ServerLoadEvent) {
  return {
    user: locals.user,
    session: locals.session,
  };
}
