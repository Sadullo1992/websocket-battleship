import WebSocket from 'ws';
import * as gameController from '../controllers/gameController';
import { GameCommands } from '../types';
import { parseWebSocketMessage } from '../utils/parseWebSocketMessage';

const wsController = (ws: WebSocket, rawData: WebSocket.RawData) => {
  const { type, data } = parseWebSocketMessage(rawData);

  switch (type) {
    case GameCommands.REG:
      gameController.login(ws, data);
      break;
    case GameCommands.CREATE_ROOM:
      gameController.createRoom(ws);
      break;
  }
};

export { wsController };
