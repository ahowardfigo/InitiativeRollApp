package com.atxaustin.initiativerollapp.messaging

import com.atxaustin.initiativerollapp.model.DiceRoll
import com.atxaustin.initiativerollapp.model.EventMessage
import com.atxaustin.initiativerollapp.model.EventType
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

    @KafkaListener(
        topics = ["player-events"],
        groupId = "initiative-group",
        containerFactory = "playerEventKafkaListenerContainerFactory"
    )
    fun consumePlayerEvent(event: PlayerEvent) {
        logger.info("Received PlayerEvent: $event")

        val eventMessage = EventMessage(EventType.PLAYER_EVENT, event)
        val topic = "/topic/table"
        messagingTemplate.convertAndSend(topic, eventMessage)

        logger.info("Sent PlayerEvent to WebSocket topic: $topic")
    }

    @KafkaListener(
        topics = ["dice-rolls"],
        groupId = "initiative-group",
        containerFactory = "diceRollKafkaListenerContainerFactory"
    )
    fun consumeDiceRoll(event: DiceRoll) {
        logger.info("Received DiceRoll: $event")

        val eventMessage = EventMessage(EventType.DICE_ROLL, event)
        val topic = "/topic/table"
        messagingTemplate.convertAndSend(topic, eventMessage)

        logger.info("Sent DiceRoll to WebSocket topic: $topic")
    }
}

