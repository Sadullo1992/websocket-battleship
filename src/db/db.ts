import WebSocket from 'ws';
import { Game, Room, TPlayer } from '../types';

export const wsMap = new Map<string, WebSocket>();

export const players: TPlayer[] = [];

export const rooms: Room[] = [];

export const games: Game[] = [];
