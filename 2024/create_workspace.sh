#!/bin/bash

for day in {2..25}; do
  # Define the directory for the current day
  DAY_DIR="day$day"

  # Run deno init only if the directory doesn't exist
  if [ ! -d "$DAY_DIR" ]; then
    deno init -q "$DAY_DIR"
  fi

  # Replace deno.json with custom tasks
  cat <<EOF > "$DAY_DIR/deno.json"
{
  "tasks": {
    "dev1": "deno run --watch --allow-read part1.ts --test",
    "dev2": "deno run --watch --allow-read part2.ts --test",
    "run1": "deno run --allow-read part1.ts",
    "run2": "deno run --allow-read part2.ts"
  }
}
EOF

  # Create part1.ts and part2.ts if they don't exist
  [ ! -f "$DAY_DIR/part1.ts" ] && touch "$DAY_DIR/part1.ts"
  [ ! -f "$DAY_DIR/part2.ts" ] && touch "$DAY_DIR/part2.ts"

  # Create input.ts with specific contents
  cat <<EOF > "$DAY_DIR/input.ts"
import { parseArgs } from "@std/cli";

export function readInput(): string {
  const isTest = parseArgs(Deno.args, { boolean: ["test"] }).test;
  return isTest
    ? Deno.readTextFileSync("testInput")
    : Deno.readTextFileSync("input");
}
EOF

  # Remove main.ts and main_test.ts if they exist
  rm -f "$DAY_DIR/main.ts" "$DAY_DIR/main_test.ts"
done

echo "Deno projects for Day 2 to 25 have been configured."
