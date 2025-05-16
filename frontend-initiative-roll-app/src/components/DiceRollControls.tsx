import { useState } from "react";
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

  const controlsContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '1rem',
    boxSizing: 'border-box',
  };
  
  const inputStyle: React.CSSProperties = {
    padding: '0.25rem 0.5rem',
    borderRadius: 4,
    fontSize: '0.9rem',
    border: '1px solid #ccc',
    backgroundColor: 'white',
    minWidth: 80,
  };
  
  const modifierStyle: React.CSSProperties = {
    ...inputStyle,
    width: 60,
  };
  
  const buttonStyle: React.CSSProperties = {
    padding: '0.5rem 1rem',
    border: 'none',
    backgroundColor: '#444',
    color: 'white',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: '0.9rem',
  };
  
  const leaveButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: 'darkred',
  };
  
  const disabledButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#999',
    cursor: 'not-allowed',
  };

  const lastRollStyle: React.CSSProperties = {
    color: 'white',
    fontSize: '0.875rem',
    marginBottom: '1rem',
    alignSelf: 'flex-start',
  };

  const controlsRowStyle: React.CSSProperties = {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  };

  const [modifier, setModifier] = useState<number>(0);
  const [rollType, setRollType] = useState<'check' | 'save' | 'attack'>('check');
  const [checkType, setCheckType] = useState<string>('');
  const [saveType, setSaveType] = useState<string>('');


  return (
    <div style={controlsContainerStyle}>
  <div style={lastRollStyle}>
    {lastRoll && (
      <>
        <p>Roll Type: {lastRoll.rollType}</p>
        <p>Base: {lastRoll.baseScore}</p>
        <p>
          Modifier:{' '}
          {lastRoll.modifier ? (lastRoll.modifier >= 0 ? `+${lastRoll.modifier}` : lastRoll.modifier) : ''}
        </p>
        <p>Total: {lastRoll.totalScore}</p>
      </>
    )}
  </div>
  <div style={controlsRowStyle}>
    <select style={inputStyle} value={rollType} onChange={(e) => setRollType(e.target.value as 'check' | 'save' | 'attack')}>
      <option value="check">Skill Check</option>
      <option value="save">Save</option>
      <option value="attack">Attack</option>
    </select>
    {rollType === 'save' && (
    <select style={inputStyle} value={saveType} onChange={(e) => setCheckType(e.target.value)}>
      <option value="">Select Save</option>
      <option value="STR">STR</option>
      <option value="DEX">DEX</option>
      <option value="CON">CON</option>
      <option value="INT">INT</option>
      <option value="WIS">WIS</option>
      <option value="CHA">CHA</option>
    </select>
    )}

    {rollType === 'check' && (
    <select style={inputStyle} value={checkType} onChange={(e) => setCheckType(e.target.value)}>
      <option value="">Select Skill</option>
      <option value="acrobatics">Acrobatics</option>
      <option value="animal_handling">Animal Handling</option>
      <option value="arcana">Arcana</option>
      <option value="athletics">Athletics</option>
      <option value="deception">Deception</option>
      <option value="history">History</option>
      <option value="insight">Insight</option>
      <option value="intimidation">Intimidation</option>
      <option value="investigation">Investigation</option>
      <option value="medicine">Medicine</option>
      <option value="nature">Nature</option>
      <option value="perception">Perception</option>
      <option value="performance">Performance</option>
      <option value="persuasion">Persuasion</option>
      <option value="religion">Religion</option>
      <option value="sleight_of_hand">Sleight of Hand</option>
      <option value="stealth">Stealth</option>
      <option value="survival">Survival</option>
    </select>
    )}

    <input
      type="number"
      value={modifier}
      onChange={(e) => setModifier(parseInt(e.target.value))}
      placeholder="Modifier"
      style={modifierStyle}
    />

    <button
      onClick={onRoll}
      disabled={isRolling}
      style={isRolling ? disabledButtonStyle : buttonStyle}
    >
      {isRolling ? 'Rolling...' : 'Roll d20'}
    </button>

    <button
      onClick={onLeave}
      disabled={isRolling}
      style={isRolling ? disabledButtonStyle : leaveButtonStyle}
    >
      Leave
    </button>
  </div>
</div>
  );
};
