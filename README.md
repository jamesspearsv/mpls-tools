# MPLS Tools

A collection of internal tools developed for the Morgantown Public Library System.

Current tools include

- Offline circulation module
- Reference statistics recording


## App Structure

This app includes a Vue client and a Hono server that communicate using a basic REST API.

- **Hono Server**: Handles API requests and database operations
- **Vue Client**: Provides a UI to interact with the API, track local state, and manage unsynced checkouts

## Deployment

This app is deployed using Docker and Docker Compose. In production the Vue client is built and bundled with the Hono server to run as a single process.

Use the included `DOCKERFILE` or `docker-compose.yaml` at the project's root to get started.

### Docker Instructions

> [!NOTE]
> pnpm is required to use this repo. Run `npm install -g pnpm` to install

1. `git clone` this repo
2. `pnpm install`
3. `pnpm docker:build`
4. `pnpm docker:run`

Or

1. `git clone` this repo
2. `docker compose up`

### Public Docker Image

This tool has a public Docker image that can be used in the following `docker-compose.yaml`

```Docker
services:
  app:
    image: ghcr.io/jamesspearsv/mpls-tools:latest
    ports:
      - '80:3000' # Adjust the host post as needed
    environment:
      NODE_ENV: production
    restart: unless-stopped
    volumes:
      # If you prefer Docker volumes
      # - app-data:/app/data 
      # If you prefer filesystem volumes
      - ./app-data:/app/data 
# Uncomment this if you choose to use Docker volumes
# volumes:
#  app-data:
```
