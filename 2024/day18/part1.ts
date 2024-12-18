import { isTest, readInput } from "./input.ts";

type Grid = boolean[][];

export const GRID_BOUND = isTest() ? 7 : 71;
export const BYTES_BOUND = isTest() ? 12 : 1024;
export const END_LOC = isTest() ? [6, 6] : [70, 70];
const DIRS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

export function getBytesFalling() {
  return readInput()
    .trimEnd()
    .split("\n")
    .map((l) => l.split(",").map(Number) as [number, number]);
}

export function getGrid(bytes: [number, number][]) {
  const grid: Grid = Array(GRID_BOUND)
    .fill(null)
    .map(() => Array(GRID_BOUND).fill(true));

  for (const [c, r] of bytes) {
    grid[r][c] = false;
  }

  return grid;
}

export function bfs(grid: Grid, r: number, c: number) {
  const q: [number, number, number][] = [[r, c, 0]];
  const visited = new Map<string, number>();

  while (q.length) {
    const [r, c, d] = q.shift()!;

    if (r < 0 || r >= GRID_BOUND || c < 0 || c >= GRID_BOUND) {
      continue;
    }

    if (!grid[r][c]) {
      continue;
    }

    const key = `${r},${c}`;

    if (visited.has(key)) {
      continue;
    }

    visited.set(key, d);

    for (const [dr, dc] of DIRS) {
      q.push([r + dr, c + dc, d + 1]);
    }
  }

  return visited;
}

export function part1() {
  const bytes = getBytesFalling();
  const grid = getGrid(bytes.slice(0, BYTES_BOUND));
  const visited = bfs(grid, 0, 0);
  console.log(visited.get(END_LOC.join(",")));
}

if (import.meta.main) {
  part1();
}
