export interface DiceRollRequest {
  notation: string;
  modifier?: number;
  advantage?: boolean;
  disadvantage?: boolean;
  rollType?: 'initiative' | 'attack' | 'save' | 'check' | 'damage';
}

export interface DiceRollResponse {
  id: string;
  timestamp: string;
  notation: string;
  results: number[];
  total: number;
  modifier?: number;
  advantage?: boolean;
  disadvantage?: boolean;
  rollType?: 'initiative' | 'attack' | 'save' | 'check' | 'damage';
} 