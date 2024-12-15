import { readInput } from "./input.ts";

type Grid = ("#" | "." | "@" | "O")[][];

export function getGridAndInstructions(
  input: string,
): [Grid, [number, number][]] {
  const [gridRaw, instructionsRaw] = input.split("\n\n");
  const grid = gridRaw.split("\n").map((row) => row.split("")) as Grid;
  const instructions = instructionsRaw
    .trim()
    .split("")
    .filter((c) => c !== "\n")
    .map((c) => {
      return toDir(c);
    }) as [number, number][];

  return [grid, instructions!];
}

export function toDir(c: string): [number, number] {
  switch (c) {
    case "^":
      return [-1, 0];
    case "v":
      return [1, 0];
    case "<":
      return [0, -1];
    case ">":
      return [0, 1];
    default:
      throw new Error(`Invalid instruction: ${c}`);
  }
}

function moveIfPossible(
  grid: Grid,
  r: number,
  c: number,
  dr: number,
  dc: number,
) {
  const newR = r + dr;
  const newC = c + dc;
  if (newR < 0 || newR >= grid.length || newC < 0 || newC >= grid[0].length) {
    return false;
  }

  if (grid[newR][newC] === "#") {
    return false;
  }

  if (grid[newR][newC] === ".") {
    grid[newR][newC] = grid[r][c];
    grid[r][c] = ".";
    return true;
  }

  if (grid[newR][newC] === "O") {
    if (moveIfPossible(grid, newR, newC, dr, dc)) {
      grid[newR][newC] = grid[r][c];
      grid[r][c] = ".";
      return true;
    }
  }

  return false;
}

export function findRobot(grid: string[][]): [number, number] {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === "@") {
        return [r, c];
      }
    }
  }

  throw new Error("Robot not found");
}

function calculateGPSScore(grid: Grid) {
  let score = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === "O") {
        score += 100 * r + c;
      }
    }
  }

  return score;
}

export function printGrid(grid: Grid) {
  for (const row of grid) {
    console.log(row.join(""));
  }
}

function part1(input: string) {
  const [grid, instructions] = getGridAndInstructions(input);
  let [r, c] = findRobot(grid);
  for (const [dr, dc] of instructions) {
    if (moveIfPossible(grid, r, c, dr, dc)) {
      r += dr;
      c += dc;
    }
  }
  console.log(calculateGPSScore(grid));
}

if (import.meta.main) {
  part1(readInput().trimEnd());
}
