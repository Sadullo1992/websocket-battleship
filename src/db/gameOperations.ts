import { Player } from '../types';
import * as DB from './db';

export const createPlayer = (player: Omit<Player, 'index'>) => {
  const index = DB.players.length;

  const newPlayer = {
    index,
    ...player,
  };

  DB.players.push(newPlayer);

  return newPlayer;
};
