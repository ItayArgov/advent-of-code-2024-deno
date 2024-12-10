import { readInput } from "./input.ts";

const dirs = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
];

let xmasCount = 0;

function isXmasForDir(
  grid: string[],
  currString: string[],
  i: number,
  j: number,
  dir: [number, number],
) {
  if (currString.length === 4) {
    if (currString.join("") === "XMAS") {
      xmasCount += 1;
    }

    return;
  }

  if (!"XMAS".startsWith(currString.join(""))) {
    return;
  }

  const [ni, nj] = [i + dir[0], j + dir[1]];
  if (
    ni < 0 ||
    nj < 0 ||
    ni >= grid.length ||
    nj >= grid[0].length ||
    currString.includes(grid[ni][nj])
  ) {
    return;
  }

  currString.push(grid[ni][nj]);
  isXmasForDir(grid, currString, ni, nj, dir);
}

function part1(input: string) {
  const lines = input.split("\n");

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] === "X") {
        for (const [di, dj] of dirs) {
          isXmasForDir(lines, ["X"], i, j, [di, dj]);
        }
      }
    }
  }
  console.log("Part 1:", xmasCount);
}

if (import.meta.main) {
  part1(readInput().trimEnd());
}
