# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# git is required by some prepare scripts
RUN apk add --no-cache git
RUN corepack enable

# Copy entire workspace so prepare scripts can run during install
COPY . .

# Install all workspace dependencies
RUN pnpm install --frozen-lockfile

# Build dependent lorcana packages so the simulator can resolve types/dist
RUN pnpm -r --filter './packages/lorcana/*' run build || true

# Build the SvelteKit simulator with the Node.js adapter
RUN pnpm --filter @tcg/lorcana-simulator run build:node

# Runtime stage
FROM node:22-alpine

WORKDIR /app

RUN corepack enable

# Copy the entire built workspace so the SvelteKit server can resolve workspace deps
COPY --from=builder /app /app

WORKDIR /app/packages/lorcana/lorcana-simulator

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:' + (process.env.PORT || 3000), (r) => {if (r.statusCode >= 500) throw new Error(r.statusCode)})"

CMD ["node", "build/index.js"]
