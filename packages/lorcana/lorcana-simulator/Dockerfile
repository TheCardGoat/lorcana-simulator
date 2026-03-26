FROM node:25-alpine AS build
WORKDIR /app

# Copy everything to better leverage turbo cache
COPY . .

RUN npm install -g bun
RUN bun install

ENV NODE_ENV=production
ENV PLATFORM=node
ENV NODE_OPTIONS=--max-old-space-size=4096

RUN bun run --cwd packages/lorcana/lorcana-simulator build:node

FROM node:25-alpine AS runtime

WORKDIR /app

COPY --from=build /app/packages/lorcana/lorcana-simulator/build ./build

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "build/index.js"]
