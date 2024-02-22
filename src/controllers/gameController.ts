import WebSocket from 'ws';
import * as gameOperations from '../db/gameOperations';
import { AddUserReq, GameCommands, Player } from '../types';
import { sendToWebSocketClient } from '../utils/sendToWebSocketClient';
import { wsServer } from '../wsServer';

const updateRooms = (ws: WebSocket) => {
  const rooms = gameOperations.getRooms();
  const stringifyRooms = JSON.stringify(rooms);

  sendToWebSocketClient(ws, GameCommands.UPDATE_ROOM, stringifyRooms);
};

export const login = (ws: WebSocket, data: unknown) => {
  const index = getUserIndex(ws);

  const newPlayer = {
    index,
    ...(data as Omit<Player, 'index'>),
  };
  const { name } = gameOperations.createPlayer(newPlayer);

  const stringifyNewPlayer = JSON.stringify({
    name,
    index,
    error: false,
    errorText: 'No error',
  });

  sendToWebSocketClient(ws, GameCommands.REG, stringifyNewPlayer);

  updateRooms(ws);
};

export const createRoom = (ws: WebSocket) => {
  gameOperations.createRoom();

  updateRooms(ws);
};

export const getUserIndex = (ws: WebSocket) => {
  const index = Array.from(wsServer.clients).findIndex(
    (client) => client === ws,
  );
  return index;
};

export const addUserToRoom = (ws: WebSocket, data: unknown) => {
  const { indexRoom } = data as AddUserReq;

  const indexUser = getUserIndex(ws);

  gameOperations.addUserToRoom(indexRoom, indexUser);

  updateRooms(ws);
};
