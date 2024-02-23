import WebSocket from 'ws';
import { GameCommands } from '../types';
import { wsServer } from '../wsServer';

type GameCommandsUnion = `${GameCommands}`;

export const sendToWebSocketClient = (
  ws: WebSocket,
  type: GameCommandsUnion,
  data: string,
) => {
  ws.send(JSON.stringify({ type, data, id: 0 }));
};

export const sendToWebSocketAllClient = (
  type: GameCommandsUnion,
  data: string,
) => {
  wsServer.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type, data, id: 0 }));
    }
  });
};
