import WebSocket from 'ws';
import * as gameOperations from '../db/gameOperations';
import { GameCommands, Player } from '../types';
import { sendToWebSocketClient } from '../utils/sendToWebSocketClient';

export const login = (ws: WebSocket, data: unknown) => {
  const newPlayer = gameOperations.createPlayer(data as Omit<Player, 'index'>);

  const newPlayerStringData = JSON.stringify({
    error: false,
    errorText: 'No error',
    ...newPlayer,
  });

  sendToWebSocketClient(ws, GameCommands.REG, newPlayerStringData);
};
