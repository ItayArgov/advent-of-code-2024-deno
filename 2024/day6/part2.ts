import { readInput, readInputBytes } from "./input.ts";
import { Buffer } from "node:buffer";
import { part1 } from "./part1.ts";
import { chunk, sumOf } from "@std/collections";
import "@std/bytes";

// up [-1 ,0]
// right [0, 1]
// down [1, 0]
// left [0, -1]

function getStartPos(grid: string[][]) {
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (grid[x][y] === "^") {
        return [x, y];
      }
    }
  }
}

if (import.meta.main) {
  await part2();
}

async function part2() {
  const grid = readInput()
    .trimEnd()
    .split("\n")
    .map((line) => line.split(""));

  const startPos = getStartPos(grid) as [number, number];
  const guardPath = [
    ...part1(grid)
      .keys()
      .map((locs) => locs.split(",").map(Number) as [number, number]),
  ];
  const chunkedGuardPath = chunk(guardPath, Math.floor(guardPath.length / 16));

  const promises: Promise<number>[] = [];

  for (const chunk of chunkedGuardPath) {
    promises.push(createWorker(grid, chunk, startPos));
  }

  console.log(sumOf(await Promise.all(promises), (x) => x));
}

function createWorker(
  grid: string[][],
  chunk: [number, number][],
  startPos: [number, number],
) {
  return new Promise<number>((resolve) => {
    const worker = new Worker(new URL("./worker.ts", import.meta.url).href, {
      type: "module",
    });

    worker.addEventListener(
      "message",
      (event: MessageEvent<{ cnt: number }>) => {
        resolve(event.data.cnt);
      },
    );

    worker.postMessage({ grid, chunk, startPos });
  });
}

Deno.bench("part2", async () => await part2());
