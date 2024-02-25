import WebSocket from 'ws';
import * as gameOperations from '../db/gameOperations';
import * as wsOperations from '../db/wsOperations';
import * as activeGameOperations from '../db/activeGameOperations';
import {
  AddShipsReq,
  AddUserReq,
  Attack,
  Game,
  GameCommands,
  Player,
} from '../types';
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
    const game = gameOperations.createGame(roomUsers);
    createGame(game);
    gameOperations.removeRoom(indexRoom);
  }

  updateRooms();
};

const createGame = (game: Game) => {
  game.players.forEach((player) => {
    const newGame = {
      idGame: game.gameId,
      idPlayer: player.indexPlayer,
    };
    const stringifyNewGame = JSON.stringify(newGame);

    const ws = wsOperations.getWebSocketFromDB(player.indexPlayer);

    if (!!ws)
      sendToWebSocketClient(ws, GameCommands.CREATE_GAME, stringifyNewGame);
  });
};

// Game Session
export const addShips = (data: unknown) => {
  const shipsData = data as AddShipsReq;
  const game = activeGameOperations.addShips(shipsData);

  const isStartGame = game?.players.every((player) => player.ships.length > 0);

  if (!!game && isStartGame) startGame(game);
};

const startGame = (game: Game) => {
  game.players.forEach((player) => {
    const gameData = {
      currentPlayerIndex: player.indexPlayer,
      ships: player.ships,
    };
    const stringifyGameData = JSON.stringify(gameData);

    const ws = wsOperations.getWebSocketFromDB(player.indexPlayer);

    if (!!ws)
      sendToWebSocketClient(ws, GameCommands.START_GAME, stringifyGameData);
  });
};

export const attack = (ws: WebSocket, data: unknown) => {
  const attackReq = data as Attack;

  const attackResults = activeGameOperations.attack(attackReq);

  attackResults.forEach((result) => {
    const stringifyAttackResult = JSON.stringify(result);
    sendToWebSocketClient(ws, GameCommands.ATTACK, stringifyAttackResult);
  });
};
