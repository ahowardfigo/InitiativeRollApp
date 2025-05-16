import type { DiceRollResponse } from "../types/api";

export const DiceRollControls = ({
  isRolling,
  onRoll,
  onLeave,
  lastRoll,
}: {
  isRolling: boolean;
  onRoll: () => void;
  onLeave: () => void;
  lastRoll: DiceRollResponse | null;
}) => {
  return (
    <div
      className="absolute bottom-0 w-full h-1/4 flex justify-between items-start px-6 py-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
    >
      <div className="text-left text-white text-sm">
        {lastRoll && (
          <>
            <p>Roll Type: {lastRoll.rollType}</p>
            <p>Base: {lastRoll.baseScore}</p>
            <p>Modifier: {lastRoll.modifier ? (lastRoll.modifier >= 0 ? `+${lastRoll.modifier}` : lastRoll.modifier) : '0'}</p>
            <p>Total: {lastRoll.totalScore}</p>
          </>
        )}
      </div>
      <div className="flex gap-4">
        <button onClick={onRoll} disabled={isRolling} className="btn">
          {isRolling ? 'Rolling...' : 'Roll d20'}
        </button>
        <button onClick={onLeave} disabled={isRolling} className="btn">
          Leave
        </button>
      </div>
    </div>
  );
};
