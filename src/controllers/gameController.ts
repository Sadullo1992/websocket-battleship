import WebSocket from 'ws';
import * as gameOperations from '../db/gameOperations';
import { GameCommands, Player } from '../types';
import { sendToWebSocketClient } from '../utils/sendToWebSocketClient';

export const login = (ws: WebSocket, data: unknown) => {
  const { name, index } = gameOperations.createPlayer(
    data as Omit<Player, 'index'>,
  );

  const newPlayerStringData = JSON.stringify({
    name,
    index,
    error: false,
    errorText: 'No error',
  });

  sendToWebSocketClient(ws, GameCommands.REG, newPlayerStringData);
};
