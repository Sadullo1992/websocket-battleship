import WebSocket from 'ws';
import * as DB from './db';

export const addWebSocketToDB = (id: string, ws: WebSocket) => {
  DB.wsMap.set(id, ws);
};

export const removeWebSocketFromDB = (id: string) => {
  DB.wsMap.delete(id);
  removeUserFromDB(id);
  removeRoomFromDB(id);
};

export const getUserIndex = (ws: WebSocket) => {
  const map = DB.wsMap;
  for (let [key, value] of map.entries()) {
    if (value === ws) return key;
  }
  return '';
};

const removeUserFromDB = (userId: string) => {
  const index = DB.players.findIndex((item) => item.index === userId);
  DB.players.splice(index, 1);
};

const removeRoomFromDB = (userId: string) => {
  const index = DB.rooms.findIndex((item) =>
    item.roomUsers.some((user) => user.index === userId),
  );
  DB.rooms.splice(index, 1);
};

export const getWebSocketFromDB = (id: string) => {
  const ws = DB.wsMap.get(id);
  return ws;
};
