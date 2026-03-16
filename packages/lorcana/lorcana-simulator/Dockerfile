# Multi-stage Docker build for the Lorcana simulator using Turbo from the monorepo root.
# This mirrors the apps/web deployment shape while targeting the simulator package.

FROM oven/bun:1.3.9 AS build

WORKDIR /app

# Copy local code to the container image.
COPY . ./

RUN bun install

ENV NODE_ENV=production
ENV PLATFORM=node

RUN bunx turbo run build:node --filter=@tcg/lorcana-simulator --output-logs=errors-only

FROM oven/bun:1.3.9 AS runtime

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates curl && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/packages/lorcana/lorcana-simulator/build ./build
COPY --from=build /app/packages/lorcana/lorcana-simulator/package.json ./

ENV NODE_ENV=production

EXPOSE 3000

CMD ["bun", "start"]
