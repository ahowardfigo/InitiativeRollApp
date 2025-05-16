export type Character = {
    characterName: string;
    race: string;
    characterClass: string;
    level: number;
  };
  
  export type Player = {
    id: string;
    playerName: string;
    character: Character;
  };

  export type DiceRoll = {
    id: number;
    rollType: 'initiative' | 'attack' | 'save' | 'check' | 'damage';
    diceType: string;
    baseScore: number;
    modifier?: number;
    totalScore: number;
    playerId?: string;
    playerName?: string;
    characterName?: string;
    tableId?: string;
    timestamp: string;
  } 
  
  export type PlayerEventType = "JOIN" | "LEAVE";
  
  export type PlayerEvent = {
    type: PlayerEventType;
    tableId: string;
    player: Player;
  };

  export type EventType = "DICE_ROLL" | "PLAYER_EVENT";

  export type EventMessage = {
    type: EventType;
    payload: DiceRoll | PlayerEvent;
    timestamp: string;
  }