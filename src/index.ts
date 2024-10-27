import { wsController } from './controllers/wsController';
import * as wsOperations from './db/wsOperations';
import { httpServer } from './httpServer';
import { uuidGenerator } from './utils/uuidGenerator';
import { wsServer } from './wsServer';

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

wsServer.on('connection', function connection(ws) {
  ws.on('message', (data) => wsController(ws, data));

  const id = uuidGenerator();
  wsOperations.addWebSocketToDB(id, ws);

  ws.on('error', console.log);

  ws.on('close', () => {
    wsOperations.removeWebSocketFromDB(id);
    console.log(`WebSocket is closed: ${id}`);
  });
});
