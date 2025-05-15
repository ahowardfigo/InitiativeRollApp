package com.atxaustin.initiativerollapp.messaging

import com.atxaustin.initiativerollapp.model.DiceRoll
import com.atxaustin.initiativerollapp.model.PlayerEvent
import org.springframework.kafka.annotation.KafkaListener
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Service
import org.slf4j.LoggerFactory


@Service
class KafkaConsumerService(
    private val messagingTemplate: SimpMessagingTemplate
) {

    private val logger = LoggerFactory.getLogger(KafkaConsumerService::class.java)

    @KafkaListener(topics = ["dice-rolls"], groupId = "initiative-group", containerFactory = "diceRollKafkaListenerContainerFactory")
    fun consumeDiceRoll(roll: DiceRoll) {
        logger.info("Received dice roll: $roll")
        val topic = "/topic/table"
        messagingTemplate.convertAndSend(topic, roll)
        logger.info("Sent dice roll to WebSocket topic: $topic")
    }

    @KafkaListener(topics = ["player-events"], groupId = "initiative-group", containerFactory = "playerEventKafkaListenerContainerFactory")
    fun consumePlayerEvent(event: PlayerEvent) {
        logger.info("Received player event: $event")
        val topic = "/topic/table/${event.tableId}/players"
        messagingTemplate.convertAndSend(topic, event)
        logger.info("Sent player event to WebSocket topic: $topic")
    }
}
