import WebSocket from 'ws';
import { AddShipsRes, GameCommands } from '../types';
import { generateRandomPosition } from '../utils/generateRandomPosition';
import { parseWebSocketMessage } from '../utils/parseWebSocketMessage';
import { sendToWebSocketClient } from '../utils/sendToWebSocketClient';
import { BOT_SHIPS } from './constants';
import * as botOperationsDB from './db';

const messageController = (
  ws: WebSocket,
  rawData: WebSocket.RawData,
  indexUser: string,
) => {
  const { type, data } = parseWebSocketMessage(rawData);

  switch (type) {
    case GameCommands.CREATE_GAME:
      createGame(ws, data, indexUser);
      break;
    case GameCommands.TURN:
      turn(ws, data, indexUser);
      break;
    case GameCommands.FINISH:
      finish(ws, indexUser);
      break;
  }
};

export { messageController };

const createGame = (ws: WebSocket, data: unknown, indexUser: string) => {
  const { idGame, idPlayer } = data as AddShipsRes;

  const gameResData = {
    gameId: idGame,
    indexPlayer: idPlayer,
    ships: BOT_SHIPS,
  };

  botOperationsDB.addGame({ idGame, idBot: idPlayer, indexUser });

  const stringifyGameResData = JSON.stringify(gameResData);
  sendToWebSocketClient(ws, GameCommands.ADD_SHIPS, stringifyGameResData);
};

const turn = (ws: WebSocket, data: unknown, indexUser: string) => {
  const { currentPlayer } = data as { currentPlayer: string };
  const game = botOperationsDB.getGame(indexUser);

  if (currentPlayer === game?.idBot) {
    const position = generateRandomPosition();
    const turnData = {
      gameId: game.idGame,
      indexPlayer: game.idBot,
      ...position,
    };

    const stringifyTurnData = JSON.stringify(turnData);
    sendToWebSocketClient(ws, GameCommands.ATTACK, stringifyTurnData);
  }
};

const finish = (ws: WebSocket, indexUser: string) => {
  ws.close();
  botOperationsDB.removeGame(indexUser);
};
