import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client/dist/sockjs';
import { Client } from '@stomp/stompjs';

interface DiceRoll {
  rollerId: string;
  tableId: string;
  result: number;
  diceType: string;
  timestamp: string;
}

const DiceRollListener: React.FC = () => {
  const [roll, setRoll] = useState<DiceRoll | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws'); // Adjust backend port if needed
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        setConnected(true);
        console.log('Connected to WebSocket');

        // Replace 123 with the actual table ID if dynamic
        stompClient.subscribe('/topic/table', (message) => {
          const payload: DiceRoll = JSON.parse(message.body);
          console.log('Received:', payload);
          setRoll(payload);
        });
      },
      onDisconnect: () => {
        console.log('Disconnected from WebSocket');
        setConnected(false);
      },
      debug: (str) => {
        // Uncomment for verbose logs
        // console.log(str);
      },
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  return (
    <div className="p-4 border rounded shadow max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-2">WebSocket Listener</h2>
      {connected ? (
        roll ? (
          <div className="text-green-700">
            <p><strong>Roller:</strong> {roll.rollerId}</p>
            <p><strong>Dice:</strong> {roll.diceType}</p>
            <p><strong>Result:</strong> {roll.result}</p>
            <p><strong>Time:</strong> {new Date(roll.timestamp).toLocaleString()}</p>
          </div>
        ) : (
          <p className="text-gray-500">Waiting for roll...</p>
        )
      ) : (
        <p className="text-red-600">Connecting to WebSocket...</p>
      )}
    </div>
  );
};

export default DiceRollListener;
