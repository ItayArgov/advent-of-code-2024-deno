import { getInput } from "./part1.ts";

function countWays(patterns: string[], towel: string) {
  const dp: number[] = Array.from({ length: towel.length + 1 }, () => 0);
  dp[0] = 1;
  for (let i = 0; i < towel.length; i++) {
    if (dp[i] === 0) continue;

    for (const pattern of patterns) {
      if (towel.startsWith(pattern, i)) {
        dp[i + pattern.length] += dp[i];
      }
    }
  }

  return dp[towel.length];
}

function part2() {
  const { patterns, towels } = getInput();
  let sum = 0;
  for (const towel of towels) {
    sum += countWays(patterns, towel);
  }
  console.log(sum);
}

if (import.meta.main) {
  part2();
}
