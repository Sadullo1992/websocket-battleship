import WebSocket from 'ws';
import { Game, Player, Room } from '../types';

export const wsMap = new Map<string, WebSocket>();

export const players: Omit<Player, 'password'>[] = [];

export const rooms: Room[] = [];

export const games: Game[] = [];
