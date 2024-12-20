import { readInput } from "./input.ts";

export const DIRS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const CHEAT_TIME = 2;

export const getGrid = () =>
  readInput()
    .trimEnd()
    .split("\n")
    .map((row) => row.split(""));

export const getStart = (grid: string[][]) => {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === "S") {
        return [r, c];
      }
    }
  }

  throw new Error("Start not found");
};

export function printDistGrid(grid: number[][]) {
  for (let r = 0; r < grid.length; r++) {
    let row = "";
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === Number.MAX_SAFE_INTEGER) {
        row += "XX ";
      } else {
        row += grid[r][c].toString().padStart(2, "0") + " ";
      }
    }
    console.log(row);
  }
}

export function bfs(grid: string[][], sr: number, sc: number) {
  const distanceGrid = Array.from({ length: grid.length }, () =>
    Array.from({ length: grid[0].length }, () => Number.MAX_SAFE_INTEGER),
  );
  const locations: [number, number, number][] = [[sr, sc, 0]];
  const queue = [[sr, sc]];
  distanceGrid[sr][sc] = 0;
  while (queue.length) {
    const [r, c] = queue.shift()!;
    for (const [dr, dc] of DIRS) {
      const nr = r + dr;
      const nc = c + dc;

      if (grid[nr][nc] === "#") {
        continue;
      }

      if (distanceGrid[nr][nc] !== Number.MAX_SAFE_INTEGER) {
        continue;
      }

      distanceGrid[nr][nc] = distanceGrid[r][c] + 1;
      queue.push([nr, nc]);
      locations.push([nr, nc, distanceGrid[r][c] + 1]);
    }
  }

  return [distanceGrid, locations];
}

function calculateCheatPositions(grid: string[][], distGrid: number[][]) {
  const cheatCounts: Map<number, number> = new Map();
  for (let r = 1; r < grid.length - 1; r++) {
    for (let c = 1; c < grid[0].length - 1; c++) {
      if (grid[r][c] !== "#") continue;

      for (const [dr1, dc1] of DIRS) {
        for (const [dr2, dc2] of DIRS) {
          if (dr1 === dr2 && dc1 === dc2) continue;

          const nr1 = r + dr1;
          const nc1 = c + dc1;
          const nr2 = r + dr2;
          const nc2 = c + dc2;

          if (
            distGrid[nr1][nc1] === Number.MAX_SAFE_INTEGER ||
            distGrid[nr2][nc2] === Number.MAX_SAFE_INTEGER
          )
            continue;

          const symmetric = dr1 === -dr2 && dc1 === -dc2;

          const dist =
            Math.abs(distGrid[nr1][nc1] - distGrid[nr2][nc2]) - CHEAT_TIME;
          cheatCounts.set(
            dist,
            (cheatCounts.get(dist) || 0) + (symmetric ? 1 / 2 : 1),
          );
        }
      }
    }
  }
  return cheatCounts;
}

function part1() {
  const grid = getGrid();
  const [sr, sc] = getStart(grid);
  const [distGrid, _locs] = bfs(grid, sr, sc);
  const cheatPositions = calculateCheatPositions(grid, distGrid);
  console.log(
    cheatPositions
      .entries()
      .filter(([k, _v]) => k >= 100)
      .reduce((acc, [_k, v]) => acc + v, 0),
  );
}

if (import.meta.main) {
  part1();
}
