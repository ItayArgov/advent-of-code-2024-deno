import { readInput } from "./input.ts";
import {
  getInitialState,
  getRobots,
  MAX_C,
  MAX_R,
  mod,
  stepSimulation,
  toKey,
  type Grid,
  type Robot,
} from "./part1.ts";

const getAdjacentKeys = (r: number, c: number) => [
  toKey(r - 1, c),
  toKey(r + 1, c),
  toKey(r, c - 1),
  toKey(r, c + 1),
  toKey(r - 1, c - 1),
  toKey(r - 1, c + 1),
  toKey(r + 1, c - 1),
  toKey(r + 1, c + 1),
];

function getGridScore(grid: Grid) {
  const locs = new Set(grid.keys());
  let score = 0;
  for (const currKey of locs) {
    const [r, c] = currKey.split(",").map(Number);
    for (const key of getAdjacentKeys(r, c)) {
      if (locs.delete(key)) {
        score++;
      }
    }
  }

  return score * 2;
}

function detectRobotCycle(robot: Robot) {
  const visited = new Set<string>();
  let [r, c] = [robot.r, robot.c];
  visited.add(toKey(r, c));
  while (true) {
    r = mod(r + robot.dr, MAX_R);
    c = mod(c + robot.dc, MAX_C);

    if (visited.has(toKey(r, c))) {
      return visited.size;
    }

    visited.add(toKey(r, c));
  }
}

function printGrid(grid: Grid) {
  const rows = [];
  for (let r = 0; r < MAX_R; r++) {
    const row = [];
    for (let c = 0; c < MAX_C; c++) {
      const key = toKey(r, c);
      if (grid.has(key)) {
        row.push(grid.get(key)!.length);
      } else {
        row.push(".");
      }
    }
    rows.push(row.join(""));
  }

  console.log(rows.join("\n"));
}

function part2(input: string) {
  const robots = getRobots(input);
  let grid = getInitialState(robots);
  const { maxScoreStep, maxScore, maxGrid } = findGridWithHighestScore(grid);

  printGrid(maxGrid);
  console.log(maxScoreStep, maxScore);
}

if (import.meta.main) {
  part2(readInput().trimEnd());
}

function findGridWithHighestScore(grid: Grid) {
  let step = 0;
  let maxScoreStep = 0;
  let maxScore = 0;
  let maxGrid: Grid;
  while (step < 11000) {
    grid = stepSimulation(grid);
    step++;
    const score = getGridScore(grid);
    if (score > maxScore) {
      maxScore = score;
      maxScoreStep = step;
      maxGrid = grid;
    }
  }
  return { maxScoreStep, maxScore, maxGrid };
}
