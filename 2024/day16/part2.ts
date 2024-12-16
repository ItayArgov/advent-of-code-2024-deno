import { readInput } from "./input.ts";
import {
  djisktra,
  getEndLocation,
  getStartLocation,
  part1,
  toKey,
  type Grid,
} from "./part1.ts";

function createMatrixSizeOfWithMaxSafeInt(grid: Grid) {
  return Array.from({ length: grid.length }, () =>
    Array.from({ length: grid[0].length }, () => Number.MAX_SAFE_INTEGER),
  );
}

function calculateDistFromAllToEnd(
  grid: Grid,
  seen: Map<string, [number, number]>,
) {
  const [er, ec] = getEndLocation(grid);
  const [sr, sc] = getStartLocation(grid);
  const endOrientation = seen.get(toKey(er, ec))!;
  const [nr, nc] = [-endOrientation[0], -endOrientation[1]];
  grid[er][ec] = "S";
  grid[sr][sc] = "E";
  const { res: distGridFromEnd, seen: seenReversed } = djisktra(
    grid,
    er,
    ec,
    nr,
    nc,
  );
  grid[er][ec] = "E";
  grid[sr][sc] = "S";

  return { distGridFromEnd, seenReversed };
}

function calculateLocations(
  grid: Grid,
  distGridFromStart: number[][],
  distGridToEnd: number[][],
  minDist: number,
  seen: Map<string, [number, number]>,
  seenReverse: Map<string, [number, number]>,
) {
  const distGrid: number[][] = createMatrixSizeOfWithMaxSafeInt(grid);
  let res = 0;

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (
        distGridFromStart[r][c] === Number.MAX_SAFE_INTEGER ||
        distGridToEnd[r][c] === Number.MAX_SAFE_INTEGER
      ) {
        continue;
      }

      const dir = seen.get(toKey(r, c))!;
      const dirReverse = seenReverse.get(toKey(r, c))!;

      const edgeCost =
        dir[0] === -dirReverse[0] && dir[1] === -dirReverse[1] ? 0 : 1000;

      if (edgeCost + distGridFromStart[r][c] + distGridToEnd[r][c] === minDist)
        res++;
    }
  }

  return res;
}

function part2({ grid, res, seen, endScore }: ReturnType<typeof part1>) {
  const { distGridFromEnd, seenReversed } = calculateDistFromAllToEnd(
    grid,
    seen,
  );
  const locationCount = calculateLocations(
    grid,
    res,
    distGridFromEnd,
    endScore,
    seen,
    seenReversed,
  );

  console.log(locationCount);
}

if (import.meta.main) {
  part2(part1(readInput().trimEnd()));
}

Deno.bench("part2", () => {
  part2(part1(readInput().trimEnd()));
});
