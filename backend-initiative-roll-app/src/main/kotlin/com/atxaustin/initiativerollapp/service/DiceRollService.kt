package com.atxaustin.initiativerollapp.service

import com.atxaustin.initiativerollapp.model.DiceRoll
import com.atxaustin.initiativerollapp.model.DiceRollResponse
import com.atxaustin.initiativerollapp.model.toResponse
import com.atxaustin.initiativerollapp.repository.DiceRollRepository
import com.atxaustin.initiativerollapp.messaging.KafkaProducerService
import org.springframework.stereotype.Service
import org.slf4j.LoggerFactory

@Service
class DiceRollService(
    private val diceRollRepository: DiceRollRepository,
    private val kafkaProducer: KafkaProducerService
) {

    private val logger = LoggerFactory.getLogger(DiceRollService::class.java)
    
    fun processRoll(
        baseScore: Int,
        diceType: String,
        rollType: String,
        modifier: Int?,
        playerId: String?,
        characterName: String?,
        tableId: String?
    ): DiceRollResponse {
        
        val totalScore = baseScore + (modifier ?: 0)
        
        val diceRoll = DiceRoll(
            baseScore = baseScore,
            rollType = rollType,
            diceType = diceType,
            modifier = modifier,
            totalScore = totalScore,
            playerId = playerId,
            characterName = characterName,
            tableId = tableId
        )
        
        val savedRoll = diceRollRepository.save(diceRoll)
        
        // Broadcast the roll to all players in the table
        kafkaProducer.sendMessage("dice-rolls", savedRoll)
        logger.info("Sent dice roll to Kafka topic: dice-rolls")
        
        return savedRoll.toResponse()
    }

    fun getRollsByTable(tableId: String): List<DiceRoll> =
        diceRollRepository.findByTableId(tableId)

    fun getRollsByPlayerAndTable(playerId: String, tableId: String): List<DiceRoll> =
        diceRollRepository.findByPlayerIdAndTableId(playerId, tableId)
} 

