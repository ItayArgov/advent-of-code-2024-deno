import { readInput } from "./input.ts";
import { zip, sumOf } from "@std/collections";

export function getLists(input: string) {
  const linesTuples = input.split("\n").map((line) => line.trim().split("   "));

  const getListAtIndex = (index: number) =>
    linesTuples.map((tuple) => parseInt(tuple[index])).slice(0, -1);

  return [getListAtIndex(0), getListAtIndex(1)];
}

if (import.meta.main) {
  const input = readInput();
  const [firstList, secondList] = getLists(input);
  const zipped = zip(firstList.toSorted(), secondList.toSorted());
  console.log(
    "Part 1 Answer: ",
    sumOf(zipped, ([a, b]) => Math.abs(a - b)),
  );
}
