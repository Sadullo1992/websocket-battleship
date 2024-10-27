import { WebSocketServer } from 'ws';

const WS_PORT = 3000;

const wsServer = new WebSocketServer({ port: WS_PORT });

export { wsServer };
