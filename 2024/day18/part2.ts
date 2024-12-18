import {
  bfs,
  BYTES_BOUND,
  END_LOC,
  getBytesFalling,
  getGrid,
} from "./part1.ts";
import { UnionFind } from "./union-find.ts";

function binarySearch(l: number, r: number, f: (i: number) => boolean) {
  while (l < r) {
    const m = Math.floor((l + r) / 2);
    if (f(m)) {
      l = m + 1;
    } else {
      r = m;
    }
  }
  return l;
}

function turnOffUntil(grid: boolean[][], bytes: [number, number][], r: number) {
  for (let i = 0; i <= r; i++) {
    const [c, r] = bytes[i];
    grid[r][c] = false;
  }
  for (let i = r + 1; i < bytes.length; i++) {
    const [c, r] = bytes[i];
    grid[r][c] = true;
  }
}

function checkIfGridAccessible(
  grid: boolean[][],
  bytes: [number, number][],
  r: number,
) {
  turnOffUntil(grid, bytes, r);
  const visited = bfs(grid, 0, 0);
  if (visited.has(END_LOC.join(","))) {
    return true;
  } else {
    return false;
  }
}

function unionAdjacent(grid: boolean[][], uf: UnionFind) {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (!grid[r][c]) continue;

      if (r + 1 < grid.length && grid[r + 1][c]) {
        uf.union(`${c},${r}`, `${c},${r + 1}`);
      }
      if (c + 1 < grid[0].length && grid[r][c + 1]) {
        uf.union(`${c},${r}`, `${c + 1},${r}`);
      }
    }
  }
}

function unionRemovedByte(
  grid: boolean[][],
  uf: UnionFind,
  byte: [number, number],
) {
  const [c, r] = byte;
  grid[r][c] = true;

  if (r + 1 < grid.length && grid[r + 1][c]) {
    uf.union(`${c},${r}`, `${c},${r + 1}`);
  }
  if (c + 1 < grid[0].length && grid[r][c + 1]) {
    uf.union(`${c},${r}`, `${c + 1},${r}`);
  }
  if (r - 1 >= 0 && grid[r - 1][c]) {
    uf.union(`${c},${r}`, `${c},${r - 1}`);
  }
  if (c - 1 >= 0 && grid[r][c - 1]) {
    uf.union(`${c},${r}`, `${c - 1},${r}`);
  }
}

function part2WithUnionFind() {
  const bytes = getBytesFalling();
  const grid = getGrid(bytes);
  const uf = new UnionFind();

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      uf.makeSet(`${c},${r}`);
    }
  }
  unionAdjacent(grid, uf);
  const [start, end] = ["0,0", END_LOC.join(",")];
  let byteToRemoveFromEnd = bytes.length - 1;
  while (uf.find(start) !== uf.find(end)) {
    unionRemovedByte(grid, uf, bytes[byteToRemoveFromEnd]);
    byteToRemoveFromEnd--;
  }

  console.log(byteToRemoveFromEnd + 1, bytes[byteToRemoveFromEnd + 1]);
}

function part2() {
  const bytes = getBytesFalling();
  const grid = getGrid(bytes.slice(0, BYTES_BOUND));
  const [l, r] = [BYTES_BOUND, bytes.length - 1];
  const res = binarySearch(l, r, (r) => checkIfGridAccessible(grid, bytes, r));
  console.log(res, bytes[res]);
}

if (import.meta.main) {
  part2WithUnionFind();
}

Deno.bench("part2uf", part2WithUnionFind);
