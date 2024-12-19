import { readInput } from "./input.ts";

export function getInput() {
  const [patterns, towels] = readInput().trimEnd().split("\n\n");
  return {
    patterns: patterns.split(", "),
    towels: towels.split("\n"),
  };
}

function canBeMatched(towel: string, patterns: string[]) {
  if (towel === "") {
    return true;
  }

  for (const pattern of patterns) {
    if (
      towel.endsWith(pattern) &&
      canBeMatched(towel.slice(0, towel.length - pattern.length), patterns)
    ) {
      return true;
    }
  }

  return false;
}

function part1() {
  const { patterns, towels } = getInput();
  const res = towels.map((towel) => canBeMatched(towel, patterns));
  console.log(res.filter(Boolean).length);
}

if (import.meta.main) {
  part1();
}
