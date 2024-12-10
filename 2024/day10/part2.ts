import { readInput } from "./input.ts";
import { dirs, getGrid } from "./part1.ts";

function dfs(grid: number[][], r: number, c: number): number {
  if (grid[r][c] === 0) {
    return 1;
  }

  let sum = 0;

  for (const [dr, dc] of dirs) {
    const [nr, nc] = [r + dr, c + dc];
    if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length) {
      continue;
    }

    if (grid[r][c] - grid[nr][nc] !== 1) {
      continue;
    }

    sum += dfs(grid, nr, nc);
  }

  return sum;
}

function findTrailRatings(grid: number[][]) {
  let sum = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === 9) {
        sum += dfs(grid, r, c);
      }
    }
  }

  return sum;
}

function part2(input: string) {
  console.log(findTrailRatings(getGrid(input)));
}

if (import.meta.main) {
  part2(readInput().trimEnd());
}
