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
    if (n > 98) n = -1;
    n++;
    return arr[n];
  };
})();
