import { readInput } from "./input.ts";

// up [-1 ,0]
// right [0, 1]
// down [1, 0]
// left [0, -1]

export function rotateRight(dir: [number, number]): [number, number] {
  switch (dir.toString()) {
    case "0,-1":
      return [-1, 0];
    case "1,0":
      return [0, -1];
    case "0,1":
      return [1, 0];
    case "-1,0":
      return [0, 1];
    default:
      throw new Error("Invalid direction");
  }
}

export function getStartPos(grid: string[][]) {
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (grid[x][y] === "^") {
        return [x, y];
      }
    }
  }
}

export function isOutOfBounds(grid: string[][], x: number, y: number) {
  return x < 0 || y < 0 || x >= grid.length || y >= grid[0].length;
}

export function part1(grid: string[][]) {
  let [x, y] = getStartPos(grid) as [number, number];
  let dir = [-1, 0] as [number, number];
  const visited = new Set<string>();
  visited.add([x, y].toString());
  while (true) {
    const [dx, dy] = dir;
    if (isOutOfBounds(grid, x + dx, y + dy)) {
      break;
    }

    while (grid[x + dir[0]][y + dir[1]] === "#") {
      dir = rotateRight(dir);
    }

    x += dir[0];
    y += dir[1];
    visited.add([x, y].toString());
  }

  return visited;
}

if (import.meta.main) {
  const grid = readInput()
    .trimEnd()
    .split("\n")
    .map((line) => line.split(""));
  console.log(part1(grid).size);
}
