import WebSocket from 'ws';
import { Game, Room, TPlayer, Winner } from '../types';

export const wsMap = new Map<string, WebSocket>();

export const players: TPlayer[] = [];

export const rooms: Room[] = [];

export const games: Game[] = [];

export const winners: Winner[] = [];
