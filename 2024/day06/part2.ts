import { readInput } from "./input.ts";
import { getStartPos, part1 } from "./part1.ts";
import { chunk, sumOf } from "@std/collections";

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

if (import.meta.main) {
  await part2();
}
