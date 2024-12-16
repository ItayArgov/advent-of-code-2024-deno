import { readInput } from "./input.ts";
import { ascend, BinaryHeap } from "@std/data-structures";

type Letters = "." | "E" | "#" | "S";
export type Grid = Letters[][];
type Tuple = [number, number];

export const DIRS: Tuple[] = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

export const getStartLocation = (grid: Grid): Tuple => {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === "S") {
        return [r, c];
      }
    }
  }

  throw new Error("No start location found");
};

const comparator = ([_l1, d1]: [string, number], [_l2, d2]: [string, number]) =>
  d1 - d2;

export const toKey = (r: number, c: number) => `${r},${c}`;
const toKeyWithDir = (r: number, c: number, dr: number, dc: number) =>
  `${r},${c},${dr},${dc}`;

export const getEndLocation = (grid: Grid): Tuple => {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === "E") {
        return [r, c];
      }
    }
  }

  throw new Error("No end location found");
};

const getEndScore = (grid: Grid, distGrid: number[][]) => {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === "E") {
        return distGrid[r][c];
      }
    }
  }

  throw new Error("No end location found");
};

function getNeighborsWithCost(
  grid: Grid,
  r: number,
  c: number,
  currDir: Tuple,
): [Tuple, number][] {
  const [currDr, currDc] = currDir;

  return DIRS.map(([dr, dc]) => {
    const [nr, nc] = [r + dr, c + dc];

    if (grid[nr][nc] !== "." && grid[nr][nc] !== "E") {
      return null;
    }

    if (dr === -currDr && dc === -currDc) {
      return [[nr, nc], 2000];
    }

    return dr === currDr && dc === currDc ? [[nr, nc], 1] : [[nr, nc], 1001];
  }).filter(Boolean) as [Tuple, number][];
}

function getGrid(input: string): Grid {
  return input.split("\n").map((line) => line.split("") as Letters[]);
}

export function djisktra(
  grid: Grid,
  sr: number,
  sc: number,
  sdr: number,
  sdc: number,
) {
  const res: number[][] = Array.from({ length: grid.length }).map(() =>
    Array.from({ length: grid[0].length }),
  );
  res.forEach((a) => a.fill(Number.MAX_SAFE_INTEGER));

  const pq = new BinaryHeap(comparator);
  const seen = new Map<string, [number, number]>();
  pq.push([toKeyWithDir(sr, sc, sdr, sdc), 0]);

  while (pq.peek() !== undefined) {
    const [loc, dist] = pq.pop()!;
    const [r, c, dr, dc] = loc.split(",").map(Number);

    if (seen.has(toKey(r, c))) {
      continue;
    }

    seen.set(toKey(r, c), [dr, dc]);
    res[r][c] = dist;

    const neigh = getNeighborsWithCost(grid, r, c, [dr, dc]);
    for (const [[nr, nc], cost] of neigh) {
      pq.push([toKeyWithDir(nr, nc, nr - r, nc - c), cost + dist]);
    }
  }

  return { res, seen };
}

export function printDistGrid(grid: number[][]) {
  for (let r = 0; r < grid.length; r++) {
    let line = "";
    for (let c = 0; c < grid[r].length; c++) {
      line +=
        grid[r][c] > 10000
          ? "XXXX "
          : String(grid[r][c]).padStart(4, "0") + " ";
    }
    console.log(line);
  }
}

export function part1(input: string): {
  grid: Grid;
  res: number[][];
  endScore: number;
  seen: Map<string, [number, number]>;
} {
  const grid = getGrid(input);
  const [sr, sc] = getStartLocation(grid);
  const { res, seen } = djisktra(grid, sr, sc, 0, 1);
  const endScore = getEndScore(grid, res);
  return { grid, res, seen, endScore };
}

if (import.meta.main) {
  part1(readInput().trimEnd());
}
