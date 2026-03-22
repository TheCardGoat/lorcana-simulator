import { afterEach, describe, expect, it } from "bun:test";
import { publicEnv } from "../../../../testing/public-env";

const originalFetch = globalThis.fetch;

const { fetchPostGameRecord, savePostGameNote } = await import("./notes-api");

function createMockFetch(responseFactory: () => Promise<Response>): typeof fetch {
  const mockedFetch = async (_input: RequestInfo | URL, _init?: RequestInit) => responseFactory();

  return Object.assign(mockedFetch, {
    preconnect: originalFetch.preconnect.bind(originalFetch),
  });
}

afterEach(() => {
  globalThis.fetch = originalFetch;
  delete publicEnv.PUBLIC_API_URL;
});

describe("notes-api", () => {
  it("parses the API's post-game envelope shape", async () => {
    publicEnv.PUBLIC_API_URL = "https://api.example.com/v1";
    globalThis.fetch = createMockFetch(
      async () =>
        new Response(
          JSON.stringify({
            gameId: "game-123",
            matchId: null,
            note: "gg",
            serverSummary: {
              kind: "placeholder",
              message: "Pending backend summary.",
              generatedAt: null,
            },
          }),
          { status: 200, headers: { "content-type": "application/json" } },
        ),
    );

    const record = await fetchPostGameRecord("game-123");

    expect(record.serverSummary.kind).toBe("placeholder");
    expect(record.note).toBe("gg");
  });

  it("surfaces nested API error messages", async () => {
    publicEnv.PUBLIC_API_URL = "https://api.example.com/v1";
    globalThis.fetch = createMockFetch(
      async () =>
        new Response(
          JSON.stringify({
            error: {
              message: "Authentication required",
            },
          }),
          { status: 401, headers: { "content-type": "application/json" } },
        ),
    );

    await expect(savePostGameNote({ gameId: "game-123", note: "note" })).rejects.toThrow(
      "Authentication required",
    );
  });

  it("throws a clear error for invalid PUBLIC_API_URL values", async () => {
    publicEnv.PUBLIC_API_URL = "not-a-url";

    await expect(fetchPostGameRecord("game-123")).rejects.toThrow(/Invalid PUBLIC_API_URL/);
  });
});
