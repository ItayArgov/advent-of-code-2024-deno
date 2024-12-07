import { readInput } from "./input.ts";
import { reduceMult } from "./part1.ts";

function part2(input: string) {
  const reg = /mul\(\d+,\d+\)|do\(\)|don\'t\(\)/g;
  let enabled = true;
  let sum = 0;
  const matches = input.matchAll(reg);
  for (const match of matches) {
    const currMatch = match[0];
    switch (currMatch) {
      case "don't()":
        enabled = false;
        break;
      case "do()":
        enabled = true;
        break;
      default:
        sum += Number(enabled) * reduceMult(currMatch);
    }
  }

  return sum;
}

if (import.meta.main) {
  console.log(part2(readInput()));
}
