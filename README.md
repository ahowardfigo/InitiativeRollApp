# D&D Initiative Tracker

A real-time D&D initiative and dice rolling tracker built with React and @3d-dice/dice-box.

## Features

- Join or create game tables
- Create characters with race, class, and level
- Real-time 3D dice rolling with modifiers
- Roll tracking for initiative, attacks, saves, and checks
- Real-time updates via WebSocket
- Beautiful 3D dice animations

## Setup

Change directory into the frontend follow the steps 

 `cd frontend-initiative-roll-app`

1. Install dependencies:
```bash
npm install
```

2. Copy dice assets:
After installation, the @3d-dice/dice-box package will prompt for the assets directory location. The default is `/public/assets`. If you miss this prompt, manually copy the assets from:
```bash
node_modules/@3d-dice/dice-box/*
```
to:
```bash
public/assets/dice-box
```

3. Start the development server:
```bash
npm run dev
```

## Usage

1. Enter your name and either create a new table or join an existing one
2. Create your character by entering their details
3. Once at the table, select your roll type and modifier
4. Click the roll button to roll the dice
5. Watch the 3D dice animation and see results in the side panel
6. All rolls are broadcast to other players in real-time

## Development

- Built with Vite + React + TypeScript
- Uses TailwindCSS for styling
- WebSocket integration for real-time updates
- @3d-dice/dice-box for 3D dice rolling

## Backend Requirements

The app expects a backend server running at `localhost:8080` with:
- REST API endpoints at `/api/*`
- WebSocket endpoint at `/ws`

See the backend repository for setup instructions.
