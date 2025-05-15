package com.atxaustin.initiativerollapp.model

data class PlayerEvent(
    val type: String, // e.g., "JOIN" or "EXIT"
    val tableId: String,
    val playerId: String,
    val playerName: String
)