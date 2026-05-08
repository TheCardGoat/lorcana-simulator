# Stage 0: Clone repo with submodules resolved at their pinned commits
# A separate clone stage is required because .dockerignore excludes .git,
# so `git submodule update` cannot run against the COPY-ed source.
# RAILWAY_GIT_COMMIT_SHA is declared so Railway can pass it as a build arg for cache busting.
FROM alpine/git AS source
ARG GHA_PAT_TOKEN
ARG RAILWAY_GIT_COMMIT_SHA

RUN git config --global url."https://${GHA_PAT_TOKEN}@github.com/".insteadOf "https://github.com/"

WORKDIR /repo
RUN git clone --depth 1 "https://github.com/TheCardGoat/the-card-goat-online.git" . && \
    if [ -n "$RAILWAY_GIT_COMMIT_SHA" ]; then \
      git fetch --depth 1 origin "$RAILWAY_GIT_COMMIT_SHA" && \
      git checkout "$RAILWAY_GIT_COMMIT_SHA"; \
    fi && \
    git submodule update --init --recursive --depth 1 && \
    rm -rf .git submodules/cyberpunk/.git submodules/gundam/.git

FROM node:24-alpine AS build
WORKDIR /app

# Source (including submodules pinned to the commit recorded in the parent repo)
COPY --from=source /repo .

RUN apk add --no-cache bash curl libstdc++
ENV VP_HOME="/root/.vite-plus"
ENV PATH="$VP_HOME/bin:$PATH"
RUN curl -fsSL https://vite.plus | bash

RUN vp env on
RUN vp env setup
RUN vp env print

RUN vp install --frozen-lockfile

ENV NODE_ENV=production
ENV PLATFORM=node
ENV NODE_OPTIONS=--max-old-space-size=4096

WORKDIR /app/packages/lorcana/lorcana-simulator
RUN vp run i18n:compile
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
