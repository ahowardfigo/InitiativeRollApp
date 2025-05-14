package com.atxaustin.initiativerollapp.repository

import com.atxaustin.initiativerollapp.model.DiceRoll
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface DiceRollRepository : JpaRepository<DiceRoll, Long> {
    fun findByTableId(tableId: String): List<DiceRoll>
    fun findByPlayerIdAndTableId(playerId: String, tableId: String): List<DiceRoll>
} 