import { AddShipsReq, Attack, ShipPosition } from '../types';
import {
  addShipCells,
  getShipCells,
  getShipAroundCells,
} from '../utils/shipCells';
import * as DB from './db';

export const addShips = (data: AddShipsReq) => {
  const { gameId, indexPlayer, ships } = data;

  const shipsWithCells = ships.map(addShipCells);

  const game = DB.games.find((item) => item.gameId === gameId);

  game?.players
    .find((player) => player.indexPlayer === indexPlayer)
    ?.ships.push(...shipsWithCells);

  return game;
};

export const attack = (attack: Attack) => {
  const { gameId, indexPlayer, x, y } = attack;

  const game = DB.games.find((item) => item.gameId === gameId);
  const enemyPlayer = game?.players.find(
    (player) => player.indexPlayer !== indexPlayer,
  );

  const isCellExist = (cell: ShipPosition) => cell.x === x && cell.y === y;

  const destroyedEnemyShip = enemyPlayer?.ships.find((ship) =>
    ship.cells.some(isCellExist),
  );

  const attackRes = {
    position: { x, y },
    currentPlayer: indexPlayer,
    status: 'miss',
  };

  if (!destroyedEnemyShip) return [attackRes];
  console.log(destroyedEnemyShip.cells);

  const indexCell = destroyedEnemyShip.cells.findIndex(isCellExist);
  destroyedEnemyShip.cells.splice(indexCell, 1);
  console.log(destroyedEnemyShip.cells);

  if (destroyedEnemyShip.cells.length > 0)
    return [
      {
        ...attackRes,
        status: 'shot',
      },
    ];
  else {
    const ownCells = getShipCells(destroyedEnemyShip);
    const aroundCells = getShipAroundCells(destroyedEnemyShip);

    const ownCellRes = ownCells.map((item) => ({
      ...attackRes,
      position: { x: item.x, y: item.y },
      status: 'killed',
    }));
    const aroundCellRes = aroundCells.map((item) => ({
      ...attackRes,
      position: { x: item.x, y: item.y },
    }));

    return [...aroundCellRes, ...ownCellRes];
  }
};
