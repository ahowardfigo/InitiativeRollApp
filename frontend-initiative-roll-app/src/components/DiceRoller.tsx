import { useEffect, useRef, useState } from 'react';
import DiceBox from '@3d-dice/dice-box';
import { rollDice } from '../api/client';
import type { DiceRollResponse } from '../types/api';

const DiceRoller = () => {
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
        gravity: 1,
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

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div
        id="dice-container"
        ref={containerRef}
        className="w-full h-[400px] bg-slate-800 rounded-lg shadow-lg"
      />
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={handleRoll}
          disabled={isRolling}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRolling ? 'Rolling...' : 'Roll d20'}
        </button>
        {lastRoll && (
          <div className="text-center">
            <p className="text-sm text-gray-600">Roll Type: {lastRoll.rollType}</p>
            <p className="text-lg font-bold">Base: {lastRoll.baseScore}</p>
            <p className="text-lg font-bold">Modifier: {lastRoll.modifier ? 
              `${lastRoll.modifier >= 0 ? '+' : '-'}${lastRoll.modifier}` : '0'}
            </p>
            <p className="text-lg font-bold">Total: {lastRoll.totalScore}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiceRoller; 