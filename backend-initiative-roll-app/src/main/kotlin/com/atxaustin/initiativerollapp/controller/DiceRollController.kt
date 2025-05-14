package com.atxaustin.initiativerollapp.controller

import com.atxaustin.initiativerollapp.model.DiceRoll
import com.atxaustin.initiativerollapp.service.DiceRollService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/rolls")
@CrossOrigin(origins = ["http://localhost:5173"]) // Vite default port
class DiceRollController(private val diceRollService: DiceRollService) {

    data class RollRequest(
        val baseScore: Int,
        val diceType: String,
        val modifier: Int?,
        val rollType: String,
        val playerId: String?,
        val characterName: String?,
        val tableId: String?
    )

    @PostMapping
    fun rollDice(@RequestBody request: RollRequest): ResponseEntity<DiceRoll> {
        val roll = diceRollService.processRoll(
            baseScore = request.baseScore,
            diceType = request.diceType,
            modifier = request.modifier,
            rollType = request.rollType,
            playerId = request.playerId,
            characterName = request.characterName,
            tableId = request.tableId
        )
        return ResponseEntity.ok(roll)
    }

    @GetMapping("/table/{tableId}")
    fun getRollsByTable(@PathVariable tableId: String): ResponseEntity<List<DiceRoll>> =
        ResponseEntity.ok(diceRollService.getRollsByTable(tableId))

    @GetMapping("/table/{tableId}/player/{playerId}")
    fun getRollsByPlayerAndTable(
        @PathVariable tableId: String,
        @PathVariable playerId: String
    ): ResponseEntity<List<DiceRoll>> =
        ResponseEntity.ok(diceRollService.getRollsByPlayerAndTable(playerId, tableId))
} 