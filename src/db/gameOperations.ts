import { Player } from '../types';
import { uuidGenerator } from '../utils/uuidGenerator';
import * as DB from './db';

export const createPlayer = (player: Omit<Player, 'index'>) => {
  const newPlayer = {
    index: uuidGenerator(),
    ...player,
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
