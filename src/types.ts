export enum GameCommands {
  REG = 'reg',
  CREATE_ROOM = 'create_room',
  UPDATE_ROOM = 'update_room',
  ADD_USER_TO_ROOM = 'add_user_to_room',
  CREATE_GAME = 'create_game',
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

export interface Game {
  idGame: string;
  players: TPlayer[];
}

export interface AddUserReq {
  indexRoom: string;
}
