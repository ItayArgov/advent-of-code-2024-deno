import { readInput } from "./input.ts";
import { sumOf } from "@std/collections";

export type RulesMap = Map<number, Set<number>>;

export function getMiddle(update: number[]): number {
  return update[Math.floor(update.length / 2)];
}

export function isValidRule(rulesMap: RulesMap, update: number[]): boolean {
  for (let i = 1; i < update.length; i++) {
    for (let j = 0; j < i; j++) {
      if (rulesMap.get(update[i])?.has(update[j])) {
        return false;
      }
    }
  }

  return true;
}

export function getUpdateAndRulesMap(input: string) {
  const [orderLines, updatesLines] = input.split("\n\n");

  const order = orderLines
    .split("\n")
    .map((line) => [parseInt(line.slice(0, 2)), parseInt(line.slice(3))]);

  const updates = updatesLines
    .split("\n")
    .map((line) => line.split(",").map(Number));

  const rulesMap = new Map<number, Set<number>>();

  for (const [a, b] of order) {
    if (!rulesMap.has(a)) {
      rulesMap.set(a, new Set());
    }

    rulesMap.get(a)?.add(b);
  }

  return { updates, rulesMap };
}

function part1(input: string) {
  const { updates, rulesMap } = getUpdateAndRulesMap(input);

  const isValidRuleForRulesMap = isValidRule.bind(null, rulesMap);

  const res = sumOf(updates.filter(isValidRuleForRulesMap), getMiddle);

  console.log(res);
}

if (import.meta.main) {
  part1(readInput().trimEnd());
}
