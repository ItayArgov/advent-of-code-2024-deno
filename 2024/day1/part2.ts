import { sumOf } from "@std/collections";
import { getLists } from "./part1.ts";
import { readInput } from "./input.ts";

function getCounter(list: number[]): Map<number, number> {
  return list.reduce(
    (counter, currNum) => counter.set(currNum, (counter.get(currNum) ?? 0) + 1),
    new Map<number, number>(),
  );
}

const input = readInput();
const [firstList, secondList] = getLists(input);
const counter = getCounter(secondList);

console.log(
  "Part 2 Answer: ",
  sumOf(firstList, (num) => (counter.get(num) ?? 0) * num),
);
