import { Player } from '../types';
import { uuidGenerator } from '../utils/uuidGenerator';
import * as DB from './db';

export const createPlayer = (player: Player) => {
  const newPlayer = {
    index: player.index,
    name: player.name,
  };

  DB.players.push(newPlayer);

  return newPlayer;
};

export const createRoom = () => {
  const newRoom = {
    roomId: uuidGenerator(),
    roomUsers: [],
  };

  DB.rooms.push(newRoom);
};

export const getRooms = () => DB.rooms;

const getCurrentUser = (index: number) => {
  const user = DB.players.find((player) => player.index === index);
  return user;
};

export const addUserToRoom = (indexRoom: string, userIndex: number) => {
  const user = getCurrentUser(userIndex);

  if (!!user)
    DB.rooms.find((room) => room.roomId === indexRoom)?.roomUsers.push(user);
};
