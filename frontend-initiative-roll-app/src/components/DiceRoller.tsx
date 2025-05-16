import { useEffect, useRef, useState } from 'react';
import { usePlayerContext } from '../context/PlayerContext';
import DiceBox from '@3d-dice/dice-box';
import { rollDice, sendPlayerEvent } from '../api/client';
import type { DiceRollResponse } from '../types/api';
import { COLORS } from '../styles/sharedStyles';
import { DiceRollControls } from './DiceRollControls';

interface DiceRollerProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

const DiceRoller = ({ setIsModalOpen }: DiceRollerProps) => {

  const containerStyle: React.CSSProperties = {
      flex: 1,
      width: '100%',
      borderRadius: '10px',
      marginRight: '1rem',
      display: 'flex',
      flexDirection: 'column',
      color: COLORS.offWhite,
      backgroundImage: 'url(/assets/woodgrain2.jpg)',
      fontSize: '1.5rem',
      minHeight: '300px',
      position: 'relative',
    }

  const { player, setPlayer } = usePlayerContext();
  const character = player?.character;

  const containerRef = useRef<HTMLDivElement>(null);
  const diceBoxRef = useRef<any>(null);
  const [lastRoll, setLastRoll] = useState<DiceRollResponse | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    if (containerRef.current && !diceBoxRef.current) {

      const containerWidth = containerRef.current?.offsetWidth || 600;
      const scale = containerWidth / 25; // Adjust divisor to taste
      // Create new DiceBox instance
      diceBoxRef.current = new DiceBox("#dice-container", {
        assetPath: "/assets/dice-box/",
        theme: "default",
        themeColor: "#30a0e0",
        backgroundColor: "#fdf6e3",
        gravity: 1,
        scale: scale,
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
        setLastRoll(null);
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
    <div style={containerStyle}>
      <div
        id="dice-container"
        ref={containerRef}
        style={{
          flexGrow: 1,
          width: '100%',
          height: '100%',
          minHeight: '400px', // force a visible height
          position: 'relative',
          background: 'rgba(0,0,0,0.1)',
          borderRadius: '8px',
          overflow: 'visible',
        }}
      />
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'center',
      }}>
      <DiceRollControls
        isRolling={isRolling}
        onRoll={handleRoll}
        onLeave={handleLeave}
        lastRoll={lastRoll}
      />
      </div>
    </div>
  );
};

export default DiceRoller; 