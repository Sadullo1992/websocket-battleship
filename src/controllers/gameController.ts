import WebSocket from 'ws';
import * as gameOperations from '../db/gameOperations';
import { GameCommands, Player } from '../types';
import { sendToWebSocketClient } from '../utils/sendToWebSocketClient';

export const login = (ws: WebSocket, data: unknown) => {
  const { name, index } = gameOperations.createPlayer(
    data as Omit<Player, 'index'>,
  );

  const stringifyNewPlayer = JSON.stringify({
    name,
    index,
    error: false,
    errorText: 'No error',
  });

  sendToWebSocketClient(ws, GameCommands.REG, stringifyNewPlayer);
};

const updateRooms = (ws: WebSocket) => {
  const rooms = gameOperations.getRooms();
  const stringifyRooms = JSON.stringify(rooms);

  sendToWebSocketClient(ws, GameCommands.UPDATE_ROOM, stringifyRooms);
};

export const createRoom = (ws: WebSocket) => {
  gameOperations.createRoom();

  updateRooms(ws);
};
