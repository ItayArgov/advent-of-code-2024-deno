import { sumOf } from "@std/collections";
import { readInput } from "./input.ts";
import { memoize } from "@std/cache";

const powOf10Halfed = (length: number) => Math.pow(10, Math.floor(length / 2));

const countStones = memoize((stone: number, d: number): number => {
  if (d === 0) return 1;
  if (stone === 0) return countStones(1, d - 1);

  const length = Math.floor(Math.log10(stone)) + 1;
  if (length % 2 === 0) {
    const half = powOf10Halfed(length);
    return (
      countStones(Math.floor(stone / half), d - 1) +
      countStones(Math.floor(stone % half), d - 1)
    );
  }

  return countStones(stone * 2024, d - 1);
});

function part2(input: string) {
  const stones = input.split(" ").map(Number);
  console.log(sumOf(stones, (s) => countStones(s, 75)));
}

if (import.meta.main) {
  part2(readInput().trimEnd());
}
