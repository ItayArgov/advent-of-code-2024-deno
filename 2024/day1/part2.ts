import { sumOf } from "@std/collections/sum-of";
import { getLists } from "./part1.ts";
import { readInput } from "./input.ts";

function getCounter(list: number[]): Map<number, number> {
  return list.reduce(
    (countMap, currNum) =>
      countMap.set(currNum, (countMap.get(currNum) ?? 0) + 1),
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
