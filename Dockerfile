FROM node:lts-alpine AS base

############################
### INSTALL DEPENDENCIES ###
############################
FROM base AS deps

RUN npm install -g pnpm

WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile

#############################
### BUILD CLIENT & SERVER ###
#############################
FROM base AS build

RUN npm install -g pnpm
WORKDIR /app


COPY --from=deps /app /app
RUN pnpm build:common
RUN pnpm build:app

# Build standalone server deployment bundle
RUN pnpm --filter ./packages/server deploy --prod /deploy/server

###############
### RUN APP ###
###############
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV DB_URL=file:/app/data/db.sqlite

# Copy server bundle from deps stage
COPY --from=build /deploy/server/ /app/

RUN chmod +x /app/drizzle/migrations-entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/app/drizzle/migrations-entrypoint.sh"]
CMD ["node", "dist/index.js"]
