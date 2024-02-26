import { Player, Room, TPlayer } from '../types';
import { uuidGenerator } from '../utils/uuidGenerator';
import * as DB from './db';

export const createPlayer = (player: Player) => {
  const isUsernameExist = DB.players.some((item) => item.name === player.name);

  !isUsernameExist && DB.players.push(player);

  const ERROR_MSG = 'This username is already exist. Please, try another one.';

  const playerRes = {
    index: player.index,
    name: player.name,
    error: isUsernameExist,
    errorText: isUsernameExist ? ERROR_MSG : '',
  };

  return playerRes;
};

export const createRoom = (userIndex: string) => {
  const newRoom = {
    roomId: uuidGenerator(),
    roomUsers: [],
  } as Room;

  const user = getCurrentUser(userIndex);

  if (!!user) newRoom.roomUsers.push(user);

  DB.rooms.push(newRoom);
};

export const getRooms = () => DB.rooms;

export const getCurrentUser = (userIndex: string) => {
  const user = DB.players.find((player) => player.index === userIndex);

  if (!user) return;

  const { name, index } = user;
  return { name, index };
};

export const addUserToRoom = (indexRoom: string, indexUser: string) => {
  const roomUsers = DB.rooms.find(
    (room) => room.roomId === indexRoom,
  )?.roomUsers;

  const hasCurrentUserInRoom = roomUsers?.some(
    (item) => item.index === indexUser,
  );

  const user = getCurrentUser(indexUser);

  if (!!user && !hasCurrentUserInRoom) roomUsers?.push(user);

  return roomUsers;
};

export const createGame = (players: TPlayer[]) => {
  const gamePlayers = players.map((item) => ({
    indexPlayer: item.index,
    ships: [],
  }));
  const newGame = {
    gameId: uuidGenerator(),
    players: gamePlayers,
  };

  DB.games.push(newGame);

  return newGame;
};

export const removeRoom = (indexRoom: string) => {
  const index = DB.rooms.findIndex((item) => item.roomId === indexRoom);
  DB.rooms.splice(index, 1);
};

export const updateWinners = (indexPlayer: string) => {
  const index = DB.winners.findIndex((item) => item.index === indexPlayer);

  if (index === -1) {
    const user = getCurrentUser(indexPlayer);
    !!user && DB.winners.push({ ...user, wins: 1 });
  } else DB.winners[index].wins++;

  return DB.winners;
};

export const createBot = (indexBot: string) => {
  const bot = {
    index: indexBot,
    name: 'Bot',
    password: indexBot,
  };

  DB.players.push(bot);

  return {
    index: bot.index,
    name: bot.name,
  };
};
