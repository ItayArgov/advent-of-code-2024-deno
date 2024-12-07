import { readInput } from "./input.ts";
import { sumOf } from "@std/collections";

export function reduceMult(mult: string) {
  return mult
    .slice(4, -1)
    .split(",")
    .map(Number)
    .reduce((acc, curr) => acc * curr, 1);
}

function part1(input: string): number {
  const reg = /mul\(\d+,\d+\)/g;
  const multsMatches = [...input.matchAll(reg)];
  const res = sumOf(multsMatches, (match) => reduceMult(match[0]));
  return res;
}

if (import.meta.main) {
  console.log(part1(readInput()));
}
