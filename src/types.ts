export enum GameCommands {
  REG = 'reg',
  CREATE_ROOM = 'create_room',
  UPDATE_ROOM = 'update_room',
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

export interface Room {
  roomId: string;
  roomUsers: Omit<Player, 'password'>[];
}
