import WebSocket from 'ws';
import { Game, Room, Player, Winner } from '../types';

export const wsMap = new Map<string, WebSocket>();

export const players: Player[] = [];

export const rooms: Room[] = [];

export const games: Game[] = [];

export const winners: Winner[] = [];
