import { useEffect, useRef, useState } from 'react';
import { usePlayerContext } from '../context/PlayerContext';
import DiceBox from '@3d-dice/dice-box';
import { rollDice, sendPlayerEvent } from '../api/client';
import type { DiceRollResponse } from '../types/api';
import { buttonStyle, COLORS } from '../styles/sharedStyles';
import { DiceRollControls } from './DiceRollControls';

interface DiceRollerProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

const DiceRoller = ({ setIsModalOpen }: DiceRollerProps) => {

  const containerStyle: React.CSSProperties = {
      backgroundColor: COLORS.darkRed, // lighter shade of darkRed
      flex: 1,
      borderRadius: '10px',
      marginRight: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: COLORS.offWhite,
      fontSize: '1.5rem',
      minHeight: '300px',
    }

  const { player, setPlayer } = usePlayerContext();
  const character = player?.character;

  const containerRef = useRef<HTMLDivElement>(null);
  const diceBoxRef = useRef<any>(null);
  const [lastRoll, setLastRoll] = useState<DiceRollResponse | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    if (containerRef.current && !diceBoxRef.current) {
      // Create new DiceBox instance
      diceBoxRef.current = new DiceBox("#dice-container", {
        assetPath: "/assets/dice-box/",
        theme: "default",
        themeColor: "#30a0e0",
        backgroundColor: "#fdf6e3",
        gravity: 1,
        scale: 2,
      });

      // Initialize the dice box
      diceBoxRef.current.init().then(() => {
        console.log("DiceBox initialized!");
      });
    }

    // Cleanup on unmount
    return () => {
      if (diceBoxRef.current) {
        // Add any necessary cleanup here
      }
    };
  }, []);

  const handleRoll = async () => {
    if (diceBoxRef.current && !isRolling) {
      try {
        setIsRolling(true);
        
        // Trigger the 3D dice animation
        const diceResults = await diceBoxRef.current.roll('1d20');
        // Send the roll to the backend
        const rollResponse = await rollDice({
          diceType: diceResults[0].dieType,
          baseScore: diceResults[0].value,
          rollType: 'check', // default to check
          playerName: player?.playerName,
          characterName: character?.characterName,
          modifier: 3,
        });
        setLastRoll(rollResponse);
      } catch (error) {
        console.error('Error rolling dice:', error);
      } finally {
        setIsRolling(false);
      }
    }
  };

  const handleLeave = async () => {
    if (!player) return;
    await sendPlayerEvent({ type: 'LEAVE',  player: player, tableId: 'default' });
  
    setPlayer(null);
    setLastRoll(null);
    setIsModalOpen(true);

    if (diceBoxRef.current) {
      diceBoxRef.current.reset(); 
    }
  };

  return (
    <div style={containerStyle} className="relative">
      <div
        id="dice-container"
        ref={containerRef}
        className="w-full h-full bg-yellow-100 rounded-lg shadow-lg"
      />
      <DiceRollControls
        isRolling={isRolling}
        onRoll={handleRoll}
        onLeave={handleLeave}
        lastRoll={lastRoll}
      />
    </div>
  );
};

export default DiceRoller; 