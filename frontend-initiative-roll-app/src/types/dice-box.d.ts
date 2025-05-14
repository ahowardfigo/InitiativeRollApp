declare module '@3d-dice/dice-box' {
  export default class DiceBox {
    constructor(selector: string, config: {
      assetPath: string;
      theme?: string;
      themeColor?: string;
      gravity?: number;
      [key: string]: any;
    });
    
    init(): Promise<void>;
    roll(notation: string): Promise<any>;
  }
} 