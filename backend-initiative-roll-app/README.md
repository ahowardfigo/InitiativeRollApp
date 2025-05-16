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
- Spring Kafka

## Setup

1. Ensure you have the following prerequisites:
   - JDK 11 or higher
   - Maven 3.6 or higher

2. Build the project:
```bash
mvn clean install
```
note: add the flag  `-DskipTests` if build error 
3. Run the application:
```bash
mvn spring-boot:run
```

The server will start on `localhost:8080`.

## API Endpoints

### REST Endpoints

- `POST /api/rolls` - Make a new dice roll that sends dice roll event
- `POST /api/player/event` - Sends a player event 

### WebSocket Endpoints

- `/ws` - WebSocket connection endpoint
- `/topic/table` - Subscribe to receive real-time roll updates for a specific table

## Development

The application uses:
- JPA for data persistence
- mySql as database
- Spring Kafka for event processing
- WebSocket for real-time communication
- Spring Security for CORS configuration

## Docker
This application requires the use of Docker to host the mySql database and Kafka. To spin up a docker instance run the docker command 

```bash 
docker compose up --build
```

## Frontend Integration

The backend is configured to work with the frontend running on `localhost:5173` (Vite default port).
To change this, update the CORS configuration in:
- `WebSocketConfig.kt`
- `DiceRollController.kt`
- `PlayerConroller.kt`
