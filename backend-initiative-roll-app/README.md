# D&D Initiative Tracker Backend

A Spring Boot backend service for the D&D Initiative Tracker application, built with Kotlin.

## Features

- RESTful API endpoints for dice rolling and game state management
- Real-time WebSocket communication for live updates
- JPA persistence for roll history
- Cross-origin support for frontend integration

## Tech Stack

- Kotlin
- Spring Boot
- Spring Data JPA
- Spring WebSocket
- H2 Database (default)

## Setup

1. Ensure you have the following prerequisites:
   - JDK 11 or higher
   - Maven 3.6 or higher

2. Build the project:
```bash
mvn clean install
```

3. Run the application:
```bash
mvn spring-boot:run
```

The server will start on `localhost:8080`.

## API Endpoints

### REST Endpoints

- `POST /api/rolls` - Make a new dice roll
- `GET /api/rolls/table/{tableId}` - Get all rolls for a table
- `GET /api/rolls/table/{tableId}/player/{playerId}` - Get all rolls for a player in a table

### WebSocket Endpoints

- `/ws` - WebSocket connection endpoint
- `/topic/table/{tableId}` - Subscribe to receive real-time roll updates for a specific table

## Development

The application uses:
- H2 in-memory database by default
- JPA for data persistence
- WebSocket for real-time communication
- Spring Security for CORS configuration

## Frontend Integration

The backend is configured to work with the frontend running on `localhost:5173` (Vite default port).
To change this, update the CORS configuration in:
- `WebSocketConfig.kt`
- `DiceRollController.kt`
