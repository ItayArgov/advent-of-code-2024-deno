import { readInput } from "./input.ts";
import { sumOf } from "@std/collections";
import {
  getEquations,
  isValidEquation,
  mult,
  plus,
  type Operator,
} from "./part1.ts";

const concat: Operator = (a, b) => Number(String(a) + String(b));

function part2(input: string) {
  const equations = getEquations(input);

  const validEquations = equations.filter((eq) =>
    isValidEquation(eq, [concat, mult, plus]),
  );

  console.log(sumOf(validEquations, (eq) => eq[0]));
}

if (import.meta.main) {
  part2(readInput().trimEnd());
}

Deno.bench("part2", () => {
  part2(readInput().trimEnd());
});
