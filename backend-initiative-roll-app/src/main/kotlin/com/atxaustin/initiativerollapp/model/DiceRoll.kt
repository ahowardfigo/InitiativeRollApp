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