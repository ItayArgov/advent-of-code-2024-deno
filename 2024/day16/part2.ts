import { readInput } from "./input.ts";
import {
  DIRS,
  djisktra,
  getEndLocation,
  getStartLocation,
  part1,
  printDistGrid,
  toKey,
  type Grid,
} from "./part1.ts";

// A function that prints the grid, with "O" for cells that pass the weird DFS, otherwise the are the same as the input grid
function printWeirdDfs(grid: Grid, distGrid: number[][], maxDist: number) {
  for (let r = 0; r < grid.length; r++) {
    let row = "";
    for (let c = 0; c < grid[r].length; c++) {
      if (distGrid[r][c] === maxDist) {
        row += "O";
      } else {
        row += grid[r][c];
      }
    }
    console.log(row);
  }
}

function createMatrixSizeOfWithMaxSafeInt(grid: Grid) {
  return Array.from({ length: grid.length }, () =>
    Array.from({ length: grid[0].length }, () => Number.MAX_SAFE_INTEGER),
  );
}

function calculateDistFromAllToEnd(
  grid: Grid,
  seen: Map<string, [number, number]>,
) {
  const res: number[][] = createMatrixSizeOfWithMaxSafeInt(grid);
  const [er, ec] = getEndLocation(grid);
  console.log(seen.size);

  for (const [loc, [dr, dc]] of seen) {
    const [r, c] = loc.split(",").map(Number);
    const { res: distGrid } = djisktra(grid, r, c, dr, dc);
    res[r][c] = distGrid[er][ec];
  }

  return res;
}

function calculateLocations(
  grid: Grid,
  distGridFromStart: number[][],
  distGridToEnd: number[][],
  minDist: number,
) {
  const distGrid: number[][] = createMatrixSizeOfWithMaxSafeInt(grid);
  let res = 0;

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === ".") {
        distGrid[r][c] = distGridFromStart[r][c] + distGridToEnd[r][c];
        if (distGrid[r][c] === minDist) {
          res++;
        }
      }
    }
  }

  return res;
}

function part2({ grid, res, seen, endScore }: ReturnType<typeof part1>) {
  const visitedAndOrientation = new Map<string, [number, number]>();
  const [sr, sc] = getStartLocation(grid);
  const endDists = calculateDistFromAllToEnd(grid, seen);

  // console.log(
  //   visitedAndOrientation.get("11,2"),
  //   endDists[11][2],
  //   djisktra(grid, 11, 2, 0, 1),
  // );
  const ress = calculateLocations(grid, res, endDists, endScore);
  console.log(ress + 2);
  // console.log(endScore);
  // printWeirdDfs(grid, res, endScore);
  // weirdDfs(grid, new Set(), res, endScore, 2, grid[0].length - 2);
}

if (import.meta.main) {
  part2(part1(readInput().trimEnd()));
}
