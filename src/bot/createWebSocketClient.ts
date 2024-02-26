import { WebSocket } from 'ws';
import { GameCommands, TPlayer } from '../types';
import { sendToWebSocketClient } from '../utils/sendToWebSocketClient';
import { messageController } from './messageController';

export const createWebSocketClient = (player: TPlayer) => {
  const wsClient = new WebSocket('ws://localhost:3000');

  const stringifyPlayer = JSON.stringify(player);

  wsClient.onopen = () => {
    console.log('Bot connected!');
    sendToWebSocketClient(wsClient, GameCommands.START_BOT, stringifyPlayer);
  };

  wsClient.on('message', (data) =>
    messageController(wsClient, data, player.index),
  );
};
