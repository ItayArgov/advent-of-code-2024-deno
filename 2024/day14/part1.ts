import { isTestArg, readInput } from "./input.ts";

export const MAX_R = isTestArg() ? 7 : 103;
export const MAX_C = isTestArg() ? 11 : 101;

export type Robot = {
  r: number;
  c: number;
  dr: number;
  dc: number;
};

export type Grid = Map<string, Robot[]>;

const regex = /(\d+)|(-\d+)/g;

export const toKey = (r: number, c: number) => `${r},${c}`;

export const mod = (a: number, b: number) => ((a % b) + b) % b;

export function getRobots(input: string) {
  const lines = input.split("\n");
  const matches = lines.map((line) => [
    ...line.matchAll(regex).map((match) => Number(match[0])),
  ]);
  const robots = matches.map(([c, r, dc, dr]) => ({ r, c, dr, dc }));
  return robots;
}

export const getInitialState = (robots: Robot[]): Grid =>
  robots
    .map((robot) => [toKey(robot.r, robot.c), robot] as [string, Robot])
    .reduce<Grid>(
      (acc, [key, robot]) =>
        acc.set(key, acc.get(key)?.concat(robot) ?? [robot]),
      new Map(),
    );

function simulate(robots: Robot[], n: number) {
  let grid = getInitialState(robots);
  console.log(grid);
  for (let i = 0; i < n; i++) {
    grid = stepSimulation(grid);
  }

  return grid;
}

export function stepSimulation(grid: Grid) {
  const newGrid = new Map<string, Robot[]>();
  for (const [key, robots] of grid) {
    const [r, c] = key.split(",").map(Number);
    for (const robot of robots) {
      const newR = mod(r + robot.dr, MAX_R);
      const newC = mod(c + robot.dc, MAX_C);
      const newKey = toKey(newR, newC);
      newGrid.set(newKey, newGrid.get(newKey)?.concat(robot) ?? [robot]);
    }
  }
  grid = newGrid;
  return grid;
}

function countQuadrants(grid: Grid) {
  const quadrants = new Map<string, number>();
  for (const [key, robots] of grid) {
    const [r, c] = key.split(",").map(Number);
    if (r === (MAX_R - 1) / 2 || c === (MAX_C - 1) / 2) continue;
    const quadrant = `${r < MAX_R / 2 ? "N" : "S"}${c < MAX_C / 2 ? "W" : "E"}`;
    quadrants.set(quadrant, (quadrants.get(quadrant) ?? 0) + robots.length);
  }
  return quadrants;
}

function part1(input: string) {
  const robots = getRobots(input);
  const grid = simulate(robots, 100);
  console.log(
    countQuadrants(grid)
      .values()
      .reduce((acc, x) => acc * x, 1),
  );
}

if (import.meta.main) {
  part1(readInput().trimEnd());
}
