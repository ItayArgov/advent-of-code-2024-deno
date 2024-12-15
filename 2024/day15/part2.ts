import { readInput } from "./input.ts";
import { getGridAndInstructions, findRobot } from "./part1.ts";

type Grid = ("#" | "." | "@" | "O")[][];
type WidenedGrid = ("#" | "." | "@" | "[" | "]")[][];

function printGrid(grid: Grid | WidenedGrid) {
  for (const row of grid) {
    console.log(row.join(""));
  }
}

function widenGrid(grid: Grid): WidenedGrid {
  const widenedGrid: WidenedGrid = [];

  for (const row of grid) {
    const newRow: WidenedGrid[number] = [];
    for (const cell of row) {
      if (cell === "." || cell == "#") newRow.push(cell, cell);
      else if (cell === "O") newRow.push("[", "]");
      else newRow.push("@", ".");
    }

    widenedGrid.push(newRow);
  }

  return widenedGrid;
}

function part2(input: string) {
  const [grid, instructions] = getGridAndInstructions(input);
  const widenedGrid = widenGrid(grid);
  let [r, c] = findRobot(widenedGrid);
  for (const [dr, dc] of instructions) {
    if (moveIfPossible(widenedGrid, r, c, dr, dc)) {
      widenedGrid[r + dr][c + dc] = "@";
      widenedGrid[r][c] = ".";
      r += dr;
      c += dc;
    }
  }

  // printGrid(widenedGrid);
  console.log(calculateGPSScore(widenedGrid));
}

function canBoxesTreeBeMoved(
  grid: WidenedGrid,
  r: number,
  c: number,
  dr: number,
  dc: number,
) {
  const queue: [number, number][] = [[r, c]];
  const visited = new Set<string>();
  const stack: [number, number][] = [];
  while (queue.length > 0) {
    const [r, c] = queue.shift()!;

    if (visited.has(`${r},${c}`)) continue;
    visited.add(`${r},${c}`);

    if (grid[r + dr][c + dc] === "#") return false;
    stack.push([r, c]);

    if (dr && grid[r][c] === "]") queue.push([r, c - 1]);
    if (dr && grid[r][c] === "[") queue.push([r, c + 1]);

    if (grid[r + dr][c + dc] === ".") {
      continue;
    } else {
      queue.push([r + dr, c + dc]);
    }
  }

  let pos: [number, number] | undefined;
  while ((pos = stack.pop()) !== undefined) {
    const [r, c] = pos;
    grid[r + dr][c + dc] = grid[r][c];
    grid[r][c] = ".";
  }

  return true;
}

if (import.meta.main) {
  part2(readInput().trimEnd());
}

function calculateGPSScore(grid: WidenedGrid) {
  let score = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === "[" || grid[r][c] === "]") {
        score += 100 * r + c;
        c += 1;
      }
    }
  }

  return score;
}

function moveIfPossible(
  grid: WidenedGrid,
  r: number,
  c: number,
  dr: number,
  dc: number,
) {
  const newR = r + dr;
  const newC = c + dc;

  if (grid[newR][newC] === ".") {
    return true;
  } else if (grid[newR][newC] === "#") {
    return false;
  }

  if (canBoxesTreeBeMoved(grid, newR, newC, dr, dc)) {
    grid[newR][newC] = grid[r][c];
    grid[r][c] = ".";
    return true;
  }

  return false;
}
