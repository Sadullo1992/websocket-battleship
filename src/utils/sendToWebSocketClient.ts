import WebSocket from 'ws';
import { GameCommands } from '../types';

type GameCommandsUnion = `${GameCommands}`;

export const sendToWebSocketClient = (
  ws: WebSocket,
  type: GameCommandsUnion,
  data: string,
) => {
  ws.send(JSON.stringify({ type, data, id: 0 }));
};
