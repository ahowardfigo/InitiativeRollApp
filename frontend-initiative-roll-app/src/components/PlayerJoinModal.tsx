import React, { useState } from 'react';
import Modal from 'react-modal';
import { usePlayerContext } from '../context/PlayerContext';
import { sendPlayerEvent } from '../api/client';
import type { PlayerEventRequest } from '../types/api';
import type { Player, Character } from '../types/types';    
import { buttonStyle, inputStyle, modalStyle, selectStyle } from '../styles/sharedStyles';

interface PlayerJoinModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

const races = ["Human", "Elf", "Dwarf", "Orc", "Halfling", "Dragonborn", "Gnome", "Tiefling", "Goblin", "Kobold"];
const classes = ["Bard", "Fighter", "Wizard", "Rogue", "Cleric", "Paladin", "Ranger", "Barabarian"];

export const PlayerJoinModal: React.FC<PlayerJoinModalProps> = ({ isOpen, onRequestClose }) => {

    const [step, setStep] = useState(1);
    const [playerName, setPlayerName] = useState('');
    const [characterName, setCharacterName] = useState('');
    const [race, setRace] = useState('');
    const [characterClass, setCharacterClass] = useState('');
    const [level, setLevel] = useState('1');

    const { setPlayer } = usePlayerContext();

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (playerName.trim()) {
            setStep(2);
        }
    };

    const handleJoin = async (e: React.FormEvent) => {
        e.preventDefault();

        const character: Character = {
            characterName,
            race,
            characterClass,
            level: parseInt(level),
        };

        const player: Player = {
            id: crypto.randomUUID(),
            playerName,
            character,
        };

        const playerEventRequest: PlayerEventRequest = {
            type: 'JOIN',
            tableId: 'default',
            player,
        };

        try {
            await sendPlayerEvent(playerEventRequest);
            setPlayer(player);
            onRequestClose();
        } catch (error) {
            console.error('Error joining game:', error);
        }
    };

    const renderInput = (label: string, id: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type: string = 'text', extraProps: object = {}) => (
        <div>
            <label htmlFor={id} className="block text-md mb-1">{label}</label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                style={inputStyle}
                required
                {...extraProps}
            />
        </div>
    );

    const renderSelect = (label: string, id: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, options: string[]) => (
        <div>
            <label htmlFor={id} className="block text-md mb-1">{label}</label>
            <select
                id={id}
                value={value}
                onChange={onChange}
                style={selectStyle}
                required
            >
                <option value="" disabled>Select {label.toLowerCase()}</option>
                {options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
            style={modalStyle}
            contentLabel="Join Game"
        >
            {step === 1 ? (
                <form onSubmit={handleNext} className="space-y-4">
                    <h2 className="text-3xl mb-4 text-center">Welcome, Adventurer!</h2>
                    {renderInput("Your Name", "playerName", playerName, (e) => setPlayerName(e.target.value))}
                    <button
                        type="submit"
                        style={{
                            ...buttonStyle,
                            cursor: playerName.trim() ? 'pointer' : 'not-allowed',
                            opacity: playerName.trim() ? 1 : 0.5,
                        }}
                        disabled={!playerName.trim()}
                    >
                        Next
                    </button>
                </form>
            ) : (
                <form onSubmit={handleJoin} className="space-y-4">
                    <h2 className="text-3xl mb-4 text-center">Create Thy Character</h2>
                    {renderInput("Character Name", "characterName", characterName, (e) => setCharacterName(e.target.value))}
                    {renderSelect("Race", "race", race, (e) => setRace(e.target.value), races)}
                    {renderSelect("Class", "class", characterClass, (e) => setCharacterClass(e.target.value), classes)}
                    {renderInput("Level", "level", level, (e) => setLevel(e.target.value), 'number', { min: 1, max: 20 })}
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            style={buttonStyle}
                        >
                            Join Game
                        </button>
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            style={buttonStyle}
                        >
                            Back
                        </button>
                    </div>
                </form>
            )}
        </Modal>
    );
};

export default PlayerJoinModal;
