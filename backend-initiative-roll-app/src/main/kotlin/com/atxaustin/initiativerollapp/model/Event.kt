package com.atxaustin.initiativerollapp.model

import java.time.Instant

data class EventMessage(
    val type: EventType,
    val payload: Any,
    val timestamp: String = Instant.now().toString()
)

enum class EventType {
    DICE_ROLL,
    PLAYER_EVENT
}

