import { readInput } from "./input.ts";

type Cord = string;

const DIRS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
] as [number, number][];

function dfs(
  r: number,
  c: number,
  currLand: string,
  grid: string[][],
  visited: Set<Cord>,
): [number, number] {
  if (
    r < 0 ||
    c < 0 ||
    r >= grid.length ||
    c >= grid[0].length ||
    grid[r][c] !== currLand
  ) {
    return [0, 1];
  }

  const cord = `${r},${c}`;

  if (visited.has(cord)) {
    return [0, 0];
  }

  visited.add(cord);
  const res = [1, 0] as [number, number];
  for (const [dr, dc] of DIRS) {
    const [a, b] = dfs(r + dr, c + dc, currLand, grid, visited);
    res[0] += a;
    res[1] += b;
  }

  return res;
}

function part1(input: string) {
  const grid = input.split("\n").map((l) => l.split(""));
  const visited = new Set<Cord>();
  let res = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (visited.has(`${r},${c}`)) continue;
      const [a, b] = dfs(r, c, grid[r][c], grid, visited);
      res += a * b;
    }
  }

  console.log(res);
}

if (import.meta.main) {
  part1(readInput().trimEnd());
}
