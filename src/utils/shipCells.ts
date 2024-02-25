import { Ship, ShipPosition } from '../types';

export const addShipCells = (ship: Omit<Ship, 'cells'>) => {
  const cells = getShipCells(ship);

  return {
    cells,
    ...ship,
  };
};

export const getShipCells = (ship: Omit<Ship, 'cells'> | Ship) => {
  const cells = [];
  for (let i = 0; i < ship.length; i++) {
    if (ship.direction) {
      cells.push({
        x: ship.position.x,
        y: ship.position.y + i,
      });
    } else {
      cells.push({
        x: ship.position.x + i,
        y: ship.position.y,
      });
    }
  }

  return cells;
};

export const getShipAroundCells = (ship: Omit<Ship, 'cells'> | Ship) => {
  const cells = getShipCells(ship);

  if (ship.direction) {
    const aroundCells = [];
    const firstCell = {
      x: cells[0].x,
      y: cells[0].y - 1,
    };
    aroundCells.push(firstCell);

    const lastCell = {
      x: cells[cells.length - 1].x,
      y: cells[cells.length - 1].y + 1,
    };

    const arrCells = [firstCell, ...cells, lastCell];

    arrCells.forEach((cell) => {
      aroundCells.push({
        x: cell.x - 1,
        y: cell.y,
      });
      aroundCells.push({
        x: cell.x + 1,
        y: cell.y,
      });
    });

    aroundCells.push(lastCell);

    const filteredAroundCells = aroundCells.filter(isCellAvailable);

    return filteredAroundCells;
  } else {
    const aroundCells = [];

    const firstCell = {
      x: cells[0].x - 1,
      y: cells[0].y,
    };
    aroundCells.push(firstCell);

    const lastCell = {
      x: cells[cells.length - 1].x + 1,
      y: cells[cells.length - 1].y,
    };

    const arrCells = [firstCell, ...cells, lastCell];

    arrCells.forEach((cell) => {
      aroundCells.push({
        x: cell.x,
        y: cell.y - 1,
      });
      aroundCells.push({
        x: cell.x,
        y: cell.y + 1,
      });
    });

    aroundCells.push(lastCell);

    const filteredAroundCells = aroundCells.filter(isCellAvailable);

    return filteredAroundCells;
  }
};

function isCellAvailable({ x, y }: ShipPosition) {
  return x > -1 && x < 10 && y > -1 && y < 10;
}
