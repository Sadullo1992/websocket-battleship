import WebSocket from 'ws';
import { GameCommand } from '../types';
import { parseNested } from './parseNested';

export const parseWebSocketMessage = (rawData: WebSocket.RawData) => {
  const { type, data } = parseNested(
    rawData.toString(),
  ) as GameCommand<unknown>;

  return { type, data };
};
