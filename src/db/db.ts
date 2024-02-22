import { Player, Room } from '../types';

export const players: Omit<Player, 'password'>[] = [];

export const rooms: Room[] = [];
