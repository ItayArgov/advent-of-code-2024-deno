import {
  bfs,
  BYTES_BOUND,
  END_LOC,
  getBytesFalling,
  getGrid,
} from "./part1.ts";

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

function part2() {
  const bytes = getBytesFalling();
  const grid = getGrid(bytes.slice(0, BYTES_BOUND));
  const [l, r] = [BYTES_BOUND, bytes.length - 1];
  const res = binarySearch(l, r, (r) => checkIfGridAccessible(grid, bytes, r));
  console.log(res, bytes[res]);
}

if (import.meta.main) {
  part2();
}
