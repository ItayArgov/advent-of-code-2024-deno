import { isOutOfBounds, rotateRight } from "./part1.ts";

self.onmessage = (event: {
  data: {
    grid: string[][];
    chunk: [number, number][];
    startPos: [number, number];
  };
}) => {
  const { grid, startPos, chunk } = event.data;
  const cnt = findObstaclesForChunk(chunk, grid, startPos);

  self.postMessage({ cnt });
  self.close();
};

function findObstaclesForChunk(
  chunk: [number, number][],
  grid: string[][],
  startPos: [number, number],
) {
  let cnt = 0;
  for (const [x, y] of chunk) {
    if (grid[x][y] !== ".") {
      continue;
    }

    grid[x][y] = "#";
    if (simulateGuard(grid, startPos)) {
      cnt++;
    }
    grid[x][y] = ".";
  }
  return cnt;
}

function simulateGuard(grid: string[][], startPos: [number, number]) {
  let [x, y] = startPos;
  let dir = [-1, 0] as [number, number];
  let steps = 0;
  const upperBound = grid.length * grid[0].length * 4;
  while (steps < upperBound) {
    const [dx, dy] = dir;
    if (isOutOfBounds(grid, x + dx, y + dy)) {
      return false;
    }

    while (grid[x + dir[0]][y + dir[1]] === "#") {
      dir = rotateRight(dir);
    }

    x += dir[0];
    y += dir[1];
    steps++;
  }

  return true;
}
