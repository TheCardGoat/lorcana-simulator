FROM node:25-alpine AS build
ARG GHA_PAT_TOKEN
WORKDIR /app

# Copy everything to better leverage turbo cache
COPY . .

RUN apk add --no-cache git ca-certificates && \
    git clone --depth 1 "https://${GHA_PAT_TOKEN}@github.com/TheCardGoat/cyberpunk-simulator.git" submodules/cyberpunk && \
    rm -rf submodules/cyberpunk/.git

RUN npm install -g bun
RUN bun install

ENV NODE_ENV=production
ENV PLATFORM=node
ENV NODE_OPTIONS=--max-old-space-size=4096

RUN bun run --cwd packages/lorcana/lorcana-simulator build:node

FROM node:25-alpine AS runtime

WORKDIR /app

COPY --from=build /app/packages/lorcana/lorcana-simulator/build ./packages/lorcana/lorcana-simulator/build
COPY --from=build /app/packages/lorcana/lorcana-simulator/node_modules ./packages/lorcana/lorcana-simulator/node_modules
COPY --from=build /app/node_modules/.bun ./node_modules/.bun

ENV NODE_ENV=production

EXPOSE 3000

WORKDIR /app/packages/lorcana/lorcana-simulator

CMD ["node", "build/index.js"]
