import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client/dist/sockjs';
import { Client } from '@stomp/stompjs';
import type { EventMessage, PlayerEvent } from '../types/types';
import type { DiceRollResponse } from '../types/api';
import { COLORS } from '../styles/sharedStyles';


export const DiceRollListener: React.FC = () => {

     const containerStyle: React.CSSProperties = {
        backgroundColor: COLORS.veryDark,
        flex: 1,
        borderRadius: '10px',
        marginLeft: '1rem',
        padding: '1rem',
        color: COLORS.offWhite,
        fontSize: '1.25rem',
        minHeight: '300px',
        overflowY: 'auto'
    }

    const [messages, setMessages] = useState<string[]>([]);
    
    useEffect(() => {
        const sock = new SockJS('http://localhost:8080/ws');
        const stompClient = new Client({
            webSocketFactory: () => sock,
            debug: (str) => console.log(str),
            reconnectDelay: 5000,
          });

          stompClient.onConnect = (frame) => {
            console.log('Connected: ', frame);
            stompClient.subscribe('/topic/table', (message) => {
              if (message.body) {
                const event = JSON.parse(message.body) as EventMessage;
      
                let displayMessage = '';
                switch (event.type) {
                  case 'DICE_ROLL': {
                    const roll = event.payload as DiceRollResponse;
                    displayMessage = `${roll.characterName} has rolled ${roll.totalScore} for their ${roll.rollType}`;
                    break;
                  }
                  case 'PLAYER_EVENT': {
                    const { type: eventType, player } = event.payload as PlayerEvent;
                    const { playerName, character } = player;
                    const { level, race, characterName, characterClass } = character;

                    if (eventType === 'JOIN') {
                        displayMessage = `${playerName} has joined table as ${characterName} a level ${level} ${race} ${characterClass}`;
                    } else if (eventType === 'LEAVE') {
                        displayMessage = `${playerName} (${characterName}) has left the table`;
                    }
                    break;
                  }   
                }
      
                setMessages((prev) => [...prev, displayMessage].slice(-10));
              }
            });
          };
      
          stompClient.activate();
      
          return () => {
            stompClient.deactivate();
          };
        }, []);

    return (
    <div style={containerStyle}>
        <div className="bg-gray-100 p-4 rounded-lg max-h-60 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-2">Recent Events</h3>
            <ul className="space-y-2">
                {messages.map((message, index) => (
                    <li key={index} className="text-sm text-gray-700 bg-white p-2 rounded shadow">
                        {message}
                    </li>
                ))}
            </ul>
        </div>
    </div>
    );
};
