import type { PlayerEventType, Player } from "./types";

export interface DiceRollRequest {
  diceType: string;
  baseScore: number;
  modifier?: number;
  rollType: 'initiative' | 'attack' | 'save' | 'check' | 'damage';
  playerName?: string;
  playerId?: string;
  characterName?: string;
  tableId?: string;
}

export interface DiceRollResponse {
  id: number;
  rollType: 'initiative' | 'attack' | 'save' | 'check' | 'damage';
  diceType: string;
  baseScore: number;
  modifier?: number;
  totalScore: number;
  playerName?: string;
  playerId?: string;
  characterName?: string;
  tableId?: string;
  timestamp: string;
} 

export interface PlayerEventRequest {
    type: PlayerEventType;
    tableId: string;
    player: Player;
}
