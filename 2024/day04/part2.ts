import { readInput } from "./input.ts";
import { sumOf } from "@std/collections";

function checkIfX(grid: string[][], i: number, j: number): boolean {
  if (i >= grid.length - 2 || j >= grid[0].length - 2) {
    return false;
  }

  const firstDiag = grid[i][j] + grid[i + 1][j + 1] + grid[i + 2][j + 2];
  const secondDiag = grid[i][j + 2] + grid[i + 1][j + 1] + grid[i + 2][j];

  const firstDiagIsMas = firstDiag === "MAS" || firstDiag === "SAM";
  const secondDiagIsMas = secondDiag === "MAS" || secondDiag === "SAM";

  return firstDiagIsMas && secondDiagIsMas;
}

function part2(input: string) {
  const lines = input.split("\n").map((line) => line.split(""));
  const xLocationArray = lines.map((line, i) =>
    line.map((_, j) => checkIfX(lines, i, j)),
  );
  console.log(
    "Part 2:",
    sumOf(xLocationArray.flat(), (x) => (x ? 1 : 0)),
  );
}

if (import.meta.main) {
  part2(readInput().trimEnd());
}
