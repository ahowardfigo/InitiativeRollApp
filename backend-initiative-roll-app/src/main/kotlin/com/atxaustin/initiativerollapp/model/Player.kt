package com.atxaustin.initiativerollapp.model

data class Player(
    val id: String,
    val playerName: String,
    val character: Character
)

data class PlayerEvent(
    val type: PlayerEventType,
    val tableId: String,
    val player: Player
)

data class PlayerEventRequest(
    val type: PlayerEventType,
    val tableId: String,
    val player: Player
){
    fun toEvent(): PlayerEvent = PlayerEvent(
        type = type,
        tableId = tableId,
        player = player
    )
}

enum class PlayerEventType {
    JOIN,
    LEAVE
}