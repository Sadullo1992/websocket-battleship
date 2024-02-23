import WebSocket from 'ws';
import * as gameOperations from '../db/gameOperations';
import * as wsOperations from '../db/wsOperations';
import { AddUserReq, Game, GameCommands, Player } from '../types';
import {
  sendToWebSocketAllClient,
  sendToWebSocketClient,
} from '../utils/sendToWebSocketClient';

const updateRooms = () => {
  const rooms = gameOperations.getRooms();
  if (rooms.length > 0) {
    const stringifyRooms = JSON.stringify(rooms);

    sendToWebSocketAllClient(GameCommands.UPDATE_ROOM, stringifyRooms);
  }
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

  updateRooms();
};

export const createRoom = (ws: WebSocket) => {
  const indexUser = getUserIndex(ws);
  gameOperations.createRoom(indexUser);

  updateRooms();
};

export const getUserIndex = (ws: WebSocket) => {
  const index = wsOperations.getUserIndex(ws);
  return index;
};

export const addUserToRoom = (ws: WebSocket, data: unknown) => {
  const { indexRoom } = data as AddUserReq;

  const indexUser = getUserIndex(ws);

  const roomUsers = gameOperations.addUserToRoom(indexRoom, indexUser);
  if (roomUsers?.length === 2) {
    const game = gameOperations.createGame(indexUser);
    createGame(game);
    gameOperations.removeRoom(indexRoom);
  }

  updateRooms();
};

const createGame = (game: Game) => {
  const stringifyNewGame = JSON.stringify(game);

  sendToWebSocketAllClient(GameCommands.CREATE_GAME, stringifyNewGame);
};
