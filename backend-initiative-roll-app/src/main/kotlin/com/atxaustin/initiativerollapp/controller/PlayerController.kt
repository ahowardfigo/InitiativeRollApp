package com.atxaustin.initiativerollapp.controller

import com.atxaustin.initiativerollapp.model.PlayerEvent
import com.atxaustin.initiativerollapp.model.PlayerEventRequest
import com.atxaustin.initiativerollapp.service.PlayerService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.CrossOrigin

@RestController
@RequestMapping("/api/player")
@CrossOrigin(origins = ["http://localhost:5173"])
class PlayerController(
    private val playerService: PlayerService
) {
    @PostMapping("/event")
    fun handlePlayerEvent(@RequestBody request: PlayerEventRequest) {
        playerService.sendPlayerEvent(request.toEvent())
    }
}