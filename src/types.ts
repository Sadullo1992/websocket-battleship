export enum GameCommands {
  REG = 'reg',
  CREATE_ROOM = 'create_room',
  UPDATE_ROOM = 'update_room',
  ADD_USER_TO_ROOM = 'add_user_to_room',
  CREATE_GAME = 'create_game',
  ADD_SHIPS = 'add_ships',
  START_GAME = 'start_game',
  ATTACK = 'attack',
}

export interface GameCommand<T> {
  type: string;
  data: T;
  id: number;
}

export interface Player {
  index: string;
  name: string;
  password: string;
}

export type TPlayer = Omit<Player, 'password'>;

export interface Room {
  roomId: string;
  roomUsers: TPlayer[];
}

export interface AddUserReq {
  indexRoom: string;
}

export interface Game {
  gameId: string;
  players: GamePlayer[];
}

export interface GamePlayer {
  indexPlayer: string;
  ships: Ship[];
}

export interface Ship {
  position: ShipPosition;
  cells: ShipPosition[];
  direction: boolean;
  length: number;
  type: 'small' | 'medium' | 'large' | 'huge';
}
export interface ShipPosition {
  x: number;
  y: number;
}

export interface AddShipsReq {
  gameId: string;
  indexPlayer: string;
  ships: Omit<Ship, 'cells'>[];
}

export interface Attack {
  gameId: string;
  x: number;
  y: number;
  indexPlayer: string;
}

export interface AttackFeedback {
  position: {
    x: number;
    y: number;
  };
  currentPlayer: string;
  status: 'miss' | 'killed' | 'shot';
}
