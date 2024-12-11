import { readInput } from "./input.ts";
import { dropWhile } from "@std/collections/unstable-drop-while";

export type Stone = string;

const trimZeroes = (s: string) => dropWhile(s, (c) => c === "0").join("");

export function blinkStone(stone: Stone): Stone[] {
  if (stone === "0") return ["1"];
  if (stone.length % 2 === 0) {
    const mid = Math.floor(stone.length / 2);
    const trimmed = trimZeroes(stone.slice(mid));
    return [stone.slice(0, mid), trimmed ? trimmed : "0"];
  }

  return [String(BigInt(stone) * 2024n)];
}

function simulateBlinks(stones: Stone[], n: number) {
  for (let i = 0; i < n; i++) {
    stones = stones.flatMap(blinkStone);
  }

  return stones;
}

function part1(input: string) {
  const stones = input.split(" ");
  console.log(simulateBlinks(stones, 25).length);
}

if (import.meta.main) {
  part1(readInput().trimEnd());
}
