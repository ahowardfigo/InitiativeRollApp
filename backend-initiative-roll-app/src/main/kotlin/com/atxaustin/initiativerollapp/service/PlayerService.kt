package com.atxaustin.initiativerollapp.service


import com.atxaustin.initiativerollapp.messaging.KafkaProducerService
import com.atxaustin.initiativerollapp.model.PlayerEvent
import org.springframework.stereotype.Service

@Service
class PlayerService(
    private val kafkaProducer: KafkaProducerService
) {
    fun playerJoined(tableId: String, playerId: String, playerName: String) {
        val event = PlayerEvent(
            type = "JOIN",
            tableId = tableId,
            playerId = playerId,
            playerName = playerName
        )

        kafkaProducer.sendMessage("player-events", event)
    }

    fun playerLeft(tableId: String, playerId: String, playerName: String) {
        val event = PlayerEvent(
            type = "EXIT",
            tableId = tableId,
            playerId = playerId,
            playerName = playerName
        )

        kafkaProducer.sendMessage("player-events", event)
    }
}