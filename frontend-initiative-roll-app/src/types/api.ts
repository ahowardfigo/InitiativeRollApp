export interface DiceRollRequest {
  diceType: string;
  baseScore: number;
  modifier?: number;
  rollType: 'initiative' | 'attack' | 'save' | 'check' | 'damage';
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
  playerId?: string;
  characterName?: string;
  tableId?: string;
  timestamp: string;
} 