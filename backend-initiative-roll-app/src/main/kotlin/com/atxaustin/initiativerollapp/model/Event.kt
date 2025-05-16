package com.atxaustin.initiativerollapp.model

data class PlayerEvent(
    val type: String, // e.g., "JOIN" or "EXIT"
    val tableId: String,
    val playerId: String,
    val playerName: String,
    val characterName: String,

)

data class EventMessage(
    val type: String,
    val payload: Any,
    val timestamp: String = Instant.now().toString()
)