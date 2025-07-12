# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies for native modules
RUN apk add --no-cache python3 make g++ && ln -sf python3 /usr/bin/python

# Copy dependency files
COPY package.json yarn.lock ./

# Install all dependencies (including dev dependencies)
RUN yarn install --frozen-lockfile

# Copy all project files
COPY . .

# Build the app in standalone mode
RUN yarn build

#######################
#  RUNTIME CONTAINER  #
#######################
FROM node:20-alpine

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy the standalone output from builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# The standalone server.js is the entry point
CMD ["node", "server.js"]
