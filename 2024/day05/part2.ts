import { sumOf } from "@std/collections";
import { readInput } from "./input.ts";
import { getMiddle } from "./part1.ts";
import { getUpdateAndRulesMap, isValidRule, type RulesMap } from "./part1.ts";

function comparePrints(a: number, b: number, rulesMap: RulesMap): number {
  if (rulesMap.get(a)?.has(b)) return -1;
  if (rulesMap.get(b)?.has(a)) return 1;
  return 0;
}

function part2(input: string) {
  const { updates, rulesMap } = getUpdateAndRulesMap(input);

  const invalidUpdates = updates.filter(
    (update) => !isValidRule(rulesMap, update),
  );

  const sortedUpdates = invalidUpdates.map((update) =>
    update.toSorted((a, b) => comparePrints(a, b, rulesMap)),
  );

  console.log("Part 2:", sumOf(sortedUpdates, getMiddle));
}

if (import.meta.main) {
  part2(readInput().trimEnd());
}
