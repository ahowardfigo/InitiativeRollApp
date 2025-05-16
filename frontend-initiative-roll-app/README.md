# React + TypeScript + Vite

# D&D Initiative App Frontend


## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy dice assets:
After installation, manually copy the `@3d-dice/dice-box` assets in the `public/assets` directory:
```bash
mkdir -p public/assets/dice-box 
cp -r node_modules/@3d-dice/dice-box/dist/assets/* public/assets/dice-box/
```

3. Start the development server:
```bash
npm run dev
```
## Development

- Built with Vite + React + TypeScript
- WebSocket integration for real-time updates
- @3d-dice/dice-box for 3D dice rolling

## Backend Requirements

The app expects a backend server running at `localhost:8080` with:
- REST API endpoints at `/api/*`
- Kafka and mySql spun up with `docker compose up --build` command

See the backend repository for setup instructions.
