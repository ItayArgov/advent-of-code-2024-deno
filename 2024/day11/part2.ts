import { sumOf } from "@std/collections/sum-of";
import { readInput } from "./input.ts";
import { blinkStone, type Stone } from "./part1.ts";

type StoneLine = Map<Stone, number>;

const dp = new Map<Stone, Stone[]>();

function simulateBlinks(stones: StoneLine, n: number) {
  for (let i = 0; i < n; i++) {
    const newStoneLine = new Map<Stone, number>();
    for (const [key, value] of stones.entries()) {
      if (!dp.has(key)) {
        dp.set(key, blinkStone(key));
      }

      const explodesInto = dp.get(key)!;
      for (const explode of explodesInto) {
        newStoneLine.set(explode, (newStoneLine.get(explode) || 0) + value);
      }
    }

    stones = newStoneLine;
  }

  return stones;
}

function initStoneLine(stones: Stone[]): StoneLine {
  const stoneLine = new Map<Stone, number>();
  for (const stone of stones) {
    stoneLine.set(stone, (stoneLine.get(stone) || 0) + 1);
  }

  return stoneLine;
}

function part2(input: string) {
  const stones = input.split(" ");
  const stoneLine = initStoneLine(stones);
  const simulatedStones = simulateBlinks(stoneLine, 75);
  console.log(sumOf(simulatedStones.values(), (x) => x));
}

if (import.meta.main) {
  part2(readInput().trimEnd());
}
