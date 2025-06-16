# Use official Node.js image for build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy all project files
COPY . .

# Build the app
RUN yarn build

# Use a smaller image for running
FROM node:20-alpine

WORKDIR /app

# Copy necessary files
COPY --from=builder /app/package.json /app/yarn.lock ./
RUN yarn install --production

COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/next.config.ts .
COPY --from=builder /app/tsconfig.json .
COPY --from=builder /app/node_modules node_modules

EXPOSE 3000

CMD ["yarn", "start"]
