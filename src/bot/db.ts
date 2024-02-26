export interface TBotGame {
  idGame: string;
  idBot: string;
  indexUser: string;
}

const botGames: TBotGame[] = [];

export const addGame = (game: TBotGame) => {
  botGames.push(game);
};

export const getGame = (indexUser: string) => {
  const game = botGames.find((item) => item.indexUser === indexUser);
  return game;
};

export const removeGame = (indexUser: string) => {
  const index = botGames.findIndex((item) => item.indexUser === indexUser);
  botGames.splice(index, 1);
};
