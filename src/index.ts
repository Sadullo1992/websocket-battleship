import { wsController } from './controllers/wsController';
import { httpServer } from './httpServer';
import { wsServer } from './wsServer';

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

wsServer.on('connection', function connection(ws) {
  ws.on('message', (data) => wsController(ws, data));

  ws.on('error', console.error);
});
