# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# Aime Technologies — production image
#
# Multi-stage build producing a Next.js standalone server. The final image
# carries only the compiled server, the static assets and a minimal Node
# runtime; node_modules and the source tree are left behind in the builder.
#
#   docker build -t aime-technologies --build-arg NEXT_PUBLIC_SITE_URL=https://aimetechnologies.rw .
#   docker run -p 3000:3000 aime-technologies
#
# NEXT_PUBLIC_* values are inlined into the client bundle at BUILD time, so they
# are build args, not runtime env vars. Changing one means rebuilding the image.
# None of them is a secret — see .env.example.
# ---------------------------------------------------------------------------

FROM node:22-alpine AS base
# libc6-compat covers the glibc assumptions some native deps still make on musl.
RUN apk add --no-cache libc6-compat
WORKDIR /app


# --- dependencies ----------------------------------------------------------
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci


# --- build -----------------------------------------------------------------
FROM base AS builder

ARG NEXT_PUBLIC_SITE_URL=https://aimetechnologies.rw
ARG NEXT_PUBLIC_CONTACT_ENDPOINT=
ARG NEXT_PUBLIC_ENROLL_ENDPOINT=

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_CONTACT_ENDPOINT=$NEXT_PUBLIC_CONTACT_ENDPOINT \
    NEXT_PUBLIC_ENROLL_ENDPOINT=$NEXT_PUBLIC_ENROLL_ENDPOINT \
    NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Switches next.config.mjs to `output: 'standalone'`. Opt-in so that Vercel
# deployments, which do not want standalone output, are unaffected.
ENV BUILD_STANDALONE=true
RUN npm run build


# --- runtime ---------------------------------------------------------------
FROM base AS runner

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
# The standalone output already contains a trimmed node_modules and server.js.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

# No shell, so signals reach Node directly and the container stops cleanly.
CMD ["node", "server.js"]
