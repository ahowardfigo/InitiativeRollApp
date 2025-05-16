package com.atxaustin.initiativerollapp.service


import com.atxaustin.initiativerollapp.messaging.KafkaProducerService
import com.atxaustin.initiativerollapp.model.Player
import com.atxaustin.initiativerollapp.model.PlayerEvent
import com.atxaustin.initiativerollapp.model.PlayerEventType
import org.springframework.stereotype.Service

@Service
class PlayerService(
    private val kafkaProducer: KafkaProducerService
) {
    fun sendPlayerEvent(playerEvent: PlayerEvent ) {
        kafkaProducer.sendMessage("player-events", playerEvent)
    }
}