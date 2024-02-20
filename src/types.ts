export enum GameCommands {
  REG = 'reg',
}

export interface GameCommand<T> {
  type: string;
  data: T;
  id: number;
}

export interface Player {
  index: number;
  name: string;
  password: string;
}
