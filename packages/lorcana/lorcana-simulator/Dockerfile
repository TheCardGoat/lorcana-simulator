FROM node:24-alpine AS build
WORKDIR /app

COPY . .

RUN apk add --no-cache bash curl libstdc++
ENV VP_HOME="/root/.vite-plus"
ENV PATH="$VP_HOME/bin:$PATH"
RUN curl -fsSL https://vite.plus | bash

RUN vp env on
RUN vp env setup
RUN vp env print

ENV CI=true
RUN vp install --frozen-lockfile

ENV NODE_ENV=production
ENV PLATFORM=node
ENV NODE_OPTIONS=--max-old-space-size=4096

WORKDIR /app/packages/lorcana/lorcana-simulator
RUN npm run i18n:compile
RUN vp build

FROM node:24-alpine AS runtime

WORKDIR /app

COPY --from=build /app/packages/lorcana/lorcana-simulator/build ./packages/lorcana/lorcana-simulator/build
COPY --from=build /app/packages/lorcana/lorcana-simulator/node_modules ./packages/lorcana/lorcana-simulator/node_modules
COPY --from=build /app/node_modules ./node_modules

ENV NODE_ENV=production

EXPOSE 3000

WORKDIR /app/packages/lorcana/lorcana-simulator

CMD ["node", "build/index.js"]
