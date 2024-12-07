import { readInput } from "./input.ts";
import { sumOf } from "@std/collections";

export type Operator = (a: number, b: number) => number;
export type Equation = { target: number; factors: number[] };

export const plus: Operator = (a, b) => a + b;
export const mult: Operator = (a, b) => a * b;

export function getEquations(input: string): Equation[] {
  const lines = input.split("\n");
  const equations = lines.map((line) => {
    const [target, factors] = line.split(": ");
    return {
      target: parseInt(target),
      factors: factors.split(" ").map(Number),
    };
  });

  return equations;
}

export function isValidEquation(eq: Equation, ops: Operator[]) {
  const { target, factors } = eq;
  return canSumToTarget(factors, target, 1, factors[0], ops);
}

function canSumToTarget(
  factors: number[],
  target: number,
  i: number,
  sum: number,
  ops: Operator[],
): boolean {
  if (isNaN(sum) || sum > target) return false;
  if (i === factors.length) return target === sum;

  return ops.some((op) =>
    canSumToTarget(factors, target, i + 1, op(sum, factors[i]), ops),
  );
}

function part1(input: string) {
  const equations = getEquations(input);

  const validEquations = equations.filter((eq) =>
    isValidEquation(eq, [mult, plus]),
  );

  console.log(sumOf(validEquations, (eq) => eq.target));

  return validEquations;
}

if (import.meta.main) {
  part1(readInput().trimEnd());
}
