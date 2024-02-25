import { ShipPosition } from '../types';

export const generateRandomPosition = (function () {
  let n = -1;
  const arr: ShipPosition[] = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      arr.push({ x: j, y: i });
    }
  }
  return function () {
    n++;

    return arr[n];
  };
})();
