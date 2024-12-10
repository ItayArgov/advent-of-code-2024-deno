import { readInput } from "./input.ts";

export const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

export const getGrid = (input: string) =>
  input.split("\n").map((line) => [...line].map(Number));

function dfs(grid: number[][], r: number, c: number, trailHeads: Set<string>) {
  if (grid[r][c] === 9) {
    trailHeads.add(`${r},${c}`);
    return;
  }

  for (const [dr, dc] of dirs) {
    const [nr, nc] = [r + dr, c + dc];
    if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length) {
      continue;
    }

    if (grid[nr][nc] - grid[r][c] !== 1) {
      continue;
    }

    dfs(grid, nr, nc, trailHeads);
  }
}

function findTrailHeads(grid: number[][]) {
  let sum = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === 0) {
        const trailHeads = new Set<string>();
        dfs(grid, r, c, trailHeads);
        sum += trailHeads.size;
      }
    }
  }

  return sum;
}

function part1(input: string) {
  console.log(findTrailHeads(getGrid(input)));
}

if (import.meta.main) {
  part1(readInput().trimEnd());
}
