# D&D Initiative Tracker

A real-time D&D initiative and dice rolling tracker built with React and @3d-dice/dice-box.

## Features

- Join or create game tables
- Create characters with race, class, and level
- Real-time 3D dice rolling with modifiers
- Roll tracking for initiative, attacks, saves, and checks
- Real-time updates via WebSocket
- Beautiful 3D dice animations

## 🐳 Running with Docker Compose

To spin up the full stack with Docker:

### 1. Prerequisites
- Docker + Docker Compose installed

### 2. Run the app
```bash
docker-compose up --build

## Hosting
Frontend: http://localhost:5173
- follow directions in the README.md in frontend directory for frontend setup and hosting

Backend: http://localhost:8080
- follow directions in the README.md in backend directory for backend setup and hosting
## Usage

1. Enter your name and character
2. Once at the table, select your roll type and modifier
3. Click the roll button to roll the dice
5. Watch the 3D dice animation and see results in the side panel
6. All rolls are broadcast to other players in real-time

## Development

- Built with Vite + React + TypeScript on frontend
- Built with Kotlin and Spring Boot on backend
- mySql for persistence layer
- Kafka for event messaging
- WebSocket integration for real-time updates
- Docker for hosting kafka and mySql services
- @3d-dice/dice-box for 3D dice rolling

## Backend Requirements

The app expects a backend server running at `localhost:8080` with:
- REST API endpoints at `/api/*`
- WebSocket endpoint at `/ws`

See the backend repository for setup instructions.
