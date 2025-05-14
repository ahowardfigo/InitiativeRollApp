package com.atxaustin.initiativerollapp.model

import jakarta.persistence.*
import java.time.Instant

@Entity
class DiceRoll(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    val baseScore: Int,
    val rollType: String,
    val diceType: String,
    val modifier: Int? = null,
    val totalScore: Int,
    val playerId: String? = null,
    val characterName: String? = null,
    val tableId: String? = null,
    val timestamp: Instant = Instant.now()
)

data class DiceRollResponse(
    val id: String,
    val rollType: String,
    val diceType: String,
    val baseScore: Int,
    val modifier: Int?,
    val totalScore: Int,
    val playerId: String?,
    val characterName: String?,
    val tableId: String?,
    val timestamp: String
)

fun DiceRoll.toResponse(): DiceRollResponse = DiceRollResponse(
    id = this.id.toString(),
    rollType = this.rollType,
    diceType = this.diceType,
    baseScore = this.baseScore,
    modifier = this.modifier,
    totalScore = this.totalScore,
    playerId = this.playerId,
    characterName = this.characterName,
    tableId = this.tableId,
    timestamp = this.timestamp.toString()
)

