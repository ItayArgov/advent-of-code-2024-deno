import { readInput } from "./input.ts";
import { sumOf } from "@std/collections";

export function reduceMult(mult: string) {
  return mult
    .slice(4, -1)
    .split(",")
    .map((x) => parseInt(x))
    .reduce((acc, curr) => acc * curr, 1);
}

function part1(input: string): number {
  const reg = /mul\(\d+,\d+\)/g;
  const mults = [...input.matchAll(reg)];
  const res = sumOf(
    mults.map((match) => reduceMult(match[0])),
    (x) => x,
  );
  return res;
}

if (import.meta.main) {
  console.log(part1(readInput()));
}
